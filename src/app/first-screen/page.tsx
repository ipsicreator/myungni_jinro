import Link from "next/link";

export default function FirstScreenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e6e8ee] p-4">
      <section className="relative flex h-[800px] w-[1280px] flex-col items-center justify-between rounded-2xl border border-[#d0d6e3] bg-[#e6e8ee] px-14 py-8 shadow-xl">
        <header className="absolute left-8 top-8 z-10">
          <img
            src="/suprima_logo_2025_transparent.png"
            alt="대치수프리마 입시&코칭센터"
            className="h-auto w-[250px] max-w-full object-contain"
          />
        </header>

        <section className="flex w-full flex-1 flex-col items-center justify-center pt-10">
          <div className="w-[720px] rounded-sm bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] py-7 text-center shadow-lg">
            <h1 className="text-6xl font-extrabold tracking-tight text-white">입시DNA프리즘</h1>
          </div>

          <h2 className="mt-12 text-center text-7xl font-black leading-tight tracking-tight text-[#1e326d]">
            아이의 기질을 읽으면,
            <br />
            진로의 길이 선명해집니다.
          </h2>

          <p className="mt-8 text-center text-3xl font-semibold leading-relaxed text-[#334f89]">
            초등·중등부터 고교·대입까지, 우리 아이에게 맞는 진로 방향을
            <br />
            정확한 분석과 체계적인 진단으로 제시합니다.
          </p>
        </section>

        <div className="grid w-full grid-cols-2 gap-5">
          <Link
            href="/new"
            className="grid h-24 place-items-center rounded-2xl bg-[#c8922a] text-5xl font-extrabold text-white transition hover:brightness-95"
          >
            진단 시작하기
          </Link>
          <button
            type="button"
            className="grid h-24 place-items-center rounded-2xl bg-[#20397d] text-5xl font-extrabold text-white transition hover:brightness-95"
          >
            샘플 리포트 보기
          </button>
        </div>
      </section>
    </main>
  );
}
