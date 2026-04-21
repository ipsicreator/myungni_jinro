import Image from "next/image";
import Link from "next/link";

export default function FirstScreenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e6e8ee] p-4">
      <section className="relative flex h-[800px] w-[1280px] flex-col items-center justify-between rounded-2xl border border-[#d0d6e3] bg-[#e6e8ee] px-14 py-8 shadow-xl">
        <header className="absolute left-8 top-8 z-10">
          <Image
            src="/suprima_logo_2025_transparent.png"
            alt="\uB300\uCE58\uC218\uD504\uB9AC\uB9C8 \uC785\uC2DC&\uCF54\uCE6D\uC13C\uD130"
            width={250}
            height={86}
            className="h-auto w-[250px] max-w-full object-contain"
          />
        </header>

        <section className="flex w-full flex-1 flex-col items-center justify-center pt-10">
          <div className="w-[720px] rounded-sm bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964] py-7 text-center shadow-lg">
            <h1 className="text-6xl font-extrabold tracking-tight text-white">\uC785\uC2DCDNA\uD504\uB9AC\uC998</h1>
          </div>

          <h2 className="mt-12 text-center text-7xl font-black leading-tight tracking-tight text-[#1e326d]">
            \uC544\uC774\uC758 \uAE30\uC9C8\uC744 \uC77D\uC73C\uBA74,
            <br />
            \uC9C4\uB85C\uC758 \uAE38\uC774 \uC120\uBA85\uD574\uC9D1\uB2C8\uB2E4.
          </h2>

          <p className="mt-8 text-center text-3xl font-semibold leading-relaxed text-[#334f89]">
            \uCD08\uB4F1\u00B7\uC911\uB4F1\uBD80\uD130 \uACE0\uAD50\u00B7\uB300\uC785\uAE4C\uC9C0, \uC6B0\uB9AC \uC544\uC774\uC5D0\uAC8C \uB9DE\uB294 \uC9C4\uB85C \uBC29\uD5A5\uC744
            <br />
            \uC815\uD655\uD55C \uBD84\uC11D\uACFC \uCCB4\uACC4\uC801\uC778 \uC9C4\uB2E8\uC73C\uB85C \uC81C\uC2DC\uD569\uB2C8\uB2E4.
          </p>
        </section>

        <div className="grid w-full grid-cols-2 gap-5">
          <Link
            href="/new"
            className="grid h-24 place-items-center rounded-2xl bg-[#c8922a] text-5xl font-extrabold text-white transition hover:brightness-95"
          >
            \uC9C4\uB2E8 \uC2DC\uC791\uD558\uAE30
          </Link>
          <Link
            href="/report-template"
            className="grid h-24 place-items-center rounded-2xl bg-[#20397d] text-5xl font-extrabold text-white transition hover:brightness-95"
          >
            \uC0D8\uD50C \uB9AC\uD3EC\uD2B8 \uBCF4\uAE30
          </Link>
        </div>
      </section>
    </main>
  );
}
