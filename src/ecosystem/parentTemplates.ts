import { toRelativeUrl } from './paths.ts';
import { escapeHtml } from './security.ts';
import { renderSeoHead } from './seo.ts';
import {
  LINKED_COMPANIES,
  PARENT_ADVANTAGES,
  PARENT_CERTIFICATIONS,
  PARENT_GALLERY_PAIRS,
  PARENT_PAGES,
  PARENT_REVIEWS,
  PARENT_STATS,
  VERIFIED_CONTACT,
  VERIFIED_SERVICES,
  type ParentPageMeta,
} from './verifiedData.ts';

const PARENT_GOOGLE_FONTS =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';

const PARENT_STYLESHEETS = [
  '/assets/css/reset.css',
  '/assets/css/core.css',
  '/assets/css/parent.css',
] as const;

export function renderQuoteFormBlock(
  companyName: string,
  formHeading: string,
  formIdPrefix: string
): string {
  const escapedCompany = escapeHtml(companyName);
  const serviceOptions = VERIFIED_SERVICES.map(
    (s) =>
      `            <option value="${escapeHtml(s.formOptionValue)}">${escapeHtml(s.title)}</option>`
  ).join('\n');

  return `<div class="inquiry-form-card">
        <form data-quote-form data-company-name="${escapedCompany}" novalidate aria-label="Free quote request form for ${escapedCompany}">
          <h3 class="form-card-heading">${escapeHtml(formHeading)}</h3>
          <p class="form-card-sub">Provide your details below for a fast, itemized estimate with zero hidden fees.</p>

          <div class="hp-trap" aria-hidden="true">
            <label for="${formIdPrefix}-website">Website</label>
            <input type="text" id="${formIdPrefix}-website" name="website" tabindex="-1" autocomplete="off" />
          </div>

          <div class="form-grid form-grid-two">
            <div class="form-field">
              <label for="${formIdPrefix}-name">Full Name *</label>
              <input type="text" id="${formIdPrefix}-name" name="name" placeholder="Your full name" required maxlength="100" autocomplete="name" />
            </div>
            <div class="form-field">
              <label for="${formIdPrefix}-phone">Phone Number *</label>
              <input type="tel" id="${formIdPrefix}-phone" name="phone" class="tabular-nums" placeholder="647-557-6364" required maxlength="25" autocomplete="tel" />
            </div>
          </div>

          <div class="form-grid form-grid-spaced">
            <div class="form-field">
              <label for="${formIdPrefix}-service">Service Needed</label>
              <select id="${formIdPrefix}-service" name="service">
                <option value="">Select a service...</option>
${serviceOptions}
                <option value="Other">Other / Not Sure</option>
              </select>
            </div>
            <div class="form-field">
              <label for="${formIdPrefix}-message">Property Type or Questions</label>
              <textarea id="${formIdPrefix}-message" name="message" maxlength="1000" placeholder="Describe your residential or commercial ventilation needs..."></textarea>
            </div>
          </div>

          <p class="form-error-msg form-error-spaced" data-form-error role="alert" hidden></p>

          <div class="form-submit-row">
            <button type="submit" class="btn-action btn-brand-solid">
              Send Free Quote Request
            </button>
            <span class="form-privacy-note">Your information is kept confidential and never sold.</span>
          </div>
        </form>

        <div class="form-confirmation" data-form-confirmation tabindex="-1" role="status" aria-live="polite" hidden>
          <h3>Quote Request Validated</h3>
          <p data-confirm-summary>Thank you. Your quote request has been prepared.</p>
          <div class="form-confirmation-actions">
            <a href="${escapeHtml(VERIFIED_CONTACT.emailHref)}" data-confirm-mailto class="btn-action btn-brand-solid">
              Dispatch via Email App
            </a>
            <a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" data-confirm-whatsapp target="_blank" rel="noopener noreferrer" class="btn-action btn-whatsapp-clean">
              Send Instant WhatsApp
            </a>
            <button type="button" data-confirm-reset class="btn-action btn-subtle-reset">
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </div>`;
}

function renderParentSocialRail(): string {
  return `<aside class="desktop-social-rail" aria-label="Social and messaging channels">
    <a href="${escapeHtml(VERIFIED_CONTACT.facebookUrl)}" class="social-rail-btn" target="_blank" rel="noopener noreferrer" aria-label="Follow GTA Duct Masters on Facebook" title="Follow on Facebook">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>
    <a href="${escapeHtml(VERIFIED_CONTACT.instagramUrl)}" class="social-rail-btn" target="_blank" rel="noopener noreferrer" aria-label="Follow GTA Duct Masters on Instagram" title="Follow on Instagram">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    </a>
    <a href="${escapeHtml(VERIFIED_CONTACT.whatsappPricingUrl)}" class="social-rail-btn" target="_blank" rel="noopener noreferrer" aria-label="Chat with GTA Duct Masters on WhatsApp" title="Chat on WhatsApp">
      <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.472 2.027 7.773L0 32l8.469-2.004A15.937 15.937 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.273 19.387c-.398-.199-2.356-1.162-2.72-1.295-.364-.133-.629-.199-.894.199-.265.398-1.028 1.295-1.26 1.56-.232.265-.465.298-.863.1-.398-.2-1.681-.619-3.2-1.975-1.183-1.054-1.981-2.355-2.213-2.753-.232-.398-.025-.613.174-.811.179-.177.398-.465.597-.697.199-.232.265-.398.398-.663.133-.265.066-.497-.033-.697-.1-.199-.894-2.157-1.225-2.953-.322-.775-.65-.67-.894-.682l-.762-.013c-.265 0-.696.099-1.061.497-.364.398-1.393 1.362-1.393 3.32s1.426 3.85 1.624 4.116c.199.265 2.806 4.283 6.797 6.007.951.41 1.693.655 2.272.838.954.303 1.823.26 2.51.158.765-.114 2.356-.963 2.688-1.893.332-.93.332-1.727.232-1.893-.099-.166-.364-.265-.762-.464z"/></svg>
    </a>
  </aside>`;
}

function renderParentHeader(
  activeUrlPath: string,
  useRootPaths: boolean = false
): string {
  const rel = (target: string) =>
    useRootPaths ? target : toRelativeUrl(activeUrlPath, target);

  const desktopLinks = PARENT_PAGES.map((page) => {
    const currentAttr = page.urlPath === activeUrlPath ? ' aria-current="page"' : '';
    return `        <a href="${escapeHtml(rel(page.urlPath))}" data-page-transition${currentAttr}>${escapeHtml(page.navLabel)}</a>`;
  }).join('\n');

  const mobileLinks = PARENT_PAGES.map((page) => {
    const currentAttr = page.urlPath === activeUrlPath ? ' aria-current="page"' : '';
    return `        <a href="${escapeHtml(rel(page.urlPath))}" data-page-transition${currentAttr}>${escapeHtml(page.navLabel)}</a>`;
  }).join('\n');

  return `<header class="parent-header">
    <div class="container parent-header-inner">
      <a href="${escapeHtml(rel('/'))}" class="parent-brand-link" data-page-transition>
        <img src="${escapeHtml(rel('/assets/images/gta/gta-emblem.jpg'))}" data-fallback-src="${escapeHtml(rel('/assets/images/gta/logo.jpg'))}" alt="GTA Duct Masters Logo" width="42" height="42" decoding="async" class="parent-brand-logo" />
        <span class="parent-brand-name">GTA Duct Masters</span>
      </a>

      <nav class="parent-nav" aria-label="Primary navigation">
${desktopLinks}
      </nav>

      <div class="parent-header-actions">
        <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="btn-action btn-parent-primary header-cta-desktop tabular-nums">
          Call ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}
        </a>
        <button type="button" class="nav-toggle-btn" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav-drawer" aria-label="Toggle navigation menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>

    <div class="mobile-drawer" id="mobile-nav-drawer" hidden>
      <nav class="mobile-drawer-links" aria-label="Mobile navigation">
${mobileLinks}
      </nav>
      <a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" target="_blank" rel="noopener noreferrer" class="btn-action btn-whatsapp-clean w-full">
        Chat on WhatsApp (${escapeHtml(VERIFIED_CONTACT.phoneDisplay)})
      </a>
    </div>
  </header>`;
}

function renderParentFooter(
  currentUrlPath: string,
  useRootPaths: boolean = false
): string {
  const rel = (target: string) =>
    useRootPaths ? target : toRelativeUrl(currentUrlPath, target);

  const quickLinks = PARENT_PAGES.map(
    (p) => `            <li><a href="${escapeHtml(rel(p.urlPath))}" data-page-transition>${escapeHtml(p.navLabel)}</a></li>`
  ).join('\n');

  const serviceLinks = VERIFIED_SERVICES.map(
    (s) =>
      `            <li><a href="${escapeHtml(rel(`/services/#${s.id}`))}" data-page-transition>${escapeHtml(s.title)}</a></li>`
  ).join('\n');

  const networkLinks = LINKED_COMPANIES.map(
    (c) =>
      `          <a href="${escapeHtml(rel(c.homeUrl))}">${escapeHtml(c.exactName)}</a>`
  ).join('\n');

  return `<footer class="parent-footer">
    <div class="container">
      <div class="parent-footer-grid">
        <div>
          <a href="${escapeHtml(rel('/'))}" class="parent-brand-link mb-md">
            <img src="${escapeHtml(rel('/assets/images/gta/gta-emblem.jpg'))}" data-fallback-src="${escapeHtml(rel('/assets/images/gta/logo.jpg'))}" alt="GTA Duct Masters Logo" width="42" height="42" decoding="async" class="parent-brand-logo" />
            <span class="parent-brand-name parent-brand-name--light">GTA Duct Masters</span>
          </a>
          <p class="parent-footer-tagline">Cleaner Air. Healthier Living. Certified Experts.</p>
          <p class="parent-footer-desc">Your trusted local HVAC cleaning service certified, affordable, and always on time across residential and commercial properties.</p>
        </div>

        <div>
          <h4>Services</h4>
          <ul role="list">
${serviceLinks}
          </ul>
        </div>

        <div>
          <h4>Pages</h4>
          <ul role="list">
${quickLinks}
          </ul>
        </div>

        <div>
          <h4>Direct Contact</h4>
          <ul role="list">
            <li><a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="tabular-nums">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</a></li>
            <li><a href="${escapeHtml(VERIFIED_CONTACT.emailHref)}">${escapeHtml(VERIFIED_CONTACT.email)}</a></li>
            <li><span>${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span></li>
            <li><a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" target="_blank" rel="noopener noreferrer">WhatsApp Instant Quote</a></li>
            <li><a href="${escapeHtml(VERIFIED_CONTACT.facebookUrl)}" target="_blank" rel="noopener noreferrer">Facebook</a> · <a href="${escapeHtml(VERIFIED_CONTACT.instagramUrl)}" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>

      <div class="parent-footer-network" aria-label="Affiliated Service Network Directory">
        <h4>Affiliated Air Duct &amp; HVAC Service Network</h4>
        <div class="parent-footer-network-links">
${networkLinks}
        </div>
      </div>

      <div class="parent-footer-bottom">
        <p>&copy; <span data-current-year>2026</span> GTA Duct Masters. All rights reserved.</p>
        <p>Professional air duct cleaning &amp; HVAC cleaning service — serving residential and commercial clients.</p>
      </div>
    </div>
  </footer>`;
}

function renderKpiStripSection(): string {
  const items = PARENT_STATS.map(
    (st) => `        <div class="parent-kpi-item">
          <div class="parent-kpi-value tabular-nums">
            <span data-counter-target="${st.value}">${st.value.toLocaleString()}</span><span>${escapeHtml(st.suffix)}</span>
          </div>
          <p class="parent-kpi-label">${escapeHtml(st.label)}</p>
        </div>`
  ).join('\n');

  return `<section class="parent-kpi-strip" aria-label="Verified company statistics">
    <div class="container">
      <div class="parent-kpi-grid">
${items}
      </div>
    </div>
  </section>`;
}

function renderServicesSection(
  currentUrlPath: string,
  isDedicatedPage: boolean
): string {
  const rel = (target: string) => toRelativeUrl(currentUrlPath, target);
  const cards = VERIFIED_SERVICES.map((svc, idx) => {
    const bullets = svc.features
      .map((f) => `              <li>${escapeHtml(f)}</li>`)
      .join('\n');
    const quoteHref = isDedicatedPage ? rel('/contact/') : '#contact';
    return `        <article class="parent-service-card" id="${escapeHtml(svc.id)}" data-reveal-item>
          <div class="media-fallback-frame parent-service-card-media">
            <img src="${escapeHtml(rel(svc.imageSrc))}" alt="${escapeHtml(svc.imageAlt)}" width="800" height="450" loading="lazy" />
          </div>
          <div class="parent-service-card-body">
            <div class="meta-line meta-line-brass">
              <span>0${idx + 1}. Core Service</span>
              <span class="meta-sep" aria-hidden="true">·</span>
              <span>Residential &amp; Commercial</span>
            </div>
            <h3 class="parent-service-card-title">${escapeHtml(svc.title)}</h3>
            <p class="parent-service-desc">${escapeHtml(svc.parentDescription)}</p>
            <ul class="parent-service-list">
${bullets}
            </ul>
            <div class="parent-service-footer">
              <a href="${escapeHtml(quoteHref)}" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">
                Request ${escapeHtml(svc.title)} Quote &rarr;
              </a>
            </div>
          </div>
        </article>`;
  }).join('\n');

  return `<section class="section-pad" id="services" aria-labelledby="services-heading">
    <div class="container" data-reveal-group>
      <div class="section-head flex-wrap-between">
        <div>
          <p class="section-kicker">What We Do</p>
          <h2 id="services-heading" class="section-heading balance-text">Complete Duct &amp; HVAC Cleaning Services</h2>
          <p class="section-desc">From residential air duct cleaning to commercial HVAC system maintenance, our certified team handles every job with precision and care.</p>
        </div>
        ${
          isDedicatedPage
            ? ''
            : `<a href="${escapeHtml(rel('/services/'))}" data-page-transition class="btn-action btn-parent-outline">Explore Full Service Scope</a>`
        }
      </div>
      <div class="parent-services-grid">
${cards}
      </div>
    </div>
  </section>`;
}

function renderAboutSection(
  currentUrlPath: string,
  isDedicatedPage: boolean
): string {
  const rel = (target: string) => toRelativeUrl(currentUrlPath, target);
  const certs = PARENT_CERTIFICATIONS.join(
    ' <span class="meta-sep" aria-hidden="true">·</span> '
  );
  return `<section class="section-pad surface-band" id="about" aria-labelledby="about-heading">
    <div class="container parent-about-split" data-reveal-group>
      <div data-reveal-item>
        <div class="media-fallback-frame parent-about-photo">
          <img src="${escapeHtml(rel('/assets/images/gta/img2.jpeg'))}" alt="GTA Duct Masters certified HVAC technician at work" width="800" height="600" loading="lazy" />
        </div>
        <div class="meta-line meta-line-muted-bold mt-md">
          <span>${certs}</span>
          <span class="meta-sep" aria-hidden="true">·</span>
          <span>15+ Years of Excellence</span>
        </div>
      </div>

      <div data-reveal-item>
        <p class="section-kicker">Who We Are</p>
        <h2 id="about-heading" class="section-heading balance-text">Trusted Air Duct &amp; HVAC Cleaning Experts</h2>
        <p class="prose-measure prose-muted mt-md">
          GTA Duct Masters has been delivering certified air duct cleaning and HVAC cleaning services for over 15 years. Our team of licensed, background-checked technicians serves both residential homeowners and commercial property managers with the same commitment to excellence.
        </p>
        <p class="prose-measure prose-muted mt-md">
          We believe clean air is a right, not a luxury. Using state-of-the-art equipment including HEPA-filtered negative air machines and rotary brush systems, we eliminate dust, allergens, bacteria, and contaminants that conventional cleaning cannot reach.
        </p>

        <div class="parent-pillar-list">
          <div>
            <strong>Certified Technicians</strong>
            <p class="pillar-item-desc">Every technician is NADCA-certified and background-checked.</p>
          </div>
          <div>
            <strong>Affordable Upfront Pricing</strong>
            <p class="pillar-item-desc">Transparent flat-rate pricing with zero hidden fees.</p>
          </div>
          <div>
            <strong>24/7 Emergency Service &amp; Fast Response</strong>
            <p class="pillar-item-desc">Emergency HVAC cleaning available around the clock with Mon–Sun 7:00 AM – 9:00 PM scheduling.</p>
          </div>
        </div>

        <div class="flex-wrap-actions">
          <a href="${escapeHtml(isDedicatedPage ? rel('/contact/') : '#contact')}" class="btn-action btn-parent-primary">Get Your Free Estimate</a>
          ${
            isDedicatedPage
              ? ''
              : `<a href="${escapeHtml(rel('/about/'))}" data-page-transition class="btn-action btn-parent-outline">Read Full Company Profile</a>`
          }
        </div>
      </div>
    </div>
  </section>`;
}

function renderWhyUsSection(
  currentUrlPath: string,
  isDedicatedPage: boolean
): string {
  const rel = (target: string) => toRelativeUrl(currentUrlPath, target);
  const cards = PARENT_ADVANTAGES.map(
    (adv) => `        <article class="parent-why-card" data-reveal-item>
          <span class="parent-why-num tabular-nums">${escapeHtml(adv.number)}.</span>
          <h3>${escapeHtml(adv.title)}</h3>
          <p>${escapeHtml(adv.description)}</p>
        </article>`
  ).join('\n');

  return `<section class="section-pad" id="why-us" aria-labelledby="whyus-heading">
    <div class="container" data-reveal-group>
      <div class="section-head flex-wrap-between">
        <div>
          <p class="section-kicker">Our Advantage</p>
          <h2 id="whyus-heading" class="section-heading balance-text">Why Homeowners &amp; Businesses Choose GTA Duct Masters</h2>
          <p class="section-desc">Not all duct cleaning companies are created equal. Here is why thousands of customers trust us for their HVAC cleaning service.</p>
        </div>
        ${
          isDedicatedPage
            ? ''
            : `<a href="${escapeHtml(rel('/why-us/'))}" data-page-transition class="btn-action btn-parent-outline">View All Guarantees</a>`
        }
      </div>
      <div class="parent-why-grid">
${cards}
      </div>
    </div>
  </section>`;
}

function renderGallerySection(
  currentUrlPath: string,
  isDedicatedPage: boolean
): string {
  const rel = (target: string) => toRelativeUrl(currentUrlPath, target);
  const pairs = PARENT_GALLERY_PAIRS.map(
    (pair) => `        <article class="ba-card" data-reveal-item>
          <div class="ba-pair">
            <button type="button" class="ba-frame" data-lightbox-src="${escapeHtml(rel(pair.beforeSrc))}" data-lightbox-alt="${escapeHtml(pair.beforeAlt)}" aria-label="Enlarge before photo: ${escapeHtml(pair.caption)}">
              <img src="${escapeHtml(rel(pair.beforeSrc))}" alt="${escapeHtml(pair.beforeAlt)}" width="600" height="450" loading="lazy" />
              <span class="ba-caption-tag">Before</span>
            </button>
            <button type="button" class="ba-frame" data-lightbox-src="${escapeHtml(rel(pair.afterSrc))}" data-lightbox-alt="${escapeHtml(pair.afterAlt)}" aria-label="Enlarge after photo: ${escapeHtml(pair.caption)}">
              <img src="${escapeHtml(rel(pair.afterSrc))}"${pair.afterFallbackSrc ? ` data-fallback-src="${escapeHtml(rel(pair.afterFallbackSrc))}"` : ''} alt="${escapeHtml(pair.afterAlt)}" width="600" height="450" loading="lazy" decoding="async" />
              <span class="ba-caption-tag">After</span>
            </button>
          </div>
          <div class="ba-card-footer">
            <div>
              <span class="muted-note-xs">${escapeHtml(pair.category)} Inspection</span>
              <h3>${escapeHtml(pair.caption)}</h3>
            </div>
            <a href="${escapeHtml(isDedicatedPage ? rel('/contact/') : '#contact')}" class="text-arrow-link">Book &rarr;</a>
          </div>
        </article>`
  ).join('\n');

  return `<section class="section-pad surface-band" id="gallery" aria-labelledby="gallery-heading">
    <div class="container" data-reveal-group>
      <div class="section-head flex-wrap-between">
        <div>
          <p class="section-kicker">Verified Inspection Results</p>
          <h2 id="gallery-heading" class="section-heading balance-text">Before &amp; After Results</h2>
          <p class="section-desc">See the real difference our professional air duct cleaning and HVAC cleaning service makes. Select any photograph to enlarge.</p>
        </div>
        ${
          isDedicatedPage
            ? ''
            : `<a href="${escapeHtml(rel('/gallery/'))}" data-page-transition class="btn-action btn-parent-outline">Open Full Gallery</a>`
        }
      </div>
      <div class="ba-grid">
${pairs}
      </div>
    </div>

    <dialog class="gallery-dialog" id="gallery-lightbox" aria-label="Enlarged inspection photograph">
      <div class="gallery-dialog-bar">
        <p id="gallery-lightbox-caption" class="gallery-dialog-caption"></p>
        <button type="button" id="gallery-lightbox-close" class="btn-action btn-parent-light dialog-close-compact">Close</button>
      </div>
      <img id="gallery-lightbox-img" src="${escapeHtml(rel('/assets/images/gta/lightbox-placeholder.gif'))}" alt="Inspection detail" width="900" height="675" loading="lazy" decoding="async" />
    </dialog>
  </section>`;
}

function renderReviewsSection(
  currentUrlPath: string,
  isDedicatedPage: boolean
): string {
  const rel = (target: string) => toRelativeUrl(currentUrlPath, target);
  const cards = PARENT_REVIEWS.map(
    (rev) => `        <article class="review-card" data-review-category="${escapeHtml(rev.serviceTag)}" data-reveal-item aria-label="Verified review by ${escapeHtml(rev.author)}">
          <div class="review-top-row">
            <span class="review-stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            <span class="muted-note-xs">${escapeHtml(rev.serviceTag)}</span>
          </div>
          <blockquote class="review-quote">&ldquo;${escapeHtml(rev.quote)}&rdquo;</blockquote>
          <div class="review-author-row">
            <span class="review-initials" aria-hidden="true">${escapeHtml(rev.initials)}</span>
            <div>
              <strong class="review-author-name">${escapeHtml(rev.author)}</strong>
              <span class="muted-note-xs">${escapeHtml(rev.location)}</span>
            </div>
          </div>
        </article>`
  ).join('\n');

  return `<section class="section-pad" id="reviews" aria-labelledby="reviews-heading">
    <div class="container" data-reveal-group>
      <div class="section-head flex-wrap-between">
        <div>
          <p class="section-kicker">Customer Testimonials</p>
          <h2 id="reviews-heading" class="section-heading balance-text">What Our Customers Say</h2>
          <p class="section-desc">Over 347 five-star reviews from satisfied homeowners and commercial property managers across the Greater Toronto Area.</p>
        </div>
        ${
          isDedicatedPage
            ? `<p data-review-count class="muted-note-sm font-semibold">Showing 6 verified reviews</p>`
            : `<a href="${escapeHtml(rel('/reviews/'))}" data-page-transition class="btn-action btn-parent-outline">Read All Reviews</a>`
        }
      </div>

      <div class="segmented-bar" role="group" aria-label="Filter customer reviews by service">
        <button type="button" class="segmented-btn" data-review-filter="all" aria-pressed="true">All Reviews</button>
        <button type="button" class="segmented-btn" data-review-filter="Air Duct Cleaning" aria-pressed="false">Air Duct Cleaning</button>
        <button type="button" class="segmented-btn" data-review-filter="HVAC System Cleaning" aria-pressed="false">HVAC Cleaning</button>
        <button type="button" class="segmented-btn" data-review-filter="Dryer Vent Cleaning" aria-pressed="false">Dryer Vent</button>
        <button type="button" class="segmented-btn" data-review-filter="Commercial Cleaning" aria-pressed="false">Commercial</button>
      </div>

      <div class="reviews-grid">
${cards}
      </div>
    </div>
  </section>`;
}

function renderPartnerDirectorySection(currentUrlPath: string): string {
  const rel = (target: string) => toRelativeUrl(currentUrlPath, target);
  const items = LINKED_COMPANIES.map((company) => {
    const num = String(company.index).padStart(2, '0');
    return `        <a href="${escapeHtml(rel(company.homeUrl))}" class="network-directory-item" data-reveal-item>
          <div>
            <span class="network-directory-index tabular-nums">Partner Brand ${num}</span>
            <span class="network-directory-name">${escapeHtml(company.exactName)}</span>
          </div>
          <span class="network-directory-cta">Visit Home &rarr;</span>
        </a>`;
  }).join('\n');

  return `<section class="section-pad surface-alt-top" id="partner-network" aria-labelledby="network-heading">
    <div class="container" data-reveal-group>
      <div class="section-head">
        <p class="section-kicker">Dedicated Brand Ecosystem</p>
        <h2 id="network-heading" class="section-heading balance-text">Affiliated Air Duct &amp; HVAC Service Brands</h2>
        <p class="section-desc">Explore all 15 dedicated partner websites operating within our air duct and HVAC service network. Select any company below to open its dedicated Home page.</p>
      </div>
      <div class="network-directory-grid">
${items}
      </div>
    </div>
  </section>`;
}

function renderCtaBannerSection(): string {
  return `<section class="section-pad-sm parent-cta-banner" aria-labelledby="cta-banner-heading">
    <div class="container parent-cta-banner-inner">
      <div>
        <h2 id="cta-banner-heading">Ready for Cleaner, Healthier Air?</h2>
        <p>Book your professional air duct cleaning or HVAC service today. Same-day appointments available.</p>
      </div>
      <div class="flex-wrap-actions">
        <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="btn-action btn-parent-light tabular-nums">Call ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</a>
        <a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" target="_blank" rel="noopener noreferrer" class="btn-action btn-whatsapp-clean">WhatsApp Us Now</a>
      </div>
    </div>
  </section>`;
}

function renderContactSection(): string {
  return `<section class="section-pad" id="contact" aria-labelledby="contact-heading">
    <div class="container contact-split" data-reveal-group>
      <div data-reveal-item>
        <p class="section-kicker">Get In Touch</p>
        <h2 id="contact-heading" class="section-heading balance-text">Request Your Free Quote</h2>
        <p class="section-desc">Complete the inquiry form and we will follow up promptly, or call and WhatsApp us directly for immediate same-day scheduling.</p>

        <div class="contact-channel-list">
          <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="contact-channel-item">
            <strong>Call Us Anytime</strong>
            <span class="tabular-nums">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</span>
          </a>
          <a href="${escapeHtml(VERIFIED_CONTACT.emailHref)}" class="contact-channel-item">
            <strong>Email Address</strong>
            <span>${escapeHtml(VERIFIED_CONTACT.email)}</span>
          </a>
          <a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
            <strong>WhatsApp Direct Chat</strong>
            <span>Instant Quote &amp; Scheduling</span>
          </a>
          <div class="contact-channel-item">
            <strong>Hours of Operation</strong>
            <span>${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span>
          </div>
        </div>
      </div>

      <div data-reveal-item>
        ${renderQuoteFormBlock('GTA Duct Masters', 'Get a Free Quote in 60 Seconds', 'parent-quote')}
      </div>
    </div>
  </section>`;
}

function wrapParentDocument(meta: ParentPageMeta, mainContent: string): string {
  const rel = (target: string) => toRelativeUrl(meta.urlPath, target);
  const head = renderSeoHead({
    title: meta.title,
    description: meta.metaDescription,
    canonicalPath: meta.urlPath,
    siteName: 'GTA Duct Masters',
    ogImagePath: '/assets/images/gta/img1.jpeg',
    googleFontsUrl: PARENT_GOOGLE_FONTS,
    stylesheets: PARENT_STYLESHEETS,
    iconHref: '/assets/images/gta/site-icon.png',
    includeParentAggregateRating: true,
  });

  return `<!DOCTYPE html>
<html lang="en">
${head}
<body class="parent-body" data-motion-profile="parent-executive">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="page-transition-curtain" aria-hidden="true"></div>
  ${renderParentSocialRail()}
  ${renderParentHeader(meta.urlPath)}
  <main id="main-content">
    ${mainContent}
  </main>
  ${renderParentFooter(meta.urlPath)}
  <script src="${escapeHtml(rel('/assets/js/vendor/gsap.min.js'))}" defer></script>
  <script src="${escapeHtml(rel('/assets/js/vendor/ScrollTrigger.min.js'))}" defer></script>
  <script src="${escapeHtml(rel('/assets/js/navigation.js'))}" defer></script>
  <script src="${escapeHtml(rel('/assets/js/motion.js'))}" defer></script>
  <script src="${escapeHtml(rel('/assets/js/forms.js'))}" defer></script>
  <script src="${escapeHtml(rel('/assets/js/gallery-reviews.js'))}" defer></script>
</body>
</html>
`;
}

export function renderParentPage(meta: ParentPageMeta): string {
  const cur = meta.urlPath;
  const rel = (target: string) => toRelativeUrl(cur, target);

  if (meta.slug === '') {
    const heroHtml = `<section class="parent-hero" id="home" aria-labelledby="hero-heading">
      <div class="container parent-hero-grid">
        <div class="parent-hero-copy">
          <p class="parent-kicker" data-hero-animate>Certified Air Quality Specialists</p>
          <h1 id="hero-heading" class="parent-hero-title balance-text" data-hero-animate>
            Professional Air Duct Cleaning &amp; HVAC Cleaning Service
          </h1>
          <p class="parent-hero-lead" data-hero-animate>
            Breathe cleaner air starting today. Our certified technicians deliver expert air duct cleaning, HVAC system cleaning, and dryer vent cleaning — fast, affordable, and guaranteed.
          </p>
          <div class="meta-line parent-hero-highlights" data-hero-animate>
            <span>4.9/5 Rating (347+ Reviews)</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span>Licensed &amp; Insured</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span>Same-Day Booking</span>
            <span class="meta-sep" aria-hidden="true">·</span>
            <span>No Hidden Fees</span>
          </div>
          <div class="parent-hero-ctas" data-hero-animate>
            <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="btn-action btn-parent-light tabular-nums">
              Call Now — ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}
            </a>
            <a href="${escapeHtml(rel('/contact/'))}" data-page-transition class="btn-action btn-hero-ghost-white">
              Get Free Estimate
            </a>
            <a href="${escapeHtml(VERIFIED_CONTACT.whatsappPricingUrl)}" target="_blank" rel="noopener noreferrer" class="btn-action btn-whatsapp-clean">
              WhatsApp Us
            </a>
          </div>
        </div>
        <div class="media-fallback-frame parent-hero-media" data-hero-media>
          <img src="${escapeHtml(rel('/assets/images/gta/img1.jpeg'))}" alt="Professional HVAC technician performing air duct cleaning service" width="900" height="640" loading="eager" />
        </div>
      </div>
    </section>`;

    return wrapParentDocument(
      meta,
      [
        heroHtml,
        renderKpiStripSection(),
        renderServicesSection(cur, false),
        renderAboutSection(cur, false),
        renderWhyUsSection(cur, false),
        renderGallerySection(cur, false),
        renderReviewsSection(cur, false),
        renderPartnerDirectorySection(cur),
        renderCtaBannerSection(),
        renderContactSection(),
      ].join('\n')
    );
  }

  if (meta.slug === 'services') {
    const banner = `<section class="parent-page-banner">
      <div class="container">
        <p class="parent-kicker" data-hero-animate>GTA Duct Masters · Service Capabilities</p>
        <h1 class="balance-text" data-hero-animate>Complete Residential &amp; Commercial HVAC Cleaning</h1>
        <p data-hero-animate>NADCA-certified air duct extraction, evaporator and condenser coil cleaning, dryer vent lint hazard clearing, and flexible commercial scheduling.</p>
      </div>
    </section>`;
    return wrapParentDocument(
      meta,
      [banner, renderServicesSection(cur, true), renderCtaBannerSection()].join('\n')
    );
  }

  if (meta.slug === 'about') {
    const banner = `<section class="parent-page-banner">
      <div class="container">
        <p class="parent-kicker" data-hero-animate>GTA Duct Masters · Company Profile</p>
        <h1 class="balance-text" data-hero-animate>Over 15 Years of Certified Air Duct &amp; HVAC Care</h1>
        <p data-hero-animate>Licensed, background-checked technicians equipped with HEPA-filtered negative air machines and rotary brush systems.</p>
      </div>
    </section>`;
    return wrapParentDocument(
      meta,
      [
        banner,
        renderKpiStripSection(),
        renderAboutSection(cur, true),
        renderPartnerDirectorySection(cur),
        renderCtaBannerSection(),
      ].join('\n')
    );
  }

  if (meta.slug === 'why-us') {
    const banner = `<section class="parent-page-banner">
      <div class="container">
        <p class="parent-kicker" data-hero-animate>GTA Duct Masters · Service Standards</p>
        <h1 class="balance-text" data-hero-animate>Why Homeowners &amp; Facility Managers Choose Us</h1>
        <p data-hero-animate>Same-day appointments, itemized flat-rate quotes before work begins, NADCA-certified technicians, and our 100% satisfaction guarantee.</p>
      </div>
    </section>`;
    return wrapParentDocument(
      meta,
      [banner, renderWhyUsSection(cur, true), renderKpiStripSection(), renderCtaBannerSection()].join('\n')
    );
  }

  if (meta.slug === 'gallery') {
    const banner = `<section class="parent-page-banner">
      <div class="container">
        <p class="parent-kicker" data-hero-animate>GTA Duct Masters · Inspection Portfolio</p>
        <h1 class="balance-text" data-hero-animate>Before &amp; After Ductwork Inspection Gallery</h1>
        <p data-hero-animate>Inspect real residential air duct, commercial HVAC, and dryer vent cleaning outcomes captured during service appointments.</p>
      </div>
    </section>`;
    return wrapParentDocument(
      meta,
      [banner, renderGallerySection(cur, true), renderCtaBannerSection()].join('\n')
    );
  }

  if (meta.slug === 'reviews') {
    const banner = `<section class="parent-page-banner">
      <div class="container">
        <p class="parent-kicker" data-hero-animate>GTA Duct Masters · Verified Client Feedback</p>
        <h1 class="balance-text" data-hero-animate>4.9 / 5 Rating Across 347+ Customer Reviews</h1>
        <p data-hero-animate>Read verified feedback from residential homeowners and commercial property managers across Toronto and the GTA.</p>
      </div>
    </section>`;
    return wrapParentDocument(
      meta,
      [banner, renderReviewsSection(cur, true), renderCtaBannerSection()].join('\n')
    );
  }

  // meta.slug === 'contact'
  const banner = `<section class="parent-page-banner">
    <div class="container">
      <p class="parent-kicker" data-hero-animate>GTA Duct Masters · Free Estimate</p>
      <h1 class="balance-text" data-hero-animate>Request Your Free Air Duct &amp; HVAC Quote</h1>
      <p data-hero-animate>Available Monday through Sunday, 7:00 AM – 9:00 PM. Call ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}, message on WhatsApp, or submit the online form below.</p>
    </div>
  </section>`;
  return wrapParentDocument(meta, [banner, renderContactSection()].join('\n'));
}

export function renderNotFoundPage(): string {
  const head = renderSeoHead({
    title: 'Page Not Found | GTA Duct Masters',
    description:
      'The requested page could not be found. Return to GTA Duct Masters or request a free air duct and HVAC cleaning quote.',
    canonicalPath: '/',
    siteName: 'GTA Duct Masters',
    ogImagePath: '/assets/images/gta/img1.jpeg',
    googleFontsUrl: PARENT_GOOGLE_FONTS,
    stylesheets: PARENT_STYLESHEETS,
    iconHref: '/assets/images/gta/site-icon.png',
    includeParentAggregateRating: false,
    useRootRelativeAssets: true,
  });

  return `<!DOCTYPE html>
<html lang="en">
${head}
<body class="parent-body">
  ${renderParentHeader('', true)}
  <main id="main-content" class="section-pad">
    <div class="container not-found-box">
      <p class="section-kicker">HTTP 404</p>
      <h1 class="section-heading mb-md">The Requested Page Was Not Found</h1>
      <p class="prose-muted mb-xl">
        Please verify the URL or use the links below to return to the GTA Duct Masters homepage or contact our team directly.
      </p>
      <div class="flex-center-actions">
        <a href="/" class="btn-action btn-parent-primary">Return to Homepage</a>
        <a href="/contact/" class="btn-action btn-parent-outline">Request Free Quote</a>
      </div>
    </div>
  </main>
  ${renderParentFooter('', true)}
  <script src="/assets/js/navigation.js" defer></script>
</body>
</html>
`;
}
