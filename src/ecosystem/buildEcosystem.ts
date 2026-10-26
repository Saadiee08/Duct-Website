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
  RUNTIME_GUARD_JS,
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

const REQUIRED_GTA_IMAGES = [
  'Logo.jpg',
  'img1.jpeg',
  'img2.jpeg',
  'img3.jpeg',
  'img4.jpeg',
  'img5.jpeg',
  'img6.jpeg',
  'img7.jpeg',
  'img8.jpeg',
] as const;

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

const REQUIRED_VENDOR_SCRIPTS = ['gsap.min.js', 'ScrollTrigger.min.js'] as const;

function writeTextFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function copyFromFirstExistingSource(
  candidateSources: readonly string[],
  destPath: string
): boolean {
  const resolvedDest = path.resolve(destPath);
  for (const srcPath of candidateSources) {
    if (!fs.existsSync(srcPath)) {
      continue;
    }
    const stat = fs.statSync(srcPath);
    if (!stat.isFile() || stat.size === 0) {
      continue;
    }
    if (path.resolve(srcPath) === resolvedDest) {
      return true;
    }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    return true;
  }
  return false;
}

function verifyRequiredOutputAssets(outputRoot: string): void {
  const missing: string[] = [];

  for (const fileName of REQUIRED_GTA_IMAGES) {
    const p = path.join(outputRoot, 'assets', 'images', 'gta', fileName);
    if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
      missing.push(`assets/images/gta/${fileName}`);
    }
  }

  for (const mapping of GENERATED_EDITORIAL_IMAGE_MAP) {
    const p = path.join(
      outputRoot,
      'assets',
      'images',
      'editorial',
      mapping.targetName
    );
    if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
      missing.push(`assets/images/editorial/${mapping.targetName}`);
    }
  }

  for (const scriptName of REQUIRED_VENDOR_SCRIPTS) {
    const p = path.join(outputRoot, 'assets', 'js', 'vendor', scriptName);
    if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
      missing.push(`assets/js/vendor/${scriptName}`);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `[ecosystem-build] Missing required build assets in ${outputRoot}: ${missing.join(', ')}`
    );
  }
}

function copyAssetsIntoOutput(workspaceRoot: string, outputRoot: string): void {
  // 1. Copy verified GTA Duct Masters live site images (checking public/assets first, then gtaductmasters/ fallback)
  const gtaDestDir = path.join(outputRoot, 'assets', 'images', 'gta');
  fs.mkdirSync(gtaDestDir, { recursive: true });
  for (const fileName of REQUIRED_GTA_IMAGES) {
    copyFromFirstExistingSource(
      [
        path.join(workspaceRoot, 'public', 'assets', 'images', 'gta', fileName),
        path.join(
          workspaceRoot,
          'gtaductmasters',
          'assets',
          'images',
          'gta',
          fileName
        ),
      ],
      path.join(gtaDestDir, fileName)
    );
  }

  // 2. Copy high-resolution editorial images to deterministic paths
  const editorialDestDir = path.join(outputRoot, 'assets', 'images', 'editorial');
  fs.mkdirSync(editorialDestDir, { recursive: true });
  const generatedSrcDir = path.join(workspaceRoot, 'src', 'assets', 'images');
  const availableGenerated = fs.existsSync(generatedSrcDir)
    ? fs.readdirSync(generatedSrcDir)
    : [];

  for (const mapping of GENERATED_EDITORIAL_IMAGE_MAP) {
    const matchedGenerated = availableGenerated.find((f) =>
      f.startsWith(mapping.prefix)
    );
    const candidates: string[] = [
      path.join(
        workspaceRoot,
        'public',
        'assets',
        'images',
        'editorial',
        mapping.targetName
      ),
    ];
    if (matchedGenerated) {
      candidates.push(path.join(generatedSrcDir, matchedGenerated));
    }
    candidates.push(
      path.join(
        workspaceRoot,
        'gtaductmasters',
        'assets',
        'images',
        'editorial',
        mapping.targetName
      )
    );

    copyFromFirstExistingSource(
      candidates,
      path.join(editorialDestDir, mapping.targetName)
    );
  }

  // 3. Copy local GSAP + ScrollTrigger vendor scripts (checking node_modules, public/assets, and gtaductmasters/)
  const vendorDestDir = path.join(outputRoot, 'assets', 'js', 'vendor');
  fs.mkdirSync(vendorDestDir, { recursive: true });
  for (const scriptName of REQUIRED_VENDOR_SCRIPTS) {
    copyFromFirstExistingSource(
      [
        path.join(workspaceRoot, 'node_modules', 'gsap', 'dist', scriptName),
        path.join(workspaceRoot, 'public', 'assets', 'js', 'vendor', scriptName),
        path.join(
          workspaceRoot,
          'gtaductmasters',
          'assets',
          'js',
          'vendor',
          scriptName
        ),
      ],
      path.join(vendorDestDir, scriptName)
    );
  }

  // 4. Enforce non-empty asset presence so Netlify / GitHub builds can never publish missing images
  verifyRequiredOutputAssets(outputRoot);
}

/**
 * Generates the complete physical multi-company HTML file hierarchy inside
 * `outputRoot`:
 * - 7 physical HTML pages for GTA Duct Masters
 * - 30 physical HTML pages for the 15 linked companies (Home + About Us)
 * - 15 independent company stylesheets (/<slug>/assets/css/theme.css)
 * - Modular shared CSS & JS utilities
 * - 404.html, sitemap.xml, robots.txt, _headers, _redirects, .nojekyll
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
    path.join(outputRoot, 'assets', 'js', 'runtime-guard.js'),
    RUNTIME_GUARD_JS
  );
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

  // Copy local images and GSAP vendor files (with strict verification)
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

  // Technical SEO & portable static-host security configs (Netlify + GitHub Pages .nojekyll)
  writeTextFile(path.join(outputRoot, 'sitemap.xml'), renderSitemapXml());
  writeTextFile(path.join(outputRoot, 'robots.txt'), renderRobotsTxt());
  writeTextFile(path.join(outputRoot, '_headers'), renderStaticHostHeaders());
  writeTextFile(
    path.join(outputRoot, '_redirects'),
    renderStaticHostRedirects()
  );
  writeTextFile(path.join(outputRoot, '.nojekyll'), '');

  return {
    outputRoot,
    parentHtmlCount,
    linkedCompanyCount: COMPANY_THEMES.length,
    linkedHtmlCount,
    totalPublicHtmlCount: parentHtmlCount + linkedHtmlCount,
  };
}
