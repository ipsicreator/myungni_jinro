export type AdmissionGuideRow = {
  admissionMethod: string;
  minimumRequirement: string;
  requiredDocuments: string;
  duplicateSupport: string;
  regionalType: string;
  gradeWeight: string;
  subjectReflect: string;
  careerElectives: string;
  resultGradeCompetition: string;
};

export const ADMISSION_GUIDE_ROWS: AdmissionGuideRow[] = [
  {
    admissionMethod: "없음",
    minimumRequirement: "없음",
    requiredDocuments: "일괄합산 일괄합산 100 30 70",
    duplicateSupport: "없음",
    regionalType: "없음",
    gradeWeight: "없음",
    subjectReflect: "없음",
    careerElectives: "없음",
    resultGradeCompetition: "없음",
  },
  {
    admissionMethod: "없음",
    minimumRequirement: "없음",
    requiredDocuments: "일괄합산 일괄합산 100 100",
    duplicateSupport: "없음",
    regionalType: "없음",
    gradeWeight: "없음",
    subjectReflect: "없음",
    careerElectives: "없음",
    resultGradeCompetition: "없음",
  },
];

export function summarizeAdmissionGuideRows(rows: AdmissionGuideRow[]) {
  const uniq = (values: string[]) => Array.from(new Set(values.filter(Boolean)));

  return {
    admissionMethod: uniq(rows.map((row) => row.admissionMethod)).join(" / ") || "없음",
    minimumRequirement: uniq(rows.map((row) => row.minimumRequirement)).join(" / ") || "없음",
    requiredDocuments: uniq(rows.map((row) => row.requiredDocuments)).join(" / ") || "없음",
    duplicateSupport: uniq(rows.map((row) => row.duplicateSupport)).join(" / ") || "없음",
    regionalType: uniq(rows.map((row) => row.regionalType)).join(" / ") || "없음",
    gradeWeight: uniq(rows.map((row) => row.gradeWeight)).join(" / ") || "없음",
    subjectReflect: uniq(rows.map((row) => row.subjectReflect)).join(" / ") || "없음",
    careerElectives: uniq(rows.map((row) => row.careerElectives)).join(" / ") || "없음",
    resultGradeCompetition: uniq(rows.map((row) => row.resultGradeCompetition)).join(" / ") || "없음",
    totalRows: rows.length,
  };
}
