import type { PrismForm } from "./prismData";

export type IlsDimension = {
  key: "process" | "perception" | "input" | "understanding";
  left: string;
  right: string;
  diff: number;
  favored: string;
  level: string;
};

export type ReportTable = {
  headers: string[];
  rows: string[][];
};

export type ReportPageItem = {
  pageNo: number;
  title: string;
  subtitle: string;
  punchline?: string;
  paragraphs: string[];
  bullets?: string[];
  table?: ReportTable;
};

export type CoverProfile = {
  centerName: string;
  representative: string;
  address: string;
  phone: string;
  website: string;
  snsInstagram: string;
  snsBlog: string;
  snsBand: string;
};

export type ReportContent = {
  studentName: string;
  schoolName: string;
  grade: string;
  issueDate: string;
  safeAnswers: number[];
  ilsDimensions: IlsDimension[];
  abcScores: { A: number; B: number; C: number };
  pages: ReportPageItem[];
  coverProfile: CoverProfile;
  routing?: {
    targetUniv: string;
    highSchoolType: string;
    collegeMajorTrack: string;
    parentCoaching: string;
    mathPlan: string;
    sciencePlan: string;
  };
  prismScores?: {
    axis: string;
    student: number;
    target: number;
  }[];
};

function clampIlsDiff(value: number) {
  return Math.min(Math.max(value, 1), 11);
}

function toIlsLevel(diff: number) {
  if (diff <= 3) return "균형";
  if (diff <= 7) return "중간 강도";
  return "강함";
}

function buildIlsDimensions(safeAnswers: number[]): IlsDimension[] {
  const [q1, q2, q3, q4, q5] = safeAnswers;

  return [
    {
      key: "process",
      left: "활동형",
      right: "성찰형",
      diff: clampIlsDiff(Math.abs(q1 - q4) * 2 + 1),
      favored: q4 >= q1 ? "성찰형" : "활동형",
      level: toIlsLevel(clampIlsDiff(Math.abs(q1 - q4) * 2 + 1)),
    },
    {
      key: "perception",
      left: "감각형",
      right: "직관형",
      diff: clampIlsDiff(Math.abs(q2 - q5) * 2 + 1),
      favored: q5 >= q2 ? "직관형" : "감각형",
      level: toIlsLevel(clampIlsDiff(Math.abs(q2 - q5) * 2 + 1)),
    },
    {
      key: "input",
      left: "시각형",
      right: "언어형",
      diff: clampIlsDiff(Math.abs(q3 - q1) * 2 + 1),
      favored: q3 >= q1 ? "시각형" : "언어형",
      level: toIlsLevel(clampIlsDiff(Math.abs(q3 - q1) * 2 + 1)),
    },
    {
      key: "understanding",
      left: "순차형",
      right: "전체형",
      diff: clampIlsDiff(Math.abs(q4 - q2) * 2 + 1),
      favored: q2 >= q4 ? "순차형" : "전체형",
      level: toIlsLevel(clampIlsDiff(Math.abs(q4 - q2) * 2 + 1)),
    },
  ];
}

function buildAbcScores(safeAnswers: number[]) {
  const [, q2, , q4, q5] = safeAnswers;
  const A = Math.min(99, 72 + q5 * 5);
  const B = Math.min(99, 68 + q2 * 5);
  const C = Math.min(99, 65 + q4 * 6);
  return { A, B, C };
}

export function buildReportContent(form: PrismForm, answers: number[]): ReportContent {
  const studentName = form.studentName || "학생";
  const schoolName = form.schoolName || "학교 미입력";
  const grade = form.grade || "학년 미입력";
  const issueDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const safeAnswers = answers.length >= 5 ? answers : [4, 4, 4, 4, 4];
  const ilsDimensions = buildIlsDimensions(safeAnswers);
  const abcScores = buildAbcScores(safeAnswers);

  const coverProfile: CoverProfile = {
    centerName: "대치수프리마 입시&코칭센터",
    representative: "고운 입시전략연구소",
    address: "서울시 강남구 도곡로 326 B1F",
    phone: "010-2370-1077",
    website: "www.suprema.clinic",
    snsInstagram: "suprima_ipsicreator",
    snsBlog: "blog.naver.com/gouniv_hifive",
    snsBand: "band.us/@suprima",
  };

  const routing = {
    targetUniv: "상위권 학생부종합전형",
    highSchoolType:
      abcScores.A >= abcScores.C
        ? "루틴과 기록 관리가 안정적인 일반고·자사고형"
        : "탐구 확장과 프로젝트 운영이 강한 자사고·특목고형",
    collegeMajorTrack:
      form.track === "자연"
        ? "공학·자연과학 계열 중심"
        : "인문사회·통합계열 중심",
    parentCoaching:
      "결과보다 과정, 지시보다 질문, 비교보다 기록 누적 중심으로 코칭합니다.",
    mathPlan:
      "수학은 개념 구조화와 오답 복기 루틴을 고정해 안정적인 문제 해결력을 높입니다.",
    sciencePlan:
      "과학은 가설-검증-해석 흐름으로 탐구 기록을 누적해 학생부 스토리를 강화합니다.",
  };

  const prismScores = [
    { axis: "자기주도", student: Math.min(98, 70 + safeAnswers[0] * 5), target: 90 },
    { axis: "논리사고", student: Math.min(98, 70 + safeAnswers[1] * 5), target: 88 },
    { axis: "몰입지속", student: Math.min(98, 70 + safeAnswers[2] * 5), target: 89 },
    { axis: "적응균형", student: Math.min(98, 60 + safeAnswers[3] * 6), target: 84 },
    { axis: "탐구심화", student: Math.min(98, 72 + safeAnswers[4] * 5), target: 91 },
  ];

  const pages: ReportPageItem[] = [
    {
      pageNo: 1,
      title: "1페이지 · 종합 진단 요약",
      subtitle: "PREMIUM DIAGNOSIS SUMMARY",
      punchline: `${studentName} 학생은 자기주도성과 탐구 지속력이 강하며, 구조화된 학습 루틴에서 성과가 빠르게 안정되는 유형입니다.`,
      paragraphs: [
        `${studentName} 학생은 ${schoolName} ${grade} 기준으로 볼 때 독립적인 학습 태도와 깊이 있는 탐구 성향이 함께 드러납니다.`,
        "현재 결과는 단순 성향 확인이 아니라 이후 학습 설계와 학생부 확장 전략의 출발점으로 해석해야 합니다.",
        "입력된 문항과 반응을 바탕으로 스스로 구조를 만드는 힘이 강하므로 감정적 격려보다 구체적 질문과 기록 기반 피드백이 더 효과적입니다.",
      ],
      bullets: [
        `진학 방향: ${routing.targetUniv}`,
        `추천 고교 유형: ${routing.highSchoolType}`,
        `우선 학과 축: ${routing.collegeMajorTrack}`,
      ],
    },
    {
      pageNo: 2,
      title: "2페이지 · ABC 기질 해석",
      subtitle: "ABC COGNITIVE BALANCE",
      paragraphs: [
        `A 축 ${abcScores.A}점: 개념을 깊이 이해하고 자기 언어로 재정리하는 힘이 강합니다.`,
        `B 축 ${abcScores.B}점: 규칙, 체크리스트, 반복 루틴을 안정적으로 유지하는 편입니다.`,
        `C 축 ${abcScores.C}점: 탐구 확장, 주제 전개, 자기 선택형 과제에서 추진력이 드러납니다.`,
      ],
      table: {
        headers: ["축", "점수", "해석"],
        rows: [
          ["A", String(abcScores.A), "개념의 깊이와 자기 설명 역량"],
          ["B", String(abcScores.B), "루틴 유지와 점검 안정성"],
          ["C", String(abcScores.C), "탐구 확장과 주도적 실행력"],
        ],
      },
    },
    {
      pageNo: 3,
      title: "3페이지 · ILS 학습 프로필",
      subtitle: "INDEX OF LEARNING STYLES",
      paragraphs: [
        `${studentName} 학생의 학습 흐름은 ${ilsDimensions.map((dim) => `${dim.key}:${dim.favored}`).join(", ")} 조합으로 정리됩니다.`,
        "문제를 보자마자 반응하기보다 먼저 구조를 정리하고 접근 순서를 세우는 방식이 더 안정적인 결과로 이어집니다.",
      ],
      table: {
        headers: ["차원", "우세 성향", "강도"],
        rows: ilsDimensions.map((dim) => [dim.key, dim.favored, dim.level]),
      },
    },
    {
      pageNo: 4,
      title: "4페이지 · 과목별 처방",
      subtitle: "SUBJECT STRATEGY",
      paragraphs: [
        routing.mathPlan,
        routing.sciencePlan,
        "독서와 보고서 작성은 탐구 결과를 학생부 문장으로 연결하는 단계이므로 짧은 요약보다 긴 문단형 기록을 남기는 것이 중요합니다.",
      ],
      bullets: [
        "수학: 개념-유형-오답 복기 루틴 고정",
        "과학: 가설-검증-해석 기록 누적",
        "독서: 탐구 질문과 연결되는 메모 축적",
      ],
    },
    {
      pageNo: 5,
      title: "5페이지 · 학부모 코칭 가이드",
      subtitle: "PARENT COACHING GUIDE",
      paragraphs: [
        routing.parentCoaching,
        "무조건적인 칭찬보다 학생이 선택한 근거와 구조를 설명하게 만드는 질문이 더 효과적입니다.",
        "일정, 기록, 마감 시점을 대신 정리해 주기보다 스스로 설명하고 조정하게 만드는 방식이 적합합니다.",
      ],
    },
  ];

  return {
    studentName,
    schoolName,
    grade,
    issueDate,
    safeAnswers,
    ilsDimensions,
    abcScores,
    pages,
    coverProfile,
    routing,
    prismScores,
  };
}
