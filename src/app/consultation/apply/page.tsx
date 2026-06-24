"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function DecodedRadar() {
  const scores = [
    { axis: "사고 확장", student: 88 },
    { axis: "인지 깊이", student: 92 },
    { axis: "전략 균형", student: 75 },
    { axis: "실행 안정", student: 85 },
    { axis: "기록 체계", student: 65 },
    { axis: "미래 확장", student: 80 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = 80;
  const angleStep = (Math.PI * 2) / scores.length;

  const getPoint = (val: number, i: number, r: number) => {
    const a = angleStep * i - Math.PI / 2;
    return {
      x: center + (r * val / 100) * Math.cos(a),
      y: center + (r * val / 100) * Math.sin(a),
    };
  };

  const studentPath =
    scores
      .map((s, i) => {
        const p = getPoint(s.student, i, radius);
        return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
      })
      .join(" ") + " Z";

  return (
    <div className="relative my-8 overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-xl">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
        <div className="absolute left-[-25%] top-1/2 h-20 w-[200%] -translate-y-1/2 rotate-12 bg-gradient-to-r from-transparent via-[#3b82f6] via-[#ec4899] to-transparent blur-2xl" />
      </div>
      <p className="mb-4 text-center text-[10px] font-black uppercase tracking-widest text-[#1e3a8a]">Perfectly Decoded: Prism Map</p>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto overflow-visible">
        <defs>
          <linearGradient id="successPrism" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80, 100].map((r) => (
          <circle key={r} cx={center} cy={center} r={(r / 100) * radius} fill="none" stroke="#f1f5f9" strokeWidth="1" />
        ))}
        <path d={studentPath} fill="url(#successPrism)" fillOpacity="0.2" stroke="url(#successPrism)" strokeWidth="3" />
        {scores.map((s, i) => {
          const p = getPoint(120, i, radius);
          return (
            <text key={s.axis} x={p.x} y={p.y} textAnchor="middle" className="fill-[#1e3a8a] text-[9px] font-black">
              {s.axis}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function ConsultationApplyForm() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get("reportId") || "";

  const [formData, setFormData] = useState({
    reportId,
    parentName: "",
    phone: "",
    question: "",
    preferredDate: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("요청 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] p-6 text-center">
        <div className="w-full max-w-lg rounded-[3rem] border border-[#e2e8f0] bg-white p-10 shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a8a] text-white shadow-xl">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-black text-[#1e3a8a]">요청이 완료되었습니다</h2>
          <p className="mb-6 text-sm font-bold text-[#64748b]">
            아래는 {formData.parentName} 님을 위한 초정밀 분석 미리보기입니다.
          </p>

          <DecodedRadar />

          <div className="mb-8 rounded-2xl border border-[#bae6fd] bg-[#f0f9ff] p-6">
            <p className="mb-4 text-[12px] font-black leading-relaxed text-[#0369a1]">
              상담 시에는 기질 축의 충돌 해결책과
              <br />
              학생부 기록 체계 보완 방향까지 함께 안내합니다.
            </p>
            <div className="border-t border-[#bae6fd] pt-4 text-left">
              <p className="mb-1 text-[11px] font-black uppercase text-[#0369a1]">Contact Information</p>
              <p className="text-[12px] font-bold text-[#0c4a6e]">대치수프리마 입시&코칭센터</p>
              <p className="text-[11px] text-[#0c4a6e]/70">대입 진학 전략 컨설팅</p>
              <p className="text-[11px] text-[#0c4a6e]/70">서울시 강남구 도곡로 326 B1F</p>
              <p className="mt-1 text-[12px] font-black text-[#1e3a8a]">문의: 010-2370-1077</p>
            </div>
          </div>

          <button
            onClick={() => window.close()}
            className="w-full rounded-2xl bg-[#1e3a8a] py-4 font-black text-white shadow-lg transition-all hover:bg-[#1e293b]"
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-12">
      <div className="mx-auto max-w-xl">
        <header className="mb-12 flex flex-col items-center text-center">
          <Image src="/suprima_logo_final.png" alt="대치수프리마 입시&코칭센터" width={180} height={60} className="mb-8 object-contain mix-blend-multiply" />
          <div className="mb-4 h-1 w-12 rounded-full bg-[#b45309]" />
          <h1 className="mb-2 text-3xl font-black tracking-tight text-[#1e3a8a]">프리미엄 대면 상담 요청</h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748b]">Premium Strategy Consultation</p>
        </header>

        <div className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-2xl">
          <div className="bg-[#1e3a8a] p-8 text-white">
            <p className="mb-1 text-[11px] font-bold uppercase text-white/60">Step 1: Data Verification</p>
            <h2 className="text-xl font-black">리포트 기반 초정밀 분석 대기</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 p-8">
            <div>
              <label className="mb-2 block text-[12px] font-black uppercase text-[#1e3a8a]">리포트 고유번호</label>
              <input
                type="text"
                value={formData.reportId}
                onChange={(e) => setFormData({ ...formData, reportId: e.target.value })}
                className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 font-bold text-[#1e3a8a] outline-none transition-all focus:border-[#1e3a8a]"
                placeholder="리포트 번호를 입력해 주세요."
                required
              />
              <p className="mt-2 text-[10px] font-bold italic text-[#94a3b8]">* 입력한 번호를 기준으로 사전 데이터를 즉시 확인합니다.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-[12px] font-black uppercase text-[#1e3a8a]">보호자 성함</label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 font-bold outline-none transition-all focus:border-[#1e3a8a]"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-[12px] font-black uppercase text-[#1e3a8a]">연락처</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 font-bold outline-none transition-all focus:border-[#1e3a8a]"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-black uppercase text-[#1e3a8a]">상담 때 집중하고 싶은 질문</label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="h-32 w-full resize-none rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 font-bold outline-none transition-all focus:border-[#1e3a8a]"
                placeholder="예: 우리 아이의 인지 깊이를 보완할 구체적인 탐구 주제가 궁금합니다."
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-black uppercase text-[#1e3a8a]">희망 상담 일정</label>
              <input
                type="datetime-local"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full rounded-xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-4 font-bold outline-none transition-all focus:border-[#1e3a8a]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-2xl bg-[#1e3a8a] py-5 text-lg font-black text-white shadow-xl transition-all ${isSubmitting ? "cursor-not-allowed opacity-70" : "hover:-translate-y-1 hover:bg-[#1e293b]"}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>데이터 확인 및 분석 중...</span>
                </div>
              ) : "상담 요청 확정하기"}
            </button>
          </form>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#cbd5e1]">
            Authorized by Suprema Clinic Premium Diagnosis
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function ConsultationApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#1e3a8a] border-t-transparent" />
        </div>
      }
    >
      <ConsultationApplyForm />
    </Suspense>
  );
}
