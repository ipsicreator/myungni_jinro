const DEFAULT_BASE_URL = "https://myungni-jinro.vercel.app";

const baseUrl = (process.argv[2] || process.env.QA_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, "");

const checks = [
  {
    route: "/first-screen",
    markers: ["입시DNA프리즘", "진단 시작하기", "대치수프리마"],
  },
  {
    route: "/new",
    markers: ["진행 단계", "진단 시작하기"],
  },
  {
    route: "/questionnaire",
    markers: ["기질 진단 문항", "응답 완료"],
  },
  {
    route: "/almost-complete",
    markers: ["종합분석리포트", "리포트 발행"],
  },
  {
    route: "/report-issue",
    markers: ["제1면 | 종합 진단 개요", "리포트 인쇄", "12면 리포트"],
  },
  {
    route: "/report-template",
    markers: ["리포트 템플릿", "입시DNA프리즘 템플릿 점검"],
  },
  {
    route: "/report-templated",
    markers: ["리포트 템플릿", "입시DNA프리즘 템플릿 점검"],
  },
];

function hasBrokenText(html) {
  return (
    html.includes("???") ||
    html.includes("?/span>") ||
    html.includes("?/div>") ||
    html.includes("�")
  );
}

function toEscapedUnicode(input) {
  return [...input]
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code < 128) return ch;
      return `\\u${code.toString(16).toUpperCase().padStart(4, "0")}`;
    })
    .join("");
}

function includesMarker(html, marker) {
  if (html.includes(marker)) return true;
  const escaped = toEscapedUnicode(marker);
  return html.includes(escaped);
}

async function checkRoute(route, markers) {
  const url = `${baseUrl}${route}`;
  const response = await fetch(url, { redirect: "follow" });
  const html = await response.text();
  const failed = [];

  if (!response.ok) {
    failed.push(`status ${response.status}`);
  }

  if (hasBrokenText(html)) {
    failed.push("broken text pattern detected");
  }

  for (const marker of markers) {
    if (!includesMarker(html, marker)) {
      failed.push(`missing marker: ${marker}`);
    }
  }

  return { route, url, ok: failed.length === 0, failed };
}

async function main() {
  const results = [];
  for (const item of checks) {
    results.push(await checkRoute(item.route, item.markers));
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0) {
    console.error(`QA_VERCEL_SMOKE_FAILED (${baseUrl})`);
    for (const item of failed) {
      console.error(`- ${item.route}: ${item.failed.join(" | ")}`);
      console.error(`  url: ${item.url}`);
    }
    process.exit(1);
  }

  console.log(`QA_VERCEL_SMOKE_PASS (${baseUrl})`);
  for (const item of results) {
    console.log(`- ${item.route}: OK`);
  }
}

main().catch((error) => {
  console.error("QA_VERCEL_SMOKE_CRASH");
  console.error(error?.stack || String(error));
  process.exit(1);
});
