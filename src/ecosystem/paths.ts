import path from 'node:path';

/**
 * Converts a root-anchored internal URL or asset path (e.g.,
 * "/assets/images/gta/img1.jpeg", "/services/", "/fresh-air-pros/about/")
 * into a clean document-relative URL ("./...", "../...", "../../...")
 * relative to `fromPageUrl`.
 *
 * Why this matters:
 * - Works identically at domain root (https://gtaductmasters.ca/, *.netlify.app, localhost:3000)
 * - Works identically under GitHub Pages repository subpaths (https://<user>.github.io/<repo>/)
 * - Works identically if served from /gtaductmasters/ subfolder on static branch deploys
 */
export function toRelativeUrl(fromPageUrl: string, target: string): string {
  if (!target.startsWith('/') || target.startsWith('//')) {
    return target;
  }

  const hashIndex = target.indexOf('#');
  const targetPath = hashIndex >= 0 ? target.slice(0, hashIndex) : target;
  const hashSuffix = hashIndex >= 0 ? target.slice(hashIndex) : '';

  const fromDir = fromPageUrl.endsWith('/') ? fromPageUrl : `${fromPageUrl}/`;
  const isTargetDir = targetPath.endsWith('/');

  const rel = path.posix.relative(fromDir, targetPath);

  if (rel === '') {
    return `./${hashSuffix}`;
  }

  const prefixed = rel.startsWith('.') ? rel : `./${rel}`;
  const withTrailing =
    isTargetDir && !prefixed.endsWith('/') ? `${prefixed}/` : prefixed;

  return `${withTrailing}${hashSuffix}`;
}
