"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { loadFormFromStorage } from "@/lib/prismData";

export default function AlmostCompletePage() {
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
          <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">\uBD84\uC11D \uB9AC\uD3EC\uD2B8 \uC900\uBE44</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            {form.studentName} \uD559\uC0DD\uC758 \uC751\uB2F5\uC744 \uAE30\uBC18\uC73C\uB85C \uAC1C\uC778 \uB9DE\uCDA4\uD615 \uC9C4\uB2E8 \uB9AC\uD3EC\uD2B8\uB97C \uC0DD\uC131 \uC911\uC785\uB2C8\uB2E4.
          </p>
        </aside>

        <section className="flex flex-col items-center justify-center border-r border-[#d6dbe6] bg-white p-8 text-center">
          <h1 className="text-6xl font-black text-[#1f326a]">\uAC70\uC758 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4</h1>
          <p className="mt-4 text-2xl text-[#4f5f84]">{form.studentName} \uD559\uC0DD\uC758 \uCD5C\uC885 \uACB0\uACFC\uB97C \uD655\uC778\uD558\uACE0 \uB9AC\uD3EC\uD2B8\uB97C \uBC1C\uD589\uD558\uC138\uC694.</p>
          <div className="mt-10 grid w-full max-w-[520px] gap-3">
            <Link
              href="/report-issue"
              className="grid h-14 place-items-center rounded-xl bg-[#20397d] text-2xl font-extrabold text-white hover:brightness-95"
            >
              \uC885\uD569\uBD84\uC11D\uB9AC\uD3EC\uD2B8 \uBC1C\uD589(\uC778\uC1C4)
            </Link>
            <Link
              href="/report-template"
              className="grid h-14 place-items-center rounded-xl border border-[#cfd5e2] bg-white text-2xl font-bold text-[#1f326a] hover:bg-[#f6f8fc]"
            >
              \uC885\uD569\uBD84\uC11D\uB9AC\uD3EC\uD2B8 \uD15C\uD50C\uB9BF \uBCF4\uAE30
            </Link>
          </div>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <h3 className="text-xl font-bold text-[#1f326a]">\uC9C4\uD589\uB960</h3>
          <p className="mt-3 text-base text-[#67789f]">4/4 \uB2E8\uACC4</p>
        </aside>
      </section>
    </main>
  );
}
