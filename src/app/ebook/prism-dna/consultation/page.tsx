"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BrandLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center leading-none ${className}`}>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-black text-[#c8922a]">대치</span>
      <span className="text-3xl font-black text-white tracking-tighter">수프리마</span>
    </div>
    <span className="text-[10px] font-bold text-slate-500 tracking-wider mt-1 italic uppercase">Su-Prima 입시&코칭 센터</span>
  </div>
);

export default function EbookConsultationPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    phone: "",
    interest: "기질 진단 및 학습 설계",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full p-10 rounded-[2.5rem] bg-gradient-to-b from-slate-900 to-black border border-white/10 shadow-2xl">
          <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-[0_0_40px_rgba(79,70,229,0.4)]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-4">상담 안내 신청 완료</h2>
          <p className="text-slate-400 leading-relaxed mb-8">
            신청하신 정보로 곧 [입시 DNA 프리즘] <br/>
            상담 안내 문자를 보내드리겠습니다. <br/>
            <span className="text-indigo-400 font-bold mt-2 block">잠시만 기다려 주세요.</span>
          </p>
          <Link 
            href="/ebook/prism-dna"
            className="block w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all border border-white/10"
          >
            전자책으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] py-12 px-6 flex flex-col items-center">
      <header className="w-full max-w-xl mb-16 flex flex-col items-center">
        <BrandLogo className="mb-10" />
        <div className="h-[1px] w-12 bg-indigo-500/50 mb-8" />
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4 text-center leading-tight whitespace-nowrap">
          [입시 DNA 프리즘] 상담 및 안내 신청
        </h1>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] text-center">
          Premium Consultation Inquiry
        </p>
      </header>

      <div className="max-w-xl w-full bg-slate-900/50 rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
        <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 p-8 border-b border-white/5 text-center">
          <p className="text-indigo-200 font-medium leading-relaxed">
            아이의 기질을 정밀하게 분석하고 <br/>
            최적의 공부법을 설계하고 싶으신가요?
          </p>
          <p className="text-slate-400 text-xs mt-3 opacity-70">
            정보를 남겨주시면 담당 컨설턴트가 <br/> 상세 안내 자료를 보내드립니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">학생 성함</label>
              <input 
                type="text" 
                required
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-slate-700 focus:border-indigo-500/50 outline-none transition-all"
                placeholder="홍길동"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">학년</label>
              <input 
                type="text" 
                required
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
                className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-slate-700 focus:border-indigo-500/50 outline-none transition-all"
                placeholder="중학교 2학년"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">학부모 연락처</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-slate-700 focus:border-indigo-500/50 outline-none transition-all"
              placeholder="010-0000-0000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">관심 분야</label>
            <select 
              className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white focus:border-indigo-500/50 outline-none transition-all appearance-none"
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
            >
              <option value="기질 진단 및 학습 설계">기질 진단 및 학습 설계</option>
              <option value="학습 태도 및 환경 코칭">학습 태도 및 환경 코칭</option>
              <option value="고등/대입 입시 전략">고등/대입 입시 전략</option>
              <option value="기타 문의">기타 문의</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-500 uppercase ml-1">상담 희망 내용 (선택)</label>
            <textarea 
              className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-slate-700 focus:border-indigo-500/50 outline-none transition-all h-24 resize-none"
              placeholder="예: 아이가 특정 과목에 유독 거부감이 심한데 기질 때문일까요?"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-lg shadow-xl transition-all ${isSubmitting ? 'opacity-70' : 'hover:scale-[1.02] active:scale-95'}`}
          >
            {isSubmitting ? "신청 정보를 전송 중입니다..." : "상담 및 안내 신청하기"}
          </button>
        </form>
      </div>

      <p className="mt-12 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
        Authorized by Deachi Suprima Coaching Center
      </p>
    </div>
  );
}
