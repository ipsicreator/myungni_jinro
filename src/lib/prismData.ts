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
  studentDefault: "\uC11C\uC9C4\uC601",
  schoolDefault: "\uC218\uD504\uB9AC\uB9C8\uC911\uD559\uAD50",
  trackHumanities: "\uC778\uBB38",
  trackScience: "\uC790\uC5F0",
  genderMale: "\uB0A8",
  genderFemale: "\uC5EC",
};

export const PRISM_QUESTIONS = [
  "\uC0C8\uB85C\uC6B4 \uACFC\uC81C\uB97C \uC2DC\uC791\uD560 \uB54C \uC2A4\uC2A4\uB85C \uACC4\uD68D\uC744 \uC138\uC6B4\uB2E4.",
  "\uBB38\uC81C\uB97C \uBCFC \uB54C \uC9C1\uAD00\uBCF4\uB2E4 \uADFC\uAC70\uB97C \uBA3C\uC800 \uCC3E\uB294\uB2E4.",
  "\uD55C \uBC88 \uC9D1\uC911\uD558\uBA74 \uB05D\uAE4C\uC9C0 \uBC00\uC5B4\uBD99\uC774\uB294 \uD3B8\uC774\uB2E4.",
  "\uC0AC\uB78C\uB4E4\uACFC \uD611\uC5C5\uD560 \uB54C \uC758\uACAC \uC870\uC728\uC774 \uD3B8\uD558\uB2E4.",
  "\uAD00\uC2EC \uBD84\uC57C\uB97C \uAE4A\uAC8C \uD30C\uACE0\uB4DC\uB294 \uD3B8\uC774\uB2E4.",
];

export const DEFAULT_FORM: PrismForm = {
  studentName: KR.studentDefault,
  schoolName: KR.schoolDefault,
  grade: "\uC9112",
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
      ? "\uC2EC\uD654 \uBAB0\uC785\uD615"
      : collab >= 4
        ? "\uD611\uC5C5 \uADE0\uD615\uD615"
        : "\uAE30\uBCF8 \uC131\uC7A5\uD615";

  const strengths = [
    planning >= 4 ? "\uC790\uAE30\uC8FC\uB3C4 \uACC4\uD68D \uC218\uB9BD" : "\uAE30\uBCF8 \uACC4\uD68D \uC218\uB9BD \uC5ED\uB7C9",
    logical >= 4 ? "\uADFC\uAC70 \uC911\uC2EC \uC0AC\uACE0" : "\uC9C1\uAD00-\uADFC\uAC70 \uADE0\uD615 \uC0AC\uACE0",
    depth >= 4 ? "\uD0D0\uAD6C \uC9C0\uC18D\uB825" : "\uC548\uC815\uC801 \uACFC\uC81C \uC218\uD589\uB825",
  ];

  return { average, engineeringFit, learningType, strengths };
}
