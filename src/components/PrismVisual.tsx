/** 
 * 💎 [시각화 모듈] 프리즘 스펙트럼 합성 비주얼
 * 한 명의 학생(백색광)이 다양한 역량(스펙트럼)으로 분산되었다가
 * 다시 하나의 고유한 빛으로 합쳐지는 철학적 메타포 구현
 */

import React from 'react';

export const PrismSynthesisVisual = () => {
  return (
    <div className="relative w-full h-80 flex items-center justify-center my-10 overflow-hidden bg-slate-900 rounded-[40px] shadow-2xl">
      {/* 백색광 입사 */}
      <div className="absolute left-0 w-1/3 h-1 bg-gradient-to-r from-transparent via-white to-white opacity-40 blur-[1px]" />
      
      {/* 💎 프리즘 (삼각형) */}
      <div className="relative z-10 w-48 h-48 border-l-[96px] border-l-transparent border-r-[96px] border-r-transparent border-b-[166px] border-b-white/10 backdrop-blur-sm">
        <div className="absolute inset-x-[-96px] bottom-[-166px] border-l-[96px] border-l-transparent border-r-[96px] border-r-transparent border-b-[166px] border-b-white/5 animate-pulse" />
      </div>

      {/* 🌈 분산되는 스펙트럼 */}
      <div className="absolute right-0 w-1/2 h-40 flex flex-col justify-between opacity-60">
        <div className="h-2 w-full bg-red-500 blur-[2px] transform translate-x-4 rotate-6" />
        <div className="h-2 w-full bg-orange-500 blur-[2px] transform translate-x-3 rotate-3" />
        <div className="h-2 w-full bg-yellow-500 blur-[2px] transform translate-x-2 rotate-0" />
        <div className="h-2 w-full bg-green-500 blur-[2px] transform translate-x-3 -rotate-3" />
        <div className="h-2 w-full bg-blue-500 blur-[2px] transform translate-x-4 -rotate-6" />
      </div>

      {/* 텍스트 메타포 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-2">
           <span className="block text-[10px] font-black text-[#d4af37] tracking-[1em] uppercase">The Prism Spectrum</span>
           <span className="block text-2xl font-black text-white italic tracking-tighter">"다양한 역량의 합이 당신의 아이입니다"</span>
        </div>
      </div>
    </div>
  );
};
