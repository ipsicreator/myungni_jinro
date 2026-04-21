"use client";

import Link from "next/link";

export default function ReportIssuePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="border-r border-[#d6dbe6] bg-[#f7f8fb] p-6">
          <img
            src="/suprima_logo_2025_transparent.png"
            alt="대치수프리마 입시&코칭센터"
            className="h-auto w-[300px] max-w-full object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">종합분석리포트 발행</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            학생 맞춤 결과를 최종 확인한 뒤, PDF 발행 및 인쇄를 진행합니다.
          </p>
          <div className="mt-6 rounded-lg border border-[#d7deea] bg-white p-4 text-base leading-7 text-[#3b4f7c]">
            <p className="font-bold text-[#20397d]">이 화면의 용도</p>
            <p>상담 완료 후 학부모/학생에게 전달할 최종 리포트를 발행하는 단계입니다.</p>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">입시DNA프리즘 · 최종 단계</p>
            <h1 className="mt-1 text-4xl font-black">결과 리포트 발행 · 인쇄</h1>
          </div>
          <div className="mt-5 rounded-xl border border-[#d4dbe8] bg-[#f8faff] p-6">
            <p className="text-xl font-bold text-[#20397d]">요약</p>
            <ul className="mt-3 list-disc pl-5 text-lg leading-8 text-[#35507f]">
              <li>기질 분석: 탐구형/분석형 강점 우수</li>
              <li>학습 성향: 자기주도 + 심화 몰입형</li>
              <li>공학 적합도: 상위권, 수리-논리 강점</li>
              <li>추천 트랙: 데이터/공학 계열 심화</li>
            </ul>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="grid h-14 place-items-center rounded-xl bg-[#20397d] text-2xl font-extrabold text-white hover:brightness-95"
            >
              리포트 인쇄
            </button>
            <button
              type="button"
              className="grid h-14 place-items-center rounded-xl bg-[#c8922a] text-2xl font-extrabold text-white hover:brightness-95"
            >
              PDF 발행
            </button>
          </div>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <p className="text-sm font-semibold text-[#7383a6]">단계 안내</p>
          <p className="mt-2 text-base font-bold text-[#1f326a]">5 / 6 단계</p>
          <div className="mt-4 grid gap-3">
            <Link
              href="/report-template"
              className="grid h-12 place-items-center rounded-lg border border-[#cfd5e2] bg-white text-lg font-bold text-[#1f326a]"
            >
              템플릿 확인
            </Link>
            <Link
              href="/first-screen"
              className="grid h-12 place-items-center rounded-lg border border-[#cfd5e2] bg-white text-lg font-bold text-[#1f326a]"
            >
              첫 화면으로
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
