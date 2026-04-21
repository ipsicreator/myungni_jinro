"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { loadFormFromStorage } from "@/lib/prismData";

const sections = [
  "\uD559\uC0DD \uAE30\uBCF8 \uC815\uBCF4",
  "\uAE30\uC9C8 \uBD84\uC11D \uB9AC\uD3EC\uD2B8",
  "\uD559\uC2B5 \uC131\uD5A5 \uBC0F \uCF54\uCE6D \uC2DC\uC0AC\uC810",
  "\uACF5\uD559/\uC9C4\uB85C \uC801\uD569\uB3C4 \uBD84\uC11D",
  "\uCD94\uCC9C \uD559\uC2B5\u00B7\uC9C4\uB85C \uB85C\uB4DC\uB9F5",
  "\uC0C1\uB2F4\uC6A9 \uC885\uD569 \uCF54\uBA58\uD2B8",
];

export default function ReportTemplatePage() {
  const form = useMemo(() => loadFormFromStorage(), []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="border-r border-[#d6dbe6] bg-[#f7f8fb] p-6">
          <Image
            src="/suprima_logo_2025_transparent.png"
            alt="\uB300\uCE58\uC218\uD504\uB9AC\uB9C8 \uC785\uC2DC&\uCF54\uCE6D\uC13C\uD130"
            width={300}
            height={104}
            className="h-auto w-[300px] max-w-full object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">\uB9AC\uD3EC\uD2B8 \uD15C\uD50C\uB9BF</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            {form.studentName} \uD559\uC0DD \uB9AC\uD3EC\uD2B8\uC758 \uD45C\uC900 \uD15C\uD50C\uB9BF \uAD6C\uC870\uB97C \uD655\uC778\uD558\uACE0 \uBC1C\uD589 \uC804 \uBB38\uAD6C\uB97C \uC810\uAC80\uD569\uB2C8\uB2E4.
          </p>
          <div className="mt-6 rounded-lg border border-[#d7deea] bg-white p-4 text-base leading-7 text-[#3b4f7c]">
            <p className="font-bold text-[#20397d]">\uD654\uBA74 \uC6A9\uB3C4</p>
            <p>\uC13C\uD130 \uD45C\uC900 \uC591\uC2DD\uACFC \uC0C1\uB2F4 \uBB38\uAD6C\uB97C \uBBF8\uB9AC \uD655\uC778\uD574 \uBC1C\uD589 \uD488\uC9C8\uC744 \uC77C\uC815\uD558\uAC8C \uC720\uC9C0\uD569\uB2C8\uB2E4.</p>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white p-8">
          <div className="rounded-lg bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] px-6 py-4 text-white">
            <p className="text-lg font-semibold opacity-90">\uC785\uC2DCDNA\uD504\uB9AC\uC998 \uD15C\uD50C\uB9BF \uC810\uAC80</p>
            <h1 className="mt-1 text-4xl font-black">{form.studentName} \uD559\uC0DD \uC885\uD569\uBD84\uC11D\uB9AC\uD3EC\uD2B8 \uD15C\uD50C\uB9BF</h1>
          </div>
          <div className="mt-5 rounded-xl border border-[#d4dbe8] bg-[#f8faff] p-6">
            <ol className="grid gap-3 text-xl font-semibold text-[#2d4272]">
              {sections.map((item, idx) => (
                <li key={item} className="rounded-lg border border-[#d7deea] bg-white px-4 py-3">
                  {idx + 1}. {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <p className="text-sm font-semibold text-[#7383a6]">\uB2E8\uACC4 \uC548\uB0B4</p>
          <p className="mt-2 text-base font-bold text-[#1f326a]">6 / 6 \uB2E8\uACC4</p>
          <div className="mt-4 grid gap-3">
            <button
              type="button"
              className="grid h-12 place-items-center rounded-lg bg-[#20397d] text-lg font-extrabold text-white"
            >
              \uD15C\uD50C\uB9BF \uC801\uC6A9
            </button>
            <Link
              href="/report-issue"
              className="grid h-12 place-items-center rounded-lg border border-[#cfd5e2] bg-white text-lg font-bold text-[#1f326a]"
            >
              \uBC1C\uD589 \uD654\uBA74\uC73C\uB85C
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
