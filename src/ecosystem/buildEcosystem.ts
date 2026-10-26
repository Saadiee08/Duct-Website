import fs from 'node:fs';
import path from 'node:path';
import {
  renderLinkedCompanyAboutPage,
  renderLinkedCompanyHomePage,
} from './companyTemplates.ts';
import { renderNotFoundPage, renderParentPage } from './parentTemplates.ts';
import {
  renderRobotsTxt,
  renderSitemapXml,
  renderStaticHostHeaders,
  renderStaticHostRedirects,
} from './seo.ts';
import {
  CORE_CSS,
  FORMS_JS,
  GALLERY_REVIEWS_JS,
  LAYOUTS_CSS,
  MOTION_JS,
  NAVIGATION_JS,
  PARENT_CSS,
  RESET_CSS,
} from './sharedAssets.ts';
import { COMPANY_THEMES, renderCompanyThemeCss } from './themes.ts';
import { PARENT_PAGES } from './verifiedData.ts';

export interface BuildSummary {
  readonly outputRoot: string;
  readonly parentHtmlCount: number;
  readonly linkedCompanyCount: number;
  readonly linkedHtmlCount: number;
  readonly totalPublicHtmlCount: number;
}

const GENERATED_EDITORIAL_IMAGE_MAP: ReadonlyArray<{
  readonly prefix: string;
  readonly targetName: string;
}> = [
  { prefix: 'hero_luxury_residence_air_', targetName: 'luxury-residence-air.jpg' },
  { prefix: 'hero_commercial_ductwork_', targetName: 'commercial-ductwork.jpg' },
  { prefix: 'hero_heritage_interior_', targetName: 'heritage-interior.jpg' },
  { prefix: 'detail_hepa_ventilation_', targetName: 'hepa-ventilation.jpg' },
  { prefix: 'detail_clean_air_atrium_', targetName: 'clean-air-atrium.jpg' },
];

function writeTextFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function copyFileIfPresent(srcPath: string, destPath: string): boolean {
  if (!fs.existsSync(srcPath)) {
    return false;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  return true;
}

function copyAssetsIntoOutput(workspaceRoot: string, outputRoot: string): void {
  // 1. Copy verified GTA Duct Masters live site assets
  const gtaSrcDir = path.join(workspaceRoot, 'public', 'assets', 'images', 'gta');
  const gtaDestDir = path.join(outputRoot, 'assets', 'images', 'gta');
  if (fs.existsSync(gtaSrcDir)) {
    fs.mkdirSync(gtaDestDir, { recursive: true });
    for (const entry of fs.readdirSync(gtaSrcDir)) {
      copyFileIfPresent(
        path.join(gtaSrcDir, entry),
        path.join(gtaDestDir, entry)
      );
    }
  }

  // 2. Copy high-resolution generated editorial assets to deterministic paths
  const generatedSrcDir = path.join(workspaceRoot, 'src', 'assets', 'images');
  const editorialDestDir = path.join(outputRoot, 'assets', 'images', 'editorial');
  fs.mkdirSync(editorialDestDir, { recursive: true });

  if (fs.existsSync(generatedSrcDir)) {
    const availableFiles = fs.readdirSync(generatedSrcDir);
    for (const mapping of GENERATED_EDITORIAL_IMAGE_MAP) {
      const matched = availableFiles.find((f) => f.startsWith(mapping.prefix));
      if (matched) {
        copyFileIfPresent(
          path.join(generatedSrcDir, matched),
          path.join(editorialDestDir, mapping.targetName)
        );
      }
    }
  }

  // 3. Copy local GSAP + ScrollTrigger vendor scripts (strict 'self' CSP)
  const gsapDistDir = path.join(workspaceRoot, 'node_modules', 'gsap', 'dist');
  const vendorDestDir = path.join(outputRoot, 'assets', 'js', 'vendor');
  copyFileIfPresent(
    path.join(gsapDistDir, 'gsap.min.js'),
    path.join(vendorDestDir, 'gsap.min.js')
  );
  copyFileIfPresent(
    path.join(gsapDistDir, 'ScrollTrigger.min.js'),
    path.join(vendorDestDir, 'ScrollTrigger.min.js')
  );
}

/**
 * Generates the complete physical multi-company HTML file hierarchy inside
 * `outputRoot`:
 * - 7 physical HTML pages for GTA Duct Masters
 * - 30 physical HTML pages for the 15 linked companies (Home + About Us)
 * - 15 independent company stylesheets (/<slug>/assets/css/theme.css)
 * - Modular shared CSS & JS utilities
 * - 404.html, sitemap.xml, robots.txt, _headers, _redirects
 */
export function buildEcosystemToDirectory(
  workspaceRoot: string,
  outputRoot: string
): BuildSummary {
  fs.mkdirSync(outputRoot, { recursive: true });

  // Shared modular CSS
  writeTextFile(path.join(outputRoot, 'assets', 'css', 'reset.css'), RESET_CSS);
  writeTextFile(path.join(outputRoot, 'assets', 'css', 'core.css'), CORE_CSS);
  writeTextFile(
    path.join(outputRoot, 'assets', 'css', 'parent.css'),
    PARENT_CSS
  );
  writeTextFile(
    path.join(outputRoot, 'assets', 'css', 'layouts.css'),
    LAYOUTS_CSS
  );

  // Shared modular JS
  writeTextFile(
    path.join(outputRoot, 'assets', 'js', 'navigation.js'),
    NAVIGATION_JS
  );
  writeTextFile(path.join(outputRoot, 'assets', 'js', 'motion.js'), MOTION_JS);
  writeTextFile(path.join(outputRoot, 'assets', 'js', 'forms.js'), FORMS_JS);
  writeTextFile(
    path.join(outputRoot, 'assets', 'js', 'gallery-reviews.js'),
    GALLERY_REVIEWS_JS
  );

  // Copy local images and GSAP vendor files
  copyAssetsIntoOutput(workspaceRoot, outputRoot);

  // 1. Generate all 7 Parent Website physical HTML pages
  let parentHtmlCount = 0;
  for (const pageMeta of PARENT_PAGES) {
    const html = renderParentPage(pageMeta);
    const targetPath =
      pageMeta.slug === ''
        ? path.join(outputRoot, 'index.html')
        : path.join(outputRoot, pageMeta.slug, 'index.html');
    writeTextFile(targetPath, html);
    parentHtmlCount += 1;
  }

  // Branded 404 physical HTML document
  writeTextFile(path.join(outputRoot, '404.html'), renderNotFoundPage());

  // 2. Generate all 15 Linked Companies (30 physical HTML pages + 15 theme CSS files)
  let linkedHtmlCount = 0;
  for (const theme of COMPANY_THEMES) {
    const { slug } = theme.company;
    const companyDir = path.join(outputRoot, slug);

    // Per-company independent stylesheet & asset folder
    writeTextFile(
      path.join(companyDir, 'assets', 'css', 'theme.css'),
      renderCompanyThemeCss(theme)
    );

    // Page 1: Home (/<slug>/index.html)
    writeTextFile(
      path.join(companyDir, 'index.html'),
      renderLinkedCompanyHomePage(theme)
    );
    linkedHtmlCount += 1;

    // Page 2: About Us (/<slug>/about/index.html)
    writeTextFile(
      path.join(companyDir, 'about', 'index.html'),
      renderLinkedCompanyAboutPage(theme)
    );
    linkedHtmlCount += 1;
  }

  // Technical SEO & portable static-host security configs
  writeTextFile(path.join(outputRoot, 'sitemap.xml'), renderSitemapXml());
  writeTextFile(path.join(outputRoot, 'robots.txt'), renderRobotsTxt());
  writeTextFile(path.join(outputRoot, '_headers'), renderStaticHostHeaders());
  writeTextFile(
    path.join(outputRoot, '_redirects'),
    renderStaticHostRedirects()
  );

  return {
    outputRoot,
    parentHtmlCount,
    linkedCompanyCount: COMPANY_THEMES.length,
    linkedHtmlCount,
    totalPublicHtmlCount: parentHtmlCount + linkedHtmlCount,
  };
}
