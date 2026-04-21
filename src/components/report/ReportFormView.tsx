"use client";

import Image from "next/image";
import Link from "next/link";
import type { IlsDimension, ReportContent, ReportPageItem } from "@/lib/reportForm";

function IlsChart({ ils }: { ils: IlsDimension[] }) {
  return (
    <div className="rounded-lg border border-[#d8dfec] bg-white p-4">
      <p className="text-lg font-bold text-[#1f326a]">ILS 4차원 차트</p>
      <div className="mt-3 grid gap-3">
        {ils.map((item) => {
          const width = `${Math.round((item.diff / 11) * 100)}%`;
          return (
            <div key={item.key}>
              <p className="text-sm font-semibold text-[#324d84]">
                {item.left} ↔ {item.right} (우세: {item.favored})
              </p>
              <div className="mt-1 h-3 rounded-full bg-[#e8edf6]">
                <div className="h-3 rounded-full bg-[#20397d]" style={{ width }} />
              </div>
              <p className="mt-1 text-xs text-[#5f7097]">점수차 {item.diff} / 해석: {item.level}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MathFlowVisual() {
  return (
    <div className="rounded-lg border border-[#d8dfec] bg-white p-4">
      <p className="text-lg font-bold text-[#1f326a]">수학 3단계 전략 구조도</p>
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        {["조건 추출", "도구 선택", "연산 수행"].map((step, idx) => (
          <div key={step} className="rounded-lg border border-[#d4ddec] bg-[#f8faff] p-3">
            <p className="text-xs font-bold text-[#6d7da1]">STEP {idx + 1}</p>
            <p className="mt-1 text-base font-bold text-[#243f75]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScienceMapVisual() {
  return (
    <div className="rounded-lg border border-[#d8dfec] bg-white p-4">
      <p className="text-lg font-bold text-[#1f326a]">과학 인과관계 도식화 예시</p>
      <svg viewBox="0 0 800 220" className="mt-2 w-full">
        <rect x="20" y="80" width="180" height="60" rx="12" fill="#f7f9ff" stroke="#cfd9ea" />
        <text x="110" y="115" textAnchor="middle" fill="#1f326a" fontSize="18" fontWeight="700">
          현상 관찰
        </text>
        <rect x="310" y="80" width="180" height="60" rx="12" fill="#f7f9ff" stroke="#cfd9ea" />
        <text x="400" y="115" textAnchor="middle" fill="#1f326a" fontSize="18" fontWeight="700">
          원리 분해
        </text>
        <rect x="600" y="80" width="180" height="60" rx="12" fill="#f7f9ff" stroke="#cfd9ea" />
        <text x="690" y="115" textAnchor="middle" fill="#1f326a" fontSize="18" fontWeight="700">
          수식 모델링
        </text>
        <path d="M205 110 L300 110" stroke="#c8922a" strokeWidth="4" markerEnd="url(#arrow)" />
        <path d="M495 110 L590 110" stroke="#c8922a" strokeWidth="4" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
            <polygon points="0,0 10,4 0,8" fill="#c8922a" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function RoadmapVisual() {
  return (
    <div className="rounded-lg border border-[#d8dfec] bg-white p-4">
      <p className="text-lg font-bold text-[#1f326a]">6년 통합 로드맵</p>
      <div className="mt-3 grid gap-2">
        {["초등 고학년: 시각적 도식화 노트 습관", "중등: 안전한 실패 5회 이상 축적", "고등: 심화 탐구 결과물 산출"].map((line, idx) => (
          <div key={line} className="flex items-center gap-2 rounded-md border border-[#d3dceb] bg-[#f8faff] px-3 py-2">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#20397d] text-xs font-bold text-white">{idx + 1}</span>
            <p className="text-sm font-semibold text-[#284577]">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualBlock({ page, ils }: { page: ReportPageItem; ils: IlsDimension[] }) {
  if (page.visual === "ilsChart") return <IlsChart ils={ils} />;
  if (page.visual === "mathFlow") return <MathFlowVisual />;
  if (page.visual === "scienceMap") return <ScienceMapVisual />;
  if (page.visual === "roadmap") return <RoadmapVisual />;
  return null;
}

export function ReportFormView({ content }: { content: ReportContent }) {
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
          <Image src="/suprima_logo_2025_transparent.png" alt="대치수프리마 입시&코칭센터" width={280} height={96} className="h-auto w-[280px] max-w-full object-contain" />
          <h2 className="mt-5 text-3xl font-extrabold text-[#1f326a]">종합분석리포트 발행</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">근거파일 기반 12면 + 시각화 삽입 + 표지 포함 디자인 시스템</p>
        </aside>

        <section className="border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">입시DNA프리즘 최종 단계</p>
            <h1 className="mt-1 text-4xl font-black">{content.studentName} 학생 전략보고서</h1>
          </div>
          <ul className="mt-5 grid gap-2 text-lg text-[#2f4677]">
            <li className="rounded border border-[#d7deea] bg-[#f8faff] px-3 py-2">표지 페이지</li>
            {content.pages.map((p) => (
              <li key={p.pageNo} className="rounded border border-[#d7deea] bg-[#f8faff] px-3 py-2">
                {p.title}
              </li>
            ))}
          </ul>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <div className="grid gap-3">
            <button type="button" onClick={() => window.print()} className="grid h-12 place-items-center rounded-lg bg-[#20397d] text-lg font-extrabold text-white">
              리포트 인쇄
            </button>
            <Link href="/report-template" className="grid h-12 place-items-center rounded-lg border border-[#cfd5e2] bg-white text-lg font-bold text-[#1f326a]">
              리포트 양식 확인
            </Link>
          </div>
        </aside>
      </section>

      <section className="report-stack mx-auto flex w-[210mm] flex-col gap-4">
        <article className="report-page min-h-[297mm] border border-[#d3d9e6] bg-white p-10 shadow-[0_10px_24px_rgba(18,44,99,0.15)]">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Image src="/suprima_logo_2025_transparent.png" alt="대치수프리마 입시&코칭센터" width={360} height={120} className="h-auto w-[360px] object-contain" />
            <div className="mt-10 w-full max-w-[720px] rounded bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] py-4 text-white shadow-lg">
              <p className="text-lg font-semibold">입시DNA프리즘</p>
              <h1 className="text-4xl font-black">전략보고서 표지</h1>
            </div>
            <p className="mt-8 text-2xl font-bold text-[#1f326a]">{content.studentName} 학생 종합분석리포트</p>
            <p className="mt-2 text-lg text-[#41537f]">발행일: {content.issueDate}</p>
            <div className="mt-6 w-full max-w-[920px] rounded-lg border border-[#d7deea] bg-[#f8faff] px-6 py-4 text-left text-base text-[#2f4677]">
              <p className="text-lg font-bold text-[#1f326a]">센터 정보</p>
              <p className="mt-2">센터명: {content.coverProfile.centerName}</p>
              <p>주소: {content.coverProfile.address}</p>
              <p>대표번호: {content.coverProfile.phone}</p>
              <p>웹사이트: {content.coverProfile.website}</p>
              <p>SNS(인스타그램): {content.coverProfile.snsInstagram}</p>
              <p>SNS(블로그): {content.coverProfile.snsBlog}</p>
              <p className="mt-2 border-t border-[#d7deea] pt-2 text-sm text-[#4f6290]">본 문서는 "명리_진로_12p_보고서.docx" 근거 항목을 기반으로 구성되었습니다.</p>
            </div>
          </div>
        </article>

        {content.pages.map((p) => (
          <article key={p.pageNo} className="report-page min-h-[297mm] border border-[#d3d9e6] bg-white p-8 shadow-[0_10px_24px_rgba(18,44,99,0.15)]">
            <header className="flex items-center justify-between border-b border-[#d8deea] pb-4">
              <Image src="/suprima_logo_2025_transparent.png" alt="대치수프리마 입시&코칭센터" width={180} height={62} className="h-auto w-[180px] object-contain" />
              <p className="text-sm font-semibold text-[#42547f]">{p.pageNo} / 12</p>
            </header>
            <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">{p.title}</h2>
            <p className="mt-2 text-xl font-semibold text-[#324d84]">{p.subtitle}</p>
            <p className="mt-2 text-base text-[#5a6b93]">학생: {content.studentName} | 발행일: {content.issueDate}</p>
            <div className="mt-6 grid gap-4">
              {p.paragraphs.map((paragraph, i) => (
                <p key={`${p.pageNo}-p-${i}`} className="rounded-lg border border-[#dae1ee] bg-[#f8faff] px-5 py-4 text-[21px] leading-10 text-[#263f71]">
                  {paragraph}
                </p>
              ))}
              <VisualBlock page={p} ils={content.ilsDimensions} />
            </div>
            <footer className="mt-10 border-t border-[#e1e6f0] pt-4 text-sm text-[#6d7b9b]">대치수프리마 입시&코칭센터 | 입시 DNA 프리즘 | 전략보고서 디자인 시스템</footer>
          </article>
        ))}
      </section>
    </main>
  );
}

