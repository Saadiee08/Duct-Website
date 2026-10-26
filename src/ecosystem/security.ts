import path from 'node:path';
import {
  ALLOWED_COMPANY_NAMES,
  ALLOWED_SERVICE_VALUES,
  VERIFIED_CONTACT,
  getAllPublicPageUrls,
} from './verifiedData.ts';

export interface SecurityHeadersOptions {
  readonly isProduction: boolean;
}

export interface RouteResolution {
  readonly kind: 'html' | 'redirect' | 'static' | 'forbidden' | 'not_found';
  readonly relativeFilePath?: string;
  readonly redirectLocation?: string;
}

export interface SanitizedQuoteSubmission {
  readonly company: string;
  readonly name: string;
  readonly phone: string;
  readonly service: string;
  readonly message: string;
  readonly mailtoHref: string;
  readonly whatsappHref: string;
}

export interface QuoteValidationResult {
  readonly ok: boolean;
  readonly status: number;
  readonly error?: string;
  readonly field?: string;
  readonly data?: SanitizedQuoteSubmission;
}

const PUBLIC_PAGE_SET: ReadonlySet<string> = new Set(getAllPublicPageUrls());

/**
 * Escapes HTML special characters to neutralize reflected/stored XSS vectors
 * whenever dynamic strings are interpolated into HTML attributes or text nodes.
 */
export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips ASCII control characters (including CR/LF header injection vectors)
 * and HTML angle brackets, collapsing repeated whitespace.
 */
export function sanitizePlainText(input: string, maxLength: number): string {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Generates OWASP-aligned HTTP security headers for every server response.
 * Note: frame-ancestors includes 'self' and Google AI Studio preview origins so
 * the preview iframe functions securely while blocking third-party clickjacking.
 */
export function buildSecurityHeaders(
  options: SecurityHeadersOptions
): Record<string, string> {
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' https://fonts.googleapis.com",
    "style-src-elem 'self' https://fonts.googleapis.com",
    "style-src-attr 'unsafe-inline'",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'self' https://*.google.com https://*.run.app",
  ];

  if (options.isProduction) {
    cspDirectives.push('upgrade-insecure-requests');
  }

  const headers: Record<string, string> = {
    'Content-Security-Policy': cspDirectives.join('; '),
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };

  if (options.isProduction) {
    headers['Strict-Transport-Security'] =
      'max-age=31536000; includeSubDomains';
  }

  return headers;
}

/**
 * Safely resolves incoming HTTP paths against the allowlisted 37 physical HTML
 * routes and static asset folders while blocking directory traversal, dotfiles,
 * open redirects, and unapproved subpages on linked companies.
 */
export function resolveCleanRoute(rawUrlPath: string): RouteResolution {
  if (!rawUrlPath || rawUrlPath.length > 512) {
    return { kind: 'forbidden' };
  }

  // Block null bytes, backslashes, or protocol-relative open redirect vectors ("//evil.com")
  if (
    rawUrlPath.includes('\0') ||
    rawUrlPath.includes('\\') ||
    rawUrlPath.startsWith('//')
  ) {
    return { kind: 'forbidden' };
  }

  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(rawUrlPath.split('?')[0] ?? '/');
  } catch {
    return { kind: 'forbidden' };
  }

  if (
    decodedPath.includes('\0') ||
    decodedPath.includes('\\') ||
    decodedPath.startsWith('//') ||
    decodedPath.includes('..')
  ) {
    return { kind: 'forbidden' };
  }

  // Block hidden dotfiles (.env, .git, etc.)
  const segments = decodedPath.split('/').filter(Boolean);
  for (const segment of segments) {
    if (segment.startsWith('.')) {
      return { kind: 'forbidden' };
    }
  }

  // Canonicalize explicit /index.html URLs to clean trailing-slash URLs
  if (decodedPath === '/index.html') {
    return { kind: 'redirect', redirectLocation: '/' };
  }
  if (decodedPath.endsWith('/index.html')) {
    const cleanDir = decodedPath.slice(0, -'index.html'.length);
    if (PUBLIC_PAGE_SET.has(cleanDir)) {
      return { kind: 'redirect', redirectLocation: cleanDir };
    }
    return { kind: 'not_found' };
  }

  // Exact match on allowlisted clean trailing-slash HTML route
  if (PUBLIC_PAGE_SET.has(decodedPath)) {
    const relativeFilePath =
      decodedPath === '/'
        ? 'index.html'
        : path.posix.join(decodedPath.slice(1), 'index.html');
    return { kind: 'html', relativeFilePath };
  }

  // Redirect missing trailing slash ONLY if "<path>/" is an allowlisted page
  if (!decodedPath.endsWith('/')) {
    const withSlash = `${decodedPath}/`;
    if (PUBLIC_PAGE_SET.has(withSlash)) {
      return { kind: 'redirect', redirectLocation: withSlash };
    }
  }

  // Allow safe static files: /sitemap.xml, /robots.txt, /assets/*, and /<slug>/assets/*
  if (decodedPath === '/sitemap.xml' || decodedPath === '/robots.txt') {
    return { kind: 'static', relativeFilePath: decodedPath.slice(1) };
  }

  if (
    decodedPath.startsWith('/assets/') ||
    /^\/[a-z0-9-]+\/assets\/[a-zA-Z0-9._/-]+$/.test(decodedPath)
  ) {
    const normalized = path.posix.normalize(decodedPath).slice(1);
    if (normalized.startsWith('..') || normalized.includes('/..')) {
      return { kind: 'forbidden' };
    }
    return { kind: 'static', relativeFilePath: normalized };
  }

  return { kind: 'not_found' };
}

/**
 * Verifies resolved filesystem path stays strictly within webRootDir.
 */
export function resolveContainedFilePath(
  webRootDir: string,
  relativeFilePath: string
): string | null {
  const rootResolved = path.resolve(webRootDir);
  const candidate = path.resolve(rootResolved, relativeFilePath);
  if (
    candidate === rootResolved ||
    !candidate.startsWith(rootResolved + path.sep)
  ) {
    return null;
  }
  return candidate;
}

/**
 * Validates and sanitizes quote inquiry payloads on the server.
 */
export function validateQuoteSubmission(
  payload: unknown,
  nowMs: number = Date.now()
): QuoteValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      ok: false,
      status: 400,
      error: 'Invalid request body format.',
    };
  }

  const record = payload as Record<string, unknown>;

  // Honeypot anti-bot trap: legitimate users leave hidden 'website' field empty
  if (typeof record.website === 'string' && record.website.trim().length > 0) {
    return {
      ok: false,
      status: 400,
      error: 'Automated submission rejected.',
    };
  }

  // Minimum human dwell check (if client provides renderedAt timestamp)
  if (typeof record.renderedAt === 'number' && Number.isFinite(record.renderedAt)) {
    const elapsedMs = nowMs - record.renderedAt;
    if (elapsedMs >= 0 && elapsedMs < 600) {
      return {
        ok: false,
        status: 429,
        error: 'Submission was too fast. Please review your details and retry.',
      };
    }
  }

  const rawCompany =
    typeof record.company === 'string' ? record.company.trim() : 'GTA Duct Masters';
  if (!ALLOWED_COMPANY_NAMES.has(rawCompany)) {
    return {
      ok: false,
      status: 400,
      field: 'company',
      error: 'Unrecognized company identifier.',
    };
  }

  const rawName = typeof record.name === 'string' ? record.name : '';
  const name = sanitizePlainText(rawName, 100);
  if (name.length < 2) {
    return {
      ok: false,
      status: 400,
      field: 'name',
      error: 'Please enter your full name (at least 2 characters).',
    };
  }

  const rawPhone = typeof record.phone === 'string' ? record.phone : '';
  const phone = sanitizePlainText(rawPhone, 25);
  const digitsOnly = phone.replace(/\D/g, '');
  if (
    digitsOnly.length < 7 ||
    digitsOnly.length > 15 ||
    !/^[0-9+().\-\s]+$/.test(phone)
  ) {
    return {
      ok: false,
      status: 400,
      field: 'phone',
      error: 'Please enter a valid phone number (7 to 15 digits).',
    };
  }

  const rawService = typeof record.service === 'string' ? record.service.trim() : '';
  if (!ALLOWED_SERVICE_VALUES.has(rawService)) {
    return {
      ok: false,
      status: 400,
      field: 'service',
      error: 'Please select a valid service option.',
    };
  }
  const service = rawService || 'General Service';

  const rawMessage = typeof record.message === 'string' ? record.message : '';
  const message =
    sanitizePlainText(rawMessage, 1000) ||
    `Please provide pricing for ${service}.`;

  const subject = `[${rawCompany}] Quote request from ${name}`;
  const bodyLines = [
    `Company Website: ${rawCompany}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Service: ${service}`,
    `Message: ${message}`,
    '',
    'Submitted via verified website inquiry form.',
  ];

  const mailtoHref = `mailto:${VERIFIED_CONTACT.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  const whatsappText = `Hi ${rawCompany}, my name is ${name} (${phone}). I would like a quote for ${service}. ${message}`;
  const whatsappHref = `https://wa.me/16475576364?text=${encodeURIComponent(
    whatsappText
  )}`;

  return {
    ok: true,
    status: 200,
    data: {
      company: rawCompany,
      name,
      phone,
      service,
      message,
      mailtoHref,
      whatsappHref,
    },
  };
}

/**
 * Sliding-window in-memory IP rate limiter for form submissions.
 */
export function createRateLimiter(options: {
  readonly windowMs: number;
  readonly maxRequests: number;
}) {
  const buckets = new Map<string, number[]>();

  return {
    check(key: string, nowMs: number = Date.now()): {
      allowed: boolean;
      retryAfterSeconds: number;
    } {
      const cutoff = nowMs - options.windowMs;
      const existing = buckets.get(key) ?? [];
      const active = existing.filter((ts) => ts > cutoff);

      if (active.length >= options.maxRequests) {
        const oldest = active[0] ?? nowMs;
        const retryAfterSeconds = Math.max(
          1,
          Math.ceil((oldest + options.windowMs - nowMs) / 1000)
        );
        buckets.set(key, active);
        return { allowed: false, retryAfterSeconds };
      }

      active.push(nowMs);
      buckets.set(key, active);

      // Periodic memory hygiene
      if (buckets.size > 2000) {
        for (const [k, timestamps] of buckets.entries()) {
          if (timestamps.every((t) => t <= cutoff)) {
            buckets.delete(k);
          }
        }
      }

      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
