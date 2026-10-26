# GTA Duct Masters & 15-Brand Ecosystem — Architecture, Security & Deployment Guide

## 1. System Overview & Physical File Architecture

This project implements a multi-company static HTML5 + hardened Node/Express ecosystem under a single primary domain (`https://gtaductmasters.ca`):

- **GTA Duct Masters (Parent Website — 7 Separate Physical HTML Documents)**:
  - `/` → `gtaductmasters/index.html` (Home, preserving legacy `#home`, `#services`, `#about`, `#why-us`, `#gallery`, `#reviews`, and `#contact` section anchors + the 15-company Affiliated Service Network Directory)
  - `/services/` → `gtaductmasters/services/index.html`
  - `/about/` → `gtaductmasters/about/index.html`
  - `/why-us/` → `gtaductmasters/why-us/index.html`
  - `/gallery/` → `gtaductmasters/gallery/index.html`
  - `/reviews/` → `gtaductmasters/reviews/index.html`
  - `/contact/` → `gtaductmasters/contact/index.html`
  - Custom error page → `gtaductmasters/404.html`
- **15 Linked Company Websites (30 Separate Physical HTML Documents — Strictly `Home` & `About Us`)**:
  1. **Fresh Air Pros** — `/fresh-air-pros/` & `/fresh-air-pros/about/`
  2. **True Ottawa Air CO.** — `/true-ottawa-air-co/` & `/true-ottawa-air-co/about/`
  3. **FreshFlow Canada** — `/freshflow-canada/` & `/freshflow-canada/about/`
  4. **Canada StormForce** — `/canada-stormforce/` & `/canada-stormforce/about/`
  5. **ClearFlow Duct Care** — `/clearflow-duct-care/` & `/clearflow-duct-care/about/`
  6. **FreshBreathe Air Duct Co.** — `/freshbreathe-air-duct-co/` & `/freshbreathe-air-duct-co/about/`
  7. **FalconFlow Air Care** — `/falconflow-air-care/` & `/falconflow-air-care/about/`
  8. **Alpine Home Care** — `/alpine-home-care/` & `/alpine-home-care/about/`
  9. **Pride Duct Cleaning** — `/pride-duct-cleaning/` & `/pride-duct-cleaning/about/`
  10. **PureBreeze Duct Care** — `/purebreeze-duct-care/` & `/purebreeze-duct-care/about/`
  11. **Ventrix DUCT CARE** — `/ventrix-duct-care/` & `/ventrix-duct-care/about/`
  12. **Northern Air Duct Cleaning** — `/northern-air-duct-cleaning/` & `/northern-air-duct-cleaning/about/`
  13. **Trustora Duct Cleaning** — `/trustora-duct-cleaning/` & `/trustora-duct-cleaning/about/`
  14. **Ductoryn Air Solutions** — `/ductoryn-air-solutions/` & `/ductoryn-air-solutions/about/`
  15. **eliteductcanada** — `/eliteductcanada/` & `/eliteductcanada/about/`
- **Independent Brand Stylesheets & Shared Modular Assets**:
  - Per-company CSS: `gtaductmasters/<slug>/assets/css/theme.css` (15 independent classical theme stylesheets)
  - Shared CSS utilities: `gtaductmasters/assets/css/{reset.css, core.css, parent.css, layouts.css}`
  - Shared JS modules: `gtaductmasters/assets/js/{navigation.js, motion.js, forms.js, gallery-reviews.js}` + local vendor `gsap.min.js` & `ScrollTrigger.min.js`
  - SEO & Portable Hosting Configs: `sitemap.xml` (all 37 clean URLs), `robots.txt`, `_headers`, `_redirects`

---

## 2. Installation, Build & Verification Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate all 37 physical HTML documents + assets into gtaductmasters/ and dist/
npm run build

# 3. Run unit, routing, SEO, and security validation tests
npm test

# 4. Run TypeScript static type check
npm run lint

# 5. Start hardened Express server (Port 3000 by default)
npm start
```

---

## 3. Hosting & Deployment Instructions (Do Not Deploy Without Explicit Owner Approval)

### Option A: Full-Stack Node.js / Cloud Run / VPS Deployment (Recommended)
1. Provision TLS/HTTPS termination on `gtaductmasters.ca` (automatic on Cloud Run or via Nginx/Caddy Let's Encrypt).
2. Set `NODE_ENV=production` and `PORT=3000` (no hardcoded credentials required).
3. Run `npm run build` followed by `npm start` (`node server.ts`).
4. Express serves all 37 clean trailing-slash URLs directly from `dist/`, enforces HTTP security headers (including HSTS in production), and activates server-side `/api/quote` validation and rate limiting.

### Option B: Static CDN Hosting (e.g., Current Netlify Account on `gtaductmasters.ca`)
1. Run `npm run build`.
2. Publish the generated `dist/` (or `gtaductmasters/`) directory to Netlify **only after owner sign-off**.
3. The included `_headers` and `_redirects` files automatically configure clean URLs (301-redirecting `/index.html` to `/`), serve `404.html` on unknown routes, and attach `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and `Strict-Transport-Security`. Quote forms gracefully hand off validated requests to pre-encoded `mailto:` and WhatsApp channels when `/api/quote` is absent on pure static hosts.

---

## 4. Cybersecurity Controls & Verification Disclosure

### Implemented Controls
- **Strict Content Security Policy (`script-src 'self'`)**: Zero inline executable scripts and zero third-party JS CDNs; GSAP & ScrollTrigger are served locally from `/assets/js/vendor/`.
- **Transport & Framing Headers**: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (disabling camera, microphone, geolocation, payment, USB), `Cross-Origin-Resource-Policy: same-origin`, `frame-ancestors` restriction, and `Strict-Transport-Security` in production.
- **Route Canonicalization, Traversal & Open-Redirect Defense**: `resolveCleanRoute` + `resolveContainedFilePath` block `..`, `%2e%2e`, null bytes, backslashes, dotfiles (`.env`, `.git`), protocol-relative open redirects (`//evil.com`), and any unapproved subpages on the 15 linked companies.
- **Quote Endpoint Hardening (`POST /api/quote`)**:
  - `16kb` JSON payload cap.
  - Anti-CSRF custom header (`X-Requested-With: QuoteInquiryClient`) / same-origin verification.
  - Sliding-window IP rate limiting (`8` requests / `60s` per IP with `Retry-After`).
  - Honeypot field (`website`) + minimum human dwell timing check (`>= 600ms`).
  - Strict allowlist check on `company` and `service`, phone pattern validation, and stripping of HTML angle brackets (`<`, `>`) and ASCII control characters (`\r`, `\n`) to prevent XSS and email header injection.
  - Privacy-preserving operational logs (customer phone numbers and message bodies are never written to server stdout).

### Disclosed Limitations & Remaining Operational Considerations
- **Shared-Origin Cookie/Storage Scope**: Because all 16 brands operate under directory paths on `gtaductmasters.ca` rather than separate domains, browser Same-Origin Policy treats them as a single web origin. No sensitive session cookies or `localStorage` tokens are used, avoiding cross-directory session bleed; if authenticated portals are ever added in the future, path-scoped/separate-subdomain isolation would be required.
- **In-Memory Rate Limiter**: The sliding-window rate limiter stores IP counters in process memory. In multi-instance horizontal scaling, pair with an edge WAF (e.g., Cloudflare / Google Cloud Armor) or Redis store.
- **Email Delivery Channel**: Per project scope (no unapproved databases or third-party SMTP secrets), `/api/quote` validates and sanitizes inquiries server-side and returns pre-encoded `mailto:` and WhatsApp dispatch actions rather than persisting PII in a database.
- **External Penetration & Live TLS Audit**: Automated unit tests, static TypeScript checks, dependency checks, and local HTTP header/input security tests are executed in this environment; live DNS/TLS certificate grading (e.g., SSL Labs) can only be run after approved deployment to `gtaductmasters.ca`.

---

## 5. Maintenance & Content Updates

- **Updating Contact Details or Services**: Edit `src/ecosystem/verifiedData.ts` and run `npm run build && npm test` to regenerate all 37 HTML files and `sitemap.xml` consistently.
- **Adjusting a Linked Brand's Theme**: Edit that brand's entry in `src/ecosystem/themes.ts` and run `npm run build` to update `/<slug>/assets/css/theme.css` and its two physical HTML files.
- **Backups & Rollback**: All generated pages and assets are deterministic text/image files tracked in version control; any release can be rolled back instantaneously via Git commit revert or redeploying the prior `dist/` artifact.
