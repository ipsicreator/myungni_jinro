import Link from "next/link";

const questions = [
  "새로운 과제를 시작할 때 스스로 계획을 세운다.",
  "문제를 볼 때 직관보다 근거를 먼저 찾는다.",
  "한 번 집중하면 끝까지 밀어붙이는 편이다.",
  "사람들과 협업할 때 의견 조율이 편하다.",
  "관심 분야를 깊게 파고드는 편이다.",
];

export default function QuestionnairePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="flex flex-col border-r border-[#d6dbe6] bg-[#f7f8fb]">
          <header className="border-b border-[#d6dbe6] px-5 py-5">
            <img
              src="/suprima_logo_2025_transparent.png"
              alt="대치수프리마 입시&코칭센터"
              className="h-auto w-[300px] max-w-full object-contain"
            />
          </header>
          <div className="p-6">
            <h2 className="text-3xl font-extrabold text-[#1f326a]">기질 진단 문항</h2>
            <p className="mt-3 text-lg leading-8 text-[#41537f]">아래 문항에 1~5점으로 응답해주세요.</p>
          </div>
        </aside>
        <section className="flex flex-col border-r border-[#d6dbe6] bg-white p-5">
          <h1 className="text-4xl font-black text-[#1f326a]">1차 문항</h1>
          <div className="mt-4 grid gap-3 overflow-auto pr-2">
            {questions.map((q, idx) => (
              <div key={q} className="rounded-lg border border-[#d7deea] bg-[#f8faff] p-4">
                <p className="text-lg font-semibold text-[#22386e]">{idx + 1}. {q}</p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} type="button" className="h-10 rounded-md border border-[#c8d1e2] bg-white text-lg font-bold text-[#1f326a]">{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <aside className="bg-[#f5f7fb] p-6">
          <h3 className="text-xl font-bold text-[#1f326a]">다음 단계</h3>
          <p className="mt-2 text-base text-[#67789f]">응답 완료 후 결과 화면으로 이동</p>
          <Link href="/almost-complete" className="mt-6 grid h-12 place-items-center rounded-md bg-[#c8922a] text-xl font-bold text-white hover:brightness-95">
            응답 완료
          </Link>
        </aside>
      </section>
    </main>
  );
}
