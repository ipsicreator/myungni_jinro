export type IntakeForm = {
  name: string;
  school: string;
  grade: string;
  studentPhone: string;
  parentPhone: string;
  birthDate: string;
  birthTime: string;
  calendarType: 'solar' | 'lunar';
  gender: 'male' | 'female';
};

export type LikertQuestion = {
  id: string;
  text: string;
  axis: string;
};

export type BinaryQuestion = {
  id: string;
  text: string;
  dim: 'process' | 'perception' | 'input' | 'understanding';
  a: string;
  b: string;
};

export type SurveyAnswers = {
  abc: Record<string, number>;
  learning: Record<string, number>;
  engineering: Record<string, 'a' | 'b'>;
};

export type ReportSection = {
  title: string;
  body: string[];
};

export type ManseProfile = {
  seed: number;
  primary: 'wood' | 'fire' | 'earth' | 'metal' | 'water';
  secondary: 'wood' | 'fire' | 'earth' | 'metal' | 'water';
  energies: Record<'wood' | 'fire' | 'earth' | 'metal' | 'water', number>;
  primaryLabel: string;
  secondaryLabel: string;
  temperament: string;
  studyMode: string;
  riskPoint: string;
  focusAction: string;
};

export type StrategicRouting = {
  formula: string;
  mathPlan: string;
  sciencePlan: string;
  highSchoolType: string;
  collegeMajorTrack: string;
  parentCoachingMode: string;
};

export type MappedReport = {
  title: string;
  subtitle: string;
  headline: string;
  scoreSummary: {
    abcDominant: string;
    learningDominant: string;
    engineeringSummary: string;
    mansePrimary: string;
    manseSecondary: string;
  };
  routing: StrategicRouting;
  sections: ReportSection[];
  recommendations: string[];
};

export const ABC_QUESTIONS: LikertQuestion[] = [
  { id: 'abc_1', axis: 'A', text: '원칙이 어겨지면 바로 수정해야 한다고 느낀다.' },
  { id: 'abc_2', axis: 'A', text: '중요한 결정은 감정보다 근거를 먼저 확인한다.' },
  { id: 'abc_3', axis: 'B', text: '가족이나 친구가 힘들어하면 먼저 공감하고 돕는다.' },
  { id: 'abc_4', axis: 'C', text: '새로운 아이디어를 떠올리면 바로 시도해 보는 편이다.' },
  { id: 'abc_5', axis: 'A', text: '규칙과 약속을 지키지 않는 행동은 불편하게 느껴진다.' },
  { id: 'abc_6', axis: 'B', text: '상대방의 감정을 먼저 살피며 말하려고 한다.' },
  { id: 'abc_7', axis: 'C', text: '흥미가 생기면 빠르게 몰입하고 추진하는 편이다.' },
  { id: 'abc_8', axis: 'A', text: '문제를 작은 단위로 나누어 논리적으로 해결한다.' },
  { id: 'abc_9', axis: 'B', text: '협업 상황에서 갈등보다 조화를 우선한다.' },
  { id: 'abc_10', axis: 'C', text: '정해진 방식보다 새로운 방식을 찾는 편이다.' },
  { id: 'abc_11', axis: 'A', text: '완성도 기준이 높아 검토를 여러 번 수행한다.' },
  { id: 'abc_12', axis: 'B', text: '누군가의 성장을 돕는 활동에서 동기가 높아진다.' },
];

export const LEARNING_QUESTIONS: LikertQuestion[] = [
  { id: 'learn_1', axis: 'independent', text: '혼자 계획하고 공부할 때 성과가 좋다.' },
  { id: 'learn_2', axis: 'cooperative', text: '친구와 토론하면 이해가 빨라진다.' },
  { id: 'learn_3', axis: 'competitive', text: '경쟁 상황에서 집중력이 높아진다.' },
  { id: 'learn_4', axis: 'dependent', text: '명확한 지시가 있을 때 안정적으로 수행한다.' },
  { id: 'learn_5', axis: 'participant', text: '수업에서 질문하고 발표할 때 몰입이 높다.' },
  { id: 'learn_6', axis: 'avoidant', text: '흥미 없는 과제는 시작이 어렵다.' },
  { id: 'learn_7', axis: 'independent', text: '스스로 학습 자료를 찾아 확장하는 편이다.' },
  { id: 'learn_8', axis: 'cooperative', text: '모둠 과제에서 역할을 맡아 협업하는 것이 익숙하다.' },
  { id: 'learn_9', axis: 'competitive', text: '성과가 수치로 보이면 동기가 강해진다.' },
  { id: 'learn_10', axis: 'dependent', text: '평가 기준을 자세히 알려주면 결과가 좋아진다.' },
  { id: 'learn_11', axis: 'participant', text: '활동형 과제가 있으면 학습 에너지가 올라간다.' },
  { id: 'learn_12', axis: 'avoidant', text: '실패 경험이 누적되면 학습 회피가 커진다.' },
];

export const ENGINEERING_QUESTIONS: BinaryQuestion[] = [
  {
    id: 'eng_1',
    text: '문제를 만났을 때 본인과 더 가까운 선택을 고르세요.',
    dim: 'process',
    a: '바로 시도하며 답을 찾는다.',
    b: '충분히 생각한 뒤 시도한다.',
  },
  {
    id: 'eng_2',
    text: '정보를 이해할 때 본인과 더 가까운 선택을 고르세요.',
    dim: 'perception',
    a: '사실·데이터 중심으로 이해한다.',
    b: '개념·가능성 중심으로 이해한다.',
  },
  {
    id: 'eng_3',
    text: '정보 입력 방식에서 본인과 더 가까운 선택을 고르세요.',
    dim: 'input',
    a: '그림·도표로 보면 이해가 빠르다.',
    b: '설명·텍스트를 읽으면 이해가 빠르다.',
  },
  {
    id: 'eng_4',
    text: '이해 방식에서 본인과 더 가까운 선택을 고르세요.',
    dim: 'understanding',
    a: '단계별 순서로 배우면 안정적이다.',
    b: '전체 구조를 먼저 보면 연결이 빠르다.',
  },
  {
    id: 'eng_5',
    text: '협업 상황에서 본인과 더 가까운 선택을 고르세요.',
    dim: 'process',
    a: '말로 정리하며 아이디어를 발전시킨다.',
    b: '혼자 정리한 뒤 공유하는 것이 편하다.',
  },
  {
    id: 'eng_6',
    text: '새로운 개념 학습에서 본인과 더 가까운 선택을 고르세요.',
    dim: 'perception',
    a: '실제 사례가 있어야 몰입된다.',
    b: '이론과 원리를 탐구하는 것이 즐겁다.',
  },
  {
    id: 'eng_7',
    text: '기억 방식에서 본인과 더 가까운 선택을 고르세요.',
    dim: 'input',
    a: '시각 자료를 더 잘 기억한다.',
    b: '들은 설명을 더 잘 기억한다.',
  },
  {
    id: 'eng_8',
    text: '문제 해결 흐름에서 본인과 더 가까운 선택을 고르세요.',
    dim: 'understanding',
    a: '세부를 쌓아 전체를 이해한다.',
    b: '전체를 파악한 뒤 세부를 채운다.',
  },
];

const ABC_LABEL: Record<string, string> = {
  A: '안정-체계형',
  B: '공감-관계형',
  C: '창의-확장형',
};

const LEARNING_LABEL: Record<string, string> = {
  independent: '독립형',
  cooperative: '협동형',
  competitive: '경쟁형',
  dependent: '의존형',
  participant: '참여형',
  avoidant: '회피형',
};

const ENERGY_LABEL: Record<'wood' | 'fire' | 'earth' | 'metal' | 'water', string> = {
  wood: '목(木) 성장-확장',
  fire: '화(火) 추진-표현',
  earth: '토(土) 균형-조율',
  metal: '금(金) 구조-정밀',
  water: '수(水) 탐구-통찰',
};

function parseDateParts(dateText: string) {
  const nums = (dateText.match(/\d+/g) ?? []).map((n) => Number(n));
  return { year: nums[0] ?? 2000, month: nums[1] ?? 1, day: nums[2] ?? 1 };
}

function parseTimeParts(timeText: string) {
  const nums = (timeText.match(/\d+/g) ?? []).map((n) => Number(n));
  return { hour: nums[0] ?? 9, minute: nums[1] ?? 0 };
}

function axisTotals(questions: LikertQuestion[], answers: Record<string, number>) {
  const totals: Record<string, number> = {};
  questions.forEach((q) => {
    totals[q.axis] = (totals[q.axis] ?? 0) + (answers[q.id] ?? 0);
  });
  return totals;
}

function topAxis(totals: Record<string, number>) {
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
}

function rankKeys<T extends string>(obj: Record<T, number>) {
  return (Object.entries(obj) as [T, number][]).sort((a, b) => b[1] - a[1]).map(([k]) => k);
}

export function buildManseProfile(intake: IntakeForm): ManseProfile {
  const { year, month, day } = parseDateParts(intake.birthDate);
  const { hour, minute } = parseTimeParts(intake.birthTime);
  const seed =
    year * 13 +
    month * 17 +
    day * 19 +
    hour * 23 +
    minute * 29 +
    (intake.calendarType === 'solar' ? 7 : 11) +
    (intake.gender === 'male' ? 5 : 9);

  const energies = {
    wood: ((seed + month * 3 + hour * 5) % 100) + 1,
    fire: ((seed * 2 + day * 7 + minute) % 100) + 1,
    earth: ((seed * 3 + (year % 100) * 11) % 100) + 1,
    metal: ((seed * 5 + month * 13 + day) % 100) + 1,
    water: ((seed * 7 + hour * 17 + minute * 3) % 100) + 1,
  } as const;

  const [primary, secondary] = rankKeys(energies) as [
    'wood' | 'fire' | 'earth' | 'metal' | 'water',
    'wood' | 'fire' | 'earth' | 'metal' | 'water',
  ];

  const temperamentMap = {
    wood: '확장 지향이 강해 새로운 과제를 빠르게 받아들이는 편입니다.',
    fire: '표현 에너지가 강해 발표·토론·실행형 과제에서 성과가 올라갑니다.',
    earth: '균형 감각이 좋아 계획 관리와 안정적 루틴 유지에 강점이 있습니다.',
    metal: '정밀성과 규칙성이 높아 분석·검토·완성도 관리에서 강합니다.',
    water: '탐구 깊이가 깊어 개념 연결과 통찰이 필요한 학습에서 강점을 보입니다.',
  } as const;

  const modeMap = {
    wood: '탐구형 프로젝트 + 단계별 성과 점검',
    fire: '발표형 과제 + 즉시 피드백 루프',
    earth: '주간 루틴 고정 + 균형형 과목 배치',
    metal: '오답 구조화 + 기준 기반 반복 학습',
    water: '심화 독서 + 개념 연결 중심 학습',
  } as const;

  const riskMap = {
    wood: '과제 확장이 과도해지면 마감 리듬이 흔들릴 수 있습니다.',
    fire: '몰입의 편차가 커지면 루틴 안정성이 떨어질 수 있습니다.',
    earth: '안정 추구가 강해 도전 과제 회피로 이어질 수 있습니다.',
    metal: '완벽주의가 강해 속도 저하와 시작 지연이 생길 수 있습니다.',
    water: '깊이 탐구가 길어지면 출력 속도가 늦어질 수 있습니다.',
  } as const;

  const actionMap = {
    wood: '탐구 범위를 3단계로 제한해 확장과 마감을 동시에 관리합니다.',
    fire: '핵심 개념을 말로 설명하는 시간을 매일 15분 고정합니다.',
    earth: '주간 목표를 과목별 2개로 제한하고 완료율을 수치화합니다.',
    metal: '오답 원인을 유형화해 재발 방지 규칙을 체크리스트로 운영합니다.',
    water: '개념도 작성 후 5문항 즉시 적용으로 출력 지연을 줄입니다.',
  } as const;

  return {
    seed,
    primary,
    secondary,
    energies: { ...energies },
    primaryLabel: ENERGY_LABEL[primary],
    secondaryLabel: ENERGY_LABEL[secondary],
    temperament: temperamentMap[primary],
    studyMode: modeMap[primary],
    riskPoint: riskMap[secondary],
    focusAction: actionMap[primary],
  };
}

function getEngineeringProfile(answers: Record<string, 'a' | 'b'>) {
  const count = {
    process: { a: 0, b: 0 },
    perception: { a: 0, b: 0 },
    input: { a: 0, b: 0 },
    understanding: { a: 0, b: 0 },
  };

  ENGINEERING_QUESTIONS.forEach((q) => {
    const v = answers[q.id];
    if (v) count[q.dim][v] += 1;
  });

  const pick = <T extends 'a' | 'b'>(dim: keyof typeof count, map: Record<T, string>) => {
    const side = count[dim].a >= count[dim].b ? 'a' : 'b';
    return map[side as T];
  };

  const process = pick('process', { a: '적극', b: '숙고' });
  const perception = pick('perception', { a: '감각', b: '직관' });
  const input = pick('input', { a: '시각', b: '언어' });
  const understanding = pick('understanding', { a: '순차', b: '통합' });

  return {
    summary: `${process}·${perception}·${input}·${understanding}형`,
    process,
    perception,
    input,
    understanding,
  };
}

function buildStrategicRouting(
  manse: ManseProfile,
  abcKey: string,
  learningKey: string,
  engineering: ReturnType<typeof getEngineeringProfile>
): StrategicRouting {
  const WEIGHTS = { manse: 2, abc: 3, learning: 6, engineering: 4 };

  const score = {
    math: 0,
    science: 0,
    stability: 0,
    exploration: 0,
    communication: 0,
  };

  score.math += ((manse.energies.metal + manse.energies.water) / 2) * WEIGHTS.manse;
  score.science += ((manse.energies.wood + manse.energies.fire) / 2) * WEIGHTS.manse;
  score.stability += manse.energies.earth * WEIGHTS.manse;
  score.exploration += ((manse.energies.wood + manse.energies.water) / 2) * WEIGHTS.manse;
  score.communication += ((manse.energies.fire + manse.energies.earth) / 2) * WEIGHTS.manse;

  if (abcKey === 'A') {
    score.math += 25 * WEIGHTS.abc;
    score.stability += 20 * WEIGHTS.abc;
  } else if (abcKey === 'B') {
    score.communication += 24 * WEIGHTS.abc;
    score.stability += 12 * WEIGHTS.abc;
  } else {
    score.science += 22 * WEIGHTS.abc;
    score.exploration += 25 * WEIGHTS.abc;
  }

  if (learningKey === 'independent') {
    score.math += 20 * WEIGHTS.learning;
    score.exploration += 24 * WEIGHTS.learning;
  } else if (learningKey === 'cooperative') {
    score.communication += 26 * WEIGHTS.learning;
  } else if (learningKey === 'competitive') {
    score.math += 18 * WEIGHTS.learning;
    score.science += 18 * WEIGHTS.learning;
  } else if (learningKey === 'dependent') {
    score.stability += 24 * WEIGHTS.learning;
  } else if (learningKey === 'participant') {
    score.communication += 20 * WEIGHTS.learning;
    score.science += 12 * WEIGHTS.learning;
  } else {
    score.stability -= 6 * WEIGHTS.learning;
  }

  if (engineering.process === '숙고') score.math += 20 * WEIGHTS.engineering;
  else score.science += 14 * WEIGHTS.engineering;
  if (engineering.perception === '직관') score.exploration += 18 * WEIGHTS.engineering;
  else score.math += 12 * WEIGHTS.engineering;
  if (engineering.input === '시각') score.science += 14 * WEIGHTS.engineering;
  else score.communication += 10 * WEIGHTS.engineering;
  if (engineering.understanding === '순차') score.math += 16 * WEIGHTS.engineering;
  else score.exploration += 14 * WEIGHTS.engineering;

  const highSchoolType =
    score.stability >= score.exploration
      ? '내신·루틴 관리형 일반고/자사고 트랙'
      : score.exploration >= score.communication
        ? '탐구·프로젝트 확장형 과학중점/융합 트랙'
        : '균형형(교과+활동) 일반고 확장 트랙';

  const majorCandidates = [
    { key: 'AI·컴퓨터공학', value: score.math * 1.1 + score.exploration * 0.8 },
    { key: '전기전자·기계공학', value: score.math + score.science * 0.9 + score.stability * 0.6 },
    { key: '생명·의공학', value: score.science * 1.1 + score.exploration * 0.7 },
    { key: '경영·데이터융합', value: score.math * 0.8 + score.communication * 1.0 + score.stability * 0.7 },
    { key: '인문사회·교육', value: score.communication * 1.1 + score.stability * 0.8 },
  ].sort((a, b) => b.value - a.value);

  const collegeMajorTrack = `${majorCandidates[0].key} (보조: ${majorCandidates[1].key})`;
  const subjectPriority = score.math >= score.science ? '수학 중심' : '과학 중심';

  const parentCoreMode =
    learningKey === 'independent'
      ? '지시형 금지, 질문형 코칭(논리 근거 확인) + 주간 점검 1회'
      : learningKey === 'cooperative' || learningKey === 'participant'
        ? '관계형 코칭(정서 안정 + 협업 과제 피드백) + 과정 칭찬'
        : '구조형 코칭(목표-실행-검증 체크리스트) + 데이터 기반 피드백';

  const parentSubjectMode =
    subjectPriority === '수학 중심'
      ? '수학은 풀이 속도보다 풀이 근거를 끝까지 설명하게 지도'
      : '과학은 실험·탐구 기록(가설-검증-해석) 누적을 우선 지도';

  const parentAdmissionMode = highSchoolType.includes('내신·루틴')
    ? '고입 준비는 내신/수행 루틴 캘린더를 주 단위로 고정'
    : highSchoolType.includes('탐구·프로젝트')
      ? '고입 준비는 탐구 산출물 포트폴리오와 활동 로그를 월 단위로 관리'
      : '고입 준비는 교과 성취와 비교과 활동의 균형 점검표를 병행';

  const parentMajorMode =
    majorCandidates[0].key === '인문사회·교육'
      ? '대입 학과 탐색은 면접형 서술 역량과 독서-토론 기록을 함께 관리'
      : '대입 학과 탐색은 수학·과학 성취 지표와 프로젝트 증빙을 함께 관리';

  const parentCoachingMode = `${parentCoreMode} / ${parentSubjectMode} / ${parentAdmissionMode} / ${parentMajorMode}`;

  const mathPlan =
    score.math >= score.science
      ? '수학은 순차형 루틴(조건 추출→도구 선택→연산 검증) 중심으로 운영'
      : '수학은 시각화 기반 접근(문제 구조도 작성 후 풀이)로 전환';

  const sciencePlan =
    score.science >= score.math
      ? '과학은 탐구/모델링 중심으로 심화하고, 실험형 기록을 누적'
      : '과학은 핵심 개념 도식화와 기출 구조화로 안정적 점수 확보';

  return {
    formula: `가중식: 만세력×${WEIGHTS.manse} + ABC×${WEIGHTS.abc} + 학습성향×${WEIGHTS.learning} + 공학적합도×${WEIGHTS.engineering}`,
    mathPlan,
    sciencePlan,
    highSchoolType,
    collegeMajorTrack,
    parentCoachingMode,
  };
}
export function buildMappedReport(intake: IntakeForm, answers: SurveyAnswers): MappedReport {
  const abcTotals = axisTotals(ABC_QUESTIONS, answers.abc);
  const learningTotals = axisTotals(LEARNING_QUESTIONS, answers.learning);
  const manse = buildManseProfile(intake);
  const engineering = getEngineeringProfile(answers.engineering);

  const abcKey = topAxis(abcTotals) || 'A';
  const learningKey = topAxis(learningTotals) || 'independent';

  const abcDominant = ABC_LABEL[abcKey] ?? '안정-체계형';
  const learningDominant = LEARNING_LABEL[learningKey] ?? '독립형';
  const routing = buildStrategicRouting(manse, abcKey, learningKey, engineering);
  const name = intake.name || '학생';

  const sections: ReportSection[] = [
    {
      title: '1. 전문가 총평',
      body: [
        `${name} 학생은 선천적 ${abcDominant} 특성과 후천적 ${learningDominant} 학습 태도가 결합된 유형입니다.`,
        `만세력 개인화의 주축은 ${manse.primaryLabel}, 보조 축은 ${manse.secondaryLabel}입니다.`,
        '현재 병목은 역량 부족보다 입력-처리-출력 루틴 불일치 가능성에 가깝습니다.',
      ],
    },
    {
      title: '2. 만세력 기반 개인화 해석',
      body: [
        `기본 기질 해석: ${manse.temperament}`,
        `권장 학습 모드: ${manse.studyMode}`,
        `주의 포인트: ${manse.riskPoint}`,
        `우선 실행안: ${manse.focusAction}`,
      ],
    },
    {
      title: '3. 결합 가중치 기반 진학 매핑',
      body: [
        routing.formula,
        `수학 전략: ${routing.mathPlan}`,
        `과학 전략: ${routing.sciencePlan}`,
        `고입 권장 유형: ${routing.highSchoolType}`,
        `대입 학과 트랙: ${routing.collegeMajorTrack}`,
        `학부모 코칭 모드: ${routing.parentCoachingMode}`,
      ],
    },
    {
      title: '4. 과목별 정밀 처방 (수학·과학)',
      body: [
        '수학: [조건 추출 → 도구 선택 → 연산 수행] 3단계 고정 루틴으로 논리 단절을 줄입니다.',
        '수학: 고난도 문항은 선 구조(개념도/조건 연결) 후 풀이 방식으로 접근해 실수율을 낮춥니다.',
        '과학: 원리 도식화(마인드맵/인과 도표) 중심으로 장기 기억 전이를 강화합니다.',
        '과학: 한 문제를 완전 분해·재구성하는 학습으로 탐구형 평가 대응력을 높입니다.',
      ],
    },
    {
      title: '5. 학습 태도·공학 적합도 해석',
      body: [
        `핵심 학습 성향: ${learningDominant}`,
        `인지 처리 경로: ${engineering.summary}`,
        '학습 소유권(Cognitive Ownership)을 학생에게 부여할수록 동기·지속성이 강해집니다.',
      ],
    },
    {
      title: '6. 학부모 코칭 가이드',
      body: [
        routing.parentCoachingMode,
        '결과 중심 질문 대신 과정 중심 질문(근거·순서·오답 원인)을 사용합니다.',
        '감정적 칭찬보다 데이터 기반 인정(완료율·오답 유형·도식화 정확도)을 제공합니다.',
      ],
    },
  ];

  return {
    title: `${name} 님 입시 DNA 프리즘 전략 보고서`,
    subtitle: `${intake.school || '학교 미입력'} · ${intake.grade || '학년 미입력'}`,
    headline: `${abcDominant} × ${learningDominant} × ${engineering.summary} × ${manse.primaryLabel}`,
    scoreSummary: {
      abcDominant,
      learningDominant,
      engineeringSummary: engineering.summary,
      mansePrimary: manse.primaryLabel,
      manseSecondary: manse.secondaryLabel,
    },
    routing,
    sections,
    recommendations: [
      `개인화 우선 실행: ${manse.focusAction}`,
      `고입 실행 포인트: ${routing.highSchoolType}`,
      `대입 학과 검토: ${routing.collegeMajorTrack}`,
      `학부모 코칭 실행: ${routing.parentCoachingMode}`,
      '주 1회 루틴 점검: 과목별 목표-실행-피드백 루프를 고정합니다.',
      '오답 분석 표준화: 원인 분류와 재발 방지 규칙을 문서화합니다.',
    ],
  };
}





