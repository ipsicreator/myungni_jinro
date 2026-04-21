'use client';

import React from 'react';

/** 
 * 📊 [시각화 모듈 01] ABC 기질 혼합비 도넛 차트
 */
export const AbcDonutChart = ({ a, b, c }: { a: number, b: number, c: number }) => {
  const total = a + b + c;
  const pA = (a / total) * 100;
  const pB = (b / total) * 100;
  const pC = (c / total) * 100;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
        <circle cx="18" cy="18" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
        <circle cx="18" cy="18" r="16" fill="transparent" stroke="#0f172a" strokeWidth="4" strokeDasharray={`${pA} ${100 - pA}`} strokeDashoffset="0" />
        <circle cx="18" cy="18" r="16" fill="transparent" stroke="#d4af37" strokeWidth="4" strokeDasharray={`${pB} ${100 - pB}`} strokeDashoffset={`-${pA}`} />
        <circle cx="18" cy="18" r="16" fill="transparent" stroke="#ef4444" strokeWidth="4" strokeDasharray={`${pC} ${100 - pC}`} strokeDashoffset={`-${pA + pB}`} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-black">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">DNA Mix</span>
        <span className="text-3xl text-slate-900 tracking-tighter">A{Math.round(pA)}:C{Math.round(pC)}</span>
      </div>
    </div>
  );
};

/** 
 * ⚖️ [시각화 모듈 02] ILS 4축 밸런스 바 (NCSU 기준)
 */
export const IlsBalanceBar = ({ labelL, labelR, value }: { labelL: string, labelR: string, value: number }) => {
  // value: -11 ~ +11 (L우세 ~ R우세)
  const percent = ((value + 11) / 22) * 100;
  return (
    <div className="w-full space-y-3 py-4 italic">
      <div className="flex justify-between text-[12px] font-black uppercase text-slate-500 tracking-widest">
        <span>{labelL}</span>
        <span>{labelR}</span>
      </div>
      <div className="h-6 bg-slate-100 rounded-full relative overflow-hidden border border-slate-200">
        <div 
          className="absolute h-full bg-slate-900 transition-all duration-1000" 
          style={{ width: `${Math.abs(percent - 50) * 2}%`, left: percent > 50 ? '50%' : `${percent}%` }}
        />
        <div className="absolute top-0 left-1/2 w-1 h-full bg-white z-10" />
      </div>
    </div>
  );
};

/** 
 * 📅 [시각화 모듈 03] 90일 실행 로드맵 간트형 타임라인
 */
export const RoadmapTimeline = () => {
  const steps = [
    { label: '안정화', weeks: '1-4주', color: 'bg-slate-900', p: '0%' },
    { label: '심화전환', weeks: '5-8주', color: 'bg-[#d4af37]', p: '33%' },
    { label: '고도화', weeks: '9-12주', color: 'bg-emerald-600', p: '66%' },
  ];
  return (
    <div className="w-full pt-10 pb-20 space-y-12 italic">
      <div className="relative h-4 bg-slate-100 rounded-full">
        {steps.map((s, i) => (
          <div key={i} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: s.p }}>
            <div className={`w-10 h-10 ${s.color} rounded-full border-4 border-white shadow-lg mb-4`} />
            <span className="text-[14px] font-black text-slate-900">{s.label}</span>
            <span className="text-[10px] text-slate-400 font-bold">{s.weeks}</span>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-[#d4af37] to-emerald-600 opacity-20 rounded-full" />
      </div>
    </div>
  );
};
