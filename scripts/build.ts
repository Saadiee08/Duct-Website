import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildEcosystemToDirectory } from '../src/ecosystem/buildEcosystem.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '..');

const gtaductmastersOut = path.join(workspaceRoot, 'gtaductmasters');
const distOut = path.join(workspaceRoot, 'dist');

const primarySummary = buildEcosystemToDirectory(
  workspaceRoot,
  gtaductmastersOut
);
const distSummary = buildEcosystemToDirectory(workspaceRoot, distOut);

console.log(
  `[ecosystem-build] Generated ${primarySummary.parentHtmlCount} GTA Duct Masters pages + ${primarySummary.linkedHtmlCount} linked-company pages (${primarySummary.linkedCompanyCount} brands) = ${primarySummary.totalPublicHtmlCount} physical HTML files in gtaductmasters/ and ${distSummary.totalPublicHtmlCount} in dist/.`
);
