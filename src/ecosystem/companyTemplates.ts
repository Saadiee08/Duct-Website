import { renderQuoteFormBlock } from './parentTemplates.ts';
import { escapeHtml } from './security.ts';
import { renderSeoHead } from './seo.ts';
import type { CompanyTheme } from './themes.ts';
import { VERIFIED_CONTACT, VERIFIED_SERVICES } from './verifiedData.ts';

function isDarkHex(hex: string): boolean {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
}

/**
 * Renders the brand header with STRICTLY two navigation items: Home | About Us,
 * plus 1 primary call/inquiry action (Top Bar Contract).
 */
function renderCompanyHeader(
  theme: CompanyTheme,
  activePage: 'home' | 'about'
): string {
  const { company, headerVariant } = theme;
  const homeCurrent = activePage === 'home' ? ' aria-current="page"' : '';
  const aboutCurrent = activePage === 'about' ? ' aria-current="page"' : '';
  const quoteHref = activePage === 'home' ? '#inquiry' : `${company.homeUrl}#inquiry`;

  const navMarkup = `<nav class="brand-nav" aria-label="Primary navigation">
        <a href="${escapeHtml(company.homeUrl)}" data-page-transition${homeCurrent}>Home</a>
        <a href="${escapeHtml(company.aboutUrl)}" data-page-transition${aboutCurrent}>About Us</a>
      </nav>`;

  const wordmarkMarkup = `<a href="${escapeHtml(company.homeUrl)}" class="brand-wordmark" data-page-transition>${escapeHtml(company.exactName)}</a>`;

  const ctaZone = `<div class="brand-header-cta-zone">
        <a href="${escapeHtml(quoteHref)}" class="btn-action btn-brand-primary header-cta-desktop">Request Quote</a>
        <button type="button" class="brand-mobile-toggle" data-nav-toggle aria-expanded="false" aria-controls="mobile-nav-drawer" aria-label="Toggle navigation menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>`;

  const rowInner =
    headerVariant === 'centered-crest'
      ? `${navMarkup}\n      ${wordmarkMarkup}\n      ${ctaZone}`
      : `${wordmarkMarkup}\n      ${navMarkup}\n      ${ctaZone}`;

  return `<header class="brand-header brand-header--${headerVariant}">
    <div class="container brand-header-row">
      ${rowInner}
    </div>
    <div class="mobile-drawer" id="mobile-nav-drawer" hidden>
      <nav class="mobile-drawer-links" aria-label="Mobile navigation">
        <a href="${escapeHtml(company.homeUrl)}" data-page-transition${homeCurrent}>Home</a>
        <a href="${escapeHtml(company.aboutUrl)}" data-page-transition${aboutCurrent}>About Us</a>
      </nav>
      <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="btn-action btn-brand-primary tabular-nums w-full">
        Call ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}
      </a>
    </div>
  </header>`;
}

/**
 * Renders 10 distinct Hero layout compositions across the 15 linked companies.
 */
function renderCompanyHero(theme: CompanyTheme): string {
  const { company, heroVariant, palette } = theme;
  const darkSurfaceClass = isDarkHex(palette.heroBg) ? ' hero-dark-surface' : '';

  const actionsHtml = `<div class="brand-hero-actions" data-hero-animate>
          <a href="#inquiry" class="btn-action btn-hero-primary">Request Free Quote</a>
          <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="btn-action btn-hero-secondary tabular-nums">Call ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</a>
        </div>`;

  if (heroVariant === 'fullbleed-framed') {
    return `<section class="brand-hero hero-fullbleed hero-dark-surface" aria-labelledby="hero-title">
      <div class="hero-fullbleed-bg brand-media-frame" aria-hidden="true">
        <img src="${escapeHtml(theme.heroImage)}" alt="" width="1600" height="900" loading="eager" referrerpolicy="no-referrer" />
        <div class="hero-fullbleed-scrim"></div>
      </div>
      <div class="container">
        <div class="hero-fullbleed-frame">
          <p class="brand-hero-kicker" data-hero-animate>${escapeHtml(company.exactName)} · Air Duct &amp; HVAC Care</p>
          <h1 id="hero-title" class="brand-hero-h1" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
          <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
          ${actionsHtml}
        </div>
      </div>
    </section>`;
  }

  if (heroVariant === 'panoramic-monograph') {
    return `<section class="brand-hero hero-panoramic${darkSurfaceClass}" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-panoramic-head">
          <p class="brand-hero-kicker" data-hero-animate>${escapeHtml(company.exactName)} · Residential &amp; Commercial</p>
          <h1 id="hero-title" class="brand-hero-h1" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
          <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
          ${actionsHtml}
        </div>
        <div class="media-fallback-frame brand-media-frame hero-panoramic-media" data-hero-media>
          <img src="${escapeHtml(theme.heroImage)}" alt="${escapeHtml(theme.heroImageAlt)}" width="1440" height="620" loading="eager" referrerpolicy="no-referrer" />
        </div>
      </div>
    </section>`;
  }

  if (heroVariant === 'pillar-blueprint') {
    return `<section class="brand-hero${darkSurfaceClass}" aria-labelledby="hero-title">
      <div class="container hero-blueprint">
        <div>
          <p class="brand-hero-kicker" data-hero-animate>${escapeHtml(company.exactName)}</p>
          <h1 id="hero-title" class="brand-hero-h1" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
          <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
          ${actionsHtml}
          <div class="hero-blueprint-specs" data-hero-animate>
            <div>
              <strong>Service Hours</strong>
              <span>${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span>
            </div>
            <div>
              <strong>Direct Dispatch</strong>
              <span class="tabular-nums">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</span>
            </div>
          </div>
        </div>
        <div class="media-fallback-frame brand-media-frame hero-framed-media" data-hero-media>
          <img src="${escapeHtml(theme.heroImage)}" alt="${escapeHtml(theme.heroImageAlt)}" width="960" height="640" loading="eager" referrerpolicy="no-referrer" />
        </div>
      </div>
    </section>`;
  }

  if (heroVariant === 'midnight-marquee') {
    return `<section class="brand-hero hero-marquee${darkSurfaceClass}" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-marquee-top">
          <div>
            <p class="brand-hero-kicker" data-hero-animate>${escapeHtml(company.exactName)}</p>
            <h1 id="hero-title" class="brand-hero-h1 mb-0" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
          </div>
          <div>
            <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
            ${actionsHtml}
          </div>
        </div>
        <div class="media-fallback-frame brand-media-frame hero-marquee-plate" data-hero-media>
          <img src="${escapeHtml(theme.heroImage)}" alt="${escapeHtml(theme.heroImageAlt)}" width="1400" height="600" loading="eager" referrerpolicy="no-referrer" />
        </div>
      </div>
    </section>`;
  }

  if (heroVariant === 'stark-gallery') {
    return `<section class="brand-hero hero-stark${darkSurfaceClass}" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-stark-grid">
          <div>
            <p class="brand-hero-kicker" data-hero-animate>${escapeHtml(company.exactName)} — Ventilation &amp; HVAC Monograph</p>
            <h1 id="hero-title" class="brand-hero-h1" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
            <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
            ${actionsHtml}
          </div>
          <div class="hero-stark-aside" data-hero-animate>
            <p class="hero-stark-kicker">Verified Service Scope</p>
            <p class="hero-stark-list">Air Duct Cleaning · HVAC System Cleaning · Dryer Vent Cleaning · Commercial Cleaning</p>
          </div>
        </div>
        <div class="media-fallback-frame brand-media-frame hero-panoramic-media hero-stark-plate" data-hero-media>
          <img src="${escapeHtml(theme.heroImage)}" alt="${escapeHtml(theme.heroImageAlt)}" width="1440" height="620" loading="eager" referrerpolicy="no-referrer" />
        </div>
      </div>
    </section>`;
  }

  if (heroVariant === 'broadsheet-lead') {
    return `<section class="brand-hero hero-broadsheet${darkSurfaceClass}" aria-labelledby="hero-title">
      <div class="container">
        <div class="broadsheet-dateline">
          <span>${escapeHtml(company.exactName)}</span>
          <span>Residential &amp; Commercial Air Hygiene</span>
          <span class="tabular-nums">${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span>
        </div>
        <div class="hero-split-grid hero-broadsheet-split">
          <div class="hero-split-copy">
            <h1 id="hero-title" class="brand-hero-h1" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
            <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
            ${actionsHtml}
          </div>
          <div class="media-fallback-frame brand-media-frame hero-framed-media" data-hero-media>
            <img src="${escapeHtml(theme.heroImage)}" alt="${escapeHtml(theme.heroImageAlt)}" width="960" height="640" loading="eager" referrerpolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>`;
  }

  const reverseClass =
    heroVariant === 'craftsman-split' ? ' hero-split-grid--reverse' : '';
  const copyBlock = `<div class="hero-split-copy">
          <p class="brand-hero-kicker" data-hero-animate>${escapeHtml(company.exactName)} · Air Duct &amp; HVAC Services</p>
          <h1 id="hero-title" class="brand-hero-h1" data-hero-animate>${escapeHtml(theme.homeHeadline)}</h1>
          <p class="brand-hero-lead" data-hero-animate>${escapeHtml(theme.homeIntroduction)}</p>
          ${actionsHtml}
        </div>`;

  const mediaBlock = `<figure class="media-fallback-frame brand-media-frame hero-framed-media" data-hero-media>
          <img src="${escapeHtml(theme.heroImage)}" alt="${escapeHtml(theme.heroImageAlt)}" width="960" height="680" loading="eager" referrerpolicy="no-referrer" />
        </figure>`;

  return `<section class="brand-hero${darkSurfaceClass}" aria-labelledby="hero-title">
      <div class="container hero-split-grid${reverseClass}">
        ${heroVariant === 'craftsman-split' ? `${mediaBlock}\n        ${copyBlock}` : `${copyBlock}\n        ${mediaBlock}`}
      </div>
    </section>`;
}

/**
 * Renders 10 distinct Services section layouts across the 15 linked companies.
 */
function renderCompanyServicesSection(theme: CompanyTheme): string {
  const { servicesVariant, company } = theme;

  const sectionHeader = `<div class="brand-section-head">
        <div>
          <p class="kicker-accent">Verified Service Capabilities</p>
          <h2 id="services-heading" class="brand-section-title">Air Duct, Dryer Vent &amp; HVAC Cleaning</h2>
          <p class="brand-section-sub">Complete mechanical cleaning services delivered by ${escapeHtml(company.exactName)} across residential and commercial ventilation systems.</p>
        </div>
        <a href="${escapeHtml(company.aboutUrl)}" data-page-transition class="btn-action btn-brand-outline">About ${escapeHtml(company.exactName)}</a>
      </div>`;

  if (servicesVariant === 'hairline-rows') {
    const rows = VERIFIED_SERVICES.map((svc, idx) => {
      const featuresInline = svc.features.join(' · ');
      return `        <article class="svc-hairline-row" data-reveal-item>
          <span class="svc-index tabular-nums">0${idx + 1}.</span>
          <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
          <div>
            <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
            <p class="svc-inline-features">${escapeHtml(featuresInline)}</p>
          </div>
          <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="btn-action btn-brand-outline">Inquire</a>
        </article>`;
    }).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-hairline-list">
${rows}
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'asymmetric-bento') {
    const cards = VERIFIED_SERVICES.map((svc, idx) => {
      const leadClass = idx === 0 ? ' svc-bento-card--lead' : '';
      const bullets = svc.features
        .map((f) => `              <li>${escapeHtml(f)}</li>`)
        .join('\n');
      return `        <article class="svc-bento-card${leadClass}" data-reveal-item>
          ${
            idx === 0
              ? `<div class="media-fallback-frame brand-media-frame bento-lead-media">
              <img src="${escapeHtml(theme.secondaryImage)}" alt="${escapeHtml(theme.secondaryImageAlt)}" width="960" height="420" loading="lazy" referrerpolicy="no-referrer" />
            </div>`
              : ''
          }
          <span class="svc-index tabular-nums">0${idx + 1}. Core Capability</span>
          <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
          <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
          <ul class="svc-feature-list">
${bullets}
          </ul>
          <div class="svc-card-cta-bottom">
            <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Request Quote &rarr;</a>
          </div>
        </article>`;
    }).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-bento-grid">
${cards}
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'four-pillar-columns') {
    const pillars = VERIFIED_SERVICES.map((svc, idx) => {
      const bullets = svc.features
        .map((f) => `              <li>${escapeHtml(f)}</li>`)
        .join('\n');
      return `        <article class="svc-pillar-card" data-reveal-item>
          <span class="svc-index tabular-nums">0${idx + 1}</span>
          <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
          <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
          <ul class="svc-feature-list">
${bullets}
          </ul>
          <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Select Service &rarr;</a>
        </article>`;
    }).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-pillars-grid">
${pillars}
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'alternating-editorial') {
    const rows = VERIFIED_SERVICES.map((svc, idx) => {
      const bullets = svc.features
        .map((f) => `              <li>${escapeHtml(f)}</li>`)
        .join('\n');
      return `        <article class="svc-alt-row" data-reveal-item>
          <div class="media-fallback-frame brand-media-frame svc-alt-media">
            <img src="${escapeHtml(svc.imageSrc)}" alt="${escapeHtml(svc.imageAlt)}" width="800" height="500" loading="lazy" referrerpolicy="no-referrer" />
          </div>
          <div>
            <span class="svc-index tabular-nums">0${idx + 1}. Service Line</span>
            <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
            <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
            <ul class="svc-feature-list">
${bullets}
            </ul>
            <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="btn-action btn-brand-outline">Request ${escapeHtml(svc.title)} Quote</a>
          </div>
        </article>`;
    }).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-alternating-stack">
${rows}
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'numbered-index') {
    const listItems = VERIFIED_SERVICES.map(
      (svc, idx) => `          <article class="svc-index-row" data-reveal-item>
            <div class="svc-index-row-head">
              <h3 class="svc-title"><span class="tabular-nums svc-index-num">0${idx + 1}</span>${escapeHtml(svc.title)}</h3>
              <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Inquire &rarr;</a>
            </div>
            <p class="svc-summary mt-sm">${escapeHtml(svc.shortSummary)}</p>
            <p class="muted-note-sm mt-sm">${escapeHtml(svc.features.join(' · '))}</p>
          </article>`
    ).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-index-split">
          <div class="svc-index-list-top">
${listItems}
          </div>
          <div class="media-fallback-frame brand-media-frame framed-4x3-plate">
            <img src="${escapeHtml(theme.secondaryImage)}" alt="${escapeHtml(theme.secondaryImageAlt)}" width="800" height="600" loading="lazy" referrerpolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'dossier-cards' || servicesVariant === 'bookplate-grid') {
    const cards = VERIFIED_SERVICES.map((svc, idx) => {
      const bullets = svc.features
        .map((f) => `              <li>${escapeHtml(f)}</li>`)
        .join('\n');
      return `        <article class="svc-bookplate-card" data-reveal-item>
          <span class="svc-index tabular-nums">Section 0${idx + 1}</span>
          <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
          <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
          <ul class="svc-feature-list">
${bullets}
          </ul>
          <div class="svc-card-cta-bottom">
            <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Schedule ${escapeHtml(svc.title)} &rarr;</a>
          </div>
        </article>`;
    }).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-bookplate-grid">
${cards}
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'broadsheet-salience') {
    const lead = VERIFIED_SERVICES[0]!;
    const secondary = VERIFIED_SERVICES.slice(1)
      .map(
        (svc, idx) => `          <article class="svc-broadsheet-item" data-reveal-item>
            <span class="svc-index tabular-nums">0${idx + 2}. Service Capability</span>
            <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
            <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
            <p class="svc-broadsheet-checks">${escapeHtml(svc.features.join(' · '))}</p>
            <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Request Quote &rarr;</a>
          </article>`
      )
      .join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-broadsheet-grid">
          <article class="broadsheet-lead-card" data-reveal-item>
            <div class="media-fallback-frame brand-media-frame broadsheet-lead-media">
              <img src="${escapeHtml(theme.secondaryImage)}" alt="${escapeHtml(theme.secondaryImageAlt)}" width="900" height="506" loading="lazy" referrerpolicy="no-referrer" />
            </div>
            <span class="svc-index tabular-nums">01. Primary Service</span>
            <h3 class="svc-title">${escapeHtml(lead.title)}</h3>
            <p class="svc-summary">${escapeHtml(lead.shortSummary)}</p>
            <p class="broadsheet-lead-checks">${escapeHtml(lead.features.join(' · '))}</p>
            <a href="#inquiry" data-select-service="${escapeHtml(lead.formOptionValue)}" class="btn-action btn-brand-primary">Request Air Duct Quote</a>
          </article>
          <div class="svc-broadsheet-side">
${secondary}
          </div>
        </div>
      </div>
    </section>`;
  }

  if (servicesVariant === 'tabular-directory') {
    const rows = VERIFIED_SERVICES.map(
      (svc, idx) => `            <tr data-reveal-item>
              <td class="tabular-nums svc-td-num">0${idx + 1}</td>
              <td><strong class="svc-td-name">${escapeHtml(svc.title)}</strong></td>
              <td class="svc-td-scope">${escapeHtml(svc.shortSummary)}</td>
              <td class="svc-td-checks">${escapeHtml(svc.features.join(' · '))}</td>
              <td><a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Quote &rarr;</a></td>
            </tr>`
    ).join('\n');

    return `<section class="section-pad" aria-labelledby="services-heading">
      <div class="container" data-reveal-group>
        ${sectionHeader}
        <div class="svc-table-wrap">
          <table class="svc-spec-table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Service</th>
                <th scope="col">Verified Scope</th>
                <th scope="col">Included Checks</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;
  }

  // Default: editorial-ledger-2x2
  const cells = VERIFIED_SERVICES.map((svc, idx) => {
    const bullets = svc.features
      .map((f) => `              <li>${escapeHtml(f)}</li>`)
      .join('\n');
    return `        <article class="svc-ledger-cell" data-reveal-item>
          <span class="svc-index tabular-nums">0${idx + 1}.</span>
          <h3 class="svc-title">${escapeHtml(svc.title)}</h3>
          <p class="svc-summary">${escapeHtml(svc.shortSummary)}</p>
          <ul class="svc-feature-list">
${bullets}
          </ul>
          <div class="svc-card-cta-bottom">
            <a href="#inquiry" data-select-service="${escapeHtml(svc.formOptionValue)}" class="text-arrow-link">Request ${escapeHtml(svc.title)} Quote &rarr;</a>
          </div>
        </article>`;
  }).join('\n');

  return `<section class="section-pad" aria-labelledby="services-heading">
    <div class="container" data-reveal-group>
      ${sectionHeader}
      <div class="svc-ledger-grid">
${cells}
      </div>
    </div>
  </section>`;
}

function renderCompanyOverviewAndInquirySection(theme: CompanyTheme): string {
  const { company } = theme;
  return `<section class="section-pad surface-alt-top" aria-labelledby="overview-heading">
    <div class="container hero-split-grid py-0" data-reveal-group>
      <div class="hero-split-copy" data-reveal-item>
        <p class="kicker-accent">Mechanical Hygiene &amp; Care</p>
        <h2 id="overview-heading" class="brand-section-title mb-md">${escapeHtml(company.exactName)} Service Approach</h2>
        <p class="prose-measure prose-muted mb-md">
          ${escapeHtml(theme.methodologyStatement)}
        </p>
        <p class="prose-measure prose-muted mb-lg">
          Whether servicing residential supply and return ducts, cleaning HVAC evaporator coils and blowers, clearing lint-obstructed dryer vents, or coordinating after-hours commercial maintenance, every appointment begins with clear, upfront communication.
        </p>
        <div>
          <a href="${escapeHtml(company.aboutUrl)}" data-page-transition class="btn-action btn-brand-outline">Read More on About Us &rarr;</a>
        </div>
      </div>
      <div class="media-fallback-frame brand-media-frame framed-4x3-plate" data-reveal-item>
        <img src="${escapeHtml(theme.secondaryImage)}" alt="${escapeHtml(theme.secondaryImageAlt)}" width="800" height="600" loading="lazy" referrerpolicy="no-referrer" />
      </div>
    </div>
  </section>

  <section class="section-pad" id="inquiry" aria-labelledby="inquiry-heading">
    <div class="container contact-split" data-reveal-group>
      <div data-reveal-item>
        <p class="kicker-accent">Direct Inquiry</p>
        <h2 id="inquiry-heading" class="brand-section-title">Request a Quote from ${escapeHtml(company.exactName)}</h2>
        <p class="brand-section-sub">Reach us directly by phone, email, WhatsApp, or submit the online quote inquiry form.</p>

        <div class="contact-channel-list">
          <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="contact-channel-item">
            <strong>Direct Telephone</strong>
            <span class="tabular-nums">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</span>
          </a>
          <a href="${escapeHtml(VERIFIED_CONTACT.emailHref)}" class="contact-channel-item">
            <strong>Email Dispatch</strong>
            <span>${escapeHtml(VERIFIED_CONTACT.email)}</span>
          </a>
          <a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
            <strong>WhatsApp Messaging</strong>
            <span>Instant Quote Support</span>
          </a>
          <div class="contact-channel-item">
            <strong>Operating Hours</strong>
            <span>${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span>
          </div>
        </div>
      </div>

      <div data-reveal-item>
        ${renderQuoteFormBlock(company.exactName, 'Request Your Free Estimate', `${company.slug}-quote`)}
      </div>
    </div>
  </section>`;
}

/**
 * Renders 10 distinct About Us layouts across the 15 linked companies.
 * Strictly factual: zero invented histories, founding years, fake team members, or awards.
 */
function renderCompanyAboutMain(theme: CompanyTheme): string {
  const { company, aboutVariant, palette } = theme;
  const darkSurfaceClass = isDarkHex(palette.heroBg) ? ' hero-dark-surface' : '';

  const introBanner = `<section class="brand-hero about-banner-pad${darkSurfaceClass}" aria-labelledby="about-h1">
    <div class="container">
      <p class="brand-hero-kicker" data-hero-animate>About Us · ${escapeHtml(company.exactName)}</p>
      <h1 id="about-h1" class="brand-hero-h1 about-banner-h1" data-hero-animate>${escapeHtml(theme.aboutHeadline)}</h1>
      <p class="brand-hero-lead mb-0" data-hero-animate>${escapeHtml(theme.aboutIntroduction)}</p>
    </div>
  </section>`;

  const serviceDefinitions = VERIFIED_SERVICES.map(
    (svc) => `        <div class="spec-dl-row" data-reveal-item>
          <dt>${escapeHtml(svc.title)}</dt>
          <dd>${escapeHtml(svc.technicalFocus)} Key deliverables include: ${escapeHtml(svc.features.join(', ').toLowerCase())}.</dd>
        </div>`
  ).join('\n');

  let bodySection: string;

  if (aboutVariant === 'dropcap-margin-notes' || aboutVariant === 'asymmetric-monograph') {
    bodySection = `<section class="section-pad">
      <div class="container about-monograph-grid" data-reveal-group>
        <div data-reveal-item>
          <p class="${aboutVariant === 'dropcap-margin-notes' ? 'dropcap-paragraph ' : ''}prose-measure prose-ink mb-lg">
            ${escapeHtml(company.exactName)} provides dedicated air duct cleaning, comprehensive HVAC system cleaning, dryer vent lint removal, and commercial ventilation maintenance. Every service visit is structured to clear settled dust, particulate buildup, and airflow obstructions from critical heating, cooling, and exhaust pathways.
          </p>
          <p class="prose-measure prose-muted mb-xl">
            ${escapeHtml(theme.methodologyStatement)} We coordinate directly with homeowners and commercial property operators to deliver clear, itemized service estimates and flexible scheduling seven days a week.
          </p>
          <div class="media-fallback-frame brand-media-frame framed-16x9-plate">
            <img src="${escapeHtml(theme.aboutImage)}" alt="${escapeHtml(theme.aboutImageAlt)}" width="960" height="540" loading="lazy" referrerpolicy="no-referrer" />
          </div>
        </div>
        <aside class="about-sidebar-stack" data-reveal-item>
          <div class="about-margin-note">
            <h2 class="about-note-heading">Verified Service Scope</h2>
            <p class="about-note-body">
              Air Duct Cleaning · HVAC System Cleaning · Dryer Vent Cleaning · Commercial Cleaning
            </p>
          </div>
          <div class="about-margin-note">
            <h2 class="about-note-heading">Direct Contact &amp; Hours</h2>
            <p class="tabular-nums about-note-phone">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</p>
            <p class="about-note-email">${escapeHtml(VERIFIED_CONTACT.email)}</p>
            <p class="muted-note-sm mb-md">${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</p>
            <a href="${escapeHtml(company.homeUrl)}#inquiry" data-page-transition class="btn-action btn-brand-primary w-full">Request Quote on Home</a>
          </div>
        </aside>
      </div>
    </section>`;
  } else if (aboutVariant === 'heritage-pullquote' || aboutVariant === 'journal-two-column') {
    bodySection = `<section class="section-pad">
      <div class="container" data-reveal-group>
        <div class="journal-columns" data-reveal-item>
          <p class="prose-measure prose-ink">
            ${escapeHtml(company.exactName)} focuses on practical, thorough mechanical hygiene across residential homes and commercial properties. Over time, supply trunks, return plenums, evaporator coils, and dryer exhaust conduits accumulate dust, lint, and airborne debris that restrict airflow.
          </p>
          <p class="prose-measure prose-muted">
            ${escapeHtml(theme.methodologyStatement)} By addressing the complete system—ductwork, coils, blowers, filtration checks, and dryer vent runs—we help maintain clean indoor air circulation and dependable HVAC operation.
          </p>
        </div>

        <blockquote class="editorial-pullquote" data-reveal-item>
          &ldquo;Clean indoor air begins with methodical inspection, controlled vacuum extraction, and unobstructed ventilation pathways.&rdquo;
        </blockquote>

        <div class="media-fallback-frame brand-media-frame framed-21x9-plate" data-reveal-item>
          <img src="${escapeHtml(theme.aboutImage)}" alt="${escapeHtml(theme.aboutImageAlt)}" width="1320" height="565" loading="lazy" referrerpolicy="no-referrer" />
        </div>
      </div>
    </section>`;
  } else {
    bodySection = `<section class="section-pad">
      <div class="container hero-split-grid py-0" data-reveal-group>
        <div class="hero-split-copy" data-reveal-item>
          <h2 class="brand-section-title mb-md">Overview of ${escapeHtml(company.exactName)}</h2>
          <p class="prose-measure prose-muted mb-md">
            ${escapeHtml(company.exactName)} delivers residential and commercial air duct cleaning, HVAC system cleaning, and dryer vent maintenance. Our work centers on removing accumulated dust, lint hazards, and mechanical fouling with clear upfront estimates.
          </p>
          <p class="prose-measure prose-muted mb-lg">
            ${escapeHtml(theme.methodologyStatement)}
          </p>
          <div class="flex-wrap-actions">
            <a href="${escapeHtml(company.homeUrl)}#inquiry" data-page-transition class="btn-action btn-brand-primary">Request a Free Quote</a>
            <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="btn-action btn-brand-outline tabular-nums">Call ${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</a>
          </div>
        </div>
        <div class="media-fallback-frame brand-media-frame framed-4x3-plate" data-reveal-item>
          <img src="${escapeHtml(theme.aboutImage)}" alt="${escapeHtml(theme.aboutImageAlt)}" width="840" height="630" loading="lazy" referrerpolicy="no-referrer" />
        </div>
      </div>
    </section>`;
  }

  const technicalScopeSection = `<section class="section-pad surface-top" aria-labelledby="scope-heading">
    <div class="container" data-reveal-group>
      <div class="brand-section-head">
        <div>
          <p class="kicker-accent">Technical Service Standards</p>
          <h2 id="scope-heading" class="brand-section-title">Core Ventilation &amp; HVAC Disciplines</h2>
        </div>
        <a href="${escapeHtml(company.homeUrl)}" data-page-transition class="btn-action btn-brand-outline">&larr; Return to Home</a>
      </div>
      <dl class="spec-dl">
${serviceDefinitions}
      </dl>
    </div>
  </section>`;

  return `${introBanner}\n${bodySection}\n${technicalScopeSection}`;
}

function renderCompanyFooter(theme: CompanyTheme): string {
  const { company, footerVariant } = theme;
  return `<footer class="brand-footer brand-footer--${footerVariant}">
    <div class="container">
      <div class="brand-footer-grid">
        <div>
          <a href="${escapeHtml(company.homeUrl)}" class="brand-wordmark brand-wordmark--footer" data-page-transition>${escapeHtml(company.exactName)}</a>
          <p class="brand-footer-muted footer-desc-measure">
            Professional residential and commercial air duct cleaning, HVAC system cleaning, and dryer vent maintenance.
          </p>
        </div>

        <div>
          <h3 class="footer-heading-sm">Navigation</h3>
          <nav class="brand-footer-nav" aria-label="Footer navigation">
            <a href="${escapeHtml(company.homeUrl)}" data-page-transition>Home</a>
            <a href="${escapeHtml(company.aboutUrl)}" data-page-transition>About Us</a>
          </nav>
        </div>

        <div>
          <h3 class="footer-heading-sm">Contact</h3>
          <div class="brand-footer-nav brand-footer-muted">
            <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}" class="tabular-nums footer-phone-strong">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</a>
            <a href="${escapeHtml(VERIFIED_CONTACT.emailHref)}">${escapeHtml(VERIFIED_CONTACT.email)}</a>
            <span>${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span>
            <a href="${escapeHtml(VERIFIED_CONTACT.whatsappQuoteUrl)}" target="_blank" rel="noopener noreferrer">WhatsApp Inquiry</a>
          </div>
        </div>
      </div>

      <div class="brand-footer-bottom">
        <p>&copy; <span data-current-year>2026</span> ${escapeHtml(company.exactName)}. All rights reserved.</p>
        <p>Affiliated with the <a href="/" class="underline-link">GTA Duct Masters</a> Service Network.</p>
      </div>
    </div>
  </footer>`;
}

export function renderLinkedCompanyHomePage(theme: CompanyTheme): string {
  const { company } = theme;
  const themeCssHref = `/${company.slug}/assets/css/theme.css`;

  const head = renderSeoHead({
    title: `${company.exactName} | Air Duct & HVAC Cleaning`,
    description: `${company.exactName} provides residential and commercial air duct cleaning, HVAC system cleaning, and dryer vent maintenance. Request a free quote today.`,
    canonicalPath: company.homeUrl,
    siteName: company.exactName,
    ogImagePath: theme.heroImage,
    googleFontsUrl: theme.typography.googleFontsUrl,
    stylesheets: [
      '/assets/css/reset.css',
      '/assets/css/core.css',
      '/assets/css/layouts.css',
      themeCssHref,
    ],
    iconHref: '/assets/images/gta/Logo.jpg',
    includeParentAggregateRating: false,
  });

  const operationalStrip = `<div class="operational-strip" aria-label="Service availability">
    <div class="container operational-strip-inner">
      <span><strong>Services:</strong> Air Duct · HVAC · Dryer Vent · Commercial</span>
      <span><strong>Hours:</strong> ${escapeHtml(VERIFIED_CONTACT.hoursDisplay)}</span>
      <span class="tabular-nums"><strong>Direct Line:</strong> <a href="${escapeHtml(VERIFIED_CONTACT.phoneHref)}">${escapeHtml(VERIFIED_CONTACT.phoneDisplay)}</a></span>
    </div>
  </div>`;

  return `<!DOCTYPE html>
<html lang="en">
${head}
<body class="brand-body" data-motion-profile="${escapeHtml(theme.motionProfile)}">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="page-transition-curtain" aria-hidden="true"></div>
  ${renderCompanyHeader(theme, 'home')}
  <main id="main-content">
    ${renderCompanyHero(theme)}
    ${operationalStrip}
    ${renderCompanyServicesSection(theme)}
    ${renderCompanyOverviewAndInquirySection(theme)}
  </main>
  ${renderCompanyFooter(theme)}
  <script src="/assets/js/vendor/gsap.min.js" defer></script>
  <script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
  <script src="/assets/js/navigation.js" defer></script>
  <script src="/assets/js/motion.js" defer></script>
  <script src="/assets/js/forms.js" defer></script>
</body>
</html>
`;
}

export function renderLinkedCompanyAboutPage(theme: CompanyTheme): string {
  const { company } = theme;
  const themeCssHref = `/${company.slug}/assets/css/theme.css`;

  const head = renderSeoHead({
    title: `About Us | ${company.exactName}`,
    description: `Learn about ${company.exactName} and our methodical approach to air duct cleaning, HVAC system cleaning, dryer vent clearing, and commercial ductwork care.`,
    canonicalPath: company.aboutUrl,
    siteName: company.exactName,
    ogImagePath: theme.aboutImage,
    googleFontsUrl: theme.typography.googleFontsUrl,
    stylesheets: [
      '/assets/css/reset.css',
      '/assets/css/core.css',
      '/assets/css/layouts.css',
      themeCssHref,
    ],
    iconHref: '/assets/images/gta/Logo.jpg',
    includeParentAggregateRating: false,
  });

  return `<!DOCTYPE html>
<html lang="en">
${head}
<body class="brand-body" data-motion-profile="${escapeHtml(theme.motionProfile)}">
  <a href="#main-content" class="skip-link">Skip to main content</a>
  <div class="page-transition-curtain" aria-hidden="true"></div>
  ${renderCompanyHeader(theme, 'about')}
  <main id="main-content">
    ${renderCompanyAboutMain(theme)}
  </main>
  ${renderCompanyFooter(theme)}
  <script src="/assets/js/vendor/gsap.min.js" defer></script>
  <script src="/assets/js/vendor/ScrollTrigger.min.js" defer></script>
  <script src="/assets/js/navigation.js" defer></script>
  <script src="/assets/js/motion.js" defer></script>
</body>
</html>
`;
}
