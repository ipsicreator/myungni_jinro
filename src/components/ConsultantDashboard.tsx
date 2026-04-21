'use client';

import React, { useMemo, useState } from 'react';

import {
  ABC_QUESTIONS,
  ENGINEERING_QUESTIONS,
  LEARNING_QUESTIONS,
  type BinaryQuestion,
  type IntakeForm,
  type LikertQuestion,
  type MappedReport,
  type SurveyAnswers,
} from '@/lib/reportMapping';

type StageKey = 'info' | 'abc' | 'learning' | 'engineering' | 'report';
type SyncState = 'idle' | 'syncing' | 'ok' | 'fail';

type ReportSyncResponse = {
  ok: boolean;
  report?: MappedReport;
};

const STAGES: { key: StageKey; label: string }[] = [
  { key: 'info', label: '기본 정보 등록' },
  { key: 'abc', label: 'ABC 기질 검사' },
  { key: 'learning', label: '학습 성향 진단' },
  { key: 'engineering', label: '공학 적합도 검사' },
  { key: 'report', label: '진단 결과 리포트' },
];

const PAGE_SIZE: Record<'abc' | 'learning' | 'engineering', number> = {
  abc: 4,
  learning: 4,
  engineering: 2,
};

const INITIAL_INTAKE: IntakeForm = {
  name: '',
  school: '',
  grade: '',
  studentPhone: '',
  parentPhone: '',
  birthDate: '',
  birthTime: '',
  calendarType: 'solar',
  gender: 'male',
};

const INITIAL_ANSWERS: SurveyAnswers = {
  abc: {},
  learning: {},
  engineering: {},
};

function ScoreSelector({
  value,
  onSelect,
  testIdPrefix,
}: {
  value?: number;
  onSelect: (value: number) => void;
  testIdPrefix: string;
}) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          data-testid={`${testIdPrefix}-${score}`}
          onClick={() => onSelect(score)}
          className={`h-9 rounded-lg border text-sm font-bold transition ${
            value === score
              ? 'border-[#1d336c] bg-[#1d336c] text-white'
              : 'border-slate-300 bg-white text-[#274279] hover:border-[#1d336c]/40'
          }`}
        >
          {score}
        </button>
      ))}
    </div>
  );
}

function EngineeringSelector({
  question,
  value,
  onSelect,
}: {
  question: BinaryQuestion;
  value?: 'a' | 'b';
  onSelect: (value: 'a' | 'b') => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => onSelect('a')}
        className={`rounded-lg border p-3 text-left text-sm leading-relaxed transition ${
          value === 'a'
            ? 'border-[#1d336c] bg-[#1d336c] text-white'
            : 'border-slate-300 bg-white text-[#274279] hover:border-[#1d336c]/40'
        }`}
      >
        <span className="mb-1 block font-black">A</span>
        {question.a}
      </button>
      <button
        type="button"
        onClick={() => onSelect('b')}
        className={`rounded-lg border p-3 text-left text-sm leading-relaxed transition ${
          value === 'b'
            ? 'border-[#1d336c] bg-[#1d336c] text-white'
            : 'border-slate-300 bg-white text-[#274279] hover:border-[#1d336c]/40'
        }`}
      >
        <span className="mb-1 block font-black">B</span>
        {question.b}
      </button>
    </div>
  );
}

export default function IpsiiDnaPrismApp() {
  const [started, setStarted] = useState(false);
  const [stage, setStage] = useState<StageKey>('info');
  const [page, setPage] = useState(0);
  const [intake, setIntake] = useState<IntakeForm>(INITIAL_INTAKE);
  const [answers, setAnswers] = useState<SurveyAnswers>(INITIAL_ANSWERS);
  const [report, setReport] = useState<MappedReport | null>(null);
  const [syncState, setSyncState] = useState<SyncState>('idle');
  const [showDelayNotice, setShowDelayNotice] = useState(false);

  const stageIndex = STAGES.findIndex((s) => s.key === stage);

  const stageCounts = useMemo(
    () => ({
      abc: {
        answered: Object.keys(answers.abc).length,
        total: ABC_QUESTIONS.length,
      },
      learning: {
        answered: Object.keys(answers.learning).length,
        total: LEARNING_QUESTIONS.length,
      },
      engineering: {
        answered: Object.keys(answers.engineering).length,
        total: ENGINEERING_QUESTIONS.length,
      },
    }),
    [answers]
  );

  const getLikertPageQuestions = (questions: LikertQuestion[], key: 'abc' | 'learning') => {
    const size = PAGE_SIZE[key];
    const start = page * size;
    const end = Math.min(questions.length, start + size);
    return {
      start,
      end,
      items: questions.slice(start, end),
      totalPages: Math.ceil(questions.length / size),
    };
  };

  const getEngineeringPageQuestions = () => {
    const size = PAGE_SIZE.engineering;
    const start = page * size;
    const end = Math.min(ENGINEERING_QUESTIONS.length, start + size);
    return {
      start,
      end,
      items: ENGINEERING_QUESTIONS.slice(start, end),
      totalPages: Math.ceil(ENGINEERING_QUESTIONS.length / size),
    };
  };

  const requestReportViaApi = async (
    payloadIntake: IntakeForm,
    payloadAnswers: SurveyAnswers,
    source: string
  ): Promise<MappedReport | null> => {
    const syncUrl = process.env.NEXT_PUBLIC_REPORT_SYNC_URL || '/api/report-sync';
    let delayNoticeTimer: ReturnType<typeof setTimeout> | null = null;
    try {
      setSyncState('syncing');
      setShowDelayNotice(false);
      delayNoticeTimer = setTimeout(() => {
        setShowDelayNotice(true);
      }, 2500);
      const res = await fetch(syncUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          createdAt: new Date().toISOString(),
          intake: payloadIntake,
          answers: payloadAnswers,
        }),
      });
      if (!res.ok) throw new Error(`sync failed: ${res.status}`);
      const data = (await res.json()) as ReportSyncResponse;
      if (!data.ok || !data.report) throw new Error('sync response missing report');
      setSyncState('ok');
      return data.report;
    } catch (error) {
      console.error(error);
      setSyncState('fail');
      return null;
    } finally {
      if (delayNoticeTimer) {
        clearTimeout(delayNoticeTimer);
      }
      setShowDelayNotice(false);
    }
  };

  const sampleFill = async () => {
    const sampleIntake: IntakeForm = {
      name: '김수프',
      school: '대치중학교',
      grade: '중3',
      studentPhone: '010-1111-2222',
      parentPhone: '010-3333-4444',
      birthDate: '2010.12.30',
      birthTime: '09:30',
      calendarType: 'solar',
      gender: 'male',
    };

    const sampleAnswers: SurveyAnswers = {
      abc: {},
      learning: {},
      engineering: {},
    };

    ABC_QUESTIONS.forEach((q, i) => {
      sampleAnswers.abc[q.id] = i % 2 === 0 ? 4 : 5;
    });
    LEARNING_QUESTIONS.forEach((q, i) => {
      sampleAnswers.learning[q.id] = i % 3 === 0 ? 5 : 4;
    });
    ENGINEERING_QUESTIONS.forEach((q, i) => {
      sampleAnswers.engineering[q.id] = i % 2 === 0 ? 'b' : 'a';
    });

    setStarted(true);
    setIntake(sampleIntake);
    setAnswers(sampleAnswers);
    const apiReport = await requestReportViaApi(sampleIntake, sampleAnswers, 'ipsi-dna-prism-sample');
    if (!apiReport) {
      setStage('info');
      setPage(0);
      alert('API 응답이 없어 샘플 리포트를 열 수 없습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    setReport(apiReport);
    setStage('report');
    setPage(0);
  };

  const validateInfo = () => {
    const required: [string, string][] = [
      ['이름', intake.name],
      ['학교명', intake.school],
      ['학년', intake.grade],
      ['학생 연락처', intake.studentPhone],
      ['학부모 연락처', intake.parentPhone],
      ['생년월일', intake.birthDate],
      ['출생시각', intake.birthTime],
    ];
    const missing = required.filter(([, value]) => !value.trim()).map(([name]) => name);
    if (missing.length > 0) {
      alert(`다음 항목을 입력해 주세요: ${missing.join(', ')}`);
      return false;
    }
    return true;
  };

  const validateCurrentPage = () => {
    if (stage === 'abc') {
      const { items } = getLikertPageQuestions(ABC_QUESTIONS, 'abc');
      if (items.some((q) => answers.abc[q.id] == null)) {
        alert('현재 페이지의 ABC 문항을 모두 응답해 주세요.');
        return false;
      }
    }

    if (stage === 'learning') {
      const { items } = getLikertPageQuestions(LEARNING_QUESTIONS, 'learning');
      if (items.some((q) => answers.learning[q.id] == null)) {
        alert('현재 페이지의 학습 성향 문항을 모두 응답해 주세요.');
        return false;
      }
    }

    if (stage === 'engineering') {
      const { items } = getEngineeringPageQuestions();
      if (items.some((q) => answers.engineering[q.id] == null)) {
        alert('현재 페이지의 공학 적합도 문항을 모두 응답해 주세요.');
        return false;
      }
    }
    return true;
  };

  const goNext = async () => {
    if (syncState === 'syncing') return;
    if (stage === 'info') {
      if (!validateInfo()) return;
      setStage('abc');
      setPage(0);
      return;
    }
    if (stage === 'report') return;
    if (!validateCurrentPage()) return;

    if (stage === 'abc') {
      const { totalPages } = getLikertPageQuestions(ABC_QUESTIONS, 'abc');
      if (page < totalPages - 1) {
        setPage((p) => p + 1);
      } else {
        setStage('learning');
        setPage(0);
      }
      return;
    }

    if (stage === 'learning') {
      const { totalPages } = getLikertPageQuestions(LEARNING_QUESTIONS, 'learning');
      if (page < totalPages - 1) {
        setPage((p) => p + 1);
      } else {
        setStage('engineering');
        setPage(0);
      }
      return;
    }

    if (stage === 'engineering') {
      const { totalPages } = getEngineeringPageQuestions();
      if (page < totalPages - 1) {
        setPage((p) => p + 1);
      } else {
        const apiReport = await requestReportViaApi(intake, answers, 'ipsi-dna-prism-next');
        if (!apiReport) {
          alert('API 응답이 없어 리포트를 생성할 수 없습니다. 연결 상태를 확인해 주세요.');
          return;
        }
        setReport(apiReport);
        setStage('report');
        setPage(0);
      }
    }
  };

  const goPrev = () => {
    if (stage === 'info') {
      setStarted(false);
      return;
    }
    if (stage === 'report') {
      setStage('engineering');
      setPage(Math.ceil(ENGINEERING_QUESTIONS.length / PAGE_SIZE.engineering) - 1);
      return;
    }
    if (stage === 'abc') {
      if (page > 0) setPage((p) => p - 1);
      else setStage('info');
      return;
    }
    if (stage === 'learning') {
      if (page > 0) setPage((p) => p - 1);
      else {
        setStage('abc');
        setPage(Math.ceil(ABC_QUESTIONS.length / PAGE_SIZE.abc) - 1);
      }
      return;
    }
    if (stage === 'engineering') {
      if (page > 0) setPage((p) => p - 1);
      else {
        setStage('learning');
        setPage(Math.ceil(LEARNING_QUESTIONS.length / PAGE_SIZE.learning) - 1);
      }
    }
  };

  const resetAll = () => {
    setStarted(false);
    setStage('info');
    setPage(0);
    setIntake(INITIAL_INTAKE);
    setAnswers(INITIAL_ANSWERS);
    setReport(null);
    setSyncState('idle');
  };

  const nextLabel = useMemo(() => {
    if (stage === 'info') return '진단 시작하기';
    if (stage === 'abc') {
      const { totalPages } = getLikertPageQuestions(ABC_QUESTIONS, 'abc');
      return page < totalPages - 1 ? '다음' : '다음 단계';
    }
    if (stage === 'learning') {
      const { totalPages } = getLikertPageQuestions(LEARNING_QUESTIONS, 'learning');
      return page < totalPages - 1 ? '다음' : '다음 단계';
    }
    if (stage === 'engineering') {
      const { totalPages } = getEngineeringPageQuestions();
      return page < totalPages - 1 ? '다음' : '리포트 보기';
    }
    return '완료';
  }, [stage, page]);

  const syncLabel = useMemo(() => {
    if (syncState === 'syncing') return '시스템 연결 상태: 전송 중';
    if (syncState === 'ok') return '시스템 연결 상태: 연동 완료';
    if (syncState === 'fail') return '시스템 연결 상태: 연동 실패 (리포트 생성 중단)';
    return '시스템 연결 상태: 대기 중';
  }, [syncState]);

  const delayNotice = useMemo(() => {
    if (syncState === 'syncing' && showDelayNotice) {
      return '처리가 지연되고 있습니다. 입력값을 보존한 채 계속 시도 중입니다.';
    }
    return '';
  }, [showDelayNotice, syncState]);

  const inputClass =
    'h-[52px] rounded-lg border border-[#d7dde8] bg-[#f6f7fa] px-4 text-[16px] tracking-[-0.01em] text-[#1a2a55] placeholder:text-[#a8b1c3] focus:border-[#1d326a] focus:outline-none';

  const abcPage = stage === 'abc' ? getLikertPageQuestions(ABC_QUESTIONS, 'abc') : null;
  const learningPage =
    stage === 'learning' ? getLikertPageQuestions(LEARNING_QUESTIONS, 'learning') : null;
  const engineeringPage = stage === 'engineering' ? getEngineeringPageQuestions() : null;

  if (!started) {
    return (
      <div className="min-h-screen overflow-x-auto bg-[linear-gradient(135deg,#eef2f8_0%,#e7edf7_45%,#dce6f4_100%)] p-4">
        <div className="mx-auto flex min-h-[calc(100vh-32px)] w-[1100px] min-w-[1100px] flex-col items-center">
          <div className="grid h-[138px] w-full max-w-[490px] place-items-center bg-[linear-gradient(120deg,#112253_0%,#1c326f_46%,#13295f_100%)] text-[clamp(2rem,4vw,3rem)] font-black tracking-[-0.04em] text-white shadow-[0_16px_34px_rgba(10,20,56,0.2)]">
            입시 DNA 프리즘
          </div>
          <section className="mt-12 w-full text-center">
            <h1 className="text-[clamp(2rem,4vw,3.7rem)] font-medium leading-[1.34] tracking-[-0.04em] text-[#122e5a]">
              아이의 <span className="font-black">기질</span>을 읽으면,
              <br />
              <span className="font-black">진로</span>의 길이 선명해집니다.
            </h1>
            <p className="mx-auto mt-6 max-w-[930px] text-[clamp(1rem,1.45vw,1.12rem)] leading-[1.8] tracking-[-0.02em] text-[#41507a]">
              초등·중등부터 고교·대입까지, 우리 아이에게 맞는 진로 방향을 찾고 계신가요?
              <br />
              정확한 분석과 체계적인 진단으로 해법을 제시합니다.
            </p>
          </section>
          <section className="mt-10 w-full rounded-[20px] border border-[#d6deec] bg-[linear-gradient(150deg,rgba(255,255,255,0.84),rgba(242,247,255,0.72))] p-6 shadow-[0_20px_44px_rgba(16,31,70,0.16)]">
            <h2 className="text-center text-[clamp(1.5rem,2vw,2rem)] font-black tracking-[-0.02em] text-[#122e5a]">진단 결과</h2>
            <div className="mt-5 flex items-center justify-between gap-6 px-1">
              {[
                { icon: '🔍', label: '기질 분석' },
                { icon: '📘', label: '학습 성향' },
                { icon: '🎓', label: '공학 적합도' },
                { icon: '📄', label: '전략 리포트' },
              ].map((item, idx) => (
                <React.Fragment key={item.label}>
                  <div className="grid min-w-[170px] shrink-0 justify-items-center gap-2">
                    <span className="grid h-[64px] w-[64px] place-items-center rounded-[14px] border border-[#d5deee] bg-white text-[30px] shadow-[0_8px_18px_rgba(15,33,78,0.08)]">
                      {item.icon}
                    </span>
                    <strong className="text-[30px] font-black tracking-[-0.03em] text-[#17335f]">{item.label}</strong>
                  </div>
                  {idx < 3 ? <span className="shrink-0 text-[42px] leading-none text-[#b9832e]">→</span> : null}
                </React.Fragment>
              ))}
            </div>
            <div className="mx-[6%] mt-5 h-[36px]">
              <div className="relative top-3 h-[2px] bg-[linear-gradient(90deg,#e0e7f4,#cfd9eb,#e0e7f4)]" />
              <div className="relative top-[2px] grid grid-cols-4">
                {[1, 2, 3, 4].map((node) => (
                  <span
                    key={node}
                    className="mx-auto h-3 w-3 rounded-full bg-[#b8c4dd] shadow-[0_0_0_3px_rgba(184,196,221,0.2)]"
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center text-[clamp(0.95rem,1.2vw,1.08rem)] font-semibold text-[#364d79]">
              <span>기질 분석</span>
              <span>학습 성향</span>
              <span>공학 적합도</span>
              <span>진로 리포트</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                data-testid="start-flow-btn"
                onClick={() => {
                  setStarted(true);
                  setStage('info');
                }}
                className="h-[74px] rounded-xl bg-[linear-gradient(125deg,#edb94d,#d8972a)] text-[clamp(1.35rem,2vw,2rem)] font-black text-white shadow-[0_14px_24px_rgba(181,122,26,0.24)]"
              >
                진단 시작하기
              </button>
              <button
                type="button"
                data-testid="sample-report-btn"
                onClick={() => void sampleFill()}
                className="h-[74px] rounded-xl bg-[linear-gradient(125deg,#1e346f,#152a67)] text-[clamp(1.35rem,2vw,2rem)] font-black text-white shadow-[0_14px_24px_rgba(24,47,97,0.25)]"
              >
                샘플 리포트 보기
              </button>
            </div>
          </section>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-[clamp(1rem,1.4vw,1.2rem)] font-semibold text-[#1f366a]">
            <span>👤 전문가 해석</span>
            <span className="h-6 w-px bg-[#cfd8e8]" />
            <span>📰 데이터 기반</span>
            <span className="h-6 w-px bg-[#cfd8e8]" />
            <span>🎯 맞춤 처방</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaecf1] p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1540px] grid-cols-1 overflow-hidden rounded-[30px] border border-[#d9dee8] bg-[#f2f3f6] shadow-[0_26px_56px_rgba(31,43,72,0.18)] sm:grid-cols-[36%_40%_24%]">
        <aside className="border-r border-[#d8dde7] bg-[#f5f6f8]">
          <header className="border-b border-[#d8dde7] px-7 py-6">
            <p className="text-[48px] font-black leading-none tracking-[-0.06em] text-[#1a2648]">
              <span className="text-[#b37a25]">대치</span>수프리마
            </p>
            <p className="mt-1 text-sm font-semibold text-[#243459]">SuPrima 입시&코칭 센터</p>
          </header>
          <section className="border-b border-[#d8dde7] px-7 py-6">
            <h2 className="text-[34px] font-black tracking-[-0.03em] text-[#1b2a54]">{STAGES[stageIndex].label}</h2>
            <p className="mt-2 text-[17px] leading-relaxed text-[#2a3a62]">
              {stage === 'info' && '기본 정보를 정확히 입력하면 리포트 품질이 높아집니다.'}
              {stage === 'abc' && '기질 분석을 통해 학습 반응과 의사결정 패턴을 확인합니다.'}
              {stage === 'learning' && '학습 태도와 동기 패턴을 진단해 실행 전략을 설계합니다.'}
              {stage === 'engineering' && '인지 처리 경로를 분석해 전공 적합도를 점검합니다.'}
              {stage === 'report' && '표본 기준 맵핑 리포트를 검토하고 출력/연동을 진행합니다.'}
            </p>
          </section>
          <section className="h-full bg-[linear-gradient(135deg,#10225b_0%,#1a2f66_70%,#11255a_100%)] px-7 py-6 text-white">
            <p className="text-[30px] font-black tracking-[-0.03em]">검사항목 목록</p>
            <p className="mt-2 text-sm text-slate-200">{syncLabel}</p>
            {delayNotice && (
              <p className="mt-2 rounded-md border border-amber-200/30 bg-amber-100/10 px-2 py-1 text-xs text-amber-100">
                {delayNotice}
              </p>
            )}
            <ol className="mt-4 space-y-2">
              {STAGES.map((item, idx) => {
                const active = stage === item.key;
                const done = stageIndex > idx;
                const progress =
                  item.key === 'abc'
                    ? `${stageCounts.abc.answered}/${stageCounts.abc.total}`
                    : item.key === 'learning'
                      ? `${stageCounts.learning.answered}/${stageCounts.learning.total}`
                      : item.key === 'engineering'
                        ? `${stageCounts.engineering.answered}/${stageCounts.engineering.total}`
                        : '';
                return (
                  <li
                    key={item.key}
                    className={`rounded-lg border px-3 py-2 text-sm ${
                      active
                        ? 'border-white/45 bg-white/10 font-bold'
                        : done
                          ? 'border-white/20 bg-white/5'
                          : 'border-white/12 bg-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{idx + 1}. {item.label}</span>
                      {progress && <span className="text-xs">({progress})</span>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </aside>

        <main className="flex flex-col border-r border-[#d8dde7] bg-[#f7f8fa]">
          <header className="flex h-[124px] items-center justify-center border-b border-[#223365] bg-[linear-gradient(120deg,#11204f_0%,#1e316b_52%,#152a60_100%)]">
            <h1 className="text-[52px] font-black tracking-[-0.05em] text-white">입시 DNA 프리즘</h1>
          </header>
          <div className="flex-1 overflow-auto px-5 py-5">
            {stage === 'info' && (
              <div className="grid gap-3">
                <label className="grid gap-1"><span className="font-black text-[#1d2d58]">이름</span><input className={inputClass} value={intake.name} onChange={(e) => setIntake((p) => ({ ...p, name: e.target.value }))} data-testid="input-name" /></label>
                <label className="grid gap-1"><span className="font-black text-[#1d2d58]">학교명</span><input className={inputClass} value={intake.school} onChange={(e) => setIntake((p) => ({ ...p, school: e.target.value }))} data-testid="input-school" /></label>
                <label className="grid gap-1"><span className="font-black text-[#1d2d58]">학년</span><input className={inputClass} value={intake.grade} onChange={(e) => setIntake((p) => ({ ...p, grade: e.target.value }))} data-testid="input-grade" /></label>
                <label className="grid gap-1"><span className="font-black text-[#1d2d58]">학생 연락처</span><input className={inputClass} value={intake.studentPhone} onChange={(e) => setIntake((p) => ({ ...p, studentPhone: e.target.value }))} data-testid="input-student-phone" /></label>
                <label className="grid gap-1"><span className="font-black text-[#1d2d58]">학부모 연락처</span><input className={inputClass} value={intake.parentPhone} onChange={(e) => setIntake((p) => ({ ...p, parentPhone: e.target.value }))} data-testid="input-parent-phone" /></label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="grid gap-1"><span className="font-black text-[#1d2d58]">생년월일</span><input className={inputClass} value={intake.birthDate} onChange={(e) => setIntake((p) => ({ ...p, birthDate: e.target.value }))} data-testid="input-birth-date" /></label>
                  <label className="grid gap-1"><span className="font-black text-[#1d2d58]">출생시각</span><input className={inputClass} value={intake.birthTime} onChange={(e) => setIntake((p) => ({ ...p, birthTime: e.target.value }))} data-testid="input-birth-time" /></label>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div><p className="mb-2 font-black text-[#1d2d58]">양/음</p><div className="inline-flex overflow-hidden rounded-lg border border-[#c7d1e2] bg-[#f0f3f8]">{([{ code: 'solar', label: '양력' }, { code: 'lunar', label: '음력' }] as const).map((item) => <button key={item.code} type="button" onClick={() => setIntake((p) => ({ ...p, calendarType: item.code }))} className={`h-11 px-5 text-sm font-bold ${intake.calendarType === item.code ? 'bg-[#1f336c] text-white' : 'text-[#24345b]'}`}>{item.label}</button>)}</div></div>
                  <div><p className="mb-2 font-black text-[#1d2d58]">남/여</p><div className="inline-flex overflow-hidden rounded-lg border border-[#c7d1e2] bg-[#f0f3f8]">{([{ code: 'male', label: '남' }, { code: 'female', label: '여' }] as const).map((item) => <button key={item.code} type="button" onClick={() => setIntake((p) => ({ ...p, gender: item.code }))} className={`h-11 px-8 text-sm font-bold ${intake.gender === item.code ? 'bg-[#1f336c] text-white' : 'text-[#24345b]'}`}>{item.label}</button>)}</div></div>
                </div>
              </div>
            )}

            {stage === 'abc' && abcPage && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#12355f]/15 bg-[#f7f9ff] p-4">
                  <p className="text-lg font-black text-[#12355f]">ABC 기질 검사</p>
                  <p className="mt-1 text-sm text-slate-600">{abcPage.start + 1}~{abcPage.end} / 총 {ABC_QUESTIONS.length}문항 · {page + 1}/{abcPage.totalPages}페이지</p>
                </div>
                {abcPage.items.map((q, idx) => (
                  <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold text-slate-500">{abcPage.start + idx + 1}. 축 {q.axis}</p>
                    <p className="mt-1 text-base font-semibold text-[#1b2d59]">{q.text}</p>
                    <div className="mt-3"><ScoreSelector value={answers.abc[q.id]} onSelect={(value) => setAnswers((p) => ({ ...p, abc: { ...p.abc, [q.id]: value } }))} testIdPrefix={`abc-${q.id}`} /></div>
                  </div>
                ))}
              </div>
            )}

            {stage === 'learning' && learningPage && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#12355f]/15 bg-[#f7f9ff] p-4">
                  <p className="text-lg font-black text-[#12355f]">학습 성향 진단</p>
                  <p className="mt-1 text-sm text-slate-600">{learningPage.start + 1}~{learningPage.end} / 총 {LEARNING_QUESTIONS.length}문항 · {page + 1}/{learningPage.totalPages}페이지</p>
                </div>
                {learningPage.items.map((q, idx) => (
                  <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold text-slate-500">{learningPage.start + idx + 1}. {q.axis}</p>
                    <p className="mt-1 text-base font-semibold text-[#1b2d59]">{q.text}</p>
                    <div className="mt-3"><ScoreSelector value={answers.learning[q.id]} onSelect={(value) => setAnswers((p) => ({ ...p, learning: { ...p.learning, [q.id]: value } }))} testIdPrefix={`learning-${q.id}`} /></div>
                  </div>
                ))}
              </div>
            )}

            {stage === 'engineering' && engineeringPage && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#12355f]/15 bg-[#f7f9ff] p-4">
                  <p className="text-lg font-black text-[#12355f]">공학 적합도 검사</p>
                  <p className="mt-1 text-sm text-slate-600">{engineeringPage.start + 1}~{engineeringPage.end} / 총 {ENGINEERING_QUESTIONS.length}문항 · {page + 1}/{engineeringPage.totalPages}페이지</p>
                </div>
                {engineeringPage.items.map((q, idx) => (
                  <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold text-slate-500">{engineeringPage.start + idx + 1}. {q.dim}</p>
                    <p className="mt-1 text-base font-semibold text-[#1b2d59]">{q.text}</p>
                    <div className="mt-3"><EngineeringSelector question={q} value={answers.engineering[q.id]} onSelect={(value) => setAnswers((p) => ({ ...p, engineering: { ...p.engineering, [q.id]: value } }))} /></div>
                  </div>
                ))}
              </div>
            )}

            {stage === 'report' && report && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#12355f]/20 bg-[#f7f9ff] p-5">
                  <p className="text-2xl font-black text-[#12355f]">{report.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{report.subtitle}</p>
                  <p className="mt-2 text-lg font-bold text-slate-800">{report.headline}</p>
                </div>
                {report.sections.map((section) => (
                  <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="text-lg font-black text-[#12355f]">{section.title}</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                      {section.body.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  </article>
                ))}
                <article className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="text-lg font-black text-[#12355f]">실행 권고안</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
                    {report.recommendations.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </article>
              </div>
            )}
          </div>
          <footer className="border-t border-[#d8dde7] bg-white px-5 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={goPrev} data-testid="prev-btn" className="h-12 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700">이전</button>
              {stage !== 'report' ? (
                <button type="button" onClick={goNext} data-testid="next-btn" disabled={syncState === 'syncing'} className="h-12 rounded-xl bg-[linear-gradient(120deg,#e0b15c,#c98b2c)] px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(186,128,38,0.28)] disabled:cursor-not-allowed disabled:opacity-70">{nextLabel}</button>
              ) : (
                <>
                  <button type="button" onClick={() => window.print()} data-testid="print-report-btn" className="h-12 rounded-xl bg-[#12355f] px-6 text-sm font-bold text-white">리포트 출력하기</button>
                  <button type="button" onClick={resetAll} data-testid="reset-btn" className="h-12 rounded-xl border border-[#12355f]/30 bg-[#eef4ff] px-6 text-sm font-bold text-[#12355f]">처음으로</button>
                </>
              )}
            </div>
            {delayNotice && (
              <p className="mt-2 text-xs text-[#8a5a12]">{delayNotice}</p>
            )}
          </footer>
        </main>

        <aside className="flex flex-col bg-[#f4f5f8]">
          <div className="border-b border-[#d8dde7] px-6 py-6">
            <p className="text-[38px] font-medium tracking-[-0.02em] text-[#1e2c4d]">NAVIGATION</p>
            <div className="mt-3 inline-flex items-center gap-3 text-[27px] font-black tracking-[-0.03em] text-[#1d2f5e]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1b2f66] text-sm text-white">{stageIndex + 1}</span>
              {STAGES[stageIndex].label}
            </div>
          </div>
          <div className="flex-1">
            {STAGES.map((item, idx) => {
              const active = stage === item.key;
              const done = stageIndex > idx;
              return (
                <div key={item.key} className={`border-b border-[#dee3ec] px-6 py-6 ${active ? 'bg-white' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${active ? 'bg-[#12355f] text-white' : done ? 'bg-[#12355f]/12 text-[#12355f]' : 'bg-slate-200 text-slate-500'}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <p className={`text-[28px] font-semibold tracking-[-0.03em] ${active ? 'text-[#12355f]' : 'text-[#a8b2c5]'}`}>{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
