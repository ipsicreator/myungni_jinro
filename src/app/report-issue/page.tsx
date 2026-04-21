"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { buildReport, loadAnswersFromStorage, loadFormFromStorage, PRISM_QUESTIONS } from "@/lib/prismData";

type ReportPageItem = {
  pageNo: number;
  title: string;
  subtitle: string;
  paragraphs: string[];
  highlights?: string[];
};

type IlsDimension = {
  key: string;
  left: string;
  right: string;
  diff: number;
  favored: string;
  level: string;
};

function toIlsLevel(diff: number): string {
  if (diff <= 3) return "균형(조화) 구간";
  if (diff <= 7) return "선호 구간";
  return "매우 선명한 선호 구간";
}

function clampIlsDiff(value: number): number {
  return Math.max(1, Math.min(11, value));
}

export default function ReportIssuePage() {
  const form = useMemo(() => loadFormFromStorage(), []);
  const answers = useMemo(() => loadAnswersFromStorage(), []);
  const report = useMemo(() => buildReport(answers), [answers]);

  const safeAnswers = answers.length === PRISM_QUESTIONS.length ? answers : [4, 4, 4, 3, 4];
  const [q1, q2, q3, q4, q5] = safeAnswers;

  const studentName = form.studentName?.trim() || "서진영";
  const schoolName = form.schoolName?.trim() || "수프리마중학교";
  const issueDate = new Date().toLocaleDateString("ko-KR");

  const ilsDimensions: IlsDimension[] = useMemo(() => {
    const processDiff = clampIlsDiff(Math.abs(q1 - q4) * 2 + 1);
    const perceptionDiff = clampIlsDiff(Math.abs(q2 - q5) * 2 + 1);
    const inputDiff = clampIlsDiff(Math.abs(q3 - q1) * 2 + 1);
    const understandingDiff = clampIlsDiff(Math.abs(q4 - q2) * 2 + 1);

    return [
      {
        key: "process",
        left: "활동형(Active)",
        right: "숙고형(Reflective)",
        diff: processDiff,
        favored: q4 >= q1 ? "숙고형(Reflective)" : "활동형(Active)",
        level: toIlsLevel(processDiff),
      },
      {
        key: "perception",
        left: "감각형(Sensing)",
        right: "직관형(Intuitive)",
        diff: perceptionDiff,
        favored: q5 >= q2 ? "직관형(Intuitive)" : "감각형(Sensing)",
        level: toIlsLevel(perceptionDiff),
      },
      {
        key: "input",
        left: "시각형(Visual)",
        right: "언어형(Verbal)",
        diff: inputDiff,
        favored: q3 >= q1 ? "시각형(Visual)" : "언어형(Verbal)",
        level: toIlsLevel(inputDiff),
      },
      {
        key: "understanding",
        left: "순차형(Sequential)",
        right: "총체형(Global)",
        diff: understandingDiff,
        favored: q2 >= q4 ? "순차형(Sequential)" : "총체형(Global)",
        level: toIlsLevel(understandingDiff),
      },
    ];
  }, [q1, q2, q3, q4, q5]);

  const pages: ReportPageItem[] = [
    {
      pageNo: 1,
      title: "제1면 | 종합 진단 개요",
      subtitle: `${studentName} 학생의 입시 DNA 프리즘 종합분석리포트`,
      paragraphs: [
        `${studentName} 학생은 기초 문항에서 평균 ${report.average}점을 기록했으며, 학습태도 분류는 "${report.learningType}"으로 확인되었습니다. 이는 학습 과정에서 자기 주도적 계획 수립과 근거 기반 사고가 함께 나타나는 구조를 의미합니다.`,
        "본 리포트는 선천적 정보 처리 경향, 후천적 학습 행동, 공학 적합도 관점을 하나의 통합 프레임으로 연결해 해석합니다. 단순한 점수 나열이 아니라 실제 학습 실행 루틴으로 연결 가능한 처방형 문서를 목표로 구성했습니다.",
        `진단일은 ${issueDate}이며, 본 문서의 모든 면은 센터 상담·코칭·학부모 안내에 바로 활용할 수 있도록 작성되었습니다.`,
      ],
      highlights: [
        `학생명: ${studentName}`,
        `학교/학년: ${schoolName} / ${form.grade}`,
        "기질 요약: 학문 응집형(인성-관성 중심 엔진)",
        `학습태도 요약: ${report.learningType}`,
      ],
    },
    {
      pageNo: 2,
      title: "제2면 | 선천 기질 해석",
      subtitle: "정보 수용 엔진과 사고 밀도의 구조",
      paragraphs: [
        "해당 기질은 빠른 반응보다 구조화된 이해를 선호하고, 한 번 받아들인 정보는 장기 기억으로 전환하려는 경향이 강합니다. 그래서 '양'보다 '깊이'를 확보할 때 성과가 안정적으로 올라갑니다.",
        "학습 초반에는 속도가 느려 보일 수 있으나, 이해 임계점을 넘는 순간 재현성과 정확도가 크게 상승합니다. 이 구간을 의도적으로 설계하지 않으면 능력이 낮아서가 아니라 실행 구조 부재로 성과가 지연될 수 있습니다.",
        "따라서 단기 과제에서도 단순 암기보다 개념-근거-적용 순서의 루틴을 고정하는 것이 효율적입니다.",
      ],
    },
    {
      pageNo: 3,
      title: "제3면 | 성격 결합 심화 해석",
      subtitle: "독립성·협업성의 균형과 출력 전환",
      paragraphs: [
        `문항 응답 기준으로 독립 실행 강도는 ${q1 >= 4 ? "높은 수준" : "보통 수준"}이며, 협업 장면에서는 자기 기준을 유지하면서 조율하는 패턴이 관찰됩니다.`,
        "이 패턴은 혼자 할 때 강점이 극대화되지만, 팀 과제에서는 의사결정 기준을 명시하지 않으면 피로가 누적될 수 있습니다. 즉, 협업 부적합이 아니라 역할 정의의 명확도가 핵심 변수입니다.",
        "성과 전환의 핵심은 '혼자 공부한다'가 아니라 '혼자 구조화하고, 필요한 지점에서 피드백만 연결한다'는 하이브리드 방식입니다.",
      ],
    },
    {
      pageNo: 4,
      title: "제4면 | 기본 정보",
      subtitle: "진단 대상자 메타데이터",
      paragraphs: [
        `학교/학년: ${schoolName} / ${form.grade}`,
        `계열: ${form.track} | 성별: ${form.gender}`,
        `출생 정보: ${form.birthDate} ${form.birthTime}`,
        `학생 연락처: ${form.studentPhone} | 보호자 연락처: ${form.parentPhone}`,
        "기본 정보는 상담 기록 및 후속 코칭 단계의 기준 키로 사용됩니다.",
      ],
    },
    {
      pageNo: 5,
      title: "제5면 | 문항 응답 상세",
      subtitle: "1차 기질 문항 원점수",
      paragraphs: [
        `1) ${PRISM_QUESTIONS[0]} → ${q1}점`,
        `2) ${PRISM_QUESTIONS[1]} → ${q2}점`,
        `3) ${PRISM_QUESTIONS[2]} → ${q3}점`,
        `4) ${PRISM_QUESTIONS[3]} → ${q4}점`,
        `5) ${PRISM_QUESTIONS[4]} → ${q5}점`,
        "원점수는 학습태도 분류와 ILS 차원 해석의 입력값으로 사용됩니다.",
      ],
    },
    {
      pageNo: 6,
      title: "제6면 | 학습 태도 검사(GRSLSS) 정밀 분석",
      subtitle: "학습 실행력과 몰입 지속성",
      paragraphs: [
        `학습 유형은 "${report.learningType}"으로 분류됩니다. 평균 점수는 ${report.average}점이며, 현재 패턴은 과제 시작-전개-완료의 세 구간에서 비교적 안정적인 수행 흐름을 보여줍니다.`,
        `강점 축 1: ${report.strengths[0]}`,
        `강점 축 2: ${report.strengths[1]}`,
        `강점 축 3: ${report.strengths[2]}`,
        "다만 성과가 일정하게 유지되려면 주간 단위 복기 루틴(근거 정리, 오답 언어화, 재적용 계획)이 반드시 병행되어야 합니다.",
      ],
    },
    {
      pageNo: 7,
      title: "제7면 | 공학선호도검사(ILS) 정밀 분석",
      subtitle: "4개 차원 인지 처리 경향",
      paragraphs: [
        "ILS는 학습 방식의 취향이 아니라 정보 처리 규칙을 보여주는 지표입니다. 점수차가 클수록 특정 환경에서 성과가 빠르게 나고, 반대로 비선호 환경에서는 피로가 증가할 수 있습니다.",
        ...ilsDimensions.map(
          (d) => `${d.left} ↔ ${d.right} | 점수차 ${d.diff} | 우세: ${d.favored} | 해석: ${d.level}`
        ),
      ],
    },
    {
      pageNo: 8,
      title: "제8면 | ILS 차원별 학습 전략",
      subtitle: "점수 구간별 운영 가이드",
      paragraphs: [
        "1~3점 구간: 조화 상태입니다. 다양한 학습 방식 전환이 가능하므로 탐색 과제를 폭넓게 배치해도 안정적으로 적응합니다.",
        "5~7점 구간: 선호 구간입니다. 성취 속도가 올라가므로 핵심 과목은 선호 방식으로 먼저 이해한 뒤, 비선호 방식 전환 연습을 붙이는 것이 효과적입니다.",
        "9~11점 구간: 매우 선명한 선호 구간입니다. 비선호 조건에서 집중 저하가 커질 수 있으므로 환경 설계(시간, 자료 형태, 피드백 방식)를 먼저 맞춘 후 과제를 투입해야 합니다.",
        "실행 원칙은 '선호 방식으로 앵커링 후 비선호 확장'입니다.",
      ],
    },
    {
      pageNo: 9,
      title: "제9면 | 진로·전공 적합군 제안",
      subtitle: "전공 탐색 1차 후보군",
      paragraphs: [
        `공학 적합도 지표는 ${report.engineeringFit}점으로 산출되었습니다. 이는 논리 구조화, 근거 기반 판단, 깊이 탐구 성향이 결합될 때 강점이 높게 나타나는 결과입니다.`,
        "권장 탐색군은 데이터·공학·분석 중심 트랙이며, 문제 해결 과정이 명확한 과목에서 성취 확장 가능성이 큽니다.",
        "진로 탐색은 '적성-성취-지속성' 3축으로 평가해야 하며, 단발성 흥미만으로 결정하지 않도록 단계형 탐색 일정을 권장합니다.",
      ],
    },
    {
      pageNo: 10,
      title: "제10면 | 학습 로드맵",
      subtitle: "12개월 실행 계획",
      paragraphs: [
        "단기(1~3개월): 일일 루틴 고정, 과제 착수 시간을 일정화하고 오답 복기 규칙을 표준화합니다.",
        "중기(4~8개월): 약점 과목 보완과 심화 과목 확장을 동시에 진행합니다. 월 단위 성취 지표를 두고 편차를 관리합니다.",
        "장기(9~12개월): 실전 출력 최적화 단계입니다. 모의 평가-피드백-수정 사이클을 고정해 성과 재현성을 확보합니다.",
        "모든 단계에서 '기록-점검-재설계'를 반복하는 운영이 중요합니다.",
      ],
    },
    {
      pageNo: 11,
      title: "제11면 | 학부모 코칭 가이드",
      subtitle: "가정 내 피드백 운영 원칙",
      paragraphs: [
        "결과 확인 전에 과정 질문을 먼저 제시해 주세요. '몇 점이냐'보다 '어떤 근거로 풀었는지'를 묻는 대화가 학습 자율성을 유지합니다.",
        "개입 기준을 사전에 정하고, 일상에서는 학생의 자기 조절 시간을 보장하는 것이 좋습니다. 과잉 개입은 단기 성과를 만들 수 있지만 장기 자립성을 약화시킬 수 있습니다.",
        "주간 점검(짧게), 월간 점검(깊게) 구조를 권장합니다. 코칭은 통제가 아니라 실행 환경 설계입니다.",
      ],
    },
    {
      pageNo: 12,
      title: "제12면 | 전문가 최종 처방",
      subtitle: "실행 고정과 성과 재현 전략",
      paragraphs: [
        "첫째, 자기 언어화 루틴을 고정합니다. 매 학습 후 핵심 개념을 본인 문장으로 정리하면 지식 정체를 줄이고 적용력을 높일 수 있습니다.",
        "둘째, 실전 출력 루틴을 고정합니다. 문제 풀이 후 정답 확인으로 끝내지 않고, 근거 재작성과 오답 원인 분류를 수행해야 성과가 누적됩니다.",
        "셋째, 센터-학부모-학생 3자 점검 체계를 유지합니다. 같은 기준표로 월별 변화를 추적하면 진로·학습 전략을 안정적으로 업데이트할 수 있습니다.",
        `${studentName} 학생의 권장 결론: 강점은 깊이와 구조화이며, 핵심 과제는 출력 전환의 자동화입니다.`,
      ],
    },
  ];

  return (
    <main className="bg-[#e9ebf1] py-6">
      <style jsx global>{`
        @media print {
          body {
            background: #fff !important;
          }
          .report-toolbar {
            display: none !important;
          }
          .report-stack {
            padding: 0 !important;
            gap: 0 !important;
          }
          .report-page {
            box-shadow: none !important;
            border: 0 !important;
            margin: 0 !important;
            border-radius: 0 !important;
            page-break-after: always;
            break-after: page;
          }
          .report-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>

      <section className="report-toolbar mx-auto mb-4 grid w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="border-r border-[#d6dbe6] bg-[#f7f8fb] p-6">
          <Image
            src="/suprima_logo_2025_transparent.png"
            alt="대치수프리마 입시&코칭센터"
            width={280}
            height={96}
            className="h-auto w-[280px] max-w-full object-contain"
          />
          <h2 className="mt-5 text-3xl font-extrabold text-[#1f326a]">종합분석리포트 발행</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">12면 Full Text 보고서를 생성하고 인쇄할 수 있습니다.</p>
        </aside>

        <section className="border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">입시DNA프리즘 최종 단계</p>
            <h1 className="mt-1 text-4xl font-black">{studentName} 학생 12면 리포트</h1>
          </div>
          <ul className="mt-5 grid gap-2 text-lg text-[#2f4677]">
            {pages.map((p) => (
              <li key={p.pageNo} className="rounded border border-[#d7deea] bg-[#f8faff] px-3 py-2">
                {p.title}
              </li>
            ))}
          </ul>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="grid h-12 place-items-center rounded-lg bg-[#20397d] text-lg font-extrabold text-white"
            >
              리포트 인쇄
            </button>
            <Link
              href="/report-template"
              className="grid h-12 place-items-center rounded-lg border border-[#cfd5e2] bg-white text-lg font-bold text-[#1f326a]"
            >
              템플릿 확인
            </Link>
          </div>
        </aside>
      </section>

      <section className="report-stack mx-auto flex w-[210mm] flex-col gap-4">
        {pages.map((p) => (
          <article
            key={p.pageNo}
            className="report-page min-h-[297mm] border border-[#d3d9e6] bg-white p-8 shadow-[0_10px_24px_rgba(18,44,99,0.15)]"
          >
            <header className="flex items-center justify-between border-b border-[#d8deea] pb-4">
              <Image
                src="/suprima_logo_2025_transparent.png"
                alt="대치수프리마 입시&코칭센터"
                width={180}
                height={62}
                className="h-auto w-[180px] object-contain"
              />
              <p className="text-sm font-semibold text-[#42547f]">{p.pageNo} / 12</p>
            </header>

            <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">{p.title}</h2>
            <p className="mt-2 text-xl font-semibold text-[#324d84]">{p.subtitle}</p>
            <p className="mt-2 text-base text-[#5a6b93]">학생: {studentName} | 발행일: {issueDate}</p>

            {p.highlights ? (
              <ul className="mt-6 grid gap-2 text-lg leading-8 text-[#263f71]">
                {p.highlights.map((h, i) => (
                  <li key={`${p.pageNo}-h-${i}`} className="rounded-lg border border-[#dae1ee] bg-[#f8faff] px-4 py-2">
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-6 grid gap-4">
              {p.paragraphs.map((paragraph, i) => (
                <p
                  key={`${p.pageNo}-p-${i}`}
                  className="rounded-lg border border-[#dae1ee] bg-[#f8faff] px-5 py-4 text-[21px] leading-10 text-[#263f71]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <footer className="mt-10 border-t border-[#e1e6f0] pt-4 text-sm text-[#6d7b9b]">
              대치수프리마 입시&코칭센터 | 입시 DNA 프리즘 | 종합분석리포트
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
