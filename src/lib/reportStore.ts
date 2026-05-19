import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

import type { MappedReport, SurveyAnswers, IntakeForm } from '@/lib/reportMapping';

export type StoredReportInput = {
  source: string;
  intake: IntakeForm;
  answers: SurveyAnswers;
  report: MappedReport;
  createdAt?: string;
};

export type StoredReportRow = {
  reportId: string;
  studentKey: string;
  studentName: string;
  school: string;
  grade: string;
  createdAt: string;
  headline: string;
};

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'report_store.sqlite');


type StoreMode = 'sqlite' | 'supabase';

type SupabaseRecord = {
  report_id: string;
  student_key: string;
  student_name: string;
  school: string;
  grade: string;
  createdAt: string;
  headline: string;
};

function ensureDb() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS report_records (
      report_id TEXT PRIMARY KEY,
      student_key TEXT NOT NULL,
      student_name TEXT NOT NULL,
      school TEXT NOT NULL,
      grade TEXT NOT NULL,
      source TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      headline TEXT NOT NULL,
      report_json TEXT NOT NULL,
      answers_json TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_report_records_student_key ON report_records(student_key);
    CREATE INDEX IF NOT EXISTS idx_report_records_createdAt ON report_records(createdAt);
  `);
  return db;
}

export function toStudentKey(intake: IntakeForm) {
  return `${intake.name}|${intake.birthDate}|${intake.studentPhone}`;
}

function toStoredReportRow(row: SupabaseRecord): StoredReportRow {
  return {
    reportId: row.report_id,
    studentKey: row.student_key,
    studentName: row.student_name,
    school: row.school,
    grade: row.grade,
    createdAt: row.createdAt,
    headline: row.headline,
  };
}

export function getStoreMode(): StoreMode {
  const mode = process.env.REPORT_STORE_MODE?.toLowerCase();
  return mode === 'sqlite' ? 'sqlite' : 'supabase';
}

function getPocketBaseUrl(): string {
  return process.env.NEXT_PUBLIC_POCKETBASE_URL ?? 'https://suprima-platform-pb.fly.dev';
}

export async function pocketbaseRequest<T>(pathSuffix: string, init?: RequestInit): Promise<T> {
  const url = getPocketBaseUrl();
  const headers = new Headers(init?.headers);
  if (init?.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${url}/api/${pathSuffix}`, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PocketBase request failed (${res.status}): ${text}`);
  }

  if (res.status === 204) return {} as T;
  return (await res.json()) as T;
}

function saveReportRecordLocal(input: StoredReportInput): StoredReportRow {
  const db = ensureDb();
  const reportId = crypto.randomUUID();
  const createdAt = input.createdAt ?? new Date().toISOString();
  const studentKey = toStudentKey(input.intake);

  const stmt = db.prepare(`
    INSERT INTO report_records (
      report_id, student_key, student_name, school, grade, source, createdAt, headline, report_json, answers_json
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    reportId,
    studentKey,
    input.intake.name,
    input.intake.school,
    input.intake.grade,
    input.source,
    createdAt,
    input.report.headline,
    JSON.stringify(input.report),
    JSON.stringify(input.answers)
  );

  db.close();
  return {
    reportId,
    studentKey,
    studentName: input.intake.name,
    school: input.intake.school,
    grade: input.intake.grade,
    createdAt,
    headline: input.report.headline,
  };
}

async function saveReportRecordPocketBase(input: StoredReportInput): Promise<StoredReportRow> {
  const reportId = crypto.randomUUID();
  const createdAt = input.createdAt ?? new Date().toISOString();
  const studentKey = toStudentKey(input.intake);

  const payload = {
    report_id: reportId,
    student_key: studentKey,
    student_name: input.intake.name,
    school: input.intake.school,
    grade: input.intake.grade,
    source: input.source,
    createdAt: createdAt,
    headline: input.report.headline,
    report_json: input.report,
    answers_json: input.answers,
  };

  const row = await pocketbaseRequest<SupabaseRecord>(
    `collections/myungni_next_report_records/records`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );

  return toStoredReportRow(row);
}

function listRecentReportsLocal(limit = 20): StoredReportRow[] {
  const db = ensureDb();
  const stmt = db.prepare(`
    SELECT report_id, student_key, student_name, school, grade, createdAt, headline
    FROM report_records
    ORDER BY createdAt DESC
    LIMIT ?
  `);
  const rows = stmt.all(limit) as Array<{
    report_id: string;
    student_key: string;
    student_name: string;
    school: string;
    grade: string;
    createdAt: string;
    headline: string;
  }>;
  db.close();
  return rows.map((row) => toStoredReportRow(row));
}

type PocketBaseListResponse<T> = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
};

async function listRecentReportsPocketBase(limit = 20): Promise<StoredReportRow[]> {
  const safeLimit = Math.max(1, Math.min(200, limit));
  const response = await pocketbaseRequest<PocketBaseListResponse<SupabaseRecord>>(
    `collections/myungni_next_report_records/records?sort=-createdAt&perPage=${safeLimit}`
  );
  return response.items.map((row) => toStoredReportRow(row));
}

export async function saveReportRecord(input: StoredReportInput): Promise<StoredReportRow> {
  return getStoreMode() === 'supabase' ? saveReportRecordPocketBase(input) : saveReportRecordLocal(input);
}

export async function listRecentReports(limit = 20): Promise<StoredReportRow[]> {
  return getStoreMode() === 'supabase' ? listRecentReportsPocketBase(limit) : listRecentReportsLocal(limit);
}
