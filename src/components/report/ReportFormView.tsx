"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReportContent } from "@/lib/reportForm";

function StatCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${tone}`}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight">{value}</p>
    </div>
  );
}

export function ReportFormView({ content }: { content: ReportContent }) {
  return (
    <main className="min-h-screen bg-[#eef1f6] px-4 py-8">
      <section className="mx-auto flex max-w-[1280px] flex-col overflow-hidden rounded-[32px] border border-[#d9dfeb] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
        <header className="border-b border-[#e5eaf3] bg-[#fbfcff] px-8 py-8">
          <div className="flex items-start justify-between gap-8">
            <div>
              <Image
                src="/suprima_logo_final.png"
                alt="대치수프리마 입시&코칭센터"
                width={220}
                height={72}
                className="h-auto w-[220px] object-contain mix-blend-multiply"
              />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.35em] text-[#7c88a8]">Admission DNA Prism</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight text-[#142a5c]">
                {content.studentName} 학생
                <br />
                전략보고서
              </h1>
              <p className="mt-4 text-lg font-medium leading-8 text-[#495879]">
                학교: {content.schoolName} · 학년: {content.grade} · 발행일: {content.issueDate}
              </p>
            </div>

            <div className="grid min-w-[320px] gap-3">
              <StatCard label="Target Track" value={content.routing?.targetUniv ?? "-"} tone="border-[#d6dcf2] bg-[#f4f7ff] text-[#1d336c]" />
              <StatCard label="High School Type" value={content.routing?.highSchoolType ?? "-"} tone="border-[#eadfcf] bg-[#fff9f1] text-[#7a4614]" />
              <StatCard label="Major Track" value={content.routing?.collegeMajorTrack ?? "-"} tone="border-[#d7e8de] bg-[#f4fff8] text-[#17603a]" />
            </div>
          </div>
        </header>

        <div className="grid gap-6 px-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6">
            <section className="rounded-[28px] border border-[#e3e7f2] bg-[#f9fbff] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c88a8]">Summary</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#142a5c]">{content.pages[0].title}</h2>
              <p className="mt-4 text-lg font-semibold leading-8 text-[#24385f]">{content.pages[0].punchline}</p>
              <div className="mt-5 grid gap-4 text-[15px] leading-8 text-[#485878]">
                {content.pages[0].paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-[#e3e7f2] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c88a8]">ABC Balance</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <StatCard label="A Axis" value={`${content.abcScores.A}`} tone="border-[#d8dff8] bg-[#f4f7ff] text-[#213e8b]" />
                <StatCard label="B Axis" value={`${content.abcScores.B}`} tone="border-[#efe3d6] bg-[#fff8f0] text-[#8b4f21]" />
                <StatCard label="C Axis" value={`${content.abcScores.C}`} tone="border-[#d8ece0] bg-[#f3fff8] text-[#1d6f45]" />
              </div>
            </section>

            <section className="rounded-[28px] border border-[#e3e7f2] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c88a8]">ILS Profile</p>
              <div className="mt-4 grid gap-3">
                {content.ilsDimensions.map((dim) => (
                  <div key={dim.key} className="rounded-2xl border border-[#e5eaf3] bg-[#fbfcff] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#7c88a8]">{dim.key}</p>
                        <p className="mt-1 text-xl font-black text-[#162d61]">{dim.favored}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#52637f]">강도</p>
                        <p className="text-lg font-black text-[#162d61]">{dim.level}</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-[#e8edf8]">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#1d336c] via-[#375cb7] to-[#8a4fd6]"
                        style={{ width: `${Math.min(100, dim.diff * 8)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-[#586887]">
                      {dim.left} · {dim.right}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid gap-6">
            {content.pages.slice(1).map((page) => (
              <section key={page.pageNo} className="rounded-[28px] border border-[#e3e7f2] bg-white p-7">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#7c88a8]">{page.subtitle}</p>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-[#142a5c]">{page.title}</h3>
                {page.punchline ? (
                  <p className="mt-4 text-base font-semibold leading-7 text-[#28406e]">{page.punchline}</p>
                ) : null}
                <div className="mt-4 grid gap-3 text-[15px] leading-7 text-[#495879]">
                  {page.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {page.bullets?.length ? (
                  <ul className="mt-4 grid gap-2 text-[15px] leading-7 text-[#495879]">
                    {page.bullets.map((bullet) => (
                      <li key={bullet} className="rounded-xl bg-[#f8faff] px-4 py-3">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {page.table ? (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5eaf3]">
                    <table className="w-full border-collapse text-left text-sm">
                      <thead className="bg-[#f6f8fd] text-[#273d68]">
                        <tr>
                          {page.table.headers.map((header) => (
                            <th key={header} className="px-4 py-3 font-black">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {page.table.rows.map((row, index) => (
                          <tr key={`${page.pageNo}-${index}`} className="border-t border-[#eef2f8]">
                            {row.map((cell, cellIndex) => (
                              <td key={`${page.pageNo}-${index}-${cellIndex}`} className="px-4 py-3 align-top text-[#4d5b77]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <footer className="flex items-center justify-between border-t border-[#e5eaf3] bg-[#fbfcff] px-8 py-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#7c88a8]">Contact</p>
            <p className="mt-2 text-base font-semibold text-[#22375e]">{content.coverProfile.centerName}</p>
            <p className="mt-1 text-sm text-[#5a6984]">{content.coverProfile.address}</p>
            <p className="mt-1 text-sm text-[#5a6984]">{content.coverProfile.phone}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/report-template"
              className="grid h-12 place-items-center rounded-xl border border-[#d2d9e8] bg-white px-5 text-sm font-black text-[#22375e]"
            >
              리포트 양식 보기
            </Link>
            <Link
              href="/consultation/apply"
              className="grid h-12 place-items-center rounded-xl bg-[#1d336c] px-5 text-sm font-black text-white"
            >
              상담 신청으로 이동
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
