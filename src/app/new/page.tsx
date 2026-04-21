"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { DEFAULT_FORM, KR, type PrismForm, saveAnswersToStorage, saveFormToStorage } from "@/lib/prismData";

export default function NewConsultPage() {
  const router = useRouter();
  const [form, setForm] = useState<PrismForm>(DEFAULT_FORM);
  const [errorMessage, setErrorMessage] = useState("");

  const canProceed = useMemo(() => {
    return (
      form.studentName.trim() !== "" &&
      form.schoolName.trim() !== "" &&
      form.grade.trim() !== "" &&
      form.studentPhone.trim() !== "" &&
      form.parentPhone.trim() !== "" &&
      form.birthDate.trim() !== "" &&
      form.birthTime.trim() !== ""
    );
  }, [form]);

  const setField =
    (key: keyof PrismForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
      if (errorMessage) setErrorMessage("");
    };

  const handleStart = () => {
    if (!canProceed) {
      setErrorMessage("\uD544\uC218 \uC785\uB825 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uC791\uC131\uD574 \uC8FC\uC138\uC694.");
      return;
    }
    saveFormToStorage(form);
    saveAnswersToStorage([]);
    router.push("/questionnaire");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebf1] p-4">
      <section className="grid h-[800px] w-[1280px] grid-cols-[38%_38%_24%] overflow-hidden rounded-2xl border border-[#cfd5e2] bg-[#f3f5f9] shadow-xl">
        <aside className="flex flex-col border-r border-[#d6dbe6] bg-[#f7f8fb]">
          <header className="border-b border-[#d6dbe6] px-5 py-5">
            <Image
              src="/suprima_logo_2025_transparent.png"
              alt="\uB300\uCE58\uC218\uD504\uB9AC\uB9C8 \uC785\uC2DC&\uCF54\uCE6D\uC13C\uD130"
              width={300}
              height={104}
              className="h-auto w-[300px] max-w-full object-contain"
            />
          </header>
          <div className="p-6">
            <h2 className="text-3xl font-extrabold text-[#1f326a]">\uC9C4\uB2E8 \uC548\uB0B4</h2>
            <p className="mt-3 text-lg leading-8 text-[#41537f]">
              \uD559\uC0DD \uAE30\uBCF8 \uC815\uBCF4\uB97C \uC785\uB825\uD558\uBA74 \uAE30\uC9C8 \uBD84\uC11D, \uD559\uC2B5 \uC131\uD5A5, \uACF5\uD559 \uC801\uD569\uB3C4,
              \uC9C4\uB85C \uB9AC\uD3EC\uD2B8\uB85C \uC774\uC5B4\uC9C0\uB294 \uD1B5\uD569 \uC9C4\uB2E8\uC744 \uC2DC\uC791\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.
            </p>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white">
          <header className="grid h-[118px] place-items-center border-b border-[#2a3f77] bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964]">
            <h1 className="text-5xl font-extrabold tracking-tight text-white">\uC785\uC2DCDNA\uD504\uB9AC\uC998</h1>
          </header>

          <form
            className="grid flex-1 gap-3 overflow-auto p-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleStart();
            }}
          >
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">\uD559\uC0DD \uC774\uB984</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder={KR.studentDefault} value={form.studentName} onChange={setField("studentName")} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">\uD559\uAD50\uBA85</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder={KR.schoolDefault} value={form.schoolName} onChange={setField("schoolName")} />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">\uD559\uB144</span>
                <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="\uC9112" value={form.grade} onChange={setField("grade")} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">\uACC4\uC5F4</span>
                <select className="h-10 rounded-md border border-[#cfd5e0] px-3" value={form.track} onChange={setField("track")}>
                  <option>{KR.trackHumanities}</option>
                  <option>{KR.trackScience}</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">\uD559\uC0DD \uC5F0\uB77D\uCC98</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="010-1234-5678" value={form.studentPhone} onChange={setField("studentPhone")} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">\uBCF4\uD638\uC790 \uC5F0\uB77D\uCC98</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="010-9876-5432" value={form.parentPhone} onChange={setField("parentPhone")} />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">\uC0DD\uB144\uC6D4\uC77C</span>
                <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="YYYY.MM.DD" value={form.birthDate} onChange={setField("birthDate")} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">\uC131\uBCC4</span>
                <select className="h-10 rounded-md border border-[#cfd5e0] px-3" value={form.gender} onChange={setField("gender")}>
                  <option>{KR.genderMale}</option>
                  <option>{KR.genderFemale}</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">\uCD9C\uC0DD\uC2DC\uAC01</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="HH:MM" value={form.birthTime} onChange={setField("birthTime")} />
            </label>
            {errorMessage ? <p className="text-sm font-semibold text-[#b42318]">{errorMessage}</p> : null}
            <button
              type="submit"
              className="mt-2 grid h-12 place-items-center rounded-md bg-[#c8922a] text-2xl font-bold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:bg-[#d6b887]"
              disabled={!canProceed}
            >
              \uC9C4\uB2E8 \uC2DC\uC791\uD558\uAE30
            </button>
          </form>
        </section>

        <aside className="flex flex-col bg-[#f5f7fb]">
          <header className="border-b border-[#d6dbe6] px-5 py-5">
            <p className="text-xs font-semibold tracking-wide text-[#7383a6]">\uC9C4\uD589 \uB2E8\uACC4</p>
            <div className="mt-2 flex items-center gap-2 text-lg font-bold text-[#1f326a]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1f326a] text-sm text-white">1</span>
              \uAE30\uBCF8 \uC815\uBCF4 \uB4F1\uB85D
            </div>
          </header>
          <ol className="m-0 list-none p-0">
            <li className="border-b border-[#d6dbe6] px-5 py-5 text-base font-bold text-[#1f326a]">
              <strong className="mr-2">01</strong>\uAE30\uC9C8 \uC9C4\uB2E8 \uBB38\uD56D
            </li>
            <li className="border-b border-[#d6dbe6] px-5 py-5 text-base text-[#67789f]">
              <strong className="mr-2">02</strong>\uD559\uC2B5 \uC131\uD5A5 \uBD84\uC11D
            </li>
            <li className="px-5 py-5 text-base text-[#67789f]">
              <strong className="mr-2">03</strong>\uC9C4\uB2E8 \uACB0\uACFC \uB9AC\uD3EC\uD2B8
            </li>
          </ol>
        </aside>
      </section>
    </main>
  );
}
