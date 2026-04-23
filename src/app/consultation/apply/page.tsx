"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

// Simplified Radar for the success screen to match the "Perfectly Decoded" promise
function DecodedRadar() {
  const scores = [
    { axis: "타고난 동기", student: 88, target: 85 },
    { axis: "인지적 깊이", student: 92, target: 90 },
    { axis: "전략적 균형", student: 75, target: 88 },
    { axis: "메타 실행력", student: 85, target: 82 },
    { axis: "기록 차별성", student: 65, target: 92 },
    { axis: "미래 확장성", student: 80, target: 85 },
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

  const studentPath = scores.map((s, i) => {
    const p = getPoint(s.student, i, radius);
    return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
  }).join(" ") + " Z";

  return (
    <div className="my-8 p-6 bg-white rounded-3xl border border-[#e2e8f0] shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/2 left-0 w-[200%] h-20 -translate-y-1/2 -translate-x-1/4 rotate-12 bg-gradient-to-r from-transparent via-[#3b82f6] via-[#ec4899] to-transparent blur-2xl" />
      </div>
      <p className="text-[10px] font-black text-[#1e3a8a] uppercase mb-4 tracking-widest text-center">Perfectly Decoded: Prism Map</p>
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
            <text key={i} x={p.x} y={p.y} textAnchor="middle" className="text-[9px] font-black fill-[#1e3a8a]">{s.axis}</text>
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
    reportId: reportId,
    parentName: "",
    phone: "",
    question: "",
    preferredDate: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (reportId) {
      setFormData(prev => ({ ...prev, reportId }));
    }
  }, [reportId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/consultation/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        alert("신청 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-[#e2e8f0] max-w-lg w-full">
          <div className="h-16 w-16 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-[#1e3a8a] mb-2">신청이 완료되었습니다</h2>
          <p className="text-sm font-bold text-[#64748b] mb-6">
            아래는 {formData.parentName}님을 위한 초정밀 Prism 분포도 미리보기입니다.
          </p>

          <DecodedRadar />

          <div className="bg-[#f0f9ff] p-4 rounded-2xl border border-[#bae6fd] mb-8">
            <p className="text-[12px] font-black text-[#0369a1] leading-relaxed">
              "상담 시 이 분포도의 각 축이 의미하는 기질적 충돌 해결책과<br/>
              생기부 기록 차별화 전략을 완벽히 해부해 드립니다."
            </p>
          </div>

          <button 
            onClick={() => window.close()}
            className="w-full py-4 bg-[#1e3a8a] text-white rounded-2xl font-black shadow-lg hover:bg-[#1e293b] transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-xl mx-auto">
        <header className="flex flex-col items-center mb-12 text-center">
          <Image src="/suprima_logo_2025_transparent.png" alt="Logo" width={180} height={60} className="object-contain mb-8" />
          <div className="h-1 w-12 bg-[#b45309] rounded-full mb-4" />
          <h1 className="text-3xl font-black text-[#1e3a8a] tracking-tight mb-2">프리미엄 대면 상담 신청</h1>
          <p className="text-[#64748b] font-bold uppercase text-[10px] tracking-[0.2em]">Premium Strategy Consultation</p>
        </header>

        <div className="bg-white rounded-3xl shadow-2xl border border-[#e2e8f0] overflow-hidden">
          <div className="bg-[#1e3a8a] p-8 text-white">
            <p className="text-[11px] font-bold text-white/60 uppercase mb-1">Step 1: Data Verification</p>
            <h2 className="text-xl font-black">리포트 기반 초정밀 분석 대기</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              <label className="block text-[12px] font-black text-[#1e3a8a] uppercase mb-2">리포트 고유번호</label>
              <input 
                type="text" 
                value={formData.reportId}
                onChange={(e) => setFormData({...formData, reportId: e.target.value})}
                className="w-full px-4 py-4 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl font-bold text-[#1e3a8a] focus:border-[#1e3a8a] outline-none transition-all"
                placeholder="리포트 번호를 입력하세요"
                required
              />
              <p className="mt-2 text-[10px] text-[#94a3b8] font-bold italic">* 번호 입력 시 전문가가 사전 데이터를 즉시 검토합니다.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[12px] font-black text-[#1e3a8a] uppercase mb-2">학부모 성함</label>
                <input 
                  type="text" 
                  value={formData.parentName}
                  onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                  className="w-full px-4 py-4 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl font-bold focus:border-[#1e3a8a] outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-[12px] font-black text-[#1e3a8a] uppercase mb-2">연락처</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-4 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl font-bold focus:border-[#1e3a8a] outline-none transition-all"
                  placeholder="010-0000-0000"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-black text-[#1e3a8a] uppercase mb-2">상담 시 집중하고 싶은 질문 (1가지)</label>
              <textarea 
                value={formData.question}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                className="w-full px-4 py-4 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl font-bold focus:border-[#1e3a8a] outline-none transition-all h-32 resize-none"
                placeholder="예: 우리 아이의 인지적 깊이를 보완할 구체적 탐구 주제가 궁금합니다."
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-black text-[#1e3a8a] uppercase mb-2">희망 상담 일정 (가예약)</label>
              <input 
                type="datetime-local" 
                value={formData.preferredDate}
                onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                className="w-full px-4 py-4 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-xl font-bold focus:border-[#1e3a8a] outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 bg-[#1e3a8a] text-white rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1e293b]'}`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>데이터 보안 해제 및 분석 중...</span>
                </div>
              ) : "상담 신청 확정하기"}
            </button>
          </form>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[10px] font-bold text-[#cbd5e1] uppercase tracking-[0.3em]">
            Authorized by Suprema Clinic Premium Diagnosis
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function ConsultationApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-[#1e3a8a] border-t-transparent rounded-full" />
      </div>
    }>
      <ConsultationApplyForm />
    </Suspense>
  );
}
