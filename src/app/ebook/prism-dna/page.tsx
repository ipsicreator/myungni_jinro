'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section 
      id={id}
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center py-20 px-6 transition-all duration-1000 ease-out opacity-0 translate-y-10 ${className}`}
    >
      <div className="max-w-3xl w-full">
        {children}
      </div>
    </section>
  );
};

const TypeCard = ({ title, type, description, analysis, prescription, color, icon }: any) => (
  <div className={`p-8 rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 space-y-6 mb-12 shadow-2xl relative overflow-hidden group`}>
    <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full ${color}`}></div>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-inner ${color}`}>
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-medium tracking-widest text-slate-400 uppercase">[{type}타입]</span>
        <h3 className="text-xl font-bold text-white leading-tight">{title}</h3>
      </div>
    </div>
    
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          아이의 태도와 모습
        </h4>
        <p className="text-slate-400 leading-[1.8] text-sm">{description}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          공부력 분석
        </h4>
        <p className="text-slate-400 leading-[1.8] text-sm italic">{analysis}</p>
      </div>
      <div className={`p-5 rounded-2xl bg-white/5 border-l-4 ${color.replace('bg-', 'border-')}`}>
        <h4 className="text-sm font-semibold text-slate-200 mb-3">학습 환경 처방</h4>
        <p className="text-slate-300 leading-[1.8] text-sm">{prescription}</p>
      </div>
    </div>
  </div>
);

const BrandLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col items-center leading-none ${className}`}>
    <div className="flex items-baseline gap-1">
      <span className="text-xl font-black text-[#c8922a]">대치</span>
      <span className="text-3xl font-black text-white tracking-tighter">수프리마</span>
    </div>
    <span className="text-[10px] font-bold text-slate-500 tracking-wider mt-1 italic uppercase">Su-Prima 입시&코칭 센터</span>
  </div>
);

export default function EbookPage() {
  return (
    <main className="bg-[#0f1115] text-slate-200 min-h-screen selection:bg-indigo-500/30 selection:text-white py-10 px-4 md:px-0">
      <div className="max-w-[500px] mx-auto bg-[#050505] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 rounded-[40px] overflow-hidden relative ring-8 ring-slate-900/50">
        {/* 0. Hero Section */}
        <section className="relative h-[850px] flex flex-col items-center justify-center text-center p-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/ebook-cover.png" 
              alt="Prism DNA Ebook Cover" 
              fill 
              className="object-cover opacity-60 scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]"></div>
          </div>
          
          <div className="relative z-10 w-full space-y-10 flex flex-col items-center pt-20">
            <BrandLogo className="mb-8" />
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-[10px] font-bold tracking-[0.3em] text-indigo-300 uppercase animate-pulse">
              Premium E-book
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
              내 아이를 위한 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                공부력 설계도
              </span>
            </h1>
            <p className="text-base text-slate-400 font-light max-w-xs mx-auto leading-relaxed">
              공부하는 뇌보다 중요한 <br/> 공부하는 엔진: 기질의 비밀
            </p>
            
            <div className="pt-20 flex flex-col items-center gap-4 text-slate-600">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Scroll to Read</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-indigo-500 to-transparent"></div>
            </div>
          </div>
        </section>

      {/* 1. Prologue */}
      <Section className="bg-slate-950/50">
        <div className="space-y-10 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-indigo-500/60 font-bold tracking-[0.3em] uppercase text-[10px]">Prologue</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              입시는 &apos;속도&apos;가 아니라 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">&apos;방향&apos;의 싸움입니다</span>
            </h2>
          </div>
          <div className="space-y-6 text-base md:text-lg text-slate-300 leading-[1.9]">
            <p>
              대치동의 밤은 늦게까지 꺼지지 않습니다. 하지만 그 뜨거운 열기 속에서도 많은 부모님이 길을 잃습니다. 
              <span className="text-white font-semibold block mt-4"> &ldquo;옆집 아이가 듣는 1타 강사 수업을 들었는데 왜 우리 아이 성적은 그대로일까?&rdquo;</span>
            </p>
            <p className="bg-white/5 p-8 rounded-2xl border border-white/10 italic text-indigo-100">
              문제는 강의가 아니라 <strong className="text-indigo-300">&apos;엔진&apos;</strong>에 있습니다. 
              아이들마다 타고난 기질(DNA)에 따라 <span className="text-indigo-200 font-semibold underline decoration-indigo-500/50 underline-offset-4">학습 태도와 공부력</span>이 다르기 때문입니다.
            </p>
            <p>
              내 아이가 어떤 엔진을 가졌는지 모른 채 남의 속도만 따라가는 것은, 고속도로를 달려야 할 세단에게 험난한 오프로드 경주를 강요하는 것과 같습니다. 
            </p>
            <p className="pt-4 border-t border-white/5 text-sm md:text-base opacity-80">
              이 책은 고등/대입이라는 결과를 향해 가기 전, 우리 아이만의 고유한 기질을 이해하고 최적의 학습 환경을 찾아드리기 위한 나침반입니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 2. Chapter 1 Intro */}
      <Section className="bg-[#080808]">
        <div className="space-y-8 text-center">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Chapter 1</span>
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">입시 DNA란 <br/> 무엇인가?</h2>
          
          <div className="space-y-8 text-base text-slate-400 max-w-2xl mx-auto leading-[1.9]">
            <p>
              우리는 흔히 성적이 <span className="text-slate-200 underline decoration-indigo-500/30 underline-offset-4">&apos;지능&apos;</span>의 문제라고 생각합니다. <br/>
              하지만 실제 상위권 아이들은 지능보다 자신의 <strong className="text-white">&apos;공부 자세&apos;</strong>와 <strong className="text-white">&apos;기질&apos;</strong>을 가장 잘 활용하는 아이들이었습니다.
            </p>

            <div className="py-6 px-4 bg-white/5 rounded-2xl border border-white/10 space-y-4">
              <p className="text-indigo-200 font-medium">
                &ldquo;지능이 엔진의 크기를 결정한다면, <br/>
                기질은 그 엔진을 운용하는 제어 시스템입니다.&rdquo;
              </p>
              <p className="text-xs opacity-60">
                아무리 큰 엔진을 가졌어도 제어 시스템이 망가지면 <br/>
                고속도로를 완주할 수 없습니다.
              </p>
            </div>

            <div className="h-px w-12 bg-indigo-500/30 mx-auto"></div>

            <p>
              <strong className="text-slate-200">[입시 DNA 프리즘]</strong>은 아이가 정보를 받아들이는 방식, 스트레스에 대응하는 태도, 그리고 몰입의 임계점을 정밀하게 분석합니다. 
            </p>
            
            <p className="text-slate-200">
              이를 통해 정의된 <strong className="text-indigo-400">&apos;선천적 학습 기질&apos;</strong>이야말로 아이의 공부력을 결정짓는 뿌리이자, 입시 전략의 시작점입니다.
            </p>
          </div>
        </div>
      </Section>

      {/* 3-7. 5 Elements Types */}
      <Section id="types" className="bg-[#050505]">
        <div className="w-full space-y-24">
          <TypeCard 
            title={<>성장하는 엔진: <br/>호기심이 공부력인 아이</>}
            type="木"
            icon="🌱"
            color="bg-emerald-500/20"
            description="새로운 원리를 발견할 때 눈이 반짝입니다. 남보다 앞서나가는 성취감을 즐기지만, 의미 없는 단순 반복 숙제는 이 아이의 공부력을 급격히 떨어뜨립니다."
            analysis="스스로 결정한 '작은 목표'가 달성될 때 엔진이 가속됩니다. 부모의 강요보다 아이의 '사소한 발견'을 지지해주는 환경이 성장의 핵심입니다."
            prescription="자율성이 보장되는 학습 환경에서 잠재력이 폭발합니다. 아이가 스스로 공부의 '이유'를 찾도록 기다려주고, 작은 성취를 격려해 주십시오."
          />
          
          <TypeCard 
            title={<>몰입하는 엔진: <br/>에너지가 태도인 아이</>}
            type="火"
            icon="🔥"
            color="bg-rose-500/20"
            description="좋아하는 과목에는 무서울 정도로 몰입하지만, 싫은 과목은 펜조차 잡지 않습니다. 감정의 온도가 곧 학습의 성과로 이어지는 정직한 기질입니다."
            analysis="한 번에 쏟아붓는 기질이라 '번아웃'이 쉽습니다. 집중력이 떨어질 때는 장소를 바꾸거나 환기를 시켜주는 등 환경의 변화가 공부력을 회복시킵니다."
            prescription="감정적 지지가 공부의 연료입니다. 결과보다 '몰입했던 과정'에 대한 칭찬이 아이를 다시 책상 앞에 앉게 만드는 가장 큰 힘이 됩니다."
          />

          <TypeCard 
            title={<>단단한 엔진: <br/>루틴이 무기인 아이</>}
            type="土"
            icon="⛰️"
            color="bg-amber-500/20"
            description="큰 기복 없이 묵묵히 제자리를 지킵니다. 정해진 루틴을 지키는 힘이 뛰어나지만, 갑작스러운 스케줄 변화나 낯선 문제 유형에는 당황하기 쉽습니다."
            analysis="익숙함에서 자신감이 나옵니다. 창의성을 서둘러 강요하기보다 '아는 것을 완벽히 다지는' 루틴을 통해 단단한 공부 기초 체력을 길러주어야 합니다."
            prescription="안정적인 공부 환경이 필수입니다. 정해진 시간, 정해진 장소에서 반복되는 학습이 쌓일 때 비로소 누구도 넘볼 수 없는 뒷심이 발휘됩니다."
          />

          <TypeCard 
            title={<>정밀한 엔진: <br/>논리가 곧 자세인 아이</>}
            type="金"
            icon="💎"
            color="bg-slate-300/20"
            description="차갑고 이성적입니다. 오답을 정리할 때 완벽을 기하며, 스스로 납득되지 않는 지식은 거부하는 타협 없는 공부 자세를 보입니다."
            analysis="'그냥 외워'라는 말은 이 아이의 사고 정지 버튼입니다. 인과관계가 명확한 설명과 피드백을 주십시오. 완벽주의 때문에 시작을 두려워하지 않도록 격려가 필요합니다."
            prescription="정밀한 피드백 환경이 중요합니다. 아이의 논리적 질문을 귀찮아하지 마십시오. 그 질문에 대한 답을 찾아가는 과정이 곧 이 아이의 공부력입니다."
          />

          <TypeCard 
            title={<>깊은 엔진: <br/>통찰로 승부하는 아이</>}
            type="水"
            icon="🌊"
            color="bg-blue-500/20"
            description="생각이 깊고 조용합니다. 겉보기엔 속도가 느려 답답해 보일 수 있지만, 머릿속에서는 지식들이 연결되며 거대한 맥락을 형성하고 있습니다."
            analysis="단순 암기가 아닌 '근본적인 이해'가 우선인 아이입니다. 전체 흐름을 파악할 충분한 시간을 주어야 합니다. 학년이 올라갈수록 깊은 사고력이 빛을 발합니다."
            prescription="기다려주는 부모의 자세가 최고의 전략입니다. 조급함으로 아이를 재촉하기보다, 스스로 깊게 파고들 수 있는 정적인 공부 환경을 조성해 주십시오."
          />
        </div>
      </Section>

      {/* 8. Chapter 2 */}
      <Section className="bg-slate-900">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-rose-400 font-bold tracking-widest uppercase text-xs">Chapter 2</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">아이의 공부력이 무너지는 순간: <br/>기질과 환경의 충돌</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 space-y-4">
              <h4 className="text-xl font-bold text-rose-400">열정형(火)에게</h4>
              <p className="text-slate-300">10시간 연속 자습은 <span className="text-white font-bold underline decoration-rose-500">고문</span>입니다. 이들에게 필요한 것은 &apos;집중의 환기&apos;입니다.</p>
            </div>
            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 space-y-4">
              <h4 className="text-xl font-bold text-amber-400">안정형(土)에게</h4>
              <p className="text-slate-300">매일 바뀌는 자율 스케줄은 <span className="text-white font-bold underline decoration-amber-500">공포</span>입니다. 이들에게 필요한 것은 &apos;예측 가능한 루틴&apos;입니다.</p>
            </div>
          </div>
          <p className="text-center text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            부모가 아이의 기질을 무시하고 &apos;나의 방식&apos;이나 &apos;남의 방식&apos;을 강요할 때, 아이의 엔진은 고장 나기 시작합니다. 공부 태도를 바로잡는 첫걸음은 아이의 기질을 있는 그대로 인정하는 것에서 시작됩니다.
          </p>
        </div>
      </Section>

      {/* 9. Chapter 3 */}
      <Section className="bg-[#050505] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full z-0"></div>
        <div className="relative z-10 space-y-10 text-center">
          <span className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Chapter 3</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">[입시 DNA 프리즘]이 <br/> 제시하는 솔루션</h2>
          
          <div className="grid grid-cols-1 gap-6 text-left">
            {[
              { title: "선천적 기질", desc: "타고난 엔진의 종류와 공부 체력을 파악합니다." },
              { title: "후천적 노력", desc: "현재 환경에 맞는 올바른 학습 자세와 태도를 진단합니다." },
              { title: "최적의 매칭", desc: "자녀 맞춤형 공부 환경 + 부모 코칭 + 성장 로드맵 제공" }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-6">
                <div className="text-indigo-500 font-black text-2xl opacity-40">0{i+1}</div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-white leading-none">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-2xl font-light text-slate-300 pt-8 italic">
            이것이 <span className="text-white font-bold font-serif italic text-indigo-400">입시 DNA 프리즘</span>이 제안하는 데이터 기반의 입시 과학입니다.
          </p>
        </div>
      </Section>

      {/* 10. Epilogue & CTA */}
      <Section className="bg-gradient-to-t from-indigo-950/40 to-[#050505] text-center">
        <div className="space-y-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white">확신은 데이터에서 나옵니다</h2>
          <div className="space-y-6 text-base text-slate-300 max-w-2xl mx-auto leading-[1.8]">
            <p>
              부모님의 불안은 &apos;모름&apos;에서 시작됩니다. 아이의 기질을 알고, 그에 맞는 학습 환경과 태도를 잡아주는 순간 불안은 &apos;확신&apos;으로 바뀝니다. 
            </p>
            <p>
              입시는 결과도 중요하지만, <br/>
              그 과정에서의 올바른 자세가 아이의 평생 자산이 됩니다.
            </p>
            <p className="text-indigo-300 font-medium text-lg pt-4">
              단순한 진단을 넘어, <br/>
              아이의 공부력을 깨우는 실전 로드맵을 확보하십시오. <br/>
              [입시 DNA 프리즘] 정밀 분석 리포트가 <br/>
              그 해답이 되어 드립니다.
            </p>
          </div>
          
          <div className="pt-10">
            <Link 
              href="/ebook/prism-dna/consultation" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg hover:from-indigo-500 hover:to-purple-500 hover:scale-105 transition-all shadow-[0_0_50px_rgba(79,70,229,0.5)]"
            >
              [입시 DNA 프리즘] 상담 및 안내 신청하기
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <div className="mt-12 pt-8 border-t border-white/10 text-left space-y-4 text-[11px] text-slate-500 leading-relaxed">
              <div className="space-y-1">
                <p className="font-bold text-slate-400 text-sm mb-2">대치수프리마 입시&코칭센터</p>
                <p>대표 : 이기욱 대표컨설턴트</p>
                <p>연락처 : 010-2370-1077 (문자전송 전용)</p>
                <p>소재지 : 서울시 강남구 테헤란로 326 B1F</p>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 border-t border-white/5">
                <a href="https://band.us/@suprima" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Naver Band</a>
                <a href="https://blog.naver.com/gouniv_hifive" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Naver Blog</a>
                <a href="https://www.instagram.com/suprima_ipsicreator" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Instagram</a>
              </div>
              
              <p className="pt-4 text-[9px] opacity-50 uppercase tracking-widest text-center">
                &copy; 2026 DEACHI SUPRIMA IPSI & COACHING CENTER. ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </Section>

        {/* Progress Bar (Inside Container) */}
        <div className="sticky bottom-0 left-0 w-full h-1.5 bg-slate-900 z-50">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out" 
            id="scroll-progress"
            style={{ width: '0%' }}
          ></div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('scroll', () => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          const progressBar = document.getElementById('scroll-progress');
          if (progressBar) progressBar.style.width = scrolled + '%';
        });
      `}} />
    </main>
  );
}
