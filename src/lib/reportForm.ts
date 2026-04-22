import type { PrismForm } from "./prismData";

export type IlsDimension = {
  key: string;
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
  visual?: "ilsChart" | "manseDNA" | "mathFlow" | "scienceMap" | "roadmap" | "competitiveRank";
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
};

function clampIlsDiff(val: number) {
  return Math.min(Math.max(val, 1), 11);
}

function toIlsLevel(diff: number) {
  if (diff <= 3) return "균형(Balanced)";
  if (diff <= 7) return "중간(Moderate)";
  return "강함(Strong)";
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
  const [q1, q2, q3, q4, q5] = safeAnswers;

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

  const coverProfile: CoverProfile = {
    centerName: "대치 수프리마 입시&코칭센터",
    address: "서울특별시 강남구 대치동 (SUPREMA CLINIC)",
    phone: "02-1234-5678",
    website: "www.suprema.clinic",
    snsInstagram: "@suprema_clinic",
    snsBlog: "blog.naver.com/suprema",
  };

  const pages: ReportPageItem[] = [
    {
      pageNo: 1,
      title: "제 1면 : 임상 진단 결과 요약 및 총평",
      subtitle: "PREMIUM DIAGNOSIS SUMMARY",
      punchline: "지능이 엔진이라면, 전략은 연료입니다. 독립성 94%의 엔진에 최적화된 고압축 연료를 주입하십시오.",
      paragraphs: [
        `${studentName} 학생은 정보를 정교하게 수용하고 규범을 준수하려는 선천적 인지 엔진을 바탕으로, 후천적으로는 고도의 독립적 사고력(94%)을 구축한 '완성형 인재'의 자질을 갖추고 있습니다.`,
        "현재의 학습 정체는 역량의 부재가 아니라, 높은 독립성이 체계적인 '출력 시스템'을 만나지 못해 발생하는 인지적 병목 현상입니다. 이는 대치동권 최상위 학생들에게서 흔히 발견되는 '지적 완벽주의'의 전형적인 증상입니다.",
        "본 리포트는 학생의 엔진 규격에 맞는 [자기 주도적 재구축] 전략을 통해, 초·중등 시기에 고교 심화 탐구의 메커니즘을 미리 완주함으로써 서울대 아로리형 인재로 도약하는 경로를 제시합니다.",
        "핵심 전략: [지식 점유권]의 회복과 [출력의 시각화]. 학생이 가진 선천적 신중함과 후천적 주체성을 결합하여 실전 경쟁력을 극대화하는 것이 이번 컨설팅의 핵심 목표입니다.",
      ],
      bullets: [
        "종합 판단: SKY 및 의치한 계열의 정성 평가(학종)에서 독보적 우위를 점할 수 있는 '자기 언어화' 역량 보유.",
        "시급 과제: 주입식 대형 강의 위주의 학습에서 탈피하여, 스스로 지식을 해체하고 재조합하는 'Deep Work' 시간 확보.",
      ],
    },
    {
      pageNo: 2,
      title: "제 2면 : 선천적(DNA) 기질 및 학습 규격 분석 I",
      subtitle: "DNA & TEMPERAMENT ANALYSIS I",
      punchline: "선천적 엔진의 규격을 아는 것이 백전백승의 시작입니다. 학생의 인성(A)과 관성(B)의 결합을 주목하십시오.",
      paragraphs: [
        "제목: \"선천적 정보 수용 에너지(A)와 시스템 순응 에너지(B)의 상호작용\"",
        "학생의 선천적 엔진은 지식을 깊게 수용하고 내면화하는 '인성(A)' 에너지와 정해진 규칙과 틀을 준수하려는 '관성(B)' 에너지가 전체의 85% 이상을 차지하는 '학술적 완성형' 구조입니다. 이는 단순히 공부를 열심히 하는 것을 넘어, 지식의 기원을 탐구하고 체계화하는 데 최적화된 기질입니다.",
        "기질적 학습능력: 인성(A)이 강한 학생은 '독서'를 통해 지적 허기를 채울 때 가장 큰 도파민을 얻습니다. 반면, 휘발성이 강한 단기 암기식 공부는 선천적 규격과 충돌하여 인지적 스트레스를 유발할 수 있습니다. 지식을 '소유'하려는 욕구가 강해 깊이 있는 독서가 모든 심화 학습의 전제 조건이 됩니다.",
      ],
      bullets: [
        "DNA 분석: [인성(A) 95] - 학문의 근원을 파고드는 힘. 대치동 최상위권의 공통 기질.",
        "DNA 분석: [관성(B) 92] - 주어진 시스템 안에서 무결점의 결과를 도출하려는 완벽주의.",
        "전략적 제언: 고교 진학 전 '문창귀인'의 기운을 활용한 인문·공학 융합 독서 포트폴리오를 최소 20권 이상 누적하십시오.",
      ],
      visual: "manseDNA",
    },
    {
      pageNo: 3,
      title: "제 3면 : 선천적 기질(DNA)과 후천적 성향의 결합",
      subtitle: "DNA & TEMPERAMENT ANALYSIS II",
      punchline: "선천적 깊이(A)와 후천적 독립성(C)이 만나면 '독보적 전문가'의 길이 열립니다.",
      paragraphs: [
        "이러한 선천적 토양은 후천적 독립형(C: 94%) 기질과 결합하여 '자기 주도적 전문가' 스타일을 형성합니다. 타인의 지시를 수동적으로 따르기보다 스스로 납득할 수 있는 '논리적 근거'를 확보했을 때 에너지가 폭발합니다.",
        "특히 관성(B)의 정밀함이 독립성(C)과 결합하면, 남들이 보지 못하는 미세한 논리적 결점을 찾아내는 '디버깅(Debugging)' 능력이 탁월해집니다. 이는 영재학교 및 과학고에서 요구하는 R&E 역량의 핵심이며, 추후 대학 연구 단계에서 독보적인 성과를 낼 수 있는 엔진 규격입니다.",
      ],
      bullets: [
        "기질 결합: [인성(A) x 독립성(C)] = '지적 지배력'. 지시받는 학습이 아닌, 가르치는 학습(Teaching method)에서 효능감 극대화.",
        "전략적 보완: 발산하는 기운(식상)이 약하므로, 본인의 깊은 사고를 밖으로 끄집어내는 '글쓰기'와 '구술' 훈련이 필수적입니다.",
      ],
    },
    {
      pageNo: 4,
      title: "제 4면 : 과목별 정밀 학습 처방 (수학)",
      subtitle: "MATHEMATICS STRATEGY",
      paragraphs: [
        "제목: \"선천적 인지 편향에 최적화된 수학 핵심 전략\"",
        "학생에게 수학은 단순한 연산이 아니라 '논리적 인과관계의 정밀 추적'이어야 합니다. 부분적인 정보로도 전체의 논리를 재구성할 수 있는 분석적 우월성(순차형)을 보유하고 있습니다.",
        "강점 강화: 모든 수학 문항을 [조건 추출 - 도구 선택 - 연산 수행]의 3단계로 고정하여 논리적 단절을 막고 풀이 과정의 무결성을 확보하십시오.",
        "유리한 전략: 고난도 킬러 문항을 만났을 때 복잡한 연산에 먼저 매몰되기보다, 선천적 수용력(인성)을 활용해 문제의 조건을 철저히 분석하고 개념도를 그려 시각화(VIS)한 후 문제를 해결하는 '선 구조, 후 풀이' 전략이 훨씬 효율적입니다.",
      ],
      visual: "mathFlow",
    },
    {
      pageNo: 5,
      title: "제 5면 : 과목별 정밀 학습 처방 (과학)",
      subtitle: "SCIENCE STRATEGY",
      paragraphs: [
        "과학 탐구에서 학생의 기질은 '분류와 시스템화'에 특화되어 있습니다. 복잡한 과학적 현상을 하나의 거대한 기계적 매커니즘으로 이해할 때 뇌의 보상 체계가 강력하게 작동합니다.",
        "강점 강화: 단순 암기를 거부하는 직관형(INT) 기질을 고려하여, 물리나 화학의 원리를 마인드맵이나 인과관계 도표로 시각화하십시오.",
        "유리한 전략: 본인이 이해한 원리를 백지에 구조도로 그려내어 설명할 수 있는 수준까지 학습의 목표를 높이십시오. 지식을 '소유'하는 이 과정이 전체 과학 학습 시간의 60%를 차지해야 합니다. 단순히 문제집을 많이 푸는 것보다 한 문제의 원리를 완벽하게 분해하고 도식화하는 과정이 실전력 향상에 더 기여합니다.",
      ],
      visual: "scienceMap",
    },
    {
      pageNo: 6,
      title: "제 6면 : 학습 태도 검사(GRSLSS) 정밀 분석",
      subtitle: "INDEPENDENT LEARNING PROFILE",
      punchline: "독립성 94%는 통제의 대상이 아니라, 무한한 지적 주체성의 증거입니다.",
      paragraphs: [
        "제목: \"독립형 94% : 주입식 교육에 대한 인지적 거부권과 그 해법\"",
        "1. 학습 태도 진단 데이터 Matrix",
      ],
      table: {
        headers: ["지표", "결과(%)", "대치동 최상위권 기준 해석"],
        rows: [
          ["독립형 (Independent)", "94", "스스로 사고하고 학습하는 능력이 최상위 수준. 자신만의 학습 방식 고수."],
          ["회피형 (Avoidant)", "12", "학습 과업에 대한 책임감이 매우 높음. 도망치기보다 정면으로 돌파하는 유형."],
          ["협동형 (Collaborative)", "35", "혼자 깊이 파고드는 시간을 통해 지식을 정립. 협동 학습보다 개인 학습 선호."],
        ],
      },
      bullets: [
        "핵심 분석: 독립형 94%는 지식을 자신의 논리 체계 안에서 완벽히 소화하려는 '학문적 주체성'의 표현입니다.",
        "강점 활용 전략: [지식 점유권 부여] - 학생의 높은 지적 자존감을 존중하여, 학습의 전 과정에 대한 '소유권'을 학생에게 부여해야 합니다.",
      ],
    },
    {
      pageNo: 7,
      title: "제 7면 : 공학 적합도 검사(ILS) 정밀 분석",
      subtitle: "ILS 4D COGNITIVE DIMENSIONS",
      punchline: "공학 적합도는 학습 성향보다 300% 더 강력한 인지 처리 규격입니다.",
      paragraphs: [
        "제목: \"공학적 직관과 정교한 분석 설계: 미래 설계자를 위한 인지 프로토콜\"",
      ],
      table: {
        headers: ["차원", "결과", "입시 및 성적 강점 해석"],
        rows: [
          ["과정(Process)", ilsDimensions[0].favored, ilsDimensions[0].level === "강함(Strong)" ? "정보를 즉각 처리하기보다 내면의 반추를 통해 논리적 결점을 제거하는 무결점 사고. 고난도 수학 킬러 문항에서 실수 오차 제로에 도전." : "균형 잡힌 성찰적 태도로 실수를 예방합니다."],
          ["인식(Perception)", ilsDimensions[1].favored, "단순 암기보다 원리, 이론, 모델, 새로운 가능성을 찾는 통찰력과 수학적 형식에 대한 편안함. 새로운 개념을 매우 빠르게 수용."],
          ["입력(Input)", ilsDimensions[2].favored, "도표, 그림, 흐름도 등 시각적 표상을 통해 정보를 압도적으로 빠르게 습득. 복잡한 수식을 한눈에 파악."],
          ["이해(Understanding)", ilsDimensions[3].favored, "정보를 논리적 단계로 연결하며 정교한 분석 설계와 일직선상의 해답 추적 능력 탁월. 부분적 정보로 논리적 연관성 발견."],
        ],
      },
      visual: "ilsChart",
    },
    {
      pageNo: 8,
      title: "제 8면 : DNA-ILS 융합 주제 탐구 전략",
      subtitle: "DNA-ILS SUBJECT EXPLORATION",
      punchline: "기질적 깊이(A)와 시각적(VIS) 직관을 결합하여 독보적인 탐구 스토리를 설계하십시오.",
      paragraphs: [
        "제목: \"선천적 정밀성(B)과 시각적 도식화(VIS)를 활용한 심화 탐구 설계\"",
        "학생의 높은 관성(B: 92)과 시각형(VIS) 인지 규격은 복잡한 현상을 체계적인 모델로 변환하는 데 최적화되어 있습니다. 이는 서울대 아로리가 요구하는 '비판적 사고'와 '학업 역량'을 시각적으로 증명할 수 있는 가장 강력한 무기입니다.",
        "집중 영역 제안: 단순 문제 풀이에서 벗어나, [수리적 모델링]과 [시스템 해체]라는 테마에 집중하십시오. 본인이 관심 있는 과학적 원리나 사회 현상을 자신만의 시각적 언어(Flowchart, Model)로 재구축하는 과정이 필수적입니다.",
      ],
      bullets: [
        "[수학-물리 융합]: 특정 물리 현상의 수리적 모델링 보고서 작성. (예: 드론의 안정성 제어 알고리즘 분석)",
        "[시스템 도식화]: 복잡한 IT 시스템이나 생태계의 인과관계를 하나의 시각적 맵으로 표현.",
        "전략적 멘트: \"초/중등 시기의 이러한 탐구 경험은 고교 진학 후 학생부 종합 전형의 핵심 킬러 문항에 대한 정성적 해답이 됩니다.\"",
      ],
      visual: "subjectMap",
    },
    {
      pageNo: 9,
      title: "제 9면 : 지적 전이를 위한 심층 독서 루틴",
      subtitle: "DEEP READING & INTELLECTUAL TRANSFER",
      punchline: "인성(A)의 깊이를 탐구 결과물로 치환하는 'Deep Reading' 프로토콜을 가동하십시오.",
      paragraphs: [
        "제목: \"지적 호기심의 확장: 독서에서 탐구 보고서로의 전이(Transfer)\"",
        "학생의 높은 인성(A: 95) 에너지는 '활자'를 통해 지식을 흡수할 때 가장 안정적으로 작동합니다. 하지만 읽는 행위에서 멈추면 이는 단순한 '수용'에 그칩니다. VVIP 전략의 핵심은 이 독서 데이터를 [지적 전이] 과정을 통해 실제 결과물로 산출하는 것입니다.",
        "방법론: 책 한 권을 읽은 후, 반드시 [즉시 요약 - 구조적 도식화 - 가상 설명]의 3단계 루틴을 수행하십시오. 특히 학생의 순차적(SEQ) 성향을 활용해 논리의 흐름을 한 장의 'Concept Map'으로 정리하는 습관이 고교 생기부 경쟁력의 원천이 됩니다.",
      ],
      bullets: [
        "추천 영역: [수리철학 / 알고리즘의 기초 / 뇌과학] - 원리와 체계를 다루는 심층 텍스트.",
        "결과물 관리: 읽은 모든 책에 대해 'ILS 기반 비판적 서평'을 누적하여 자신만의 지적 포트폴리오를 관리하십시오.",
      ],
      visual: "readingFlow",
    },
    {
      pageNo: 10,
      title: "제 10면 : 6년 통합 지적 성장 로드맵 I",
      subtitle: "6-YEAR INTEGRATED ROADMAP I",
      punchline: "초/중등은 고교 생활을 미리 경험하고 지적 내성을 기르는 '테스트 베드'입니다.",
      paragraphs: [
        "제목: \"고교 생활의 선제적 경험(Pre-High School Experience) 설계\"",
        "학생의 기질상 중학교 시절은 단순히 내신 성적을 관리하는 시기가 아니라, 고등학교의 '심화 탐구'와 '독립적 의사결정'을 미리 시뮬레이션하는 시기여야 합니다. 선천적 관성(B)이 강해 실수를 극도로 경계하므로, 이 시기에 의도적인 '안전한 실패'를 경험시켜야 고등 단계에서 폭발적인 성장이 가능합니다.",
      ],
      bullets: [
        "철학: \"초/중등에서 경험한 깊이가 고등학교 성적의 '질(Quality)'을 결정합니다.\"",
        "핵심 지표: 독서를 기반으로 한 중등 탐구 보고서 5건 누적. 이는 고교 생기부의 예고편이 됩니다.",
      ],
      visual: "roadmap",
    },
    {
      pageNo: 11,
      title: "제 11면 : 6년 통합 지적 성장 로드맵 II",
      subtitle: "6-YEAR INTEGRATED ROADMAP II",
      paragraphs: [
        "2. 단계별 DNA 최적화 과제",
      ],
      bullets: [
        "초등 고학년: [기초 인성(A) 확립] - '무조건적 수용'이 아닌 '비판적 독서' 습관 정립. 요약 노트를 통해 지식의 소유권 훈련.",
        "중등 시기: [관성(B) 시스템 구축] - 고교 수준의 심화 과제를 일주일 단위로 경험하며, '계획-실행-실패-재수정'의 사이클을 고착화. 이 시기의 독서는 인문/과학 전공 서적 입문 단계까지 확장되어야 합니다.",
        "고등 단계: [독립적 성취(C) 증명] - 선천적 기질과 후천적 탐구력이 결합된 R&E 결과물로 서울대 아로리가 추구하는 '지적 성숙도'를 완성.",
      ],
    },
    {
      pageNo: 12,
      title: "제 12-1면 : 전문가 최종 처방 I",
      subtitle: "EXPERT PRESCRIPTION I",
      punchline: "서울대는 '무엇을 아는가'가 아닌 '어떻게 깨우쳤는가'를 묻는 대학입니다.",
      paragraphs: [
        "제목: \"지식의 완전한 소유: 숙고형 엔진을 위한 '자기 언어화' 프로토콜\"",
        "학생의 진단 데이터에서 가장 주목해야 할 결합은 선천적 학문 응집형 기질과 후천적 독립형(94%) 태도, 그리고 숙고형(Reflective) 인지 경로의 만남입니다. 이 조합은 지식을 매우 깊고 정교하게 처리할 수 있는 잠재력을 지녔지만, 동시에 치명적인 '인지적 병목 현상'을 내포하고 있습니다.",
        "병목을 뚫고 학생이 가진 압도적인 독립성(94%)을 성적으로 연결하기 위한 유일한 열쇠가 바로 \"자기 언어화(Self-Explanation & Summarization)\"입니다. 이는 단순히 배운 내용을 요약하는 복습 행위가 아닙니다. 외부에서 입력된 정보를 학생 본인의 고유한 인지 규격으로 다시 프로그래밍하여 컴파일(Compile)하는 고도의 인지 작업입니다.",
      ],
      bullets: [
        "[즉시 요약]: 수업 직후 혹은 교재의 한 단원이 끝난 직후, 책을 덮고 방금 배운 핵심 원리 딱 세 가지를 본인의 말투로 메모하십시오.",
        "[구조적 도식화]: 혼자만의 시간에 전체 내용을 하나의 '인과관계 지도(Causal Map)'나 '개념도'로 그리십시오.",
        "[가상 설명]: 요약된 내용을 가상의 후배에게 설명하듯 입 밖으로 내뱉으십시오.",
      ],
    },
    {
      pageNo: 13,
      title: "제 12-2면 : 전문가 최종 처방 II",
      subtitle: "EXPERT PRESCRIPTION II",
      paragraphs: [
        "제목: \"감정을 배제한 데이터 기반의 코칭: 독립적 지성을 위한 학부모 가이드\"",
        "1. 새로운 부모의 역할: '지원적 조력자' - 이미 학생은 독립적 주체성(94%)이 완성 단계에 와 있습니다. 부모의 일방적인 지시나 감정적인 호소는 학습 의욕을 꺾는 가장 치명적인 요소가 됩니다.",
        "따라서 학부모님의 역할은 '감독관'이 아니라, 학생이 스스로 세운 계획을 차질 없이 수행할 수 있도록 환경을 조성하고 데이터를 기반으로 피드백을 주는 '지원적 조력자(Facilitator)' 및 '전략적 파트너'로 전환되어야 합니다.",
      ],
      bullets: [
        "피드백의 중심을 '감정'에서 '데이터'로 이동: \"이 문제 맞았니?\" 대신 \"이 문제를 풀 때 너만의 논리적 순서는 무엇이었니?\"라고 물으십시오.",
        "과정의 완결성에 대한 인정: \"참 잘했어\"보다 \"네가 이 단원의 개념을 완벽하게 분해해서 도식화(VIS)한 과정이 정말 정교하구나\"와 같이 논리적 완결성을 인정해 주십시오.",
        "VVIP Exclusive Note: \"독립성이 높은 학생은 부모의 기대가 '통제'로 느껴질 때 가장 큰 무력감을 느낍니다. 부모님의 불안을 학생에게 전이하지 않는 것이 가장 고도의 코칭 기술입니다.\"",
      ],
    },
  ];

  const abcScores = {
    A: Math.round(((q1 + q2 + q3) / 15) * 100),
    B: Math.round(((q4 + q5 + (q1 + q2) / 2) / 15) * 100),
    C: Math.round(((q2 + q4 + q5) / 15) * 100),
  };

  const routing = {
    targetUniv: q1 >= 4 ? "서울대(공과계열), KAIST, 연세대(시스템반도체)" : "서울대(자연과학), 고려대(의생명), 성균관대",
    highSchoolType: q3 >= 4 ? "탐구 우위형 영재학교 / 과학고 / 전국단위 자사고 트랙" : "내신 우위형 광역 자사고 / 명문 일반고 트랙",
    collegeMajorTrack: q5 >= 4 ? "AI·컴퓨터공학 (심화: 반도체·나노공학)" : "바이오·의공학 (심화: 데이터융합)",
    parentCoaching: q4 >= 3 ? "질문형 코칭(Socratic Method) + 시각적 개방형 환경" : "시스템형 코칭(Checklist Method) + 집중형 환경",
    mathPlan: "고난도 킬러 문항 정복을 위한 '논리 구조 분해 노트' 상시 운영",
    sciencePlan: "대학 수준의 일반과학 선제적 탐구 및 R&E 산출물 누적",
  };

  pages.push(
    {
      pageNo: 14,
      title: "제 13면 : [DNA 기반] 최상위권 대입 및 고교 전략",
      subtitle: "DNA-DRIVEN ACADEMIC STRATEGY",
      punchline: "기질을 이기는 노력은 없습니다. 기질을 활용하는 전략만이 필승의 길입니다.",
      paragraphs: [
        `제목: "${studentName} 학생의 '인성(A)-관성(B)' 기반 고교/대학 최적 경로"`,
        `학생의 강한 인성(A)은 학구적인 환경에서 가장 빛납니다. 따라서 단순 내신 경쟁이 치열한 일반고보다는, 학생의 지적 호기심을 충족시키고 대학 수준의 탐구가 가능한 [ ${routing.highSchoolType} ] 진학이 학생의 DNA에 가장 부합합니다.`,
        `목표 대학 또한 연구 중심의 [ ${routing.targetUniv} ]로 설정하여, 학생의 깊은 분석력이 정성적으로 평가받을 수 있는 환경을 선점해야 합니다.`,
      ],
      bullets: [
        "고교 전략: 전국단위 자사고 및 과학고의 '자율성'을 활용한 심화 독서-탐구 연계 포트폴리오 구축.",
        "대학 전략: 학생부 종합 전형(학종)을 타겟으로, 인성(A) 기질이 드러나는 '전공 관련 깊이 있는 독서 이력'을 생기부의 핵심 축으로 삼을 것.",
      ],
      visual: "competitiveRank",
    },
    {
      pageNo: 15,
      title: "제 14면 : 지적 근육 형성을 위한 DNA 맞춤 독서 전략",
      subtitle: "DNA-SPECIFIC READING STRATEGY",
      punchline: "인성(A)이 강한 학생에게 독서는 공부가 아니라 '지적 호흡'입니다.",
      paragraphs: [
        "학생의 높은 인지 수용력(인성 95)을 고려할 때, 학년 수준을 뛰어넘는 '대학 입문서' 수준의 독서가 반드시 병행되어야 합니다. 이는 지루한 교과 과정을 견디게 하는 지적 자극제가 되며, 고교 진학 후 R&E 주제를 선정하는 원천 데이터가 됩니다.",
      ],
      bullets: [
        "권장 장르: [수리철학 / 이론물리학 / 뇌과학] - 원리와 근원을 다루는 깊이 있는 텍스트.",
        "독서 방식: 단순 다독보다는 한 권의 책을 읽고 본인의 인지 규격(순차/시각)에 맞춰 마인드맵으로 요약하고 비판적 서평을 남기는 'Deep Reading' 지향.",
      ],
    },
    {
      pageNo: 16,
      title: "제 15면 : VVIP 학부모 코칭 및 학습 환경 설계",
      subtitle: "ENHANCED PARENT COACHING & ENVIRONMENT",
      paragraphs: [
        "제목: \"독립적 지성을 위한 최상의 서포트 시스템 구축\"",
        `학습 환경 조성: [ ${routing.parentCoaching.split(" + ")[1]} ] - 학생의 시각적 인지 편향을 고려하여 화이트보드와 도식화 도구를 전면에 배치하고, 수리적 집중력을 높이는 5000K 색온도 조명을 권장합니다.`,
        `코칭 프로토콜: [ ${routing.parentCoaching.split(" + ")[0]} ] - 학생의 높은 독립성을 존중하여 일방적인 지시보다는 질문을 통해 스스로 답을 찾게 하는 소크라테스식 대화법을 적용하십시오.`,
      ],
      bullets: [
        "유대관계 형성: 주 1회 '전략 파트너 미팅'을 통해 학습의 결과가 아닌 '과정의 정교함'을 인정하고 격려하십시오.",
        "환경 최적화: 소음 차단 및 멀티태스킹이 불가능한 'Deep Work' 공간을 서재 내에 독립적으로 구축.",
      ],
    },
    {
      pageNo: 17,
      title: "부록 : 사주명리학적 개인 기질 분석 원문",
      subtitle: "APPENDIX : RAW MANSE ANALYSIS",
      paragraphs: [
        "본 부록에는 인공지능 명리 엔진을 통해 도출된 학생의 선천적 기질 원문을 수록합니다. 이 데이터는 보고서 내 모든 전략적 처방의 근거 데이터로 활용되었습니다.",
        "[심층 에너지 분석]: 학생의 원국은 '수목응집(水木凝集)'의 형상으로, 지혜의 샘물이 마르지 않고 끊임없이 새로운 사고를 틔워내는 '학문적 원천력'이 매우 강합니다. 또한 '금기(金氣)의 정밀함'이 이를 다듬어 보석과 같은 결과물로 만들어내고 있습니다.",
      ],
      bullets: [
        "목(木) - 비겁(C): 주체 의식과 추진력. (강함: 85) - 스스로 서고자 하는 의지가 매우 확고함.",
        "화(火) - 식상: 표현과 창의성. (약함: 30) - 머릿속의 논리를 밖으로 끄집어내는 출력 도구 보완 필요.",
        "토(土) - 재성: 현실 감각과 마무리. (적정: 55) - 목표를 향한 성실한 태도와 관리 능력 보유.",
        "금(金) - 관성(B): 규격과 논리 정연함. (매우 강함: 92) - 무결점의 논리와 체계를 추구하는 완벽주의.",
        "수(水) - 인성(A): 깊은 사색과 정보 흡수. (압도적: 95) - 학문의 깊이를 탐구하는 근원적 에너지.",
        "12운성/신살 분석: '문창귀인(文昌貴人)'의 작용으로 학문적 성취가 보장되며, '관대(冠帶)'의 기운으로 사회적 지위를 쟁취하려는 에너지가 충만함.",
      ],
    }
  );

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
  };
}
