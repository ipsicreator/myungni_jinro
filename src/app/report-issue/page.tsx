"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { buildReport, loadAnswersFromStorage, loadFormFromStorage, PRISM_QUESTIONS } from "@/lib/prismData";

type ReportPageItem = {
  pageNo: number;
  title: string;
  bullets: string[];
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

  // ILS 원문 해석 구간(1~3 / 5~7 / 9~11) 반영
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
      title: "제1면 | 임상 진단 결과 요약 및 총평",
      bullets: [
        `학생명: ${form.studentName}`,
        `진단일: ${new Date().toLocaleDateString("ko-KR")}`,
        "선천적(DNA) 기질: 학문 응집형 (인성-관성 중심 엔진)",
        `학습 태도(GRSLSS): ${report.learningType} / 평균 ${report.average}점`,
      ],
    },
    {
      pageNo: 2,
      title: "제2면 | 선천적(DNA) 기질과 후천적 성격의 결합 분석",
      bullets: [
        "선천적 정보 수용 에너지와 독립적 자아의 상호작용",
        "신중함과 응축력은 학습의 깊이를 담보하는 자산",
        "실전 출력(성적) 전환을 위한 표현 루틴 보완 필요",
      ],
    },
    {
      pageNo: 3,
      title: "제3면 | 성격 결합 심화 해석",
      bullets: [
        `독립형 학습 강도: ${q1 >= 4 ? "높음" : "보통"}`,
        "타인의 지시보다 주체적 학습 환경 선호",
        "자기 주도적 재구축 전략이 성과 전환의 핵심",
      ],
    },
    {
      pageNo: 4,
      title: "제4면 | 기본 정보",
      bullets: [
        `학교/학년: ${form.schoolName} / ${form.grade}`,
        `계열: ${form.track}`,
        `성별/출생: ${form.gender} / ${form.birthDate} ${form.birthTime}`,
        `학생 연락처: ${form.studentPhone}`,
      ],
    },
    {
      pageNo: 5,
      title: "제5면 | 문항 응답 상세",
      bullets: [
        `${PRISM_QUESTIONS[0]} (${q1}점)`,
        `${PRISM_QUESTIONS[1]} (${q2}점)`,
        `${PRISM_QUESTIONS[2]} (${q3}점)`,
        `${PRISM_QUESTIONS[3]} (${q4}점)`,
        `${PRISM_QUESTIONS[4]} (${q5}점)`,
      ],
    },
    {
      pageNo: 6,
      title: "제6면 | 학습 태도 검사(GRSLSS) 정밀 분석",
      bullets: [
        `학습 유형: ${report.learningType}`,
        `강점 1: ${report.strengths[0]}`,
        `강점 2: ${report.strengths[1]}`,
        `강점 3: ${report.strengths[2]}`,
      ],
    },
    {
      pageNo: 7,
      title: "제7면 | 공학선호도검사(ILS) 정밀 분석",
      bullets: ilsDimensions.map(
        (d) => `${d.left} ↔ ${d.right} | 점수차 ${d.diff} | 우세: ${d.favored} | ${d.level}`
      ),
    },
    {
      pageNo: 8,
      title: "제8면 | ILS 차원별 학습 전략",
      bullets: [
        "1~3점: 학습 영역 간 조화가 유지되는 상태",
        "5~7점: 선호 영역에서 성취가 빨라지는 구간",
        "9~11점: 비선호 환경에서 학습 피로가 커질 수 있음",
      ],
    },
    {
      pageNo: 9,
      title: "제9면 | 진로·전공 적합군 제안",
      bullets: [
        "논리 구조화 강점 기반 이공계/공학 트랙 검토",
        "자료 해석 중심 과목에서 성취 확장 가능",
        "프로젝트형 학습 + 피드백 루프 권장",
      ],
    },
    {
      pageNo: 10,
      title: "제10면 | 학습 로드맵",
      bullets: [
        "단기(1~3개월): 학습 루틴 정착",
        "중기(4~8개월): 약점 보완 + 심화 강화",
        "장기(9~12개월): 실전 성과 전환",
      ],
    },
    {
      pageNo: 11,
      title: "제11면 | 학부모 코칭 가이드",
      bullets: [
        "결과보다 논리적 과정 질문 중심 피드백",
        "학생 주도성 보호를 위한 개입 기준 설정",
        "정기 점검 주기(주간/월간) 운영",
      ],
    },
    {
      pageNo: 12,
      title: "제12면 | 전문가 최종 처방",
      bullets: [
        "자기 언어화 습관으로 인지 정체 방지",
        "실전 출력(성적/성과) 루틴 고정",
        "센터-학부모-학생 3자 점검 체계 유지",
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
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            업로드 원본 텍스트/코드 기준으로 12면 리포트를 생성합니다.
          </p>
        </aside>

        <section className="border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">입시DNA프리즘 최종 단계</p>
            <h1 className="mt-1 text-4xl font-black">{form.studentName} 학생 12면 리포트</h1>
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
            <p className="mt-2 text-base text-[#5a6b93]">학생: {form.studentName} | 발행일: {new Date().toLocaleDateString("ko-KR")}</p>

            <ul className="mt-6 grid gap-3 text-xl leading-9 text-[#263f71]">
              {p.bullets.map((b, i) => (
                <li key={`${p.pageNo}-${i}`} className="rounded-lg border border-[#dae1ee] bg-[#f8faff] px-4 py-3">
                  {b}
                </li>
              ))}
            </ul>

            <footer className="mt-10 border-t border-[#e1e6f0] pt-4 text-sm text-[#6d7b9b]">
              대치수프리마 입시&코칭센터 | 입시 DNA 프리즘 | 종합분석리포트
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
