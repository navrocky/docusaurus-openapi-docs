/* ============================================================================
 * Generates src/theme-translations/base.json — the default (English) code
 * translation messages for every `translate()` / `<Translate>` call in the
 * theme. It is shipped to lib/ (via copyUntypedFiles) and returned from the
 * plugin's getDefaultCodeTranslationMessages(), so that consuming sites get all
 * `theme.openapi.*` ids when they run `docusaurus write-translations`.
 *
 * We reuse Docusaurus' own extractor (@docusaurus/babel) so the produced ids and
 * messages are identical to what write-translations would derive from source.
 * ========================================================================== */
import fs from "fs";
import path from "path";
import url from "url";
import babel from "@docusaurus/babel";

const { getBabelOptions, extractAllSourceCodeFileTranslations } = babel;

const here = path.dirname(url.fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(here, "..");
const themeSrc = path.join(pkgRoot, "src", "theme");
const outDir = path.join(pkgRoot, "src", "theme-translations");
const outFile = path.join(outDir, "base.json");

function collectSourceFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "__tests__") continue;
      out.push(...collectSourceFiles(full));
    } else if (/\.(t|j)sx?$/.test(entry.name) && !/\.d\.ts$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = collectSourceFiles(themeSrc);
const babelOptions = getBabelOptions({ isServer: true });
const extracted = await extractAllSourceCodeFileTranslations(
  files,
  babelOptions
);

const messages = {};
for (const file of extracted) {
  for (const w of file.warnings) {
    console.warn(`[gen-default-translations] ${file.sourceCodeFilePath}: ${w}`);
  }
  for (const [id, { message }] of Object.entries(file.translations)) {
    messages[id] = message;
  }
}

const sorted = Object.fromEntries(
  Object.keys(messages)
    .sort()
    .map((k) => [k, messages[k]])
);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(sorted, null, 2) + "\n");
console.log(
  `[gen-default-translations] wrote ${Object.keys(sorted).length} messages to ${path.relative(pkgRoot, outFile)}`
);
