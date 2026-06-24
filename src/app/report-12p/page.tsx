"use client";

const reportData = {
  studentName: "김수프",
  diagnosisDate: "2026. 04. 18",
  dnaTrait: "학문 응집형 (인성-관성 중심 엔진)",
  grslss: {
    independent: 94,
    avoidant: 12,
    collaborative: 35,
  },
  ils: {
    process: "숙고형(Reflective)",
    perception: "직관형(Intuitive)",
    input: "시각형(Visual)",
    understanding: "순차형(Sequential)",
  },
};

export default function ReportPage() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        lineHeight: 1.6,
        color: "#333",
        backgroundColor: "#fff",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <header
        style={{
          borderBottom: "2px solid #001F3F",
          paddingBottom: "20px",
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#001F3F" }}>
          [ SUPREMA CLINIC ] Premium Diagnosis Report
        </h1>
      </header>

      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#001F3F" }}>
          제 1면 : 임상 진단 결과 요약 및 총평
        </h2>
        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "5px", marginBottom: "20px" }}>
          <p><strong>성명:</strong> {reportData.studentName} ({reportData.diagnosisDate} 진단)</p>
          <p><strong>선천적(DNA) 기질:</strong> {reportData.dnaTrait}</p>
          <p><strong>학습 태도(GRSLSS):</strong> 독립형 <strong>{reportData.grslss.independent}%</strong></p>
          <p><strong>인지 처리 경로(ILS):</strong> 숙고형 · 직관형 · 시각형 · 순차형</p>
        </div>
        <p style={{ textIndent: "1em" }}>
          <strong>전문가 총평:</strong> {reportData.studentName} 학생은 정보를 정교하게 수용하고 규범을 준수하려는 선천적 인지 엔진을
          바탕으로, 후천적으로는 고도의 독립적 사고력({reportData.grslss.independent}%)을 구축한 완성형 인재입니다.
          현재의 학습 정체는 역량의 부재가 아니라, 높은 독립성이 체계적인 출력 시스템을 만나지 못해 발생하는 인지적 병목 현상에 가깝습니다.
        </p>
      </section>

      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#001F3F" }}>
          제 2~3면 : 선천적(DNA) 기질과 후천적 성격의 결합 분석
        </h2>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          제목: 선천적 정보 수용 에너지와 독립적 자아의 상호작용
        </h3>
        <p style={{ textIndent: "1em", marginBottom: "15px" }}>
          학생의 선천적 엔진은 지식을 깊게 수용하고 내면화하는 인성 에너지와 규칙을 준수하려는 관성 에너지가 중심축을 이룹니다.
          이 조합은 학문의 기초를 단단히 쌓고 복잡한 개념 구조를 정교하게 연결하는 데 최적화되어 있습니다.
        </p>
        <p style={{ textIndent: "1em" }}>
          여기에 후천적 독립형 학습 태도가 결합되면서, 타인의 지시보다 스스로 구조화한 학습 설계에서 더 큰 효율을 보이는 특성이 강화됩니다.
        </p>
      </section>

      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#001F3F" }}>
          제 6면 : 학습 태도 검사(GRSLSS) 정량 분석
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>지표</th>
              <th style={{ padding: "10px", textAlign: "left" }}>결과(%)</th>
              <th style={{ padding: "10px", textAlign: "left" }}>해석</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>독립형(Independent)</td>
              <td style={{ padding: "10px" }}>{reportData.grslss.independent}</td>
              <td style={{ padding: "10px" }}>스스로 사고하고 학습하는 자율성이 매우 높습니다.</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>회피형(Avoidant)</td>
              <td style={{ padding: "10px" }}>{reportData.grslss.avoidant}</td>
              <td style={{ padding: "10px" }}>불안으로 인한 회피 경향은 낮은 편입니다.</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>협업형(Collaborative)</td>
              <td style={{ padding: "10px" }}>{reportData.grslss.collaborative}</td>
              <td style={{ padding: "10px" }}>협업은 가능하지만 개인 주도 환경에서 강점이 더 큽니다.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: "60px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#001F3F" }}>
          제 7면 : 공학 적합도 검사(ILS) 정량 분석
        </h2>
        <blockquote style={{ borderLeft: "5px solid #ccc", paddingLeft: "15px", marginBottom: "20px", fontStyle: "italic" }}>
          인지 처리 규격은 공부 방식과 진로 설계의 기준이 됩니다.
        </blockquote>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>차원</th>
              <th style={{ padding: "10px", textAlign: "left" }}>결과 및 해석</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>과정(Process)</td>
              <td style={{ padding: "10px" }}>{reportData.ils.process} - 즉각 반응보다 충분한 내부 반추와 구조화 이후 답을 내는 방식입니다.</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>인식(Perception)</td>
              <td style={{ padding: "10px" }}>{reportData.ils.perception} - 단순 암기보다 원리, 모델, 가능성을 찾는 탐색형 특성이 강합니다.</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>입력(Input)</td>
              <td style={{ padding: "10px" }}>{reportData.ils.input} - 시각적 구조화가 이해 속도를 높입니다.</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>이해(Understanding)</td>
              <td style={{ padding: "10px" }}>{reportData.ils.understanding} - 단계별 흐름이 명확한 학습 체계에서 안정적 성과를 냅니다.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px", color: "#001F3F" }}>
          제 12면 : 전문가 최종 처방
        </h2>
        <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>
          제목: 자기 언어화 중심의 출력 강화 프로토콜
        </h3>
        <p style={{ textIndent: "1em", marginBottom: "15px" }}>
          학생은 학습 내용을 자기 언어로 요약하고 설명하는 훈련을 통해 인지적 병목을 줄일 수 있습니다.
          입력만 반복하는 학습보다, 설명과 재구성을 동반한 출력형 학습이 훨씬 효과적입니다.
        </p>
        <p style={{ textIndent: "1em" }}>
          <strong>학부모 코칭 가이드:</strong> 결과보다 논리적 과정에 질문을 두어야 합니다.
          “이 문제 맞았니?” 대신 “이 문제를 풀 때 너만의 논리적 순서는 무엇이었니?”라고 묻는 방식이 적합합니다.
        </p>
      </section>

      <footer
        style={{
          marginTop: "60px",
          borderTop: "1px solid #ccc",
          paddingTop: "20px",
          textAlign: "center",
          fontSize: "12px",
          color: "#666",
        }}
      >
        SUPREMA CLINIC | 12P SAMPLE | www.suprema.clinic
      </footer>
    </div>
  );
}
