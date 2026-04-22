import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const appDir = path.join(projectRoot, "src", "app");

const criticalRoutes = [
  "/first-screen",
  "/new",
  "/questionnaire",
  "/almost-complete",
  "/report-issue",
  "/report-template",
  "/report-templated",
];

const requiredFiles = [
  "src/app/new/page.tsx",
  "src/app/questionnaire/page.tsx",
  "src/app/error.tsx",
  "src/app/global-error.tsx",
  "src/app/not-found.tsx",
  "src/app/report-templated/page.tsx",
];

const requiredMarkers = [
  { file: "src/app/new/page.tsx", marker: "disabled={!canProceed}" },
  { file: "src/app/new/page.tsx", marker: "setErrorMessage(" },
  { file: "src/app/questionnaire/page.tsx", marker: "disabled={!isComplete}" },
  { file: "src/app/questionnaire/page.tsx", marker: "setErrorMessage(" },
  { file: "src/app/report-templated/page.tsx", marker: 'redirect("/report-template")' },
  { file: "src/app/not-found.tsx", marker: 'href="/first-screen"' },
  { file: "src/app/error.tsx", marker: 'href="/first-screen"' },
  { file: "src/app/global-error.tsx", marker: 'href="/first-screen"' },
];

const mojibakePatterns = [/[\u0080-\uFFFF]*\?[쒗낆곷쇳]/, /\?{3,}/];
const sourceExt = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".md"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath, out);
    if (entry.isFile()) out.push(fullPath);
  }
  return out;
}

function read(filePath) {
  return fs.readFileSync(path.join(projectRoot, filePath), "utf8");
}

function collectRoutes() {
  const routes = new Set(["/"]);
  const files = walk(appDir).filter((f) => f.endsWith(`${path.sep}page.tsx`));

  for (const filePath of files) {
    const rel = path
      .relative(appDir, filePath)
      .replaceAll(path.sep, "/")
      .replace(/\/page\.tsx$/, "");
    routes.add(rel === "" ? "/" : `/${rel}`);
  }
  return routes;
}

function collectLocalHrefs() {
  const files = walk(appDir).filter((f) => f.endsWith(".tsx"));
  const hrefs = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8");
    const rel = path.relative(projectRoot, filePath).replaceAll(path.sep, "/");
    const regex = /href="([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (match[1].startsWith("/")) {
        hrefs.push({ file: rel, href: match[1] });
      }
    }
  }
  return hrefs;
}

function main() {
  const failures = [];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(projectRoot, file))) {
      failures.push(`필수 파일 누락: ${file}`);
    }
  }

  for (const { file, marker } of requiredMarkers) {
    if (!fs.existsSync(path.join(projectRoot, file))) continue;
    const content = read(file);
    if (!content.includes(marker)) {
      failures.push(`필수 로직 누락: ${file} -> ${marker}`);
    }
  }

  const routes = collectRoutes();
  for (const route of criticalRoutes) {
    if (!routes.has(route)) {
      failures.push(`핵심 라우트 누락: ${route}`);
    }
  }

  const hrefs = collectLocalHrefs();
  for (const { file, href } of hrefs) {
    if (!routes.has(href)) {
      failures.push(`깨진 내부 링크: ${href} (${file})`);
    }
  }

  for (const filePath of walk(path.join(projectRoot, "src"))) {
    const ext = path.extname(filePath).toLowerCase();
    if (!sourceExt.has(ext)) continue;
    const rel = path.relative(projectRoot, filePath).replaceAll(path.sep, "/");
    const content = fs.readFileSync(filePath, "utf8");
    for (const pattern of mojibakePatterns) {
      if (pattern.test(content)) {
        failures.push(`문자 깨짐 의심 패턴: ${rel}`);
        break;
      }
    }
  }

  if (failures.length > 0) {
    console.error("QA_STATIC_FAILED");
    for (const item of failures) console.error(`- ${item}`);
    process.exit(1);
  }

  console.log("QA_STATIC_PASS");
}

main();
