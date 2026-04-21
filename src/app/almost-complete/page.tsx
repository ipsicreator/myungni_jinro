import Link from "next/link";

export default function AlmostCompletePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="border-r border-[#d6dbe6] bg-[#f7f8fb] p-6">
          <img
            src="/suprima_logo_2025_transparent.png"
            alt="대치수프리마 입시&코칭센터"
            className="h-auto w-[300px] max-w-full object-contain"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-[#1f326a]">분석 리포트 준비</h2>
          <p className="mt-3 text-lg leading-8 text-[#41537f]">
            문항 응답을 기반으로 개인 맞춤형 진단 리포트를 생성 중입니다.
          </p>
        </aside>

        <section className="flex flex-col items-center justify-center border-r border-[#d6dbe6] bg-white p-8 text-center">
          <h1 className="text-6xl font-black text-[#1f326a]">거의 완료되었습니다</h1>
          <p className="mt-4 text-2xl text-[#4f5f84]">최종 결과를 확인하고 리포트를 발행하세요.</p>
          <div className="mt-10 grid w-full max-w-[520px] gap-3">
            <Link
              href="/report-issue"
              className="grid h-14 place-items-center rounded-xl bg-[#20397d] text-2xl font-extrabold text-white hover:brightness-95"
            >
              종합분석리포트 발행(인쇄)
            </Link>
            <Link
              href="/report-template"
              className="grid h-14 place-items-center rounded-xl border border-[#cfd5e2] bg-white text-2xl font-bold text-[#1f326a] hover:bg-[#f6f8fc]"
            >
              종합분석리포트 템플릿 보기
            </Link>
          </div>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <h3 className="text-xl font-bold text-[#1f326a]">진행률</h3>
          <p className="mt-3 text-base text-[#67789f]">4/4 단계</p>
        </aside>
      </section>
    </main>
  );
}
