export type PrismForm = {
  studentName: string;
  schoolName: string;
  grade: string;
  track: string;
  studentPhone: string;
  parentPhone: string;
  birthDate: string;
  gender: string;
  birthTime: string;
};

export const KR = {
  studentDefault: "서진영",
  schoolDefault: "수프리마중학교",
  trackHumanities: "인문",
  trackScience: "자연",
  genderMale: "남",
  genderFemale: "여",
};

export const PRISM_QUESTIONS = [
  "새로운 과제를 시작할 때 스스로 계획을 세운다.",
  "문제를 볼 때 직관보다 근거를 먼저 찾는다.",
  "한 번 집중하면 끝까지 밀어붙이는 편이다.",
  "사람들과 협업할 때 의견 조율이 편하다.",
  "관심 분야를 깊게 파고드는 편이다.",
];

export const DEFAULT_FORM: PrismForm = {
  studentName: KR.studentDefault,
  schoolName: KR.schoolDefault,
  grade: "중2",
  track: KR.trackHumanities,
  studentPhone: "010-1234-5678",
  parentPhone: "010-9876-5432",
  birthDate: "2011.03.20",
  gender: KR.genderMale,
  birthTime: "14:10",
};

export function loadFormFromStorage(): PrismForm {
  if (typeof window === "undefined") return DEFAULT_FORM;
  try {
    const raw = window.sessionStorage.getItem("prismForm");
    if (!raw) return DEFAULT_FORM;
    const parsed = JSON.parse(raw) as Partial<PrismForm>;
    return { ...DEFAULT_FORM, ...parsed };
  } catch {
    return DEFAULT_FORM;
  }
}

export function saveFormToStorage(form: PrismForm) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("prismForm", JSON.stringify(form));
}

export function loadAnswersFromStorage(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem("prismAnswers");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as number[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((n) => Number(n)).filter((n) => Number.isFinite(n));
  } catch {
    return [];
  }
}

export function saveAnswersToStorage(answers: number[]) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem("prismAnswers", JSON.stringify(answers));
}

export function buildReport(answers: number[]) {
  const safe = answers.length === PRISM_QUESTIONS.length ? answers : [4, 4, 4, 3, 4];
  const [planning, logical, focus, collab, depth] = safe;
  const average = Number((safe.reduce((a, b) => a + b, 0) / safe.length).toFixed(2));
  const engineeringFit = Math.round(((logical + focus + depth) / 15) * 100);
  const learningType =
    focus >= 4 && depth >= 4
      ? "심화 몰입형"
      : collab >= 4
        ? "협업 균형형"
        : "기본 성장형";

  const strengths = [
    planning >= 4 ? "자기주도 계획 수립" : "기본 계획 수립 역량",
    logical >= 4 ? "근거 중심 사고" : "직관-근거 균형 사고",
    depth >= 4 ? "탐구 지속력" : "안정적 과제 수행력",
  ];

  return { average, engineeringFit, learningType, strengths };
}

