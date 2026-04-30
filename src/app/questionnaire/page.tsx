"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { PRISM_QUESTIONS, loadAnswersFromStorage, loadFormFromStorage, saveAnswersToStorage } from "@/lib/prismData";

export default function QuestionnairePage() {
  const router = useRouter();
  const form = useMemo(() => loadFormFromStorage(), []);
  const [answers, setAnswers] = useState<number[]>(() => {
    const base = new Array(PRISM_QUESTIONS.length).fill(0);
    const saved = loadAnswersFromStorage();
    for (let i = 0; i < Math.min(base.length, saved.length); i += 1) base[i] = saved[i] || 0;
    return base;
  });
  const [errorMessage, setErrorMessage] = useState("");

  const completedCount = useMemo(() => answers.filter((x) => x > 0).length, [answers]);
  const isComplete = completedCount === PRISM_QUESTIONS.length;

  const selectScore = (questionIndex: number, score: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = score;
      return next;
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleComplete = () => {
    if (!isComplete) {
      setErrorMessage(`모든 문항에 응답해 주세요. (${completedCount}/${PRISM_QUESTIONS.length})`);
      return;
    }
    saveAnswersToStorage(answers);
    router.push("/almost-complete");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="flex flex-col border-r border-[#d6dbe6] bg-[#f7f8fb]">
          <header className="border-b border-[#d6dbe6] px-5 py-5">
            <Image
              src="/suprima_logo_final.png"
              alt="대치수프리마 입시&코칭센터"
              width={300}
              height={104}
              className="h-auto w-[300px] max-w-full object-contain"
            />
          </header>
          <div className="p-6">
            <h2 className="text-3xl font-extrabold text-[#1f326a]">기질 진단 문항</h2>
            <p className="mt-3 text-lg leading-8 text-[#41537f]">아래 문항에 1~5점으로 응답해 주세요.</p>
            <div className="mt-5 rounded-lg border border-[#d7deea] bg-white p-4">
              <p className="text-sm font-semibold text-[#6b7da5]">진단 대상</p>
              <p className="mt-1 text-2xl font-black text-[#1f326a]">{form.studentName}</p>
            </div>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white p-5">
          <h1 className="text-4xl font-black text-[#1f326a]">1차 문항</h1>
          <div className="mt-4 grid gap-3 overflow-auto pr-2">
            {PRISM_QUESTIONS.map((q, idx) => (
              <div key={q} className="rounded-lg border border-[#d7deea] bg-[#f8faff] p-4">
                <p className="text-lg font-semibold text-[#22386e]">
                  {idx + 1}. {q}
                </p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((score) => {
                    const selected = answers[idx] === score;
                    return (
                      <button
                        key={score}
                        type="button"
                        onClick={() => selectScore(idx, score)}
                        className={`h-10 rounded-md border text-lg font-bold ${
                          selected
                            ? "border-[#20397d] bg-[#20397d] text-white"
                            : "border-[#c8d1e2] bg-white text-[#1f326a]"
                        }`}
                      >
                        {score}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="bg-[#f5f7fb] p-6">
          <h3 className="text-xl font-bold text-[#1f326a]">다음 단계</h3>
          <p className="mt-2 text-base text-[#67789f]">응답 완료 후 결과 화면으로 이동</p>
          <p className="mt-2 text-sm font-semibold text-[#41537f]">
            진행률: {completedCount}/{PRISM_QUESTIONS.length}
          </p>
          {errorMessage ? <p className="mt-2 text-sm font-semibold text-[#b42318]">{errorMessage}</p> : null}
          <button
            type="button"
            onClick={handleComplete}
            disabled={!isComplete}
            className="mt-6 grid h-12 w-full place-items-center rounded-md bg-[#c8922a] text-xl font-bold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:bg-[#d6b887]"
          >
            응답 완료
          </button>
        </aside>
      </section>
    </main>
  );
}
