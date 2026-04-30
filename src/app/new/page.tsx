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
      setErrorMessage("필수 입력 항목을 모두 작성해 주세요.");
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
              src="/suprima_logo_final.png"
              alt="대치수프리마 입시&코칭센터"
              width={300}
              height={104}
              className="h-auto w-[300px] max-w-full object-contain"
            />
          </header>
          <div className="p-6">
            <h2 className="text-3xl font-extrabold text-[#1f326a]">진단 안내</h2>
            <p className="mt-3 text-lg leading-8 text-[#41537f]">
              학생 기본 정보를 입력하면 기질 분석, 학습 성향, 공학 적합도,
              진로 리포트로 이어지는 통합 진단을 시작할 수 있습니다.
            </p>
          </div>
        </aside>

        <section className="flex flex-col border-r border-[#d6dbe6] bg-white">
          <header className="grid h-[118px] place-items-center border-b border-[#2a3f77] bg-gradient-to-r from-[#132964] via-[#20397c] to-[#132964]">
            <h1 className="text-5xl font-extrabold tracking-tight text-white">입시DNA프리즘</h1>
          </header>

          <form
            className="grid flex-1 gap-3 overflow-auto p-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleStart();
            }}
          >
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">학생 이름</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder={KR.studentDefault} value={form.studentName} onChange={setField("studentName")} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">학교명</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder={KR.schoolDefault} value={form.schoolName} onChange={setField("schoolName")} />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">학년</span>
                <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="중2" value={form.grade} onChange={setField("grade")} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">계열</span>
                <select className="h-10 rounded-md border border-[#cfd5e0] px-3" value={form.track} onChange={setField("track")}>
                  <option>{KR.trackHumanities}</option>
                  <option>{KR.trackScience}</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">학생 연락처</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="010-1234-5678" value={form.studentPhone} onChange={setField("studentPhone")} />
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">보호자 연락처</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="010-9876-5432" value={form.parentPhone} onChange={setField("parentPhone")} />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">생년월일</span>
                <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="YYYY.MM.DD" value={form.birthDate} onChange={setField("birthDate")} />
              </label>
              <label className="grid gap-1">
                <span className="text-sm font-semibold text-[#3e4f76]">성별</span>
                <select className="h-10 rounded-md border border-[#cfd5e0] px-3" value={form.gender} onChange={setField("gender")}>
                  <option>{KR.genderMale}</option>
                  <option>{KR.genderFemale}</option>
                </select>
              </label>
            </div>
            <label className="grid gap-1">
              <span className="text-sm font-semibold text-[#3e4f76]">출생시각</span>
              <input className="h-10 rounded-md border border-[#cfd5e0] px-3" placeholder="HH:MM" value={form.birthTime} onChange={setField("birthTime")} />
            </label>
            {errorMessage ? <p className="text-sm font-semibold text-[#b42318]">{errorMessage}</p> : null}
            <button
              type="submit"
              className="mt-2 grid h-12 place-items-center rounded-md bg-[#c8922a] text-2xl font-bold text-white hover:brightness-95 disabled:cursor-not-allowed disabled:bg-[#d6b887]"
              disabled={!canProceed}
            >
              진단 시작하기
            </button>
          </form>
        </section>

        <aside className="flex flex-col bg-[#f5f7fb]">
          <header className="border-b border-[#d6dbe6] px-5 py-5">
            <p className="text-xs font-semibold tracking-wide text-[#7383a6]">진행 단계</p>
            <div className="mt-2 flex items-center gap-2 text-lg font-bold text-[#1f326a]">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1f326a] text-sm text-white">1</span>
              기본 정보 등록
            </div>
          </header>
          <ol className="m-0 list-none p-0">
            <li className="border-b border-[#d6dbe6] px-5 py-5 text-base font-bold text-[#1f326a]">
              <strong className="mr-2">01</strong>기질 진단 문항
            </li>
            <li className="border-b border-[#d6dbe6] px-5 py-5 text-base text-[#67789f]">
              <strong className="mr-2">02</strong>학습 성향 분석
            </li>
            <li className="px-5 py-5 text-base text-[#67789f]">
              <strong className="mr-2">03</strong>진단 결과 리포트
            </li>
          </ol>
        </aside>
      </section>
    </main>
  );
}

