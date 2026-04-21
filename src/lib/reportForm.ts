import { buildReport, type PrismForm, PRISM_QUESTIONS } from "@/lib/prismData";

export type IlsDimension = {
  key: string;
  left: string;
  right: string;
  diff: number;
  favored: string;
  level: string;
};

export type ReportPageItem = {
  pageNo: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  visual?: "ilsChart" | "mathFlow" | "scienceMap" | "roadmap";
};

export type CoverProfile = {
  centerName: string;
  address: string;
  phone: string;
  website: string;
  snsInstagram: string;
  snsBlog: string;
};

export type ReportContent = {
  studentName: string;
  schoolName: string;
  issueDate: string;
  safeAnswers: number[];
  ilsDimensions: IlsDimension[];
  pages: ReportPageItem[];
  coverProfile: CoverProfile;
};

function toIlsLevel(diff: number): string {
  if (diff <= 3) return "균형(조화) 구간";
  if (diff <= 7) return "선호 구간";
  return "매우 선명한 선호 구간";
}

function clampIlsDiff(value: number): number {
  return Math.max(1, Math.min(11, value));
}

export function buildReportContent(form: PrismForm, answers: number[]): ReportContent {
  const report = buildReport(answers);
  const safeAnswers = answers.length === PRISM_QUESTIONS.length ? answers : [4, 4, 4, 3, 4];
  const [q1, q2, q3, q4, q5] = safeAnswers;
  const issueDate = new Date().toLocaleDateString("ko-KR");

  const studentName = form.studentName?.trim() || "서진영";
  const schoolName = form.schoolName?.trim() || "수프리마중학교";
  const coverProfile: CoverProfile = {
    centerName: "대치수프리마 입시&코칭센터",
    address: "서울시 강남구 대치동 (센터 주소 입력)",
    phone: "02-0000-0000",
    website: "https://www.sup-rima.co.kr",
    snsInstagram: "@suprima_official",
    snsBlog: "blog.naver.com/suprima",
  };

  const ilsDimensions: IlsDimension[] = [
    {
      key: "process",
      left: "활동형(Active)",
      right: "숙고형(Reflective)",
      diff: clampIlsDiff(Math.abs(q1 - q4) * 2 + 1),
      favored: q4 >= q1 ? "숙고형(Reflective)" : "활동형(Active)",
      level: toIlsLevel(clampIlsDiff(Math.abs(q1 - q4) * 2 + 1)),
    },
    {
      key: "perception",
      left: "감각형(Sensing)",
      right: "직관형(Intuitive)",
      diff: clampIlsDiff(Math.abs(q2 - q5) * 2 + 1),
      favored: q5 >= q2 ? "직관형(Intuitive)" : "감각형(Sensing)",
      level: toIlsLevel(clampIlsDiff(Math.abs(q2 - q5) * 2 + 1)),
    },
    {
      key: "input",
      left: "시각형(Visual)",
      right: "언어형(Verbal)",
      diff: clampIlsDiff(Math.abs(q3 - q1) * 2 + 1),
      favored: q3 >= q1 ? "시각형(Visual)" : "언어형(Verbal)",
      level: toIlsLevel(clampIlsDiff(Math.abs(q3 - q1) * 2 + 1)),
    },
    {
      key: "understanding",
      left: "순차형(Sequential)",
      right: "총체형(Global)",
      diff: clampIlsDiff(Math.abs(q4 - q2) * 2 + 1),
      favored: q2 >= q4 ? "순차형(Sequential)" : "총체형(Global)",
      level: toIlsLevel(clampIlsDiff(Math.abs(q4 - q2) * 2 + 1)),
    },
  ];

  const pages: ReportPageItem[] = [
    {
      pageNo: 1,
      title: "제1면 | 종합 진단 개요",
      subtitle: "제 1면 : 임상 진단 결과 요약 및 총평",
      paragraphs: [
        `성명: ${studentName} | 진단일: ${issueDate}`,
        `선천적(DNA) 기질: 학문 응집형 (인성-관성 중심 엔진) | 학교/학년: ${schoolName} / ${form.grade}`,
        `후천적 학습 태도(GRSLSS): ${report.learningType} | 인지 처리 경로(ILS): 숙고·직관·시각·순차형`,
        `${studentName} 학생은 정보를 정교하게 수용하고 규범을 준수하려는 선천적 인지 엔진을 바탕으로, 후천적으로 독립적 사고를 구축한 유형입니다. 현재의 학습 정체는 역량 부족이 아니라 높은 독립성이 체계적 출력 시스템과 만나지 못해 발생하는 인지적 병목 구간으로 해석됩니다.`,
      ],
    },
    {
      pageNo: 2,
      title: "제2면 | 선천적(DNA) 기질 분석",
      subtitle: "제 2~3면 : 선천적 기질과 후천적 성격의 결합 분석",
      paragraphs: [
        "학생의 선천적 엔진은 지식을 깊게 수용하고 내면화하는 인성(NP) 에너지와 정해진 규칙을 준수하려는 관성(CP) 에너지가 핵심 축입니다.",
        "한 번 수용된 정보는 쉽게 휘발되지 않고 장기 기억으로 전이되며, 논리적 인과관계가 선명할 때 인지 가동률이 극대화됩니다.",
        "이러한 선천적 신중함과 응축력은 학습의 깊이를 담보하는 강력한 자산입니다.",
      ],
    },
    {
      pageNo: 3,
      title: "제3면 | 후천적 학습 태도 결합",
      subtitle: "독립형 기질과 숙고형 경향의 결합",
      paragraphs: [
        `후천적 독립성은 현재 ${report.average}점 평균 응답에서 확인되며, 타인의 지시를 수동적으로 따르기보다 스스로 납득 가능한 근거를 확보할 때 에너지가 상승합니다.`,
        "완벽히 이해하지 못한 지식은 자기 것으로 인정하지 않는 특성이 있어, 심화 학습에서는 강점이 되지만 주입식 환경에서는 병목으로 작동할 수 있습니다.",
        "따라서 독립형의 장점을 살리는 자기 주도형 재구축 루틴이 필수입니다.",
      ],
    },
    {
      pageNo: 4,
      title: "제4면 | 수학 영역 정밀 처방",
      subtitle: "제 4~5면 : 과목별 정밀 학습 처방 (수학·과학)",
      paragraphs: [
        "수학은 단순 연산이 아니라 논리적 인과관계의 정밀 추적으로 접근해야 합니다.",
        "모든 수학 문항을 [조건 추출 - 도구 선택 - 연산 수행] 3단계로 고정하면 논리 단절을 막고 풀이 무결성을 확보할 수 있습니다.",
        "고난도 문항에서는 선 구조(개념도/조건도식), 후 풀이 전략이 효율적입니다.",
      ],
      visual: "mathFlow",
    },
    {
      pageNo: 5,
      title: "제5면 | 과학 영역 정밀 처방",
      subtitle: "시스템 이해와 도식적 재구성",
      paragraphs: [
        "과학 탐구는 분류와 시스템화에 특화된 경향이 강하므로, 원리를 마인드맵과 인과관계 도표로 시각화하는 접근이 유리합니다.",
        "지식을 소유하는 수준까지 원리를 백지 구조도로 설명하는 훈련이 필요하며, 문제량보다 원리 분해와 도식화 비중을 높여야 실전력이 향상됩니다.",
        "도식화 기반 학습은 장기적으로 공학/데이터형 전공 적합도와도 연결됩니다.",
      ],
      visual: "scienceMap",
    },
    {
      pageNo: 6,
      title: "제6면 | 학습 태도 검사(GRSLSS) 정밀 분석",
      subtitle: "독립형 성향의 운영 해법",
      paragraphs: [
        "독립형 성향은 단순 고집이 아니라 지식을 자기 논리 체계 안에서 완전히 소화하려는 학문적 주체성의 표현입니다.",
        "교사 중심 주입식 수업에서는 인지 피로가 높아질 수 있으므로, 계획-실행-복기의 자기 루틴 설계가 필요합니다.",
        `문항 응답 상세: ${PRISM_QUESTIONS[0]}(${q1}점), ${PRISM_QUESTIONS[1]}(${q2}점), ${PRISM_QUESTIONS[2]}(${q3}점), ${PRISM_QUESTIONS[3]}(${q4}점), ${PRISM_QUESTIONS[4]}(${q5}점)`,
      ],
    },
    {
      pageNo: 7,
      title: "제7면 | 공학선호도검사(ILS) 정밀 분석",
      subtitle: "공학적 직관과 정교한 분석 설계",
      paragraphs: [
        "공학 적합도는 학습 성향보다 더 강하게 작동하는 인지 처리 규격입니다.",
        "이 페이지는 DOCX 지시 문구에 따라 ILS 4차원 시각 차트를 삽입한 페이지입니다.",
        ...ilsDimensions.map((d) => `${d.left} ↔ ${d.right} | 점수차 ${d.diff} | 우세: ${d.favored} | ${d.level}`),
      ],
      visual: "ilsChart",
    },
    {
      pageNo: 8,
      title: "제8면 | 지적 확장 전략 I",
      subtitle: "제 8~9면 : 서울대 아로리 스타일 탐구 설계",
      paragraphs: [
        "깊이 있는 학업 역량은 독립적인 자아가 주체가 되어 끈기 있게 질문을 던지고 해답을 찾아가는 과정입니다.",
        "독립성, 숙고형, 직관형 성향은 이 기준에 부합하는 핵심 자산이며, 정답 중심 과제보다 탐구 중심 과제에서 강점이 크게 발현됩니다.",
        "초·중등 시기에는 실패 리스크가 낮은 프로젝트를 통해 탐구 메커니즘을 체득해야 합니다.",
      ],
    },
    {
      pageNo: 9,
      title: "제9면 | 지적 확장 전략 II",
      subtitle: "파생 탐구 주제 예시",
      paragraphs: [
        "수학-알고리즘: 일상 동선이나 앱 구조를 해체하고 최적화 알고리즘을 설계하는 보고서",
        "물리-도식화: 드론 비행 원리 등 물리 현상을 화살표/도형으로 구조화하고 수식화하는 포스터",
        "실패 자산화 보고서: 오답·실패 원인 분석을 통해 다음 실험 제언을 남기는 구조",
      ],
    },
    {
      pageNo: 10,
      title: "제10면 | 6년 통합 로드맵 I",
      subtitle: "제 10~11면 : 시행착오의 자산화",
      paragraphs: [
        "초·중등 시기는 지식 선행 자체보다, 고교 심화 탐구를 위한 안전한 실패와 내성 축적의 시기로 설계해야 합니다.",
        "규범 준수 경향으로 실수를 두려워할 수 있으므로, 이 시기부터 실패를 데이터로 해석하는 습관을 만들어야 합니다.",
        "로드맵의 목표는 고교 단계에서 거침없는 탐구력으로 전환되는 기반 구축입니다.",
      ],
      visual: "roadmap",
    },
    {
      pageNo: 11,
      title: "제11면 | 6년 통합 로드맵 II",
      subtitle: "단계별 집중 과제",
      paragraphs: [
        "초등 고학년: 시각적 도식화 노트 습관 형성",
        "중등: 안전한 실패 반복 경험 및 실패 분석 보고서 최소 5회",
        "고등: 심화 탐구 결과물 산출 및 지적 성숙도 증명",
        "단계별 산출물은 상담/코칭에서 누적 포트폴리오로 관리합니다.",
      ],
    },
    {
      pageNo: 12,
      title: "제12면 | 전문가 최종 처방",
      subtitle: "제 12-1/12-2면 통합 처방",
      paragraphs: [
        "핵심 처방 I: 자기 언어화 프로토콜(즉시 요약, 구조적 도식화, 가상 설명)로 숙고형 병목을 방어합니다.",
        "핵심 처방 II: 학부모 코칭은 결과 중심 지시가 아닌 과정 데이터 질문 중심으로 전환합니다.",
        "실패를 성장 데이터로 재정의하고, 정답이 없는 탐구를 허용하는 환경을 제공해야 고교 심화 구간에서 폭발적 성장을 기대할 수 있습니다.",
      ],
    },
  ];

  return { studentName, schoolName, issueDate, safeAnswers, ilsDimensions, pages, coverProfile };
}

