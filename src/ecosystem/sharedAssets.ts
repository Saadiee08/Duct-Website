/**
 * Modular CSS and JavaScript assets shared across the physical HTML ecosystem.
 * Kept modular (separate reset, core utilities, parent styles, multi-archetype
 * layout styles, navigation JS, motion JS, forms JS, and gallery/reviews JS)
 * rather than dumping everything into one giant CSS or JS file.
 */

export const RESET_CSS = `/* Modular Semantic Reset & Base Accessibility Layer */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

main {
  flex: 1 0 auto;
}

img, svg, picture {
  display: block;
  max-width: 100%;
}

img {
  height: auto;
}

h1, h2, h3, h4, p, figure, blockquote, dl, dd, ul, ol {
  margin: 0;
}

ul[role="list"], ol[role="list"] {
  list-style: none;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button, input, select, textarea {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0.75rem;
  z-index: 9999;
  padding: 0.65rem 1.1rem;
  background: #0b192c;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.875rem;
  border-radius: 4px;
}

.skip-link:focus {
  left: 0.75rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;

export const CORE_CSS = `/* Core Spatial Math, Typography Scale, Resilient Media & Shared Form Controls */
:root {
  --container-max: 1200px;
  --container-wide: 1320px;
  --ease-settle: cubic-bezier(0.16, 1, 0.3, 1);
}

.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 4vw, 2.5rem);
}

.container-wide {
  width: 100%;
  max-width: var(--container-wide);
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 4vw, 2.5rem);
}

.section-pad {
  padding-block: clamp(3.75rem, 7vw, 6.25rem);
}

.section-pad-sm {
  padding-block: clamp(2.5rem, 4.5vw, 4rem);
}

.tabular-nums {
  font-variant-numeric: tabular-nums;
}

.balance-text {
  text-wrap: balance;
}

.prose-measure {
  max-width: 68ch;
  line-height: 1.72;
}

/* Resilient Media Frame (Zero-Broken-Image Policy) */
.media-fallback-frame {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1b2838 0%, #2c3e50 55%, #1a2530 100%);
}

.media-fallback-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s var(--ease-settle);
}

.media-fallback-frame:hover img {
  transform: scale(1.025);
}

/* Unboxed Metadata Separators (Zero-Pill Discipline) */
.meta-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.8125rem;
  letter-spacing: 0.03em;
}

.meta-sep {
  opacity: 0.45;
  user-select: none;
}

/* Clean Single-Line Interactive Buttons */
.btn-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 44px;
  padding: 0.7rem 1.45rem;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid transparent;
  transition: transform 0.16s var(--ease-settle), background-color 0.16s var(--ease-settle), color 0.16s var(--ease-settle), border-color 0.16s var(--ease-settle), opacity 0.16s var(--ease-settle);
}

.btn-action:active {
  transform: translateY(1px);
}

/* Shared Accessible Quote Form Styling */
.inquiry-form-card {
  padding: clamp(1.5rem, 3.5vw, 2.5rem);
  border: 1px solid var(--brand-border, #d8dee6);
  background: var(--brand-surface, #ffffff);
  border-radius: var(--radius-md, 6px);
}

.form-grid {
  display: grid;
  gap: 1.15rem;
}

@media (min-width: 640px) {
  .form-grid-two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-field label {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--brand-ink, #0f172a);
}

.form-field input,
.form-field select,
.form-field textarea {
  min-height: 44px;
  padding: 0.65rem 0.9rem;
  background: var(--brand-canvas, #ffffff);
  color: var(--brand-ink, #0f172a);
  border: 1px solid var(--brand-border, #cbd5e1);
  border-radius: var(--radius-sm, 4px);
  font-size: 0.9375rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-field textarea {
  min-height: 108px;
  resize: vertical;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--brand-primary, #0f223d);
  box-shadow: 0 0 0 3px rgba(15, 34, 61, 0.12);
}

.form-field input[aria-invalid="true"],
.form-field select[aria-invalid="true"],
.form-field textarea[aria-invalid="true"] {
  border-color: #b91c1c;
}

.form-error-msg {
  font-size: 0.8125rem;
  color: #b91c1c;
  font-weight: 500;
  min-height: 1.1rem;
}

.form-error-msg[hidden] {
  display: none;
}

.hp-trap {
  position: absolute !important;
  left: -10000px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
}

.form-confirmation {
  padding: 1.75rem;
  border: 1px solid var(--brand-border, #cbd5e1);
  background: var(--brand-surface-alt, #f8fafc);
  border-radius: var(--radius-md, 6px);
}

.form-confirmation[hidden] {
  display: none;
}

.form-confirmation h3 {
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.form-confirmation p {
  color: var(--brand-ink-muted, #475569);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.form-confirmation-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* Form & Layout Semantic Helpers (Zero Inline Styles) */
.form-card-heading {
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.65rem;
  font-weight: 600;
  margin-bottom: 0.45rem;
}

.form-card-sub {
  font-size: 0.9rem;
  color: var(--brand-ink-muted, #475569);
  margin-bottom: 1.35rem;
}

.form-grid-spaced {
  margin-top: 1.1rem;
}

.form-error-spaced {
  margin-top: 0.85rem;
}

.form-submit-row {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
}

.form-privacy-note {
  font-size: 0.78rem;
  color: var(--brand-ink-muted, #475569);
}

.btn-brand-solid {
  background: var(--brand-primary, #0b192c);
  color: var(--brand-primary-fg, #ffffff);
  border-color: var(--brand-primary, #0b192c);
  border-radius: var(--radius-sm, 4px);
}

.btn-brand-solid:hover {
  opacity: 0.92;
}

.btn-subtle-reset {
  border-color: var(--brand-border, #cbd5e1);
  background: transparent;
  color: var(--brand-ink, #0f172a);
  border-radius: var(--radius-sm, 4px);
}

.w-full {
  width: 100%;
}

.flex-wrap-between {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.flex-wrap-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.flex-center-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
}

.surface-band {
  background: var(--brand-surface);
  border-block: 1px solid var(--brand-border);
}

.surface-alt-top {
  background: var(--brand-surface-alt);
  border-top: 1px solid var(--brand-border);
}

.surface-top {
  background: var(--brand-surface);
  border-top: 1px solid var(--brand-border);
}

.kicker-accent {
  font-size: 0.8rem;
  color: var(--brand-accent);
  font-weight: 600;
  margin-bottom: 0.45rem;
}

.muted-note-sm {
  font-size: 0.85rem;
  color: var(--brand-ink-muted);
}

.muted-note-xs {
  font-size: 0.76rem;
  color: var(--brand-ink-muted);
}

.mt-sm { margin-top: 0.5rem; }
.mt-md { margin-top: 1rem; }
.mb-sm { margin-bottom: 0.65rem; }
.mb-md { margin-bottom: 1rem; }
.mb-lg { margin-bottom: 1.5rem; }
.mb-xl { margin-bottom: 2rem; }
.mb-0 { margin-bottom: 0; }
.py-0 { padding-block: 0; }
.font-semibold { font-weight: 600; }

.prose-ink {
  color: var(--brand-ink);
}

.prose-muted {
  color: var(--brand-ink-muted);
}

.meta-line-muted-bold {
  color: var(--brand-ink-muted);
  font-weight: 600;
}

/* Shared Responsive Header CTA & Mobile Navigation Drawer */
.btn-action.header-cta-desktop {
  display: none;
}

@media (min-width: 640px) {
  .btn-action.header-cta-desktop {
    display: inline-flex;
  }
}

.mobile-drawer {
  border-top: 1px solid var(--brand-border, #dce1e7);
  background: var(--brand-surface, #ffffff);
  color: var(--brand-ink, #0f172a);
  padding: 1rem 1.25rem 1.5rem;
}

.mobile-drawer[hidden] {
  display: none;
}

.mobile-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.mobile-drawer-links a {
  padding: 0.65rem 0.5rem;
  font-weight: 500;
  color: var(--brand-ink, #0f172a);
  border-bottom: 1px solid var(--brand-border, #eef1f4);
}

.text-arrow-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--brand-ink);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: color 0.16s ease;
}

.text-arrow-link:hover {
  color: var(--brand-accent);
}

/* Shared Contact Split & Direct Channel Cards */
.contact-split {
  display: grid;
  gap: 2.5rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .contact-split {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3.5rem;
  }
}

.contact-channel-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-channel-item {
  padding: 1.15rem 1.25rem;
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-sm, 4px);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: border-color 0.16s ease;
}

.contact-channel-item:hover {
  border-color: var(--brand-accent);
}

.contact-channel-item strong {
  font-size: 0.82rem;
  color: var(--brand-ink-muted);
}

.contact-channel-item span {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--brand-ink);
}

/* Page Transition Curtain (Progressive Enhancement) */
.page-transition-curtain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: var(--brand-canvas, #faf8f3);
  opacity: 0;
  z-index: 9000;
  transition: opacity 0.16s ease;
}

body.is-leaving .page-transition-curtain {
  opacity: 0.92;
}
`;

export const PARENT_CSS = `/* GTA Duct Masters Parent Website — Classical Executive Modern Stylesheet */
:root {
  --brand-canvas: #f8f7f4;
  --brand-surface: #ffffff;
  --brand-surface-alt: #efece4;
  --brand-ink: #0b192c;
  --brand-ink-muted: #475569;
  --brand-primary: #0b192c;
  --brand-primary-fg: #f8f7f4;
  --brand-accent: #0284c7;
  --brand-brass: #9a7432;
  --brand-border: #dce1e7;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --radius-sm: 4px;
  --radius-md: 8px;
}

body.parent-body {
  background-color: var(--brand-canvas);
  color: var(--brand-ink);
  font-family: var(--font-body);
}

/* Sticky Parent Header (< 15% mobile viewport cap) */
.parent-header {
  position: sticky;
  top: 0;
  z-index: 500;
  background: rgba(248, 247, 244, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--brand-border);
}

.parent-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 68px;
}

@media (min-width: 768px) {
  .parent-header-inner {
    gap: 1.5rem;
  }
}

.parent-brand-link {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  min-width: 0;
}

.parent-brand-logo {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid var(--brand-border);
  flex-shrink: 0;
}

.parent-brand-name {
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 3.8vw, 1.4rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--brand-ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.parent-brand-name--light {
  color: #ffffff;
}

.parent-nav {
  display: none;
  align-items: center;
  gap: 1.35rem;
}

@media (min-width: 1024px) {
  .parent-nav {
    display: flex;
  }
}

.parent-nav a {
  position: relative;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--brand-ink-muted);
  white-space: nowrap;
  padding-block: 0.35rem;
  transition: color 0.16s ease;
}

.parent-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.5px;
  background: var(--brand-ink);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.18s var(--ease-settle);
}

.parent-nav a:hover,
.parent-nav a[aria-current="page"] {
  color: var(--brand-ink);
}

.parent-nav a:hover::after,
.parent-nav a[aria-current="page"]::after {
  transform: scaleX(1);
}

.parent-header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.header-cta-desktop {
  display: none;
}

@media (min-width: 640px) {
  .header-cta-desktop {
    display: inline-flex;
  }
}

.btn-parent-primary {
  background: var(--brand-primary);
  color: var(--brand-primary-fg);
  border-radius: var(--radius-sm);
}

.btn-parent-primary:hover {
  background: #162c4b;
}

.btn-parent-outline {
  background: transparent;
  color: var(--brand-ink);
  border-color: var(--brand-ink);
  border-radius: var(--radius-sm);
}

.btn-parent-outline:hover {
  background: var(--brand-ink);
  color: var(--brand-primary-fg);
}

.btn-parent-light {
  background: #ffffff;
  color: #0b192c;
  border-radius: var(--radius-sm);
}

.btn-parent-light:hover {
  background: #efece4;
}

.btn-hero-ghost-white {
  background: transparent;
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-sm);
}

.btn-hero-ghost-white:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

.btn-whatsapp-clean {
  background: #14532d;
  color: #ffffff;
  border-radius: var(--radius-sm);
}

.btn-whatsapp-clean:hover {
  background: #166534;
}

.nav-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-sm);
}

@media (min-width: 1024px) {
  .nav-toggle-btn {
    display: none;
  }
}

.mobile-drawer {
  border-top: 1px solid var(--brand-border);
  background: var(--brand-surface);
  padding: 1rem 1.25rem 1.5rem;
}

.mobile-drawer[hidden] {
  display: none;
}

.mobile-drawer-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.mobile-drawer-links a {
  padding: 0.65rem 0.5rem;
  font-weight: 500;
  border-bottom: 1px solid #eef1f4;
}

/* Parent Hero */
.parent-hero {
  background: #0b192c;
  color: #f8f7f4;
  padding-block: clamp(3rem, 6vw, 5rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.parent-hero-grid {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .parent-hero-grid {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 3.5rem;
  }
}

.parent-hero-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.parent-kicker {
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: #cbd5e1;
  margin-bottom: 0.9rem;
}

.parent-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4.4vw, 3.85rem);
  font-weight: 600;
  line-height: 1.08;
  margin-bottom: 1.25rem;
}

.parent-hero-lead {
  font-size: 1.0625rem;
  line-height: 1.68;
  color: #cbd5e1;
  max-width: 60ch;
  margin-bottom: 1.5rem;
}

.parent-hero-highlights {
  color: #e2e8f0;
  margin-bottom: 1.85rem;
}

.parent-hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.parent-hero-media {
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.16);
  aspect-ratio: 4 / 3;
  max-height: 460px;
}

.parent-hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.parent-cta-banner {
  background: #0b192c;
  color: #f8f7f4;
}

.parent-cta-banner-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem;
}

.parent-cta-banner h2 {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 3vw, 2.5rem);
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.parent-cta-banner p {
  color: #cbd5e1;
}

.dialog-close-compact {
  min-height: 36px;
  padding: 0.35rem 0.9rem;
}

.gallery-dialog-caption {
  font-size: 0.9rem;
  color: #cbd5e1;
}

.not-found-box {
  max-width: 680px;
  text-align: center;
}

.meta-line-brass {
  color: var(--brand-brass);
  font-weight: 600;
}

.parent-service-desc {
  color: var(--brand-ink-muted);
  font-size: 0.95rem;
  line-height: 1.65;
}

.pillar-item-desc {
  font-size: 0.9rem;
  color: var(--brand-ink-muted);
}

.review-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-author-name {
  display: block;
  font-size: 0.92rem;
}

.network-directory-cta {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--brand-accent);
  white-space: nowrap;
}

.parent-footer-tagline {
  font-size: 0.92rem;
  color: #cbd5e1;
  margin-bottom: 0.65rem;
}

.parent-footer-desc {
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.65;
}

/* Full-Width KPI Strip Below Hero Split */
.parent-kpi-strip {
  background: var(--brand-surface);
  border-bottom: 1px solid var(--brand-border);
  padding-block: 1.85rem;
}

.parent-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .parent-kpi-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.parent-kpi-item {
  padding-right: 1rem;
}

.parent-kpi-value {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.2vw, 2.75rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--brand-ink);
}

.parent-kpi-label {
  font-size: 0.84rem;
  color: var(--brand-ink-muted);
  margin-top: 0.25rem;
}

/* Parent Page Subheader */
.parent-page-banner {
  background: #0b192c;
  color: #f8f7f4;
  padding-block: clamp(2.75rem, 5vw, 4.25rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.parent-page-banner h1 {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.35rem);
  font-weight: 600;
  line-height: 1.12;
  margin-top: 0.5rem;
  margin-bottom: 0.85rem;
}

.parent-page-banner p {
  color: #cbd5e1;
  max-width: 65ch;
  line-height: 1.65;
}

/* Section Headers */
.section-head {
  margin-bottom: clamp(2rem, 4vw, 3rem);
}

.section-kicker {
  font-size: 0.8125rem;
  color: var(--brand-brass);
  font-weight: 600;
  margin-bottom: 0.45rem;
}

.section-heading {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 3.2vw, 2.75rem);
  font-weight: 600;
  line-height: 1.16;
  color: var(--brand-ink);
}

.section-desc {
  margin-top: 0.75rem;
  color: var(--brand-ink-muted);
  max-width: 65ch;
  line-height: 1.65;
}

/* Parent Services Cards */
.parent-services-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .parent-services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.parent-service-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.parent-service-card-media {
  aspect-ratio: 16 / 9;
}

.parent-service-card-body {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  flex: 1;
}

.parent-service-card-title {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
}

.parent-service-list {
  padding-left: 1.1rem;
  color: var(--brand-ink-muted);
  font-size: 0.92rem;
  display: grid;
  gap: 0.35rem;
}

.parent-service-footer {
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #eef1f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-arrow-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--brand-ink);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.text-arrow-link:hover {
  color: var(--brand-accent);
}

/* Parent About Split */
.parent-about-split {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .parent-about-split {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 3.5rem;
  }
}

.parent-about-photo {
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
  aspect-ratio: 4 / 3;
}

.parent-pillar-list {
  display: grid;
  gap: 1.1rem;
  margin-block: 1.5rem;
  padding-block: 1.25rem;
  border-block: 1px solid var(--brand-border);
}

/* Parent Advantages Grid */
.parent-why-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .parent-why-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .parent-why-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.parent-why-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
  padding: 1.75rem;
}

.parent-why-num {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--brand-brass);
  display: block;
  margin-bottom: 0.5rem;
}

.parent-why-card h3 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}

.parent-why-card p {
  color: var(--brand-ink-muted);
  font-size: 0.9375rem;
  line-height: 1.65;
}

/* Before / After Gallery */
.ba-grid {
  display: grid;
  gap: 1.75rem;
}

@media (min-width: 1024px) {
  .ba-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.ba-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.ba-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px;
  background: var(--brand-border);
}

.ba-frame {
  position: relative;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  width: 100%;
  background: #1e293b;
}

.ba-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ba-caption-tag {
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(11, 25, 44, 0.84);
  color: #ffffff;
  border-radius: 3px;
}

.ba-card-footer {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.ba-card-footer h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
}

/* Accessible Dialog Lightbox */
.gallery-dialog {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-md);
  background: #0b192c;
  color: #ffffff;
  padding: 1rem;
  max-width: min(92vw, 920px);
  width: 100%;
}

.gallery-dialog::backdrop {
  background: rgba(6, 12, 22, 0.82);
}

.gallery-dialog-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.gallery-dialog img {
  width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 4px;
}

/* Reviews Filter & Grid */
.segmented-bar {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  padding: 0.3rem;
  background: var(--brand-surface-alt);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-sm);
  margin-bottom: 1.75rem;
}

.segmented-btn {
  padding: 0.45rem 0.9rem;
  font-size: 0.8125rem;
  font-weight: 600;
  border: 0;
  border-radius: 3px;
  background: transparent;
  color: var(--brand-ink-muted);
  white-space: nowrap;
}

.segmented-btn[aria-pressed="true"] {
  background: var(--brand-surface);
  color: var(--brand-ink);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.reviews-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .reviews-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .reviews-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.review-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
  padding: 1.65rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-card[hidden] {
  display: none;
}

.review-stars {
  color: #b45309;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
}

.review-quote {
  font-size: 0.95rem;
  line-height: 1.68;
  color: var(--brand-ink);
  flex: 1;
}

.review-author-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.85rem;
  border-top: 1px solid #eef1f5;
}

.review-initials {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: var(--brand-ink);
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

/* Affiliated Service Network Directory (15 Linked Companies) */
.network-directory-grid {
  display: grid;
  gap: 1px;
  background: var(--brand-border);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

@media (min-width: 640px) {
  .network-directory-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .network-directory-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.network-directory-item {
  background: var(--brand-surface);
  padding: 1.35rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: background-color 0.16s ease;
}

.network-directory-item:hover {
  background: var(--brand-surface-alt);
}

.network-directory-index {
  font-size: 0.75rem;
  color: var(--brand-ink-muted);
  display: block;
  margin-bottom: 0.2rem;
}

.network-directory-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--brand-ink);
}

/* Contact Layout */
.contact-split {
  display: grid;
  gap: 2.5rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .contact-split {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3.5rem;
  }
}

.contact-channel-list {
  display: grid;
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-channel-item {
  padding: 1.15rem 1.25rem;
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.contact-channel-item strong {
  font-size: 0.82rem;
  color: var(--brand-ink-muted);
}

.contact-channel-item span {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--brand-ink);
}

/* Desktop-Only Floating Social Rail (Preserved from Live Site, Hidden on Mobile for 15% Sticky Cap) */
.desktop-social-rail {
  display: none;
}

@media (min-width: 1280px) {
  .desktop-social-rail {
    position: fixed;
    right: 1.1rem;
    bottom: 1.5rem;
    z-index: 400;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
}

.social-rail-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #0b192c;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.16s var(--ease-settle), background-color 0.16s ease;
}

.social-rail-btn:hover {
  transform: translateY(-2px);
  background: var(--brand-accent);
}

/* Parent Footer */
.parent-footer {
  background: #081220;
  color: #e2e8f0;
  padding-top: 4rem;
  padding-bottom: 2.5rem;
}

.parent-footer-grid {
  display: grid;
  gap: 2.25rem;
}

@media (min-width: 768px) {
  .parent-footer-grid {
    grid-template-columns: 1.3fr 1fr 1fr 1.1fr;
  }
}

.parent-footer h4 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 0.9rem;
}

.parent-footer ul {
  display: grid;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #94a3b8;
}

.parent-footer a:hover {
  color: #ffffff;
}

.parent-footer-network {
  margin-top: 2.75rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.parent-footer-network-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  font-size: 0.8125rem;
  color: #94a3b8;
  margin-top: 0.75rem;
}

.parent-footer-bottom {
  margin-top: 2.25rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.8125rem;
  color: #94a3b8;
}
`;

export const LAYOUTS_CSS = `/* Multi-Archetype Structural Layouts for the 15 Distinct Classical Brands */

/* ─── BRAND HEADERS (Strictly Home | About Us + 1 CTA) ─── */
.brand-header {
  position: sticky;
  top: 0;
  z-index: 500;
  background: var(--brand-canvas);
  border-bottom: 1px solid var(--brand-border);
}

.brand-header--atelier-double {
  border-bottom: 3px double var(--brand-border);
}

.brand-header--editorial-masthead {
  background: var(--brand-surface);
  border-bottom: 2px solid var(--brand-ink);
}

.brand-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  min-height: 70px;
}

@media (min-width: 768px) {
  .brand-header-row {
    gap: 2rem;
  }
}

@media (min-width: 900px) {
  .brand-header--centered-crest .brand-header-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
  }
}

.brand-header--centered-crest .brand-nav {
  justify-self: start;
}

.brand-header--centered-crest .brand-header-cta-zone {
  justify-self: end;
}

.brand-wordmark {
  font-size: clamp(1.1rem, 3.8vw, 1.55rem);
  color: var(--brand-ink);
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-wordmark--footer {
  color: var(--brand-footer-fg);
  display: inline-block;
  margin-bottom: 0.75rem;
}

.brand-nav {
  display: none;
  align-items: center;
  gap: 2rem;
}

@media (min-width: 768px) {
  .brand-nav {
    display: flex;
  }
}

.brand-nav a {
  position: relative;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--brand-ink-muted);
  white-space: nowrap;
  padding-block: 0.3rem;
  transition: color 0.16s ease;
}

.brand-nav a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1.5px;
  background: var(--brand-primary);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.18s var(--ease-settle);
}

.brand-nav a:hover,
.brand-nav a[aria-current="page"] {
  color: var(--brand-ink);
}

.brand-nav a:hover::after,
.brand-nav a[aria-current="page"]::after {
  transform: scaleX(1);
}

.brand-header-cta-zone {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.btn-brand-primary {
  background: var(--brand-primary);
  color: var(--brand-primary-fg);
  border-color: var(--brand-primary);
  border-radius: var(--radius-sm);
}

.btn-brand-primary:hover {
  opacity: 0.91;
}

.btn-brand-outline {
  background: transparent;
  color: var(--brand-ink);
  border-color: var(--brand-border);
  border-radius: var(--radius-sm);
}

.btn-brand-outline:hover {
  border-color: var(--brand-ink);
}

.btn-hero-primary {
  background: var(--brand-primary);
  color: var(--brand-primary-fg);
  border-color: var(--brand-primary);
  border-radius: var(--radius-sm);
}

.hero-dark-surface .btn-hero-primary {
  background: var(--brand-hero-fg);
  color: var(--brand-hero-bg);
  border-color: var(--brand-hero-fg);
}

.btn-hero-secondary {
  background: transparent;
  color: var(--brand-hero-fg);
  border-color: currentColor;
  border-radius: var(--radius-sm);
}

.brand-mobile-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-sm);
  color: var(--brand-ink);
}

@media (min-width: 768px) {
  .brand-mobile-toggle {
    display: none;
  }
}

/* ─── HERO ARCHETYPES ─── */
.brand-hero {
  background: var(--brand-hero-bg);
  color: var(--brand-hero-fg);
  border-bottom: 1px solid var(--brand-border);
  overflow: hidden;
}

.brand-hero-kicker {
  font-size: 0.8125rem;
  color: var(--brand-hero-muted);
  margin-bottom: 0.85rem;
}

.brand-hero-h1 {
  font-family: var(--font-display);
  font-weight: var(--display-weight, 600);
  font-size: clamp(2.25rem, 4.2vw, 3.75rem);
  line-height: 1.09;
  margin-bottom: 1.2rem;
  text-wrap: balance;
}

.brand-hero-lead {
  font-size: 1.05rem;
  line-height: 1.68;
  color: var(--brand-hero-muted);
  max-width: 60ch;
  margin-bottom: 1.75rem;
}

.brand-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}

/* Variant 1 & 8: Split Portrait / Craftsman Split */
.hero-split-grid {
  display: grid;
  gap: 2.5rem;
  align-items: stretch;
  padding-block: clamp(3rem, 6vw, 5rem);
}

@media (min-width: 1024px) {
  .hero-split-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3.5rem;
  }
  .hero-split-grid--reverse {
    grid-template-columns: 0.95fr 1.05fr;
  }
}

.hero-split-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-framed-media {
  border-radius: var(--radius-lg, 6px);
  border: 1px solid rgba(148, 163, 184, 0.28);
  min-height: 320px;
}

/* Variant 2: Panoramic Monograph */
.hero-panoramic {
  padding-block: clamp(3rem, 6vw, 4.75rem);
}

.hero-panoramic-head {
  max-width: 820px;
  margin-bottom: 2.25rem;
}

.hero-panoramic-media {
  aspect-ratio: 21 / 9;
  min-height: 260px;
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
}

/* Variant 3: Fullbleed Framed Scrim */
.hero-fullbleed {
  position: relative;
  min-height: 540px;
  display: flex;
  align-items: center;
  padding-block: 4rem;
  color: #faf8f3;
}

.hero-fullbleed-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-fullbleed-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-fullbleed-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(10, 16, 24, 0.88) 0%, rgba(10, 16, 24, 0.68) 55%, rgba(10, 16, 24, 0.42) 100%);
}

.hero-fullbleed-frame {
  position: relative;
  z-index: 1;
  border: 1px solid rgba(250, 248, 243, 0.26);
  padding: clamp(1.75rem, 4vw, 3.25rem);
  max-width: 760px;
  background: rgba(10, 16, 24, 0.38);
  backdrop-filter: blur(4px);
}

.hero-fullbleed-frame .brand-hero-kicker,
.hero-fullbleed-frame .brand-hero-lead {
  color: #e2e8f0;
}

.hero-fullbleed-frame .brand-hero-h1 {
  color: #faf8f3;
}

/* Additional Structural Helpers for Company Templates */
.hero-stark-aside {
  border-top: 1px solid var(--brand-border);
  padding-top: 1.25rem;
}

.hero-stark-plate {
  margin-top: 2.5rem;
}

.hero-broadsheet-split {
  padding-block: 0.5rem 0;
}

.bento-lead-media {
  aspect-ratio: 21 / 9;
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
}

.svc-card-cta-bottom {
  margin-top: auto;
  padding-top: 0.65rem;
}

.svc-index-row {
  padding-block: 1.35rem;
  border-bottom: 1px solid var(--brand-border);
}

.svc-index-row-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.svc-index-num {
  font-size: 0.95rem;
  margin-right: 0.6rem;
  color: var(--brand-ink-muted);
}

.svc-index-list-top {
  border-top: 1px solid var(--brand-border);
}

.framed-4x3-plate {
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
}

.framed-16x9-plate {
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
}

.framed-21x9-plate {
  aspect-ratio: 21 / 9;
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
}

.broadsheet-lead-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  padding: 1.75rem;
}

.broadsheet-lead-media {
  aspect-ratio: 16 / 9;
  margin-bottom: 1.25rem;
}

.about-banner-pad {
  padding-block: clamp(3rem, 5.5vw, 4.5rem);
}

.about-banner-h1 {
  max-width: 24ch;
}

.about-sidebar-stack {
  display: grid;
  gap: 1.25rem;
  align-content: start;
}

.hero-stark-kicker {
  font-size: 0.82rem;
  color: var(--brand-hero-muted);
  margin-bottom: 0.45rem;
}

.hero-stark-list {
  font-size: 0.92rem;
  line-height: 1.65;
}

.svc-inline-features {
  font-size: 0.82rem;
  color: var(--brand-ink);
  margin-top: 0.55rem;
  font-weight: 500;
}

.svc-pillar-card .svc-title {
  font-size: 1.3rem;
}

.svc-pillar-card .svc-summary {
  font-size: 0.9rem;
}

.svc-pillar-card .svc-feature-list {
  margin-top: auto;
}

.svc-pillar-card .text-arrow-link {
  padding-top: 0.5rem;
}

.svc-alt-row .svc-title {
  margin-top: 0.35rem;
  margin-bottom: 0.65rem;
}

.svc-alt-row .svc-summary {
  margin-bottom: 0.9rem;
}

.svc-alt-row .svc-feature-list {
  margin-bottom: 1.1rem;
}

.svc-broadsheet-item .svc-title {
  margin-top: 0.25rem;
  margin-bottom: 0.4rem;
}

.svc-broadsheet-item .svc-summary {
  margin-bottom: 0.5rem;
}

.svc-broadsheet-checks {
  font-size: 0.82rem;
  color: var(--brand-ink);
  margin-bottom: 0.5rem;
}

.broadsheet-lead-card .svc-title {
  font-size: 1.75rem;
  margin-block: 0.35rem 0.6rem;
}

.broadsheet-lead-card .svc-summary {
  margin-bottom: 0.85rem;
}

.broadsheet-lead-checks {
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.svc-td-num {
  font-weight: 600;
}

.svc-td-name {
  font-family: var(--font-display);
  font-size: 1.2rem;
}

.svc-td-scope {
  color: var(--brand-ink-muted);
  max-width: 42ch;
}

.svc-td-checks {
  font-size: 0.85rem;
}

.about-note-heading {
  font-family: var(--font-display);
  font-size: 1.35rem;
  margin-bottom: 0.65rem;
}

.about-note-body {
  font-size: 0.9rem;
  color: var(--brand-ink-muted);
  line-height: 1.65;
}

.about-note-phone {
  font-size: 0.92rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.about-note-email {
  font-size: 0.88rem;
  color: var(--brand-ink-muted);
  margin-bottom: 0.35rem;
}

.footer-desc-measure {
  max-width: 46ch;
}

.footer-heading-sm {
  font-family: var(--font-display);
  font-size: 1.15rem;
  margin-bottom: 0.75rem;
}

.footer-phone-strong {
  color: var(--brand-footer-fg);
  font-weight: 600;
}

.underline-link {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Variant 4: Pillar Blueprint */
.hero-blueprint {
  display: grid;
  gap: 2rem;
  padding-block: clamp(3rem, 6vw, 4.75rem);
}

@media (min-width: 1024px) {
  .hero-blueprint {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 3rem;
  }
}

.hero-blueprint-specs {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  font-size: 0.84rem;
}

.hero-blueprint-specs strong {
  display: block;
}

.hero-blueprint-specs span {
  color: var(--brand-hero-muted);
}

/* Variant 6: Midnight Marquee */
.hero-marquee {
  padding-block: clamp(3rem, 6vw, 4.75rem);
}

.hero-marquee-top {
  display: grid;
  gap: 1.75rem;
  margin-bottom: 2.25rem;
}

@media (min-width: 1024px) {
  .hero-marquee-top {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: end;
  }
}

.hero-marquee-plate {
  aspect-ratio: 16 / 7;
  min-height: 260px;
  border: 1px solid rgba(255, 255, 255, 0.22);
}

/* Variant 7: Stark Gallery */
.hero-stark {
  padding-block: clamp(3rem, 6vw, 5rem);
}

.hero-stark-grid {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .hero-stark-grid {
    grid-template-columns: 1.25fr 0.75fr;
    align-items: end;
  }
}

/* Variant 9: Broadsheet Lead */
.hero-broadsheet {
  padding-block: clamp(2.5rem, 5vw, 4.25rem);
}

.broadsheet-dateline {
  padding-block: 0.6rem;
  border-block: 1px solid var(--brand-border);
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: var(--brand-ink-muted);
}

/* Operational Strip Below Hero */
.operational-strip {
  background: var(--brand-surface);
  border-bottom: 1px solid var(--brand-border);
  padding-block: 1.1rem;
}

.operational-strip-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.75rem;
  font-size: 0.85rem;
  color: var(--brand-ink-muted);
}

.operational-strip-inner strong {
  color: var(--brand-ink);
}

/* ─── SERVICES SECTION ARCHETYPES ─── */
.brand-section-head {
  margin-bottom: clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 2rem;
}

.brand-section-title {
  font-family: var(--font-display);
  font-weight: var(--display-weight, 600);
  font-size: clamp(1.85rem, 3vw, 2.65rem);
  line-height: 1.15;
  color: var(--brand-ink);
  text-wrap: balance;
}

.brand-section-sub {
  color: var(--brand-ink-muted);
  max-width: 60ch;
  line-height: 1.65;
  margin-top: 0.65rem;
}

/* 1. Editorial Ledger 2x2 */
.svc-ledger-grid {
  display: grid;
  gap: 1px;
  background: var(--brand-border);
  border: 1px solid var(--brand-border);
}

@media (min-width: 768px) {
  .svc-ledger-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.svc-ledger-cell {
  background: var(--brand-surface);
  padding: clamp(1.65rem, 3vw, 2.35rem);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.svc-index {
  font-family: var(--font-display);
  font-size: 1.1rem;
  color: var(--brand-accent);
  font-weight: 600;
}

.svc-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--brand-ink);
}

.svc-summary {
  color: var(--brand-ink-muted);
  line-height: 1.65;
  font-size: 0.95rem;
}

.svc-feature-list {
  padding-left: 1.1rem;
  color: var(--brand-ink);
  font-size: 0.88rem;
  display: grid;
  gap: 0.3rem;
}

/* 2. Hairline Rows */
.svc-hairline-list {
  border-top: 1px solid var(--brand-border);
}

.svc-hairline-row {
  padding-block: 1.85rem;
  border-bottom: 1px solid var(--brand-border);
  display: grid;
  gap: 1rem;
}

@media (min-width: 900px) {
  .svc-hairline-row {
    grid-template-columns: 70px 1fr 1.3fr auto;
    align-items: start;
    gap: 2rem;
  }
}

/* 3. Asymmetric Bento */
.svc-bento-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 900px) {
  .svc-bento-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .svc-bento-card--lead {
    grid-column: span 2;
  }
}

.svc-bento-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

/* 4. Four Pillar Columns */
.svc-pillars-grid {
  display: grid;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .svc-pillars-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .svc-pillars-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.svc-pillar-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-top: 3px solid var(--brand-primary);
  padding: 1.65rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

/* 5. Alternating Editorial */
.svc-alternating-stack {
  display: grid;
  gap: 2.5rem;
}

.svc-alt-row {
  display: grid;
  gap: 1.75rem;
  align-items: center;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--brand-border);
}

@media (min-width: 900px) {
  .svc-alt-row {
    grid-template-columns: 0.9fr 1.1fr;
    gap: 3rem;
  }
  .svc-alt-row:nth-child(even) .svc-alt-media {
    order: 2;
  }
}

.svc-alt-media {
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-md);
  border: 1px solid var(--brand-border);
}

/* 6 & 8: Dossier / Bookplate Cards */
.svc-bookplate-grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .svc-bookplate-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.svc-bookplate-card {
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  outline: 1px solid var(--brand-border);
  outline-offset: -6px;
  padding: 2rem;
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

/* 7. Numbered Index + Visual */
.svc-index-split {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .svc-index-split {
    grid-template-columns: 1.2fr 0.8fr;
    align-items: start;
  }
}

/* 9. Broadsheet Salience */
.svc-broadsheet-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .svc-broadsheet-grid {
    grid-template-columns: 1.15fr 0.85fr;
  }
}

.svc-broadsheet-side {
  display: grid;
  gap: 1.35rem;
}

.svc-broadsheet-item {
  padding-bottom: 1.35rem;
  border-bottom: 1px solid var(--brand-border);
}

/* 10. Tabular Specification Directory */
.svc-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--brand-border);
  background: var(--brand-surface);
}

.svc-spec-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.svc-spec-table th,
.svc-spec-table td {
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--brand-border);
  vertical-align: top;
}

.svc-spec-table th {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--brand-ink-muted);
  background: var(--brand-surface-alt);
}

/* ─── ABOUT US PAGE ARCHETYPES ─── */
.about-monograph-grid {
  display: grid;
  gap: 2.5rem;
}

@media (min-width: 1024px) {
  .about-monograph-grid {
    grid-template-columns: 1.4fr 0.6fr;
    gap: 3.5rem;
  }
}

.about-margin-note {
  padding: 1.5rem;
  background: var(--brand-surface);
  border: 1px solid var(--brand-border);
  border-radius: var(--radius-md);
}

.dropcap-paragraph::first-letter {
  font-family: var(--font-display);
  font-size: 3.3rem;
  font-weight: 700;
  float: left;
  line-height: 0.88;
  margin-right: 0.65rem;
  margin-top: 0.2rem;
  color: var(--brand-primary);
}

.editorial-pullquote {
  margin-block: 2.25rem;
  padding-block: 1.75rem;
  border-block: 1px solid var(--brand-border);
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  line-height: 1.45;
  color: var(--brand-ink);
}

.spec-dl {
  border-top: 1px solid var(--brand-border);
}

.spec-dl-row {
  display: grid;
  gap: 0.5rem;
  padding-block: 1.35rem;
  border-bottom: 1px solid var(--brand-border);
}

@media (min-width: 768px) {
  .spec-dl-row {
    grid-template-columns: 240px 1fr;
    gap: 2rem;
  }
}

.spec-dl-row dt {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
}

.spec-dl-row dd {
  color: var(--brand-ink-muted);
  line-height: 1.68;
}

.journal-columns {
  display: grid;
  gap: 2rem;
}

@media (min-width: 900px) {
  .journal-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
  }
}

/* ─── BRAND FOOTERS (Strictly Home | About Us + Verified Contact) ─── */
.brand-footer {
  background: var(--brand-footer-bg);
  color: var(--brand-footer-fg);
  padding-block: 3.25rem 2.25rem;
  border-top: 1px solid var(--brand-border);
}

.brand-footer-grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .brand-footer-grid {
    grid-template-columns: 1.3fr 0.8fr 1fr;
  }
}

.brand-footer-muted {
  color: var(--brand-footer-muted);
  font-size: 0.875rem;
  line-height: 1.65;
}

.brand-footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 0.9rem;
}

.brand-footer-nav a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.brand-footer-bottom {
  margin-top: 2.25rem;
  padding-top: 1.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: var(--brand-footer-muted);
}
`;

export const NAVIGATION_JS = `/* Modular Responsive Navigation & Progressive Page Transition Controller */
(function () {
  'use strict';

  var toggleBtn = document.querySelector('[data-nav-toggle]');
  var mobileDrawer = document.getElementById('mobile-nav-drawer');

  function closeDrawer() {
    if (!toggleBtn || !mobileDrawer) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('hidden', '');
  }

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', function () {
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeDrawer();
      } else {
        toggleBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.removeAttribute('hidden');
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        closeDrawer();
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Dynamic copyright year
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Resilient secondary path fallback for critical images (CSP-compliant, no inline handlers)
  document.querySelectorAll('img[data-fallback-src]').forEach(function (img) {
    function tryFallback() {
      var fallback = img.getAttribute('data-fallback-src');
      if (!fallback || img.getAttribute('data-fallback-applied') === 'true') {
        return;
      }
      img.setAttribute('data-fallback-applied', 'true');
      img.setAttribute('src', fallback);
    }

    img.addEventListener('error', tryFallback);
    if (img.complete && img.naturalWidth === 0) {
      tryFallback();
    }
  });

  // Restore visibility immediately on bfcache back/forward navigation
  window.addEventListener('pageshow', function () {
    document.body.classList.remove('is-leaving');
  });

  // Subtle progressive transition between internal HTML documents
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[data-page-transition]').forEach(function (anchor) {
      anchor.addEventListener('click', function (ev) {
        if (
          ev.defaultPrevented ||
          ev.button !== 0 ||
          ev.metaKey ||
          ev.ctrlKey ||
          ev.shiftKey ||
          ev.altKey
        ) {
          return;
        }
        var href = anchor.getAttribute('href');
        if (!href || href.charAt(0) === '#' || anchor.target === '_blank') {
          return;
        }
        ev.preventDefault();
        document.body.classList.add('is-leaving');
        window.setTimeout(function () {
          window.location.assign(href);
        }, 120);
      });
    });
  }
})();
`;

export const MOTION_JS = `/* Progressive GSAP + ScrollTrigger Motion Choreography Engine */
(function () {
  'use strict';

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Populate KPI counters immediately if reduced motion or no GSAP
  function setFinalCounters() {
    document.querySelectorAll('[data-counter-target]').forEach(function (el) {
      var target = Number(el.getAttribute('data-counter-target') || '0');
      el.textContent = target.toLocaleString();
    });
  }

  if (prefersReduced || typeof window.gsap === 'undefined') {
    setFinalCounters();
    return;
  }

  var gsap = window.gsap;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  var profile = document.body.getAttribute('data-motion-profile') || 'whisper-stagger';
  var isMobile = window.innerWidth < 768;

  // Profile-specific entrance parameters (compositor-friendly transform & opacity)
  var profileConfig = {
    'parent-executive': { y: 20, x: 0, scale: 1, duration: 0.68, stagger: 0.08 },
    'curtain-reveal': { y: 22, x: 0, scale: 1, duration: 0.72, stagger: 0.09 },
    'whisper-stagger': { y: 14, x: 0, scale: 1, duration: 0.6, stagger: 0.06 },
    'slide-mask': { y: 0, x: -20, scale: 1, duration: 0.65, stagger: 0.08 },
    'geometric-wipe': { y: 16, x: 12, scale: 1, duration: 0.58, stagger: 0.07 },
    'organic-settle': { y: 18, x: 0, scale: 0.985, duration: 0.74, stagger: 0.09 },
    'line-rise': { y: 24, x: 0, scale: 1, duration: 0.7, stagger: 0.08 },
    'monochrome-snap': { y: 12, x: 0, scale: 1, duration: 0.48, stagger: 0.05 },
    'warm-ease': { y: 18, x: 0, scale: 0.99, duration: 0.7, stagger: 0.08 },
    'page-leaf': { y: 15, x: -8, scale: 1, duration: 0.64, stagger: 0.07 },
    'architectural-parallax': { y: 20, x: 0, scale: 0.99, duration: 0.68, stagger: 0.08 }
  };

  var cfg = profileConfig[profile] || profileConfig['whisper-stagger'];
  var distanceScale = isMobile ? 0.55 : 1;

  // Hero entrance sequence
  var heroItems = document.querySelectorAll('[data-hero-animate]');
  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0,
      y: cfg.y * distanceScale,
      x: cfg.x * distanceScale,
      scale: cfg.scale,
      duration: cfg.duration,
      stagger: cfg.stagger,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
  }

  var heroMedia = document.querySelector('[data-hero-media]');
  if (heroMedia) {
    gsap.from(heroMedia, {
      opacity: 0,
      scale: 1.03,
      duration: cfg.duration + 0.12,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });
  }

  // Scroll-triggered reveals
  if (window.ScrollTrigger) {
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      var children = group.querySelectorAll('[data-reveal-item]');
      var targets = children.length ? children : [group];
      gsap.from(targets, {
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        y: 18 * distanceScale,
        duration: 0.6,
        stagger: children.length ? 0.07 : 0,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      });
    });

    // Animated KPI counters on Parent Website
    document.querySelectorAll('[data-counter-target]').forEach(function (el) {
      var target = Number(el.getAttribute('data-counter-target') || '0');
      var state = { val: 0 };
      gsap.to(state, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        },
        onUpdate: function () {
          el.textContent = Math.round(state.val).toLocaleString();
        }
      });
    });
  } else {
    setFinalCounters();
  }
})();
`;

export const FORMS_JS = `/* Secure Quote Inquiry Form Client Module (Validation + Server API + Mailto/WhatsApp Handoff) */
(function () {
  'use strict';

  var renderedAt = Date.now();

  document.querySelectorAll('form[data-quote-form]').forEach(function (form) {
    var companyName = form.getAttribute('data-company-name') || 'GTA Duct Masters';
    var nameInput = form.querySelector('input[name="name"]');
    var phoneInput = form.querySelector('input[name="phone"]');
    var serviceSelect = form.querySelector('select[name="service"]');
    var messageInput = form.querySelector('textarea[name="message"]');
    var honeypotInput = form.querySelector('input[name="website"]');
    var errorBanner = form.querySelector('[data-form-error]');
    var submitBtn = form.querySelector('button[type="submit"]');
    var confirmationBox = form.parentElement
      ? form.parentElement.querySelector('[data-form-confirmation]')
      : null;

    function showError(message, invalidField) {
      [nameInput, phoneInput, serviceSelect, messageInput].forEach(function (el) {
        if (el) el.removeAttribute('aria-invalid');
      });
      if (invalidField) {
        invalidField.setAttribute('aria-invalid', 'true');
        invalidField.focus();
      }
      if (errorBanner) {
        errorBanner.textContent = message;
        errorBanner.removeAttribute('hidden');
      }
    }

    function clearError() {
      [nameInput, phoneInput, serviceSelect, messageInput].forEach(function (el) {
        if (el) el.removeAttribute('aria-invalid');
      });
      if (errorBanner) {
        errorBanner.textContent = '';
        errorBanner.setAttribute('hidden', '');
      }
    }

    // Pre-select service when clicking a service card CTA with data-select-service
    document.querySelectorAll('[data-select-service]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var desired = trigger.getAttribute('data-select-service');
        if (desired && serviceSelect) {
          serviceSelect.value = desired;
        }
      });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearError();

      var nameVal = nameInput ? nameInput.value.trim() : '';
      var phoneVal = phoneInput ? phoneInput.value.trim() : '';
      var serviceVal = serviceSelect ? serviceSelect.value.trim() : '';
      var messageVal = messageInput ? messageInput.value.trim() : '';
      var honeypotVal = honeypotInput ? honeypotInput.value.trim() : '';

      if (nameVal.length < 2) {
        showError('Please enter your full name (at least 2 characters).', nameInput);
        return;
      }

      var digits = phoneVal.replace(/\\D/g, '');
      if (digits.length < 7 || digits.length > 15 || !/^[0-9+().\\-\\s]+$/.test(phoneVal)) {
        showError('Please enter a valid phone number (7 to 15 digits).', phoneInput);
        return;
      }

      var originalLabel = submitBtn ? submitBtn.textContent : 'Submit Request';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      var payload = {
        company: companyName,
        name: nameVal,
        phone: phoneVal,
        service: serviceVal,
        message: messageVal,
        website: honeypotVal,
        renderedAt: renderedAt
      };

      function buildFallbackLinks() {
        var svc = serviceVal || 'General Service';
        var msg = messageVal || 'Please provide pricing for ' + svc + '.';
        var subject = '[' + companyName + '] Quote request from ' + nameVal;
        var body = [
          'Company Website: ' + companyName,
          'Name: ' + nameVal,
          'Phone: ' + phoneVal,
          'Service: ' + svc,
          'Message: ' + msg
        ].join('\\n');
        return {
          mailtoHref:
            'mailto:devintaseff4@gmail.com?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body),
          whatsappHref:
            'https://wa.me/16475576364?text=' +
            encodeURIComponent(
              'Hi ' + companyName + ', my name is ' + nameVal + ' (' + phoneVal + '). I need a quote for ' + svc + '. ' + msg
            )
        };
      }

      function renderConfirmed(links, summaryName, summaryService) {
        form.setAttribute('hidden', '');
        if (!confirmationBox) return;
        var summaryEl = confirmationBox.querySelector('[data-confirm-summary]');
        if (summaryEl) {
          summaryEl.textContent =
            'Thank you, ' +
            summaryName +
            '. Your inquiry for ' +
            summaryService +
            ' has been validated and prepared for dispatch.';
        }
        var mailBtn = confirmationBox.querySelector('[data-confirm-mailto]');
        if (mailBtn && links.mailtoHref) {
          mailBtn.setAttribute('href', links.mailtoHref);
        }
        var waBtn = confirmationBox.querySelector('[data-confirm-whatsapp]');
        if (waBtn && links.whatsappHref) {
          waBtn.setAttribute('href', links.whatsappHref);
        }
        confirmationBox.removeAttribute('hidden');
        confirmationBox.focus();
      }

      fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'QuoteInquiryClient'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (res.status === 404 || res.status === 405) {
            // Static-only host fallback (e.g., pure static CDN deployment)
            var fallback = buildFallbackLinks();
            renderConfirmed(fallback, nameVal, serviceVal || 'General Service');
            return null;
          }
          return res.json().then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (!result) return;
          if (!result.ok || !result.body.ok) {
            var fieldMap = {
              name: nameInput,
              phone: phoneInput,
              service: serviceSelect,
              message: messageInput
            };
            var targetField = result.body && result.body.field ? fieldMap[result.body.field] : null;
            showError(
              (result.body && result.body.error) || 'Unable to submit your request. Please check your entries.',
              targetField
            );
            return;
          }
          renderConfirmed(
            result.body.data,
            result.body.data.name,
            result.body.data.service
          );
        })
        .catch(function () {
          var fallback = buildFallbackLinks();
          renderConfirmed(fallback, nameVal, serviceVal || 'General Service');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });

    if (confirmationBox) {
      var resetBtn = confirmationBox.querySelector('[data-confirm-reset]');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          form.reset();
          renderedAt = Date.now();
          confirmationBox.setAttribute('hidden', '');
          form.removeAttribute('hidden');
          if (nameInput) nameInput.focus();
        });
      }
    }
  });
})();
`;

export const GALLERY_REVIEWS_JS = `/* Interactive Gallery Lightbox & Verified Customer Review Filter Module */
(function () {
  'use strict';

  // Accessible <dialog> Lightbox for Before & After Gallery
  var dialog = document.getElementById('gallery-lightbox');
  var dialogImg = document.getElementById('gallery-lightbox-img');
  var dialogCaption = document.getElementById('gallery-lightbox-caption');
  var dialogClose = document.getElementById('gallery-lightbox-close');

  if (dialog && dialogImg) {
    document.querySelectorAll('[data-lightbox-src]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-lightbox-src') || '';
        var alt = btn.getAttribute('data-lightbox-alt') || '';
        dialogImg.setAttribute('src', src);
        dialogImg.setAttribute('alt', alt);
        if (dialogCaption) {
          dialogCaption.textContent = alt;
        }
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.removeAttribute('hidden');
        }
      });
    });

    if (dialogClose) {
      dialogClose.addEventListener('click', function () {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.setAttribute('hidden', '');
        }
      });
    }

    dialog.addEventListener('click', function (ev) {
      if (ev.target === dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  }

  // Interactive Review Category Filter
  var filterButtons = document.querySelectorAll('[data-review-filter]');
  var reviewCards = document.querySelectorAll('[data-review-category]');
  var reviewCountLabel = document.querySelector('[data-review-count]');

  if (filterButtons.length && reviewCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selected = btn.getAttribute('data-review-filter') || 'all';
        filterButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        var visibleCount = 0;
        reviewCards.forEach(function (card) {
          var cat = card.getAttribute('data-review-category') || '';
          var match = selected === 'all' || cat === selected;
          if (match) {
            card.removeAttribute('hidden');
            visibleCount += 1;
          } else {
            card.setAttribute('hidden', '');
          }
        });

        if (reviewCountLabel) {
          reviewCountLabel.textContent =
            'Showing ' + visibleCount + ' verified ' + (visibleCount === 1 ? 'review' : 'reviews');
        }
      });
    });
  }
})();
`;

export const RUNTIME_GUARD_JS = `/* Browser Extension Compatibility Guard (Getter-Only window.fetch & Extension Error Isolation) */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  try {
    var ownDesc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (
      ownDesc &&
      typeof ownDesc.get === 'function' &&
      typeof ownDesc.set === 'undefined' &&
      ownDesc.configurable
    ) {
      var currentOwnFetch = ownDesc.get.call(window);
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: ownDesc.enumerable !== false,
        get: function () {
          return currentOwnFetch;
        },
        set: function (nextFetch) {
          if (typeof nextFetch === 'function') {
            currentOwnFetch = nextFetch;
          }
        }
      });
    } else if (
      !ownDesc &&
      typeof Window !== 'undefined' &&
      Window.prototype
    ) {
      var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
      if (
        protoDesc &&
        typeof protoDesc.get === 'function' &&
        typeof protoDesc.set === 'undefined'
      ) {
        var currentProtoFetch = protoDesc.get.call(window);
        Object.defineProperty(window, 'fetch', {
          configurable: true,
          enumerable: true,
          get: function () {
            return currentProtoFetch;
          },
          set: function (nextFetch) {
            if (typeof nextFetch === 'function') {
              currentProtoFetch = nextFetch;
            }
          }
        });
      }
    }
  } catch (_err) {
    // Host descriptor is non-configurable; continue safely
  }

  var extPattern = /^(chrome|moz|safari-web)-extension:\\/\\//i;

  window.addEventListener(
    'error',
    function (ev) {
      var file = (ev && ev.filename) || '';
      var stack = (ev && ev.error && ev.error.stack) || '';
      if (extPattern.test(file) || extPattern.test(stack)) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    function (ev) {
      var reason = ev && ev.reason;
      var stack = (reason && reason.stack) || String(reason || '');
      if (extPattern.test(stack)) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
      }
    },
    true
  );
})();
`;

