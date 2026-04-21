import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3200';

const sampleIntake = {
  name: '실데이터점검01',
  school: '대치중학교',
  grade: '중3',
  studentPhone: '010-7777-0001',
  parentPhone: '010-7777-0002',
  birthDate: '2010.12.30',
  birthTime: '09:30',
  calendarType: 'solar',
  gender: 'male',
};

const sampleAnswers = {
  abc: {
    abc_1: 4,
    abc_2: 5,
    abc_3: 3,
    abc_4: 4,
    abc_5: 5,
    abc_6: 3,
    abc_7: 4,
    abc_8: 5,
    abc_9: 3,
    abc_10: 4,
    abc_11: 5,
    abc_12: 3,
  },
  learning: {
    learn_1: 5,
    learn_2: 3,
    learn_3: 4,
    learn_4: 3,
    learn_5: 4,
    learn_6: 2,
    learn_7: 5,
    learn_8: 3,
    learn_9: 4,
    learn_10: 3,
    learn_11: 4,
    learn_12: 2,
  },
  engineering: {
    eng_1: 'b',
    eng_2: 'a',
    eng_3: 'a',
    eng_4: 'a',
    eng_5: 'b',
    eng_6: 'b',
    eng_7: 'a',
    eng_8: 'b',
  },
};

const expectedSectionTitles = [
  '1. 전문가 총평',
  '2. 만세력 기반 개인화 해석',
  '3. 결합 가중치 기반 진학 매핑',
  '4. 과목별 정밀 처방 (수학·과학)',
  '5. 학습 태도·공학 적합도 해석',
  '6. 학부모 코칭 가이드',
];

async function run() {
  const reportRefPath = path.join(process.cwd(), 'src', 'data', 'report_reference.json');
  const refJson = JSON.parse(fs.readFileSync(reportRefPath, 'utf8'));

  const res = await fetch(`${BASE_URL}/api/report-sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'realdata-mapping-check',
      intake: sampleIntake,
      answers: sampleAnswers,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST failed (${res.status}): ${text}`);
  }
  const json = await res.json();
  const report = json.report;

  const sectionTitles = report.sections.map((s) => s.title);
  const allBodyText = report.sections.flatMap((s) => s.body).join('\n');

  const checks = {
    referenceDocxSections: refJson?.docx?.section_count ?? 0,
    reportSectionCount: report.sections.length,
    hasAllExpectedTitles: expectedSectionTitles.every((title) => sectionTitles.includes(title)),
    containsWeightFormula:
      typeof report.routing?.formula === 'string' &&
      report.routing.formula.includes('만세력×2') &&
      report.routing.formula.includes('ABC×3') &&
      report.routing.formula.includes('학습성향×6') &&
      report.routing.formula.includes('공학적합도×4'),
    containsMathScienceMapping: allBodyText.includes('수학') && allBodyText.includes('과학'),
    containsAdmissionMapping: allBodyText.includes('고입') && allBodyText.includes('대입'),
    containsParentCoaching:
      typeof report.routing?.parentCoachingMode === 'string' &&
      report.routing.parentCoachingMode.includes('고입 준비') &&
      report.routing.parentCoachingMode.includes('대입 학과 탐색'),
  };

  const ok =
    checks.referenceDocxSections >= 10 &&
    checks.reportSectionCount >= 6 &&
    checks.hasAllExpectedTitles &&
    checks.containsWeightFormula &&
    checks.containsMathScienceMapping &&
    checks.containsAdmissionMapping &&
    checks.containsParentCoaching;

  console.log(
    JSON.stringify(
      {
        ok,
        checks,
        sectionTitles,
      },
      null,
      2
    )
  );

  if (!ok) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
