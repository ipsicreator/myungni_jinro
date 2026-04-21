import { NextRequest, NextResponse } from 'next/server';

import { buildMappedReport, type IntakeForm, type SurveyAnswers } from '@/lib/reportMapping';
import { listRecentReports, saveReportRecord } from '@/lib/reportStore';

export const runtime = 'nodejs';

type SyncBody = {
  source?: string;
  createdAt?: string;
  intake?: IntakeForm;
  answers?: SurveyAnswers;
};

function isValidIntake(value: unknown): value is IntakeForm {
  if (!value || typeof value !== 'object') return false;
  const v = value as IntakeForm;
  return Boolean(v.name && v.school && v.grade && v.studentPhone && v.parentPhone && v.birthDate && v.birthTime);
}

function isValidAnswers(value: unknown): value is SurveyAnswers {
  if (!value || typeof value !== 'object') return false;
  const v = value as SurveyAnswers;
  return typeof v.abc === 'object' && typeof v.learning === 'object' && typeof v.engineering === 'object';
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SyncBody;

    if (!isValidIntake(body.intake) || !isValidAnswers(body.answers)) {
      return NextResponse.json(
        { ok: false, error: 'invalid_payload', message: 'intake 또는 answers 형식이 올바르지 않습니다.' },
        { status: 400 }
      );
    }

    if ('report' in (body as Record<string, unknown>)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'api_only_mode',
          message: 'report 필드는 허용되지 않습니다. intake + answers만 전송하세요.',
        },
        { status: 400 }
      );
    }

    const mappedReport = buildMappedReport(body.intake, body.answers);

    try {
      const row = await saveReportRecord({
        source: body.source ?? 'ipsi-dna-prism-next',
        createdAt: body.createdAt,
        intake: body.intake,
        answers: body.answers,
        report: mappedReport,
      });

      return NextResponse.json({
        ok: true,
        stored: row,
        reportSummary: mappedReport.scoreSummary,
        routing: mappedReport.routing,
        report: mappedReport,
        generationMode: 'api-only',
        persistence: 'saved',
      });
    } catch (saveError) {
      console.error('report save failed, returning transient report:', saveError);
      const createdAt = body.createdAt ?? new Date().toISOString();
      const fallbackStored = {
        reportId: `transient-${Date.now()}`,
        studentKey: `${body.intake.name}|${body.intake.birthDate}|${body.intake.studentPhone}`,
        studentName: body.intake.name,
        school: body.intake.school,
        grade: body.intake.grade,
        createdAt,
        headline: mappedReport.headline,
      };

      return NextResponse.json({
        ok: true,
        stored: fallbackStored,
        reportSummary: mappedReport.scoreSummary,
        routing: mappedReport.routing,
        report: mappedReport,
        generationMode: 'api-only',
        persistence: 'transient',
        warning: '저장소 연결 문제로 이번 결과는 임시 생성본입니다.',
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: 'sync_failed', message: '리포트 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get('limit');
    const limit = limitParam ? Math.max(1, Math.min(200, Number(limitParam))) : 20;
    const rows = await listRecentReports(Number.isFinite(limit) ? limit : 20);
    return NextResponse.json({ ok: true, count: rows.length, rows, persistence: 'saved' });
  } catch (error) {
    console.error('list reports failed:', error);
    return NextResponse.json({
      ok: true,
      count: 0,
      rows: [],
      persistence: 'unavailable',
      warning: '저장소 연결 문제로 최근 리포트 목록을 불러오지 못했습니다.',
    });
  }
}
