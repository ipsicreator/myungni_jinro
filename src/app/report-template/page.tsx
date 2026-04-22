"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { loadFormFromStorage } from "@/lib/prismData";

const designBlocks = [
  "표지 페이지 (브랜드 + 발행 정보)",
  "제1~12면 본문 (근거파일 기준)",
  "시각화 삽입 1: ILS 4차원 차트",
  "시각화 삽입 2: 수학 3단계 플로우",
  "시각화 삽입 3: 과학 인과관계 도식",
  "시각화 삽입 4: 6년 통합 로드맵",
  "인쇄/PDF 발행 레이아웃",
];

export default function ReportTemplatePage() {
  const form = useMemo(() => loadFormFromStorage(), []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="border-r border-[#d6dbe6] bg-[#f7f8fb] p-6">
          <Image
            src="/suprima_logo_2025_transparent.png"
            alt="대치수프리마 입시&코칭센터"
            width={300}
            height={104}
            className="h-auto w-[300px] max-w-full object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">리포트 양식</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            {form.studentName} 학생 보고서에 공통 적용되는 전체 페이지 양식입니다.
          </p>
          <div className="mt-6 rounded-lg border border-[#d7deea] bg-white p-4 text-base leading-7 text-[#3b4f7c]">
            <p className="font-bold text-[#20397d]">양식 목적</p>
            <p>원문 항목 + 시각화 + 표지를 하나의 출력 규격으로 고정해 발행 품질을 일관되게 유지합니다.</p>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">입시DNA프리즘 양식 점검</p>
            <h1 className="mt-1 text-4xl font-black">{form.studentName} 학생 전략보고서 양식</h1>
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
          <p className="text-sm font-semibold text-[#7383a6]">단계 안내</p>
          <p className="mt-2 text-base font-bold text-[#1f326a]">6 / 6 단계</p>
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
