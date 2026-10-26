import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { buildEcosystemToDirectory } from './buildEcosystem';
import {
  buildSecurityHeaders,
  createRateLimiter,
  resolveCleanRoute,
  resolveContainedFilePath,
  validateQuoteSubmission,
} from './security';
import { COMPANY_THEMES } from './themes';
import {
  LINKED_COMPANIES,
  PARENT_PAGES,
  getAllPublicPageUrls,
} from './verifiedData';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..', '..');

test('exact 15 linked companies match the reference image verbatim', () => {
  const expectedNames = [
    'Fresh Air Pros',
    'True Ottawa Air CO.',
    'FreshFlow Canada',
    'Canada StormForce',
    'ClearFlow Duct Care',
    'FreshBreathe Air Duct Co.',
    'FalconFlow Air Care',
    'Alpine Home Care',
    'Pride Duct Cleaning',
    'PureBreeze Duct Care',
    'Ventrix DUCT CARE',
    'Northern Air Duct Cleaning',
    'Trustora Duct Cleaning',
    'Ductoryn Air Solutions',
    'eliteductcanada',
  ];

  assert.equal(LINKED_COMPANIES.length, 15);
  assert.deepEqual(
    LINKED_COMPANIES.map((c) => c.exactName),
    expectedNames
  );
  assert.equal(COMPANY_THEMES.length, 15);
});

test('ecosystem URL inventory contains 7 parent pages + 30 linked pages = 37 clean URLs', () => {
  assert.equal(PARENT_PAGES.length, 7);
  const allUrls = getAllPublicPageUrls();
  assert.equal(allUrls.length, 37);
  assert.equal(new Set(allUrls).size, 37);

  for (const url of allUrls) {
    assert.ok(url.startsWith('/'), `URL ${url} must start with /`);
    assert.ok(url.endsWith('/'), `URL ${url} must end with /`);
    assert.ok(!url.includes('index.html'), `Clean URL ${url} must not expose index.html`);
  }
});

test('clean route resolver enforces strict 2-page rule, redirects, and blocks traversal/open-redirect', () => {
  // Valid root and parent subpages
  assert.deepEqual(resolveCleanRoute('/'), {
    kind: 'html',
    relativeFilePath: 'index.html',
  });
  assert.deepEqual(resolveCleanRoute('/services/'), {
    kind: 'html',
    relativeFilePath: 'services/index.html',
  });
  assert.deepEqual(resolveCleanRoute('/services'), {
    kind: 'redirect',
    redirectLocation: '/services/',
  });

  // Explicit index.html redirects to clean directory URL
  assert.deepEqual(resolveCleanRoute('/index.html'), {
    kind: 'redirect',
    redirectLocation: '/',
  });
  assert.deepEqual(resolveCleanRoute('/fresh-air-pros/index.html'), {
    kind: 'redirect',
    redirectLocation: '/fresh-air-pros/',
  });
  assert.deepEqual(resolveCleanRoute('/fresh-air-pros/about/index.html'), {
    kind: 'redirect',
    redirectLocation: '/fresh-air-pros/about/',
  });

  // Linked companies strictly resolve Home and About Us ONLY
  for (const company of LINKED_COMPANIES) {
    const homeRes = resolveCleanRoute(company.homeUrl);
    assert.equal(homeRes.kind, 'html');
    const aboutRes = resolveCleanRoute(company.aboutUrl);
    assert.equal(aboutRes.kind, 'html');

    // Unapproved extra pages MUST return not_found
    for (const forbiddenSub of ['services', 'contact', 'gallery', 'pricing', 'reviews', 'blog', 'faq']) {
      assert.equal(
        resolveCleanRoute(`/${company.slug}/${forbiddenSub}/`).kind,
        'not_found'
      );
      assert.equal(
        resolveCleanRoute(`/${company.slug}/${forbiddenSub}`).kind,
        'not_found'
      );
    }
  }

  // Traversal, dotfile, and open-redirect vectors MUST be forbidden
  assert.equal(resolveCleanRoute('//evil.example.com/').kind, 'forbidden');
  assert.equal(resolveCleanRoute('/\\evil.example.com').kind, 'forbidden');
  assert.equal(resolveCleanRoute('/../package.json').kind, 'forbidden');
  assert.equal(resolveCleanRoute('/assets/../../.env').kind, 'forbidden');
  assert.equal(resolveCleanRoute('/%2e%2e/server.ts').kind, 'forbidden');
  assert.equal(resolveCleanRoute('/.env').kind, 'forbidden');
  assert.equal(resolveCleanRoute('/.git/config').kind, 'forbidden');

  // Contained path check
  assert.equal(resolveContainedFilePath('/tmp/site', '../etc/passwd'), null);
  assert.ok(
    resolveContainedFilePath('/tmp/site', 'fresh-air-pros/index.html')?.endsWith(
      '/tmp/site/fresh-air-pros/index.html'
    )
  );
});

test('quote submission validator sanitizes XSS/CRLF, enforces allowlists, honeypot, and rate limiter', () => {
  const now = 1_700_000_000_000;

  // Valid submission with HTML angle brackets stripped safely
  const valid = validateQuoteSubmission(
    {
      company: 'True Ottawa Air CO.',
      name: '  Jane <script>alert(1)</script> Doe \r\n ',
      phone: '(647) 557-6364',
      service: 'Air Duct Cleaning',
      message: 'Residential townhouse\r\nBCC: attacker@evil.com',
      website: '',
      renderedAt: now - 4000,
    },
    now
  );
  assert.equal(valid.ok, true);
  assert.ok(valid.data);
  assert.ok(!valid.data.name.includes('<'));
  assert.ok(!valid.data.name.includes('\r'));
  assert.ok(!valid.data.message.includes('\n'));

  // Rejects honeypot bot fill
  const botTrap = validateQuoteSubmission(
    {
      company: 'Fresh Air Pros',
      name: 'Spam Bot',
      phone: '647-557-6364',
      website: 'https://spambot.example',
    },
    now
  );
  assert.equal(botTrap.ok, false);

  // Rejects sub-600ms automated burst
  const tooFast = validateQuoteSubmission(
    {
      company: 'Fresh Air Pros',
      name: 'Fast Bot',
      phone: '647-557-6364',
      renderedAt: now - 100,
    },
    now
  );
  assert.equal(tooFast.ok, false);
  assert.equal(tooFast.status, 429);

  // Rejects unknown company or malformed phone
  assert.equal(
    validateQuoteSubmission(
      { company: 'Invented Fake Co', name: 'Alex', phone: '647-557-6364' },
      now
    ).ok,
    false
  );
  assert.equal(
    validateQuoteSubmission(
      { company: 'Fresh Air Pros', name: 'Alex', phone: '123' },
      now
    ).ok,
    false
  );

  // Sliding-window rate limiter blocks after maxRequests
  const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 3 });
  assert.equal(limiter.check('203.0.113.10', now).allowed, true);
  assert.equal(limiter.check('203.0.113.10', now + 100).allowed, true);
  assert.equal(limiter.check('203.0.113.10', now + 200).allowed, true);
  const blocked = limiter.check('203.0.113.10', now + 300);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds >= 59);

  // Security headers check
  const prodHeaders = buildSecurityHeaders({ isProduction: true });
  assert.ok(prodHeaders['Content-Security-Policy']?.includes("script-src 'self'"));
  assert.equal(prodHeaders['X-Content-Type-Options'], 'nosniff');
  assert.ok(prodHeaders['Strict-Transport-Security']);
});

test('physical HTML builder writes 37 unique HTML documents, 15 theme CSS files, and valid sitemap', () => {
  const tempOut = fs.mkdtempSync(path.join(os.tmpdir(), 'gta-ecosystem-test-'));
  try {
    const summary = buildEcosystemToDirectory(workspaceRoot, tempOut);
    assert.equal(summary.parentHtmlCount, 7);
    assert.equal(summary.linkedCompanyCount, 15);
    assert.equal(summary.linkedHtmlCount, 30);
    assert.equal(summary.totalPublicHtmlCount, 37);

    const titles = new Set<string>();
    const canonicals = new Set<string>();

    // Check all 7 parent HTML documents exist and contain zero inline style attributes
    for (const parentPage of PARENT_PAGES) {
      const filePath =
        parentPage.slug === ''
          ? path.join(tempOut, 'index.html')
          : path.join(tempOut, parentPage.slug, 'index.html');
      assert.ok(fs.existsSync(filePath), `Missing parent HTML file: ${filePath}`);
      const html = fs.readFileSync(filePath, 'utf8');
      assert.ok(
        !html.includes('style="'),
        `Inline style attribute found in parent HTML: ${filePath}`
      );
      const titleMatch = html.match(/<title>([^<]+)<\/title>/);
      const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
      assert.ok(titleMatch && titleMatch[1]);
      assert.ok(
        canonMatch && canonMatch[1]?.startsWith('https://gtaductmasters.ca/')
      );
      titles.add(titleMatch[1]);
      canonicals.add(canonMatch[1]!);
    }

    const notFoundHtml = fs.readFileSync(path.join(tempOut, '404.html'), 'utf8');
    assert.ok(!notFoundHtml.includes('style="'), 'Inline style found in 404.html');

    // Check all 30 linked-company HTML documents + 15 theme stylesheets exist
    const themeCssContents = new Set<string>();
    for (const company of LINKED_COMPANIES) {
      const homeFile = path.join(tempOut, company.slug, 'index.html');
      const aboutFile = path.join(tempOut, company.slug, 'about', 'index.html');
      const themeCssFile = path.join(
        tempOut,
        company.slug,
        'assets',
        'css',
        'theme.css'
      );

      assert.ok(fs.existsSync(homeFile), `Missing Home HTML for ${company.slug}`);
      assert.ok(fs.existsSync(aboutFile), `Missing About HTML for ${company.slug}`);
      assert.ok(fs.existsSync(themeCssFile), `Missing theme.css for ${company.slug}`);

      themeCssContents.add(fs.readFileSync(themeCssFile, 'utf8'));

      for (const file of [homeFile, aboutFile]) {
        const html = fs.readFileSync(file, 'utf8');
        assert.ok(
          !html.includes('style="'),
          `Inline style attribute found in linked HTML: ${file}`
        );
        assert.ok(html.includes(company.exactName));
        assert.ok(html.includes(`/${company.slug}/assets/css/theme.css`));

        // Primary nav must strictly contain only Home and About Us links
        const navMatch = html.match(
          /<nav class="brand-nav" aria-label="Primary navigation">([\s\S]*?)<\/nav>/
        );
        assert.ok(navMatch && navMatch[1]);
        const navLinks = [...navMatch[1].matchAll(/<a [^>]*>([^<]+)<\/a>/g)].map(
          (m) => m[1]
        );
        assert.deepEqual(navLinks, ['Home', 'About Us']);

        const titleMatch = html.match(/<title>([^<]+)<\/title>/);
        const canonMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
        assert.ok(titleMatch && titleMatch[1]);
        assert.ok(canonMatch && canonMatch[1]);
        titles.add(titleMatch[1]);
        canonicals.add(canonMatch[1]);
      }
    }

    assert.equal(titles.size, 37, 'Every HTML page must have a unique <title>');
    assert.equal(canonicals.size, 37, 'Every HTML page must have a unique canonical URL');
    assert.equal(themeCssContents.size, 15, 'All 15 brand stylesheets must be distinct');

    const sitemap = fs.readFileSync(path.join(tempOut, 'sitemap.xml'), 'utf8');
    const locCount = [...sitemap.matchAll(/<loc>/g)].length;
    assert.equal(locCount, 37);
  } finally {
    fs.rmSync(tempOut, { recursive: true, force: true });
  }
});
