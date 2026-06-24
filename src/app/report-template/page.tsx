"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { loadFormFromStorage } from "@/lib/prismData";

const designBlocks = [
  "표지 페이지",
  "성향 요약 및 종합 진단",
  "학습 기질 분석",
  "학습 태도 분석",
  "공학 적합도 분석",
  "맞춤형 진로·학습 로드맵",
  "출력 및 PDF 발행 구성",
];

export default function ReportTemplatePage() {
  const form = useMemo(() => loadFormFromStorage(), []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="border-r border-[#d6dbe6] bg-[#f7f8fb] p-6">
          <Image
            src="/suprima_logo_final.png"
            alt="대치수프리마 입시&코칭센터"
            width={300}
            height={104}
            className="h-auto w-[300px] max-w-full object-contain mix-blend-multiply"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">리포트 양식</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            {form.studentName} 학생 리포트에 공통 적용되는 전체 페이지 구조와 발행 흐름입니다.
          </p>
          <div className="mt-6 rounded-lg border border-[#d7deea] bg-white p-4 text-base leading-7 text-[#3b4f7c]">
            <p className="font-bold text-[#20397d]">양식 목적</p>
            <p>진단 결과, 시각 자료, 종합 문장을 하나의 출력 규격으로 고정해 상담과 발행 품질을 일정하게 유지합니다.</p>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">입시 DNA 프리즘 양식 점검</p>
            <h1 className="mt-1 text-4xl font-black">{form.studentName} 학생 종합 리포트 양식</h1>
          </div>
          <div className="mt-5 rounded-xl border border-[#d4dbe8] bg-[#f8faff] p-6">
            <ol className="grid gap-3 text-lg font-semibold text-[#2d4272]">
              {designBlocks.map((item, idx) => (
                <li key={item} className="rounded-lg border border-[#d7deea] bg-white px-4 py-3">
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <p className="text-sm font-semibold text-[#7383a6]">양식 안내</p>
          <p className="mt-2 text-base font-bold text-[#1f326a]">7개 블록 구성</p>
          <div className="mt-4 grid gap-3">
            <button type="button" className="grid h-12 place-items-center rounded-lg bg-[#20397d] text-lg font-extrabold text-white">
              양식 적용
            </button>
            <Link
              href="/report-issue"
              className="grid h-12 place-items-center rounded-lg border border-[#cfd5e2] bg-white text-lg font-bold text-[#1f326a]"
            >
              발행 화면으로
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
