import { toRelativeUrl } from './paths.ts';
import { escapeHtml, buildSecurityHeaders } from './security.ts';
import {
  PRIMARY_DOMAIN,
  VERIFIED_CONTACT,
  VERIFIED_SERVICES,
  getAllPublicPageUrls,
} from './verifiedData.ts';

export interface SeoHeadInput {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string; // e.g., "/", "/services/", "/fresh-air-pros/"
  readonly siteName: string;
  readonly ogImagePath: string;
  readonly googleFontsUrl: string;
  readonly stylesheets: readonly string[];
  readonly iconHref: string;
  readonly includeParentAggregateRating: boolean;
  readonly useRootRelativeAssets?: boolean;
}

export function renderSeoHead(input: SeoHeadInput): string {
  const canonicalUrl = `${PRIMARY_DOMAIN}${input.canonicalPath}`;
  const ogImageUrl = `${PRIMARY_DOMAIN}${input.ogImagePath}`;

  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: input.siteName,
    description: input.description,
    url: canonicalUrl,
    image: ogImageUrl,
    telephone: VERIFIED_CONTACT.phoneE164,
    email: VERIFIED_CONTACT.email,
    openingHours: VERIFIED_CONTACT.hoursSchema,
    address: {
      '@type': 'PostalAddress',
      addressLocality: VERIFIED_CONTACT.locality,
      addressRegion: VERIFIED_CONTACT.region,
      addressCountry: VERIFIED_CONTACT.country,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Air Duct & HVAC Cleaning Services',
      itemListElement: VERIFIED_SERVICES.map((svc) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: svc.title,
          description: svc.shortSummary,
        },
      })),
    },
  };

  if (input.includeParentAggregateRating) {
    structuredData.priceRange = '$$';
    structuredData.sameAs = [
      VERIFIED_CONTACT.facebookUrl,
      VERIFIED_CONTACT.instagramUrl,
    ];
    structuredData.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '347',
    };
  }

  const stylesheetTags = input.stylesheets
    .map((href) => {
      const resolvedHref = input.useRootRelativeAssets
        ? href
        : toRelativeUrl(input.canonicalPath, href);
      return `  <link rel="stylesheet" href="${escapeHtml(resolvedHref)}" />`;
    })
    .join('\n');
  const resolvedIconHref = input.useRootRelativeAssets
    ? input.iconHref
    : toRelativeUrl(input.canonicalPath, input.iconHref);
  const resolvedGuardHref = input.useRootRelativeAssets
    ? '/assets/js/runtime-guard.js'
    : toRelativeUrl(input.canonicalPath, '/assets/js/runtime-guard.js');

  return `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="${escapeHtml(resolvedGuardHref)}"></script>
  <title>${escapeHtml(input.title)}</title>
  <meta name="description" content="${escapeHtml(input.description)}" />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="${escapeHtml(input.siteName)}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${escapeHtml(input.siteName)}" />
  <meta property="og:title" content="${escapeHtml(input.title)}" />
  <meta property="og:description" content="${escapeHtml(input.description)}" />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(input.title)}" />
  <meta name="twitter:description" content="${escapeHtml(input.description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="${escapeHtml(input.googleFontsUrl)}" rel="stylesheet" />

  <!-- Modular Stylesheets -->
${stylesheetTags}
  <link rel="icon" href="${escapeHtml(resolvedIconHref)}" />

  <!-- Schema.org Structured Data (Verified Business Details Only) -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
</head>`;
}

export function renderSitemapXml(): string {
  const urls = getAllPublicPageUrls();
  const entries = urls
    .map((urlPath) => {
      const priority =
        urlPath === '/'
          ? '1.0'
          : urlPath.split('/').filter(Boolean).length === 1
            ? '0.85'
            : '0.75';
      return `  <url>
    <loc>${escapeHtml(`${PRIMARY_DOMAIN}${urlPath}`)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

export function renderRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${PRIMARY_DOMAIN}/sitemap.xml
`;
}

export function renderStaticHostHeaders(): string {
  const headers = buildSecurityHeaders({ isProduction: true });
  const lines = Object.entries(headers).map(
    ([key, val]) => `  ${key}: ${val}`
  );
  return `/*
${lines.join('\n')}

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

export function renderStaticHostRedirects(): string {
  return `# Netlify serves physical <dir>/index.html clean URLs and /404.html natively
/index.html           /                     301!
`;
}
