
function simulate(q1, q2, q3, q4, q5) {
  const scores = {
    A: Math.round(((q1 + q2 + q3) / 15) * 100),
    B: Math.round(((q4 + q5 + (q1 + q2) / 2) / 15) * 100),
    C: Math.round(((q2 + q4 + q5) / 15) * 100),
  };

  const targetUniv = q1 >= 4 ? "서울대(공학), KAIST" : "서울대(자연), 고려대";
  const hsType = q3 >= 4 ? "영재고/과학고/전국자사" : "광역자사/명문일반";
  const major = q5 >= 4 ? "AI·컴퓨터공학" : "바이오·의공학";

  const quantScore = Math.min(100, 95 + (scores.A / 100) * 5).toFixed(1);
  const qualGrade = scores.A + scores.B > 180 ? "S-GRADE" : scores.A + scores.B > 160 ? "A-GRADE" : "B-GRADE";
  const rankPercent = Math.min(100, 90 + (scores.A / 100) * 10).toFixed(1);
  const topPercent = (100 - parseFloat(rankPercent)).toFixed(1);

  return { scores, targetUniv, hsType, major, quantScore, qualGrade, topPercent };
}

const cases = [
  { name: "Virtual_01 (Genius)", q: [5, 5, 5, 5, 5] },
  { name: "Virtual_02 (Struggling)", q: [1, 1, 1, 1, 1] },
  { name: "Virtual_03 (Deep/Theory)", q: [5, 5, 4, 1, 2] },
  { name: "Virtual_04 (Practical/Fast)", q: [2, 1, 2, 5, 5] },
  { name: "Virtual_05 (Balanced)", q: [3, 4, 3, 4, 3] }
];

console.log("| 사용자 | 인성(A) | 관성(B) | 독립성(C) | 목표 대학 | 고교 유형 | 전공 트랙 | 정량지표 | 정성등급 | 상위% |");
console.log("|---|---|---|---|---|---|---|---|---|---|");

cases.forEach(c => {
  const res = simulate(...c.q);
  console.log(`| ${c.name} | ${res.scores.A} | ${res.scores.B} | ${res.scores.C} | ${res.targetUniv} | ${res.hsType} | ${res.major} | ${res.quantScore} | ${res.qualGrade} | ${res.topPercent}% |`);
});
