import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const DEFAULT_BASE_URL = "https://myungni-jinro.vercel.app";
const baseUrl = (process.argv[2] || process.env.QA_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");

const routes = [
  { route: "/first-screen", markers: ["입시DNA프리즘", "진단 시작하기"] },
  { route: "/new", markers: ["진행 단계", "진단 시작하기"] },
  { route: "/questionnaire", markers: ["기질 진단 문항", "응답 완료"] },
  { route: "/almost-complete", markers: ["종합분석리포트", "리포트 발행"] },
  { route: "/report-issue", markers: ["리포트 인쇄", "12면 리포트"] },
  { route: "/report-template", markers: ["리포트 템플릿", "템플릿 점검"] },
  { route: "/report-templated", markers: ["리포트 템플릿", "템플릿 점검"] },
];

const outputDir = path.join(process.cwd(), "artifacts", "vercel-smoke");
fs.mkdirSync(outputDir, { recursive: true });

function hasBrokenText(text) {
  return text.includes("???") || text.includes("�");
}

async function checkRoute(page, item) {
  const url = `${baseUrl}${item.route}`;
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  const bodyText = (await page.textContent("body")) || "";

  const failed = [];
  const status = response?.status() ?? 0;
  if (status < 200 || status >= 400) {
    failed.push(`status ${status}`);
  }
  if (hasBrokenText(bodyText)) {
    failed.push("broken text pattern detected");
  }
  for (const marker of item.markers) {
    if (!bodyText.includes(marker)) {
      failed.push(`missing marker: ${marker}`);
    }
  }

  const fileName = item.route === "/" ? "root" : item.route.replaceAll("/", "_").replace(/^_/, "");
  const screenshotPath = path.join(outputDir, `${fileName}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  return {
    route: item.route,
    url,
    status,
    ok: failed.length === 0,
    failed,
    screenshotPath,
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  const results = [];

  try {
    for (const item of routes) {
      results.push(await checkRoute(page, item));
    }
  } finally {
    await browser.close();
  }

  const reportPath = path.join(outputDir, "summary.json");
  fs.writeFileSync(reportPath, JSON.stringify({ baseUrl, checkedAt: new Date().toISOString(), results }, null, 2), "utf8");

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error(`QA_VERCEL_BROWSER_SMOKE_FAILED (${baseUrl})`);
    for (const item of failed) {
      console.error(`- ${item.route}: ${item.failed.join(" | ")}`);
      console.error(`  screenshot: ${item.screenshotPath}`);
    }
    process.exit(1);
  }

  console.log(`QA_VERCEL_BROWSER_SMOKE_PASS (${baseUrl})`);
  for (const item of results) {
    console.log(`- ${item.route}: OK (${item.status})`);
  }
  console.log(`Summary: ${reportPath}`);
}

main().catch((error) => {
  console.error("QA_VERCEL_BROWSER_SMOKE_CRASH");
  console.error(error?.stack || String(error));
  process.exit(1);
});
