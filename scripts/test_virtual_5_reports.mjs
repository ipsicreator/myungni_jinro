const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3200';

const virtualStudents = [
  {
    name: '가상학생01',
    school: '대치중학교',
    grade: '중3',
    studentPhone: '010-1000-0001',
    parentPhone: '010-2000-0001',
    birthDate: '2010.01.12',
    birthTime: '08:10',
    calendarType: 'solar',
    gender: 'male',
  },
  {
    name: '가상학생02',
    school: '대치중학교',
    grade: '중2',
    studentPhone: '010-1000-0002',
    parentPhone: '010-2000-0002',
    birthDate: '2010.03.24',
    birthTime: '21:40',
    calendarType: 'lunar',
    gender: 'female',
  },
  {
    name: '가상학생03',
    school: '대치고등학교',
    grade: '고1',
    studentPhone: '010-1000-0003',
    parentPhone: '010-2000-0003',
    birthDate: '2009.09.02',
    birthTime: '06:55',
    calendarType: 'solar',
    gender: 'male',
  },
  {
    name: '가상학생04',
    school: '휘문중학교',
    grade: '중1',
    studentPhone: '010-1000-0004',
    parentPhone: '010-2000-0004',
    birthDate: '2011.11.18',
    birthTime: '14:20',
    calendarType: 'lunar',
    gender: 'female',
  },
  {
    name: '가상학생05',
    school: '경기고등학교',
    grade: '고2',
    studentPhone: '010-1000-0005',
    parentPhone: '010-2000-0005',
    birthDate: '2008.05.07',
    birthTime: '23:35',
    calendarType: 'solar',
    gender: 'male',
  },
];

const baseAnswers = {
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

function buildAnswersForIndex(idx) {
  const clone = JSON.parse(JSON.stringify(baseAnswers));

  if (idx === 1) {
    clone.abc.abc_3 = 5;
    clone.abc.abc_6 = 5;
    clone.abc.abc_9 = 5;
    clone.abc.abc_12 = 5;

    clone.learning.learn_2 = 5;
    clone.learning.learn_5 = 5;
    clone.learning.learn_8 = 5;
    clone.learning.learn_11 = 5;

    clone.engineering.eng_2 = 'b';
    clone.engineering.eng_3 = 'b';
    clone.engineering.eng_4 = 'b';
  } else if (idx === 2) {
    clone.abc.abc_4 = 5;
    clone.abc.abc_7 = 5;
    clone.abc.abc_10 = 5;

    clone.learning.learn_3 = 5;
    clone.learning.learn_9 = 5;
    clone.learning.learn_1 = 3;

    clone.engineering.eng_1 = 'a';
    clone.engineering.eng_2 = 'b';
    clone.engineering.eng_6 = 'a';
    clone.engineering.eng_8 = 'a';
  } else if (idx === 3) {
    clone.abc.abc_1 = 5;
    clone.abc.abc_2 = 5;
    clone.abc.abc_5 = 5;
    clone.abc.abc_8 = 5;
    clone.abc.abc_11 = 5;

    clone.learning.learn_4 = 5;
    clone.learning.learn_10 = 5;
    clone.learning.learn_6 = 1;
    clone.learning.learn_12 = 1;

    clone.engineering.eng_1 = 'b';
    clone.engineering.eng_2 = 'a';
    clone.engineering.eng_4 = 'a';
    clone.engineering.eng_8 = 'a';
  } else if (idx === 4) {
    clone.abc.abc_4 = 5;
    clone.abc.abc_7 = 5;
    clone.abc.abc_10 = 5;
    clone.abc.abc_3 = 4;

    clone.learning.learn_6 = 4;
    clone.learning.learn_12 = 4;
    clone.learning.learn_1 = 3;
    clone.learning.learn_7 = 3;

    clone.engineering.eng_3 = 'a';
    clone.engineering.eng_7 = 'a';
    clone.engineering.eng_2 = 'b';
  }

  return clone;
}

async function postOne(student, idx) {
  const payload = {
    source: 'virtual-5-test',
    intake: student,
    answers: buildAnswersForIndex(idx),
  };

  const res = await fetch(`${BASE_URL}/api/report-sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST failed (${res.status}): ${text}`);
  }

  return res.json();
}

async function run() {
  const posted = [];
  for (let i = 0; i < virtualStudents.length; i += 1) {
    const result = await postOne(virtualStudents[i], i);
    posted.push(result);
  }

  const listRes = await fetch(`${BASE_URL}/api/report-sync?limit=80`);
  if (!listRes.ok) throw new Error(`GET failed (${listRes.status})`);

  const listJson = await listRes.json();
  const rows = listJson.rows || [];

  const postedReportIds = new Set(posted.map((p) => p.stored.reportId));
  const matchedRows = rows.filter((r) => postedReportIds.has(r.reportId));
  const uniqueStudentKeys = new Set(matchedRows.map((r) => r.studentKey));
  const uniqueReportIds = new Set(matchedRows.map((r) => r.reportId));

  const reportSummaryByStudent = posted.map((p) => ({
    name: p.stored.studentName,
    reportId: p.stored.reportId,
    studentKey: p.stored.studentKey,
    mansePrimary: p.reportSummary.mansePrimary,
    manseSecondary: p.reportSummary.manseSecondary,
    highSchoolType: p.routing?.highSchoolType || '',
    collegeMajorTrack: p.routing?.collegeMajorTrack || '',
    parentCoachingMode: p.routing?.parentCoachingMode || '',
    headline: p.stored.headline,
  }));

  const checks = {
    postedCount: posted.length,
    matchedRowsCount: matchedRows.length,
    uniqueStudentKeys: uniqueStudentKeys.size,
    uniqueReportIds: uniqueReportIds.size,
    mansePrimaryVariety: new Set(reportSummaryByStudent.map((x) => x.mansePrimary)).size,
    highSchoolVariety: new Set(reportSummaryByStudent.map((x) => x.highSchoolType)).size,
    majorTrackVariety: new Set(reportSummaryByStudent.map((x) => x.collegeMajorTrack)).size,
    coachingVariety: new Set(reportSummaryByStudent.map((x) => x.parentCoachingMode)).size,
  };

  const ok =
    checks.postedCount === 5 &&
    checks.matchedRowsCount === 5 &&
    checks.uniqueStudentKeys === 5 &&
    checks.uniqueReportIds >= 5 &&
    checks.mansePrimaryVariety >= 2 &&
    checks.highSchoolVariety >= 2 &&
    checks.majorTrackVariety >= 2 &&
    checks.coachingVariety >= 2;

  console.log(
    JSON.stringify(
      {
        ok,
        checks,
        reportSummaryByStudent,
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
