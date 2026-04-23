"use client";

import Image from "next/image";
import Link from "next/link";
import type { IlsDimension, ReportContent, ReportPageItem, ReportTable } from "@/lib/reportForm";

function IlsChart({ ils }: { ils: IlsDimension[] }) {
  const labels: Record<string, [string, string]> = {
    process: ["활동형 (ACT)", "숙고형 (REF)"],
    perception: ["감각형 (SEN)", "직관형 (INT)"],
    input: ["시각형 (VIS)", "언어형 (VRB)"],
    understanding: ["순차형 (SEQ)", "총체형 (GLO)"],
  };

  return (
    <div className="mt-1 rounded-2xl border border-[#e2e8f0] bg-white p-3 shadow-sm scale-[0.8] origin-top">
      <div className="mb-2 border-b border-[#f1f5f9] pb-1">
        <h4 className="text-sm font-black text-[#1e3a8a]">Index of Learning Styles (ILS) Profile</h4>
        <p className="text-[8px] font-bold text-[#64748b] mt-0.5">NCSU Solomon-Felder 모델 기반 인지 규격 분석</p>
      </div>

      <div className="space-y-4">
        {ils.map((dim) => {
          const [leftLabel, rightLabel] = labels[dim.key] || [dim.left, dim.right];
          const isRight = dim.favored.includes(dim.right.split("(")[0]);
          const score = dim.diff;

          return (
            <div key={dim.key} className="relative">
              <div className="flex justify-between items-end mb-2">
                <div className={`flex flex-col ${!isRight ? "scale-105" : "opacity-40"} transition-all`}>
                  <span className={`text-[11px] font-black ${!isRight ? "text-[#1e3a8a]" : "text-[#94a3b8]"}`}>{leftLabel}</span>
                  {!isRight && <span className="text-[9px] font-bold text-[#3b82f6]">{dim.level}</span>}
                </div>
                <div className={`flex flex-col items-end ${isRight ? "scale-105" : "opacity-40"} transition-all`}>
                  <span className={`text-[11px] font-black ${isRight ? "text-[#1e3a8a]" : "text-[#94a3b8]"}`}>{rightLabel}</span>
                  {isRight && <span className="text-[9px] font-bold text-[#3b82f6]">{dim.level}</span>}
                </div>
              </div>

              <div className="relative h-6 flex items-center">
                <div className="absolute left-0 right-0 h-[3px] bg-[#f1f5f9] rounded-full" />
                
                <div 
                  className="absolute h-[3px] bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] rounded-full transition-all duration-1000"
                  style={{
                    left: isRight ? "50%" : `${50 - (score / 11) * 50}%`,
                    width: `${(score / 11) * 50}%`,
                  }}
                />

                <div className="absolute left-0 right-0 flex justify-between px-0">
                  {[11, 9, 7, 5, 3, 1, 1, 3, 5, 7, 9, 11].map((val, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`h-2 w-[1px] ${idx === 5 || idx === 6 ? "h-3 bg-[#1e3a8a]" : "bg-[#cbd5e1]"}`} />
                      <span className="text-[8px] font-bold text-[#94a3b8] mt-0.5">{val}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-[#1e3a8a] border-2 border-white shadow-lg z-10 transition-all duration-1000"
                  style={{
                    left: isRight
                      ? `${50 + (score / 11) * 50 - 2.5}%`
                      : `${50 - (score / 11) * 50 - 2.5}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-3 bg-[#f8fafc] rounded-xl border border-[#e2e8f0]">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[10px] font-black text-[#1e3a8a]">균형 (1-3)</p>
            <p className="text-[8px] text-[#64748b] font-medium leading-tight">유연한 인지 전환</p>
          </div>
          <div className="border-x border-[#e2e8f0]">
            <p className="text-[10px] font-black text-[#1e3a8a]">중간 (5-7)</p>
            <p className="text-[8px] text-[#64748b] font-medium leading-tight">특정 방식 선호</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-[#1e3a8a]">강함 (9-11)</p>
            <p className="text-[8px] text-[#64748b] font-medium leading-tight">강력한 인지 편향</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManseDNAVisual({ scores }: { scores: { A: number; B: number; C: number } }) {
  return (
    <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#e2e8f0] pb-3 mb-4">
        <div className="h-5 w-1 bg-[#b45309] rounded-full" />
        <p className="text-lg font-bold text-[#1e293b]">선천적 DNA 기질 지도 (Energy Balance)</p>
      </div>
      <div className="flex justify-around items-center py-4">
        {[
          { label: "인성(A)", color: "#1e3a8a", value: scores.A, name: "학문 수용" },
          { label: "관성(B)", color: "#b45309", value: scores.B, name: "규범 준수" },
          { label: "비겁(C)", color: "#0f766e", value: scores.C, name: "주체 의식" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden">
              <div 
                className="absolute bottom-0 w-full transition-all duration-700" 
                style={{ height: `${item.value}%`, backgroundColor: item.color, opacity: 0.15 }} 
              />
              <span className="text-lg font-black" style={{ color: item.color }}>{item.value}%</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-[#1e293b]">{item.label}</p>
              <p className="text-[10px] text-[#64748b] whitespace-nowrap">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MathFlowVisual() {
  return (
    <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#f1f5f9] pb-3 mb-4">
        <div className="h-5 w-1 bg-[#1e3a8a] rounded-full" />
        <p className="text-lg font-bold text-[#1e293b]">수학 3단계 전략 구조도 (無결점 프로세스)</p>
      </div>
      <div className="flex items-center justify-between gap-2 mt-2">
        {["조건 추출", "도구 선택", "연산 수행"].map((step, idx) => (
          <div key={step} className="flex-1 flex flex-col items-center">
            <div className="w-full rounded-lg border-2 border-[#1e3a8a] bg-[#f0f4ff] p-3 text-center shadow-sm">
              <p className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-wider">Step 0{idx + 1}</p>
              <p className="mt-1 text-sm font-black text-[#1e293b]">{step}</p>
            </div>
            {idx < 2 && <div className="h-4 w-0.5 bg-[#1e3a8a] my-1 opacity-20" />}
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-[#64748b] italic">"선 구조화 후 풀이 전략으로 인지적 실수를 원천 차단합니다."</p>
    </div>
  );
}

function SubjectMapVisual() {
  return (
    <div className="mt-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm scale-95 origin-top">
      <div className="mb-4 border-b border-[#f1f5f9] pb-3">
        <h4 className="text-base font-black text-[#1e3a8a]">DNA-ILS 융합 탐구 맵 (Subject Exploration Map)</h4>
        <p className="text-[10px] font-bold text-[#64748b] mt-0.5">선천적 기질과 인지 규격에 최적화된 심화 탐구 테마</p>
      </div>
      <div className="relative h-[200px] w-full">
        <svg viewBox="0 0 800 240" className="w-full h-full">
          {/* Central Hub */}
          <circle cx="400" cy="120" r="50" fill="#1e3a8a" className="animate-pulse" />
          <text x="400" y="125" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">CORE DNA</text>
          
          {/* DNA Nodes */}
          <g>
            <circle cx="200" cy="60" r="40" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="200" y="65" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="800">인성(A): 깊이</text>
            <line x1="240" y1="75" x2="355" y2="105" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          </g>
          <g>
            <circle cx="200" cy="180" r="40" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
            <text x="200" y="185" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="800">관성(B): 논리</text>
            <line x1="240" y1="165" x2="355" y2="135" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
          </g>

          {/* ILS Links */}
          <g>
            <rect x="520" y="40" width="180" height="40" rx="10" fill="#1e293b" />
            <text x="610" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">시각(VIS) x 수학 모델링</text>
            <line x1="445" y1="105" x2="520" y2="70" stroke="#1e3a8a" strokeWidth="2" />
          </g>
          <g>
            <rect x="520" y="100" width="180" height="40" rx="10" fill="#1e293b" />
            <text x="610" y="125" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">순차(SEQ) x 알고리즘</text>
            <line x1="450" y1="120" x2="520" y2="120" stroke="#1e3a8a" strokeWidth="2" />
          </g>
          <g>
            <rect x="520" y="160" width="180" height="40" rx="10" fill="#1e293b" />
            <text x="610" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="800">숙고(REF) x 실패 분석</text>
            <line x1="445" y1="135" x2="520" y2="170" stroke="#1e3a8a" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ReadingStrategyVisual() {
  return (
    <div className="mt-8 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-8 shadow-sm">
      <div className="mb-6 border-b border-[#e2e8f0] pb-4">
        <h4 className="text-lg font-black text-[#1e3a8a]">지적 전이 프로세스 (Intellectual Transfer Flow)</h4>
        <p className="text-xs font-bold text-[#64748b] mt-1">독서를 탐구 결과물로 치환하는 VVIP 핵심 루틴</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        {[
          { step: "Deep Reading", desc: "텍스트 해체/분석", icon: "📖" },
          { step: "Schema Mapping", desc: "ILS 시각화 요약", icon: "🧠" },
          { step: "Project Output", desc: "주제 탐구 보고서", icon: "📝" },
        ].map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <div className="h-16 w-16 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center text-3xl shadow-sm mb-3">
              {item.icon}
            </div>
            <p className="text-[12px] font-black text-[#1e3a8a]">{item.step}</p>
            <p className="text-[10px] text-[#64748b] font-bold mt-1 text-center">{item.desc}</p>
            {idx < 2 && (
              <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 text-[#cbd5e1] text-xl">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScienceMapVisual() {
  return (
    <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#f1f5f9] pb-3 mb-4">
        <div className="h-5 w-1 bg-[#047857] rounded-full" />
        <p className="text-lg font-bold text-[#1e293b]">과학 인과관계 도식화 (System Mapping)</p>
      </div>
      <div className="relative py-2">
        <svg viewBox="0 0 800 160" className="w-full h-auto">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1e3a8a" />
            </marker>
          </defs>
          <rect x="20" y="40" width="200" height="80" rx="12" fill="#eff6ff" stroke="#1e3a8a" strokeWidth="2" />
          <text x="120" y="85" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="800">현상(Phenomenon)</text>
          
          <line x1="230" y1="80" x2="280" y2="80" stroke="#1e3a8a" strokeWidth="3" markerEnd="url(#arrowhead)" />
          
          <rect x="300" y="40" width="200" height="80" rx="12" fill="#fff" stroke="#1e3a8a" strokeWidth="2" strokeDasharray="4 4" />
          <text x="400" y="85" textAnchor="middle" fill="#1e293b" fontSize="16" fontWeight="800">원리(Mechanism)</text>
          
          <line x1="510" y1="80" x2="560" y2="80" stroke="#1e3a8a" strokeWidth="3" markerEnd="url(#arrowhead)" />
          
          <rect x="580" y="40" width="200" height="80" rx="12" fill="#1e3a8a" />
          <text x="680" y="85" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">모델(Model)</text>
        </svg>
      </div>
    </div>
  );
}

function RoadmapVisual() {
  const steps = [
    { label: "초등 고학년", content: "시각적 도식화 습관 & 요약 노트 정립", color: "#3b82f6", detail: "인지적 기초 체력 확보" },
    { label: "중등 시기", content: "안전한 실패 5회 축적 & 실패 자산화", color: "#1e3a8a", detail: "비판적 사고 & 문제 해결력" },
    { label: "고등 단계", content: "심화 탐구 결과물 산출 & 지적 성숙도 증명", color: "#1e293b", detail: "VVIP 입시 경쟁력 완성" },
  ];

  return (
    <div className="mt-8 rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
      <div className="mb-10 border-b border-[#f1f5f9] pb-4">
        <h4 className="text-lg font-black text-[#1e3a8a]">6년 통합 지적 성장 로드맵 (Integrated Roadmap)</h4>
        <p className="text-xs font-bold text-[#64748b] mt-1">초등부터 고입/대입까지의 지적 성숙도 완성 경로</p>
      </div>

      <div className="relative flex justify-between items-start">
        {/* Horizontal Progress Line */}
        <div className="absolute top-7 left-0 right-0 h-1 bg-[#f1f5f9] -z-0" />
        <div className="absolute top-7 left-0 w-2/3 h-1 bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] -z-0" />

        {steps.map((item, idx) => (
          <div key={item.label} className="relative z-10 flex flex-col items-center w-1/3 px-2">
            {/* Step Number Circle */}
            <div 
              className="h-14 w-14 rounded-full flex items-center justify-center text-white text-xl font-black shadow-xl mb-4 transition-transform hover:scale-110"
              style={{ backgroundColor: item.color, border: "4px solid white" }}
            >
              0{idx + 1}
            </div>
            
            {/* Labels */}
            <div className="text-center">
              <p className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-[13px] font-bold text-[#1e293b] leading-tight mb-2 break-keep min-h-[40px]">
                {item.content}
              </p>
              <div className="inline-block px-2 py-0.5 rounded bg-[#f8fafc] border border-[#e2e8f0] text-[9px] font-bold text-[#64748b]">
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlindedSection({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm group">
      {/* Blurred Content */}
      <div className="blur-[5px] select-none pointer-events-none opacity-40 transition-all group-hover:blur-[4px]">
        {children}
      </div>
      
      {/* Overlay Badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px]">
        <div className="bg-[#1e3a8a] text-white px-5 py-3 rounded-2xl shadow-2xl flex flex-col items-center gap-2 border-2 border-white animate-pulse">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Consultation Required</span>
          <span className="text-[14px] font-black">{label || "상세 전략 분석 잠금 해제"}</span>
          <div className="mt-1 h-[1px] w-full bg-white/20" />
          <p className="text-[9px] font-medium text-blue-100 italic text-center">1:1 전문가 대면 상담 시<br/>기질별 상세 정합성 근거를 공개합니다.</p>
        </div>
      </div>
    </div>
  );
}

function HighlightText({ text }: { text: string }) {
  if (!text) return null;
  const parts = text.split(/(\[.*?\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span key={i} className="text-[#1e3a8a] font-black underline decoration-2 underline-offset-4 decoration-[#3b82f6]/30 bg-[#3b82f6]/5 px-1 rounded mx-0.5">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

function ReportTableRender({ table }: { table: ReportTable }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-[#e2e8f0] shadow-sm">
      <table className="w-full border-collapse bg-white text-left text-[13px]">
        <thead>
          <tr className="bg-[#1e3a8a] text-white">
            {table.headers.map((h, i) => (
              <th key={i} className="border-r border-[#3b82f6]/30 px-6 py-4 font-black uppercase tracking-wider last:border-none">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1f5f9]">
          {table.rows.map((row, i) => (
            <tr key={i} className="hover:bg-[#f8fafc] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="border-r border-[#f1f5f9] px-6 py-4 font-bold text-[#334155] last:border-none leading-relaxed">
                  <HighlightText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompetitiveRankVisual({ scores }: { scores: { A: number; B: number } }) {
  const quantitativeScore = Math.min(100, 95 + (scores.A / 100) * 5).toFixed(1);
  const qualitativeGrade = scores.A + scores.B > 180 ? "S-GRADE" : scores.A + scores.B > 160 ? "A-GRADE" : "B-GRADE";
  const rankPercent = Math.min(100, 90 + (scores.A / 100) * 10).toFixed(1);
  
  return (
    <div className="mt-2 rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-lg scale-[0.85] origin-top">
      <div className="flex items-center gap-3 border-b border-[#f1f5f9] pb-2 mb-4">
        <div className="h-5 w-1 bg-[#1e3a8a] rounded-full" />
        <h4 className="text-[12px] font-black text-[#1e3a8a]">대입 목표 대학군 경쟁력 포지셔닝 (Competitive Index)</h4>
      </div>
      
      <div className="relative pt-8 pb-4">
        <div className="relative h-6 w-full bg-[#f1f5f9] rounded-full border border-[#e2e8f0]">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3b82f6] to-[#1e3a8a] rounded-full shadow-inner transition-all duration-1000" 
            style={{ width: `${rankPercent}%` }}
          />
          
          <div className="absolute inset-0 flex justify-between items-center px-6">
            <span className="text-[9px] font-black text-[#64748b] bg-white/80 px-2 py-0.5 rounded shadow-sm">평균군</span>
            <span className="text-[9px] font-black text-[#1e3a8a] bg-white/80 px-2 py-0.5 rounded shadow-sm">서울 주요대</span>
            <span className="text-[9px] font-black text-[#b45309] bg-white/80 px-2 py-0.5 rounded shadow-sm">SKY / KAIST</span>
          </div>
        </div>

        <div className="absolute top-0 -translate-x-1/2 transition-all duration-1000" style={{ left: `${rankPercent}%` }}>
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-[#facc15] to-[#b45309] text-white text-[9px] px-2 py-1 rounded-full font-black shadow-xl border-2 border-white mb-1 animate-bounce whitespace-nowrap">
              TOP {100 - parseFloat(rankPercent)}% 아로리형
            </div>
            <div className="h-8 w-1 bg-gradient-to-b from-[#b45309] to-transparent" />
            <div className="h-6 w-6 rounded-full bg-white border-2 border-[#b45309] shadow-2xl flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[#b45309]" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-[#f0f9ff] rounded-xl border border-[#bae6fd]">
          <p className="text-[9px] font-black text-[#0369a1] uppercase">교과 정량 지표 (DNA 기반)</p>
          <p className="text-lg font-black text-[#0c4a6e] mt-0.5">{quantitativeScore} / 100</p>
        </div>
        <div className="p-3 bg-[#fff7ed] rounded-xl border border-[#ffedd5]">
          <p className="text-[9px] font-black text-[#9a3412] uppercase">비교과 정성 역량</p>
          <p className="text-lg font-black text-[#7c2d12] mt-0.5">{qualitativeGrade}</p>
        </div>
      </div>
    </div>
  );
}

function PrismRadarChart({ scores, blinded = false }: { scores: { axis: string; student: number; target: number }[]; blinded?: boolean }) {
  const size = 400;
  const center = size / 2;
  const radius = 120;
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

  const targetPath = scores.map((s, i) => {
    const p = getPoint(s.target, i, radius);
    return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
  }).join(" ") + " Z";

  return (
    <div className="mt-8 relative w-full aspect-[16/9] bg-white rounded-[2rem] border border-[#e2e8f0] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col items-center justify-center p-12 group">
      {/* Prism Light Beam Effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-0 w-[200%] h-32 -translate-y-1/2 -translate-x-1/4 rotate-12 bg-gradient-to-r from-transparent via-[#3b82f6] via-[#8b5cf6] via-[#ec4899] via-[#facc15] to-transparent blur-3xl" />
      </div>

      <div className={`relative z-10 w-full h-full flex flex-col items-center transition-all duration-700 ${blinded ? 'blur-md opacity-40 select-none pointer-events-none' : ''}`}>
        {/* Title */}
        <h3 className="text-3xl font-black text-[#1e3a8a] mb-12 tracking-tight">Entrance Exam DNA: Prism 역량 분포도</h3>

        <div className="flex-1 flex items-center justify-center relative w-full">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl overflow-visible">
            <defs>
              <linearGradient id="prismFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Grid Circles */}
            {[20, 40, 60, 80, 100].map((r) => (
              <circle
                key={r}
                cx={center}
                cy={center}
                r={(r / 100) * radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Axes */}
            {scores.map((_, i) => {
              const p = getPoint(100, i, radius);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={p.x}
                  y2={p.y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              );
            })}

            {/* Target Path (Gray Dashed) */}
            <path d={targetPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

            {/* Student Path (Dynamic Prism) */}
            <path
              d={studentPath}
              fill="url(#prismFill)"
              fillOpacity="0.15"
              stroke="url(#prismFill)"
              strokeWidth="4"
              className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />

            {/* Labels */}
            {scores.map((s, i) => {
              const p = getPoint(135, i, radius);
              return (
                <g key={i}>
                  <text x={p.x} y={p.y - 5} textAnchor="middle" className="text-[12px] font-black fill-[#1e293b]">{s.axis}</text>
                  <text x={p.x} y={p.y + 10} textAnchor="middle" className="text-[9px] font-bold fill-[#64748b] opacity-70">
                    ({s.axis === "타고난 동기" ? "Innate Drive" : 
                      s.axis === "인지적 깊이" ? "Cognitive Depth" :
                      s.axis === "전략적 균형" ? "Strategic Balance" :
                      s.axis === "메타 실행력" ? "Meta-Execution" :
                      s.axis === "기록 차별성" ? "Record Uniqueness" : "Future Potential"})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Footer Branding & Legend */}
        <div className="w-full flex items-end justify-between mt-auto">
          <div className="flex flex-col gap-4">
            <div className="flex gap-8 items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-8 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] shadow-sm" />
                <span className="text-[11px] font-black text-[#1e3a8a]">OO 학생의 Prism 역량</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-0 w-8 border-t-2 border-dashed border-[#94a3b8]" />
                <span className="text-[11px] font-black text-[#64748b]">목표 대학 합격자 평균</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {blinded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/20 backdrop-blur-[2px]">
          <div className="bg-[#1e3a8a] text-white px-8 py-6 rounded-[2rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4 border-4 border-white animate-pulse">
            <div className="h-16 w-16 bg-white/10 rounded-full flex items-center justify-center mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-xl font-black tracking-tight">상담 신청 시 완벽해부 데이터 공개</p>
            <p className="text-[12px] font-bold text-blue-200 text-center leading-relaxed">
              본 분포도의 상세 정량 수치와 목표 대학 합격 전략은<br/>
              1:1 대면 상담 시 '완벽 해부 분석지'를 통해 제공됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function VisualBlock({ page, content }: { page: ReportPageItem; content: ReportContent }) {
  if (page.visual === "ilsChart") return <IlsChart ils={content.ilsDimensions} />;
  if (page.visual === "manseDNA") return <ManseDNAVisual scores={content.abcScores} />;
  if (page.visual === "roadmap") return <RoadmapVisual />;
  if (page.visual === "subjectMap") return <SubjectMapVisual />;
  if (page.visual === "readingFlow") return <ReadingStrategyVisual />;
  if (page.visual === "competitiveRank") return <CompetitiveRankVisual scores={content.abcScores} />;
  if (page.visual === "prismRadar" && content.prismScores) return <PrismRadarChart scores={content.prismScores} blinded={page.pageNo === 18} />;
  return null;
}

export function ReportFormView({ content }: { content: ReportContent }) {
  return (
    <main className="bg-[#f1f5f9] min-h-screen py-12 px-4 print:p-0 print:bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
        
        body {
          font-family: 'Noto Sans KR', sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .report-page {
          width: 210mm;
          height: 297mm;
          margin: 0 auto 60px auto;
          background: white;
          box-shadow: 0 40px 100px rgba(15, 23, 42, 0.08);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 5mm 20mm;
          box-sizing: border-box;
        }

        @media print {
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .report-toolbar {
            display: none !important;
          }
          .report-page {
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            page-break-after: always;
            break-after: page;
          }
          .report-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>

      <section className="report-toolbar mx-auto mb-12 max-w-[1200px] rounded-3xl bg-[#1e293b] p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-[#b45309] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white">Official Report</span>
              <h1 className="text-3xl font-black">{content.studentName} 학생 전략보고서</h1>
            </div>
            <p className="mt-2 text-[#94a3b8] font-medium">대치 수프리마 입시&코칭센터 | 입시 DNA 프리즘 종합분석</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-xl bg-[#b45309] px-6 py-3 font-bold text-white transition hover:scale-105 active:scale-95"
            >
              PDF 리포트 발행
            </button>
            <Link 
              href="/report-template"
              className="flex items-center gap-2 rounded-xl border border-[#475569] bg-[#334155] px-6 py-3 font-bold text-[#cbd5e1] transition hover:bg-[#475569]"
            >
              양식 설정
            </Link>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center">
        <article className="report-page relative border-t-[12px] border-[#1e3a8a]">
          <div className="flex h-full flex-col items-center justify-between py-12">
            <header className="w-full flex justify-between items-start">
              <Image src="/suprima_logo_2025_transparent.png" alt="Logo" width={220} height={76} className="object-contain" />
              <div className="text-right">
                <p className="text-[10px] font-black text-[#1e3a8a] tracking-tighter">SUPREMA CLINIC</p>
                <p className="text-[8px] text-[#94a3b8]">PREMIUM DIAGNOSIS SYSTEM</p>
              </div>
            </header>

            <div className="flex flex-col items-center text-center">
              <div className="mb-12 h-1.5 w-32 bg-[#b45309] rounded-full" />
              <p className="text-2xl font-black tracking-[0.4em] text-[#1e3a8a] uppercase mb-4 opacity-80">Admission DNA Prism</p>
              <h2 className="text-8xl font-black leading-tight text-[#1e293b] tracking-tighter">전략보고서</h2>
              <div className="mt-16 flex flex-col gap-6">
                <div className="rounded-3xl bg-[#f8fafc] border border-[#e2e8f0] px-20 py-10 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#1e3a8a] opacity-20" />
                  <p className="text-base font-bold text-[#64748b] mb-2 uppercase tracking-widest">Diagnostic Subject</p>
                  <p className="text-5xl font-black text-[#1e293b]">{content.studentName} <span className="text-3xl text-[#64748b] font-medium">학생</span></p>
                  <p className="mt-4 text-xl font-bold text-[#334155]">{content.schoolName} · {content.grade}</p>
                </div>
              </div>
            </div>

            <footer className="w-full">
              <div className="grid grid-cols-2 gap-8 border-t border-[#f1f5f9] pt-12 text-[10px] text-[#64748b]">
                <div>
                  <p className="font-black text-[#1e3a8a] mb-2">CENTER INFORMATION</p>
                  <p>센터명: {content.coverProfile.centerName}</p>
                  <p>주소: {content.coverProfile.address}</p>
                  <p>연락처: {content.coverProfile.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-[#1e3a8a] mb-2">REPORT STATUS</p>
                  <p>발행일: {content.issueDate}</p>
                  <p>문서번호: SPRM-2025-{(Math.random() * 10000).toFixed(0)}</p>
                  <p>유효기간: 발행일로부터 1년</p>
                </div>
              </div>
              <p className="mt-8 text-center text-[9px] text-[#cbd5e1] font-medium tracking-widest uppercase">
                Confidential & Protected by Suprema Clinic
              </p>
            </footer>
          </div>
        </article>

        {content.pages.map((p) => (
          <article key={p.pageNo} className="report-page border-t-[8px] border-[#1e3a8a]">
            <header className="flex items-center justify-between border-b border-[#f1f5f9] pb-6 mb-10">
              <Image src="/suprima_logo_2025_transparent.png" alt="Logo" width={140} height={48} className="object-contain" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-[1px] bg-[#e2e8f0]" />
                <div className="text-right">
                  <p className="text-[10px] font-black text-[#1e3a8a] uppercase tracking-widest">{p.subtitle}</p>
                  <p className="text-[9px] font-bold text-[#94a3b8]">PAGE {p.pageNo} OF {content.pages.length}</p>
                </div>
              </div>
            </header>

            <main className="flex-grow">
              <h2 className="text-[26px] font-black leading-tight text-[#1e293b] tracking-tight mb-4">
                <HighlightText text={p.title} />
              </h2>

              {p.punchline && (
                <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#3b82f6] p-6 shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 17.7614 19.7784 20 17.017 20H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56929 13 4.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 7.34315 2.36015 6 4.017 6H10.017C11.6739 6 13.017 7.34315 13.017 9V15C13.017 17.7614 10.7784 20 8.017 20H5.017V21Z" />
                    </svg>
                  </div>
                  <p className="text-[18px] font-black text-white leading-snug break-keep drop-shadow-md">
                    &quot;{p.punchline}&quot;
                  </p>
                </div>
              )}
              
              <div className="space-y-5">
                {p.paragraphs.map((paragraph, i) => {
                  const isBlinded = p.pageNo === 14 && i > 1;
                  return (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-0 top-2.5 h-2 w-2 rounded-full bg-[#3b82f6] shadow-sm" />
                      {isBlinded ? (
                        <BlindedSection label="기질-고교 유형 정합성 근거">
                          <p className="text-[16px] leading-[1.8] text-[#334155] font-medium text-justify break-keep">
                            {paragraph}
                          </p>
                        </BlindedSection>
                      ) : (
                        <p className="text-[15px] leading-[1.6] text-[#334155] font-medium text-justify break-keep">
                          &quot;<HighlightText text={paragraph} />&quot;
                        </p>
                      )}
                    </div>
                  );
                })}

                {p.bullets && (
                  <>
                    {p.pageNo === 14 ? (
                      <BlindedSection label="대학 전공별 세부 합격 전략">
                        <ul className="mt-6 space-y-3 rounded-2xl bg-[#f8fafc] p-6 border border-[#f1f5f9] shadow-inner">
                          {p.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-4">
                              <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1e3a8a]" />
                              <p className="text-[14px] leading-relaxed text-[#475569] font-bold">
                                {bullet}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </BlindedSection>
                    ) : (
                      <ul className="mt-6 space-y-3 rounded-2xl bg-[#f8fafc] p-6 border border-[#f1f5f9] shadow-inner">
                        {p.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1e3a8a]" />
                            <p className="text-[14px] leading-relaxed text-[#475569] font-bold">
                              <HighlightText text={bullet} />
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}

                {p.table && <ReportTableRender table={p.table} />}
              </div>

              <div className="mt-8">
                <VisualBlock page={p} content={content} />
              </div>

              {p.pageNo === 18 && (
                <div className="mt-12 border-t-4 border-[#1e3a8a] pt-12 flex items-start justify-between">
                  <div className="max-w-[60%]">
                    <h3 className="text-2xl font-black text-[#1e3a8a] mb-4">[ 대면 상담 예약하기 ]</h3>
                    <p className="text-sm font-bold text-[#64748b] leading-relaxed mb-6">
                      리포트 번호: <span className="text-[#1e3a8a]">PRISM-{content.studentName.charCodeAt(0)}-{content.issueDate.replace(/\./g, "")}</span>
                      <br />
                      위 고유 번호를 입력하시면 담당 전문가가 데이터를 사전 검토합니다.
                    </p>
                    <Link 
                      href={`/consultation/apply?reportId=PRISM-${content.studentName.charCodeAt(0)}-${content.issueDate.replace(/\./g, "")}`}
                      className="inline-flex items-center gap-3 px-6 py-4 bg-[#f8fafc] border-2 border-[#1e3a8a] rounded-2xl group cursor-pointer hover:bg-[#1e3a8a] hover:text-white transition-all no-underline"
                    >
                      <div className="h-10 w-10 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1e3a8a]">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-lg font-black tracking-tight text-[#1e3a8a] group-hover:text-white">실시간 상담 일정 확정하기</span>
                    </Link>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-32 bg-white border-2 border-[#e2e8f0] rounded-2xl flex flex-col items-center justify-center p-2 shadow-2xl relative">
                      <div className="absolute -top-3 -right-3 h-8 w-8 bg-[#ef4444] rounded-full flex items-center justify-center text-white text-[10px] font-black animate-pulse shadow-lg border-2 border-white">
                        LINK
                      </div>
                      <div className="h-24 w-24 bg-[#f1f5f9] rounded-lg border border-dashed border-[#cbd5e1] flex items-center justify-center overflow-hidden">
                        {/* Mock QR Content */}
                        <div className="w-full h-full p-2 bg-white flex flex-col items-center justify-center">
                          <div className="w-full h-full bg-[#1e3a8a]/10 rounded flex items-center justify-center">
                            <span className="text-[10px] font-bold text-[#1e3a8a] text-center">QR SCAN<br/>FOR APPLY</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] font-black text-[#1e3a8a] text-center leading-tight">
                      [전문가 상담 예약 및<br/>상세 분석 보기]
                    </p>
                  </div>
                </div>
              )}
            </main>

            <footer className="mt-auto pt-8 border-t border-[#f1f5f9] flex justify-between items-center text-[9px] font-bold text-[#94a3b8] uppercase tracking-widest">
              <span>{content.studentName} 학생 종합분석리포트</span>
              <span>SUPREMA CLINIC | Premium Admission DNA Prism</span>
            </footer>
          </article>
        ))}
      </div>
    </main>
  );
}
