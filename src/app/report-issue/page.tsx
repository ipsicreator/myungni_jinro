"use client";

import { useMemo } from "react";
import { ReportFormView } from "@/components/report/ReportFormView";
import { loadAnswersFromStorage, loadFormFromStorage } from "@/lib/prismData";
import { buildReportContent } from "@/lib/reportForm";

export default function ReportIssuePage() {
  const form = useMemo(() => loadFormFromStorage(), []);
  const answers = useMemo(() => loadAnswersFromStorage(), []);
  const content = useMemo(() => buildReportContent(form, answers), [form, answers]);

  return <ReportFormView content={content} />;
}

