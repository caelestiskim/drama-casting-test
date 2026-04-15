/**
 * 판정 엔진 샘플 테스트셋 검증
 *
 * 실행: npx tsx src/lib/testing/validateResults.ts
 *
 * 각 그룹이 금지된 캐릭터를 절대 반환하지 않는지 확인합니다.
 * PASSED 수 = totalCases 이면 모든 금지 규칙 통과.
 */

import { selectCharacter } from "@/lib/ai/selectCharacter";
import type { FaceType, FaceVector } from "@/data/characters";

type TestCase = {
  label: string;
  faceType: FaceType;
  vector: FaceVector;
  mustNotContain: string[];   // 절대 나와선 안 되는 character id
  shouldContain?: string[];   // 나와야 하는 character id (선택적)
};

const TEST_CASES: TestCase[] = [
  // ── 터프형 남성 (마동석/정만식 계열) ─────────────────────
  {
    label: "[RUGGED] 거칠고 강인한 남성 — 로맨스/청춘 금지",
    faceType: "RUGGED",
    vector: { power: 62, elegance: 5, intellect: 14, warmth: 9, mystery: 10 },
    mustNotContain: ["romance-lead", "romance-second-lead-male", "best-friend", "campus-romance-lead", "cafe-owner", "band-leader"],
    shouldContain: ["violent-crimes-detective", "villain-rival", "noir-strategist"],
  },
  {
    label: "[RUGGED] 거칠지만 지적인 느낌도 있는 남성",
    faceType: "RUGGED",
    vector: { power: 48, elegance: 8, intellect: 25, warmth: 8, mystery: 11 },
    mustNotContain: ["romance-lead", "campus-romance-lead", "romance-second-lead-male", "cafe-owner"],
  },

  // ── 세련형 여성 (장원영/김태희 계열) ─────────────────────
  {
    label: "[ELEGANT_REFINED] 우아하고 정돈된 여성 — 거친 역할 금지",
    faceType: "ELEGANT_REFINED",
    vector: { power: 6, elegance: 55, intellect: 18, warmth: 14, mystery: 7 },
    mustNotContain: ["violent-crimes-detective", "villain-rival", "noir-strategist"],
    shouldContain: ["chaebol-heiress", "cold-ceo-female"],
  },
  {
    label: "[ELEGANT_REFINED] 우아하지만 지적인 여성",
    faceType: "ELEGANT_REFINED",
    vector: { power: 8, elegance: 40, intellect: 30, warmth: 12, mystery: 10 },
    mustNotContain: ["violent-crimes-detective", "villain-rival", "noir-strategist"],
  },

  // ── 청춘형 (박보검/아이유 계열) ──────────────────────────
  {
    label: "[SOFT_YOUTH] 부드럽고 청춘적인 인상 — 느와르/악역 금지",
    faceType: "SOFT_YOUTH",
    vector: { power: 5, elegance: 15, intellect: 12, warmth: 56, mystery: 12 },
    mustNotContain: ["villain-rival", "noir-strategist", "violent-crimes-detective", "suspense-suspect"],
    shouldContain: ["romance-lead", "campus-romance-lead", "best-friend"],
  },
  {
    label: "[SOFT_YOUTH] 신비로운 면도 있는 청춘형",
    faceType: "SOFT_YOUTH",
    vector: { power: 8, elegance: 14, intellect: 15, warmth: 38, mystery: 25 },
    mustNotContain: ["villain-rival", "noir-strategist", "violent-crimes-detective"],
  },

  // ── 날카롭고 차가운 남성 (이병헌/공유 계열) ──────────────
  {
    label: "[SHARP_COOL] 날카롭고 차가운 인상 — 귀여운 청춘 금지",
    faceType: "SHARP_COOL",
    vector: { power: 18, elegance: 30, intellect: 35, warmth: 7, mystery: 10 },
    mustNotContain: ["best-friend", "cafe-owner", "campus-romance-lead"],
    shouldContain: ["cold-prosecutor", "cold-ceo", "chaebol-heir"],
  },

  // ── 지적이고 진지한 인상 (조승우/전도연 계열) ─────────────
  {
    label: "[INTELLECTUAL_SERIOUS] 지적이고 진지한 인상",
    faceType: "INTELLECTUAL_SERIOUS",
    vector: { power: 10, elegance: 20, intellect: 48, warmth: 12, mystery: 10 },
    mustNotContain: ["villain-rival", "violent-crimes-detective", "noir-strategist"],
    shouldContain: ["cold-prosecutor", "genius-profiler", "medical-elite-doctor"],
  },

  // ── 따뜻하고 친근한 인상 (조정석/류준열 계열) ─────────────
  {
    label: "[WARM_FRIENDLY] 따뜻하고 친근한 인상 — 강인/느와르 금지",
    faceType: "WARM_FRIENDLY",
    vector: { power: 8, elegance: 16, intellect: 18, warmth: 48, mystery: 10 },
    mustNotContain: ["villain-rival", "noir-strategist", "violent-crimes-detective"],
    shouldContain: ["romance-lead", "best-friend", "warm-lawyer"],
  },

  // ── 신비롭고 어두운 인상 (이준기/고수 계열) ──────────────
  {
    label: "[MYSTERIOUS_DARK] 신비롭고 어두운 인상 — 로맨스 주인공 금지",
    faceType: "MYSTERIOUS_DARK",
    vector: { power: 10, elegance: 18, intellect: 25, warmth: 10, mystery: 37 },
    mustNotContain: ["romance-lead", "best-friend", "campus-romance-lead", "cafe-owner"],
    shouldContain: ["mystery-writer", "fantasy-advisor", "suspense-suspect"],
  },

  // ── 강렬하고 카리스마 있는 인상 (황정민/최민식 계열) ──────
  {
    label: "[CHARISMATIC_INTENSE] 강렬하고 카리스마 있는 인상",
    faceType: "CHARISMATIC_INTENSE",
    vector: { power: 30, elegance: 18, intellect: 22, warmth: 8, mystery: 22 },
    mustNotContain: ["romance-lead", "best-friend", "campus-romance-lead"],
    shouldContain: ["villain-rival", "violent-crimes-detective", "revenge-mastermind"],
  },
];

type TestResult = {
  label: string;
  passed: boolean;
  violations: string[];
  hits: string[];
  mainResult: string;
  supports: string[];
  mainScore: number;
};

export function runValidation(): TestResult[] {
  const results: TestResult[] = TEST_CASES.map((tc) => {
    const casting = selectCharacter(tc.faceType, tc.vector);
    const allIds = [
      casting.main.character.id,
      casting.supports[0].character.id,
      casting.supports[1].character.id,
    ];

    const violations = tc.mustNotContain.filter((id) => allIds.includes(id));
    const hits = (tc.shouldContain ?? []).filter((id) => allIds.includes(id));

    return {
      label: tc.label,
      passed: violations.length === 0,
      violations,
      hits,
      mainResult: casting.main.character.id,
      supports: [casting.supports[0].character.id, casting.supports[1].character.id],
      mainScore: casting.main.matchScore,
    };
  });

  return results;
}

// CLI 실행 시 출력
if (process.env.NODE_ENV !== "test") {
  const results = runValidation();
  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  console.log("\n=== 판정 엔진 검증 결과 ===\n");

  for (const r of results) {
    const status = r.passed ? "✅ PASS" : "❌ FAIL";
    console.log(`${status} ${r.label}`);
    console.log(
      `       → 메인: ${r.mainResult} (${r.mainScore}%), 서브: ${r.supports.join(", ")}`,
    );
    if (r.violations.length > 0) {
      console.log(`       ⚠ 위반: ${r.violations.join(", ")}`);
    }
    if (r.hits.length > 0) {
      console.log(`       ✓ 기대 포함: ${r.hits.join(", ")}`);
    }
    console.log("");
  }

  console.log(`결과: ${passed}/${total} 통과`);
  if (passed < total) {
    console.log("⚠ 금지 규칙 위반이 있습니다. 캐릭터 allowedFaceTypes를 점검하세요.");
  } else {
    console.log("✅ 모든 금지 규칙 통과.");
  }
}
