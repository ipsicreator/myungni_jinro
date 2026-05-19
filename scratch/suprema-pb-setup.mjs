// suprema-pb-setup.mjs
// Fly.io PocketBase에 Suprema 전용 컬렉션을 자동 생성합니다.

const baseUrl = "https://suprima-platform-pb.fly.dev/api/collections";

const collections = [
  // Myungni Next (이미 존재)
  { name: "myungni_next_report_records", schema: [] },
  { name: "myungni_next_consultation_requests", schema: [] },
  // Suprema 전용 컬렉션
  { name: "suprema_diagnosis_sessions", schema: [] },
  { name: "suprema_exploration_results", schema: [] },
  { name: "suprema_pdf_analyses", schema: [] },
  { name: "suprema_platform", schema: [] },
  { name: "suprema_prism_assessments", schema: [] },
  { name: "suprema_prism_leads", schema: [] },
  { name: "suprema_setuk_history", schema: [] },
  { name: "suprema_students", schema: [] },
  // 공용 컬렉션 (읽기 전용)
  { name: "licenses", schema: [] },
  { name: "users", schema: [] },
];

async function createCollection(col) {
  try {
    const res = await fetch(`${baseUrl}/${col.name}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: col.name,
        type: "base",
        schema: col.schema,
      }),
    });

    if (res.ok) {
      console.log(`[✅] ${col.name} 생성 완료`);
    } else {
      const txt = await res.text();
      console.log(`[⚠️] ${col.name} 생성 실패 (status ${res.status}): ${txt}`);
    }
  } catch (e) {
    console.log(`[❌] ${col.name} 오류: ${e.message}`);
  }
}

(async () => {
  console.log("=== Suprema PocketBase 컬렉션 자동 생성 시작 ===");
  for (const col of collections) {
    await createCollection(col);
  }
  console.log("=== 완료 ===");
})();
