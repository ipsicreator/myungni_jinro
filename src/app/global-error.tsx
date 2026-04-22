"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#e9ebf1] p-6">
        <main className="mx-auto flex min-h-[80vh] w-full max-w-xl items-center justify-center">
          <section className="w-full rounded-2xl border border-[#cfd5e2] bg-white p-8 text-center shadow-xl">
            <h1 className="text-3xl font-black text-[#1f326a]">서비스를 잠시 점검 중입니다</h1>
            <p className="mt-3 text-lg text-[#41537f]">
              바로 재진입할 수 있도록 첫 화면 링크를 제공합니다.
            </p>
            <Link
              href="/first-screen"
              className="mt-6 inline-grid h-12 w-full place-items-center rounded-lg bg-[#20397d] text-xl font-bold text-white"
            >
              첫 화면으로 이동
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
