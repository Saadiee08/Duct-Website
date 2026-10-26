import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEcosystemToDirectory } from './src/ecosystem/buildEcosystem.ts';
import {
  buildSecurityHeaders,
  createRateLimiter,
  resolveCleanRoute,
  resolveContainedFilePath,
  validateQuoteSubmission,
} from './src/ecosystem/security.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);

// Ensure physical HTML directory tree exists before serving requests
const primarySiteRoot = path.join(__dirname, 'gtaductmasters');
const distSiteRoot = path.join(__dirname, 'dist');

if (!fs.existsSync(path.join(primarySiteRoot, 'index.html'))) {
  buildEcosystemToDirectory(__dirname, primarySiteRoot);
}
if (isProduction && !fs.existsSync(path.join(distSiteRoot, 'index.html'))) {
  buildEcosystemToDirectory(__dirname, distSiteRoot);
}

const activeWebRoot =
  isProduction && fs.existsSync(path.join(distSiteRoot, 'index.html'))
    ? distSiteRoot
    : primarySiteRoot;

export function createEcosystemApp(webRoot: string = activeWebRoot) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  const securityHeaders = buildSecurityHeaders({ isProduction });
  const quoteRateLimiter = createRateLimiter({
    windowMs: 60_000,
    maxRequests: 8,
  });

  // 1. Apply OWASP HTTP security headers to every response
  app.use((_req, res, next) => {
    for (const [headerName, headerValue] of Object.entries(securityHeaders)) {
      res.setHeader(headerName, headerValue);
    }
    next();
  });

  // 2. Parse JSON strictly for API endpoints with bounded body size
  app.use('/api', express.json({ limit: '16kb' }));

  app.get('/api/health', (_req, res) => {
    res.status(200).json({ ok: true, status: 'healthy' });
  });

  // 3. Hardened Quote Submission Endpoint (Validation + Rate Limit + Anti-CSRF + Anti-Bot)
  app.post('/api/quote', (req, res) => {
    const requestedWith = req.get('X-Requested-With');
    const originHeader = req.get('Origin');
    const hostHeader = req.get('Host');

    // Enforce custom header or same-host origin to prevent cross-site form posts
    if (requestedWith !== 'QuoteInquiryClient') {
      if (!originHeader || !hostHeader) {
        res.status(403).json({
          ok: false,
          error: 'Cross-origin submission rejected.',
        });
        return;
      }
      try {
        const parsedOrigin = new URL(originHeader);
        if (parsedOrigin.host !== hostHeader) {
          res.status(403).json({
            ok: false,
            error: 'Origin mismatch rejected.',
          });
          return;
        }
      } catch {
        res.status(403).json({
          ok: false,
          error: 'Malformed Origin header.',
        });
        return;
      }
    }

    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const rateStatus = quoteRateLimiter.check(clientIp);
    if (!rateStatus.allowed) {
      res.setHeader('Retry-After', String(rateStatus.retryAfterSeconds));
      res.status(429).json({
        ok: false,
        error: `Too many requests. Please wait ${rateStatus.retryAfterSeconds} seconds before trying again.`,
      });
      return;
    }

    const validation = validateQuoteSubmission(req.body);
    if (!validation.ok || !validation.data) {
      res.status(validation.status).json({
        ok: false,
        field: validation.field,
        error: validation.error,
      });
      return;
    }

    // Privacy-preserving operational log (never logs raw customer phone/message PII)
    console.info(
      `[quote-inquiry] company="${validation.data.company}" service="${validation.data.service}" status=accepted`
    );

    res.status(200).json({
      ok: true,
      data: {
        company: validation.data.company,
        name: validation.data.name,
        service: validation.data.service,
        mailtoHref: validation.data.mailtoHref,
        whatsappHref: validation.data.whatsappHref,
      },
    });
  });

  // 4. Clean-URL Physical HTML & Static Asset Delivery
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.status(405).type('text/plain').send('Method Not Allowed');
      return;
    }

    const resolution = resolveCleanRoute(req.originalUrl || req.url);

    if (resolution.kind === 'forbidden') {
      res.status(403).type('text/plain').send('Forbidden');
      return;
    }

    if (resolution.kind === 'redirect' && resolution.redirectLocation) {
      res.redirect(301, resolution.redirectLocation);
      return;
    }

    if (
      (resolution.kind === 'html' || resolution.kind === 'static') &&
      resolution.relativeFilePath
    ) {
      const safeFilePath = resolveContainedFilePath(
        webRoot,
        resolution.relativeFilePath
      );
      if (!safeFilePath || !fs.existsSync(safeFilePath)) {
        next();
        return;
      }

      if (resolution.kind === 'static') {
        if (resolution.relativeFilePath.includes('assets/')) {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=3600');
        }
      } else {
        res.setHeader('Cache-Control', 'no-cache');
      }

      res.sendFile(safeFilePath);
      return;
    }

    next();
  });

  // 5. Physical 404 Not Found Handler
  app.use((_req, res) => {
    const notFoundFile = resolveContainedFilePath(webRoot, '404.html');
    if (notFoundFile && fs.existsSync(notFoundFile)) {
      res.status(404).sendFile(notFoundFile);
      return;
    }
    res.status(404).type('text/plain').send('404 Not Found');
  });

  // 6. Secure Production Error Boundary (never leaks stack traces)
  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      if (
        err &&
        typeof err === 'object' &&
        'type' in err &&
        (err as { type?: string }).type === 'entity.parse.failed'
      ) {
        res.status(400).json({ ok: false, error: 'Malformed JSON payload.' });
        return;
      }
      console.error('[server-error]', err instanceof Error ? err.message : 'Unknown error');
      res.status(500).json({ ok: false, error: 'Internal server error.' });
    }
  );

  return app;
}

// Start HTTP listener when executed directly (tsx server.ts or node server.ts)
const isDirectEntry =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectEntry) {
  const app = createEcosystemApp(activeWebRoot);
  app.listen(port, '0.0.0.0', () => {
    console.log(
      `[ecosystem-server] Serving 37-page GTA Duct Masters & 15-brand ecosystem from ${activeWebRoot} on http://0.0.0.0:${port}`
    );
  });
}
