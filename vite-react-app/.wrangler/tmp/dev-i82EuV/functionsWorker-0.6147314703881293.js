var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-eeuphX/functionsWorker-0.6147314703881293.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var featuresSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "skinTexture",
    "facialBuild",
    "jawType",
    "eyeExpression",
    "facialHair",
    "overallPresence",
    "skinClarity",
    "faceContour"
  ],
  properties: {
    skinTexture: { type: "string", enum: ["smooth", "slightly_rough", "rough", "weathered"] },
    facialBuild: { type: "string", enum: ["delicate", "average", "solid", "heavy"] },
    jawType: { type: "string", enum: ["soft_round", "defined_slim", "strong_angular", "square_heavy"] },
    eyeExpression: {
      type: "string",
      enum: ["warm_gentle", "cold_piercing", "intense_threatening", "mysterious_deep", "bright_youthful"]
    },
    facialHair: { type: "string", enum: ["none", "light_stubble", "neat_beard", "thick_rough"] },
    overallPresence: {
      type: "string",
      enum: ["approachable", "cool_composed", "imposing_tough", "magnetic_intense", "mysterious"]
    },
    skinClarity: { type: "string", enum: ["very_clear", "clear", "textured", "very_textured"] },
    faceContour: { type: "string", enum: ["round_soft", "oval_neutral", "angular_refined", "broad_heavy"] }
  }
};
var SYSTEM_PROMPT = `
You are a careful visual feature analyst for a drama casting app.
Describe only directly observable face-photo features.
Do not infer attractiveness, race, age, personality, health, politics, or social traits.
Return JSON only.
`.trim();
var FEATURES_PROMPT = `
Analyze the face photo and output exactly these 8 fields using only the allowed enum values.

Guidelines:
- Base the answer only on visible facial structure and expression.
- If the photo is ambiguous, choose the most conservative visible option.
- Do not exaggerate.
- Do not mention anything outside the schema.

Field definitions:
1. skinTexture: smooth | slightly_rough | rough | weathered
2. facialBuild: delicate | average | solid | heavy
3. jawType: soft_round | defined_slim | strong_angular | square_heavy
4. eyeExpression: warm_gentle | cold_piercing | intense_threatening | mysterious_deep | bright_youthful
5. facialHair: none | light_stubble | neat_beard | thick_rough
6. overallPresence: approachable | cool_composed | imposing_tough | magnetic_intense | mysterious
7. skinClarity: very_clear | clear | textured | very_textured
8. faceContour: round_soft | oval_neutral | angular_refined | broad_heavy
`.trim();
var FACE_TYPE_PROTOTYPES = {
  RUGGED: { power: 44, elegance: 6, intellect: 16, warmth: 10, mystery: 24 },
  SHARP_COOL: { power: 18, elegance: 24, intellect: 28, warmth: 8, mystery: 22 },
  WARM_FRIENDLY: { power: 10, elegance: 12, intellect: 16, warmth: 48, mystery: 14 },
  ELEGANT_REFINED: { power: 8, elegance: 46, intellect: 18, warmth: 16, mystery: 12 },
  INTELLECTUAL_SERIOUS: { power: 10, elegance: 16, intellect: 44, warmth: 10, mystery: 20 },
  SOFT_YOUTH: { power: 8, elegance: 18, intellect: 14, warmth: 44, mystery: 16 },
  MYSTERIOUS_DARK: { power: 14, elegance: 12, intellect: 18, warmth: 6, mystery: 50 },
  CHARISMATIC_INTENSE: { power: 34, elegance: 10, intellect: 18, warmth: 8, mystery: 30 }
};
var FEATURE_WEIGHTS = {
  skinTexture: {
    smooth: { power: 4, elegance: 22, intellect: 10, warmth: 12, mystery: 6 },
    slightly_rough: { power: 10, elegance: 12, intellect: 12, warmth: 10, mystery: 8 },
    rough: { power: 20, elegance: 4, intellect: 10, warmth: 6, mystery: 12 },
    weathered: { power: 24, elegance: 2, intellect: 10, warmth: 4, mystery: 16 }
  },
  facialBuild: {
    delicate: { power: 4, elegance: 18, intellect: 10, warmth: 12, mystery: 8 },
    average: { power: 10, elegance: 10, intellect: 12, warmth: 10, mystery: 8 },
    solid: { power: 20, elegance: 6, intellect: 10, warmth: 8, mystery: 10 },
    heavy: { power: 24, elegance: 2, intellect: 8, warmth: 6, mystery: 12 }
  },
  jawType: {
    soft_round: { power: 4, elegance: 10, intellect: 8, warmth: 18, mystery: 6 },
    defined_slim: { power: 8, elegance: 22, intellect: 12, warmth: 8, mystery: 10 },
    strong_angular: { power: 20, elegance: 8, intellect: 12, warmth: 6, mystery: 10 },
    square_heavy: { power: 24, elegance: 4, intellect: 10, warmth: 4, mystery: 12 }
  },
  eyeExpression: {
    warm_gentle: { power: 4, elegance: 10, intellect: 8, warmth: 24, mystery: 6 },
    cold_piercing: { power: 10, elegance: 14, intellect: 22, warmth: 4, mystery: 12 },
    intense_threatening: { power: 24, elegance: 4, intellect: 10, warmth: 2, mystery: 14 },
    mysterious_deep: { power: 8, elegance: 10, intellect: 14, warmth: 2, mystery: 22 },
    bright_youthful: { power: 4, elegance: 12, intellect: 8, warmth: 22, mystery: 8 }
  },
  facialHair: {
    none: { power: 4, elegance: 14, intellect: 10, warmth: 10, mystery: 8 },
    light_stubble: { power: 12, elegance: 8, intellect: 10, warmth: 8, mystery: 10 },
    neat_beard: { power: 14, elegance: 8, intellect: 12, warmth: 6, mystery: 12 },
    thick_rough: { power: 24, elegance: 2, intellect: 10, warmth: 4, mystery: 12 }
  },
  overallPresence: {
    approachable: { power: 4, elegance: 8, intellect: 8, warmth: 26, mystery: 6 },
    cool_composed: { power: 8, elegance: 18, intellect: 18, warmth: 6, mystery: 10 },
    imposing_tough: { power: 28, elegance: 2, intellect: 8, warmth: 4, mystery: 10 },
    magnetic_intense: { power: 20, elegance: 8, intellect: 10, warmth: 4, mystery: 18 },
    mysterious: { power: 8, elegance: 10, intellect: 12, warmth: 2, mystery: 24 }
  },
  skinClarity: {
    very_clear: { power: 4, elegance: 20, intellect: 10, warmth: 10, mystery: 6 },
    clear: { power: 8, elegance: 14, intellect: 12, warmth: 10, mystery: 8 },
    textured: { power: 16, elegance: 6, intellect: 10, warmth: 8, mystery: 12 },
    very_textured: { power: 20, elegance: 4, intellect: 10, warmth: 4, mystery: 16 }
  },
  faceContour: {
    round_soft: { power: 4, elegance: 10, intellect: 8, warmth: 20, mystery: 6 },
    oval_neutral: { power: 8, elegance: 14, intellect: 12, warmth: 10, mystery: 8 },
    angular_refined: { power: 12, elegance: 20, intellect: 14, warmth: 6, mystery: 10 },
    broad_heavy: { power: 24, elegance: 4, intellect: 10, warmth: 4, mystery: 12 }
  }
};
function addVectors(a, b) {
  return {
    power: a.power + b.power,
    elegance: a.elegance + b.elegance,
    intellect: a.intellect + b.intellect,
    warmth: a.warmth + b.warmth,
    mystery: a.mystery + b.mystery
  };
}
__name(addVectors, "addVectors");
__name2(addVectors, "addVectors");
function normalizeVector(raw) {
  const values = [raw.power, raw.elegance, raw.intellect, raw.warmth, raw.mystery];
  const sum = values.reduce((total, value) => total + value, 0);
  if (sum <= 0) {
    return { power: 20, elegance: 20, intellect: 20, warmth: 20, mystery: 20 };
  }
  const normalized = values.map((value) => Math.round(value / sum * 100));
  const diff = 100 - normalized.reduce((total, value) => total + value, 0);
  const maxIndex = normalized.indexOf(Math.max(...normalized));
  normalized[maxIndex] += diff;
  return {
    power: normalized[0],
    elegance: normalized[1],
    intellect: normalized[2],
    warmth: normalized[3],
    mystery: normalized[4]
  };
}
__name(normalizeVector, "normalizeVector");
__name2(normalizeVector, "normalizeVector");
function cosineSimilarity(a, b) {
  const keys = ["power", "elegance", "intellect", "warmth", "mystery"];
  const dot = keys.reduce((sum, key) => sum + a[key] * b[key], 0);
  const magA = Math.sqrt(keys.reduce((sum, key) => sum + a[key] ** 2, 0));
  const magB = Math.sqrt(keys.reduce((sum, key) => sum + b[key] ** 2, 0));
  if (magA === 0 || magB === 0) {
    return 0;
  }
  return dot / (magA * magB);
}
__name(cosineSimilarity, "cosineSimilarity");
__name2(cosineSimilarity, "cosineSimilarity");
function parseFeatures(raw) {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Features response is not an object.");
  }
  const record = raw;
  const features = {
    skinTexture: readEnum(record.skinTexture, ["smooth", "slightly_rough", "rough", "weathered"]),
    facialBuild: readEnum(record.facialBuild, ["delicate", "average", "solid", "heavy"]),
    jawType: readEnum(record.jawType, ["soft_round", "defined_slim", "strong_angular", "square_heavy"]),
    eyeExpression: readEnum(record.eyeExpression, [
      "warm_gentle",
      "cold_piercing",
      "intense_threatening",
      "mysterious_deep",
      "bright_youthful"
    ]),
    facialHair: readEnum(record.facialHair, ["none", "light_stubble", "neat_beard", "thick_rough"]),
    overallPresence: readEnum(record.overallPresence, [
      "approachable",
      "cool_composed",
      "imposing_tough",
      "magnetic_intense",
      "mysterious"
    ]),
    skinClarity: readEnum(record.skinClarity, ["very_clear", "clear", "textured", "very_textured"]),
    faceContour: readEnum(record.faceContour, ["round_soft", "oval_neutral", "angular_refined", "broad_heavy"])
  };
  return features;
}
__name(parseFeatures, "parseFeatures");
__name2(parseFeatures, "parseFeatures");
function readEnum(value, allowed) {
  if (typeof value !== "string" || !allowed.includes(value)) {
    throw new Error(`Unexpected enum value: ${String(value)}`);
  }
  return value;
}
__name(readEnum, "readEnum");
__name2(readEnum, "readEnum");
function extractJson(rawText) {
  try {
    return JSON.parse(rawText);
  } catch {
    const match2 = rawText.match(/\{[\s\S]*\}/);
    if (!match2) {
      throw new Error("Could not find JSON in model response.");
    }
    return JSON.parse(match2[0]);
  }
}
__name(extractJson, "extractJson");
__name2(extractJson, "extractJson");
function buildVectorFromFeatures(features) {
  let total = { power: 0, elegance: 0, intellect: 0, warmth: 0, mystery: 0 };
  total = addVectors(total, FEATURE_WEIGHTS.skinTexture[features.skinTexture]);
  total = addVectors(total, FEATURE_WEIGHTS.facialBuild[features.facialBuild]);
  total = addVectors(total, FEATURE_WEIGHTS.jawType[features.jawType]);
  total = addVectors(total, FEATURE_WEIGHTS.eyeExpression[features.eyeExpression]);
  total = addVectors(total, FEATURE_WEIGHTS.facialHair[features.facialHair]);
  total = addVectors(total, FEATURE_WEIGHTS.overallPresence[features.overallPresence]);
  total = addVectors(total, FEATURE_WEIGHTS.skinClarity[features.skinClarity]);
  total = addVectors(total, FEATURE_WEIGHTS.faceContour[features.faceContour]);
  return normalizeVector(total);
}
__name(buildVectorFromFeatures, "buildVectorFromFeatures");
__name2(buildVectorFromFeatures, "buildVectorFromFeatures");
function pickFaceType(vector) {
  const ranked = Object.entries(FACE_TYPE_PROTOTYPES).map(([faceType, prototype]) => ({
    faceType,
    similarity: cosineSimilarity(vector, prototype)
  })).sort((a, b) => b.similarity - a.similarity);
  const [best, second] = ranked;
  const margin = best.similarity - (second?.similarity ?? 0);
  const confidence = Math.max(0.42, Math.min(0.92, 0.58 + margin * 1.8));
  return {
    faceType: best.faceType,
    confidence: Number(confidence.toFixed(2))
  };
}
__name(pickFaceType, "pickFaceType");
__name2(pickFaceType, "pickFaceType");
function labelFeature(value, labels) {
  return labels[value];
}
__name(labelFeature, "labelFeature");
__name2(labelFeature, "labelFeature");
function buildSummary(features, faceType) {
  const faceTypeSummary = {
    RUGGED: "\uAC15\uC778\uD558\uACE0 \uAC70\uCE5C \uD654\uBA74 \uC778\uC0C1\uC774 \uBE44\uAD50\uC801 \uB610\uB837\uD55C \uD3B8\uC774\uC5D0\uC694.",
    SHARP_COOL: "\uC120\uC774 \uB610\uB837\uD558\uACE0 \uCC28\uBD84\uD55C \uAE34\uC7A5\uAC10\uC774 \uB0A8\uB294 \uD3B8\uC774\uC5D0\uC694.",
    WARM_FRIENDLY: "\uBD80\uB4DC\uB7FD\uACE0 \uCE5C\uADFC\uD55C \uC778\uC0C1\uC774 \uBA3C\uC800 \uC804\uD574\uC9C0\uB294 \uD3B8\uC774\uC5D0\uC694.",
    ELEGANT_REFINED: "\uC815\uB3C8\uB418\uACE0 \uC6B0\uC544\uD55C \uACB0\uC774 \uBE44\uAD50\uC801 \uC120\uBA85\uD558\uAC8C \uBCF4\uC774\uB294 \uD3B8\uC774\uC5D0\uC694.",
    INTELLECTUAL_SERIOUS: "\uCC28\uBD84\uD558\uACE0 \uC9C4\uC9C0\uD55C \uBD84\uC704\uAE30\uAC00 \uC911\uC2EC\uC5D0 \uB0A8\uB294 \uD3B8\uC774\uC5D0\uC694.",
    SOFT_YOUTH: "\uB9D1\uACE0 \uBD80\uB4DC\uB7EC\uC6B4 \uCCAD\uCD98\uD615 \uC778\uC0C1\uC774 \uBE44\uAD50\uC801 \uAC15\uD55C \uD3B8\uC774\uC5D0\uC694.",
    MYSTERIOUS_DARK: "\uC124\uBA85\uBCF4\uB2E4 \uC5EC\uC6B4\uC774 \uBA3C\uC800 \uB0A8\uB294 \uC2E0\uBE44\uB85C\uC6B4 \uACB0\uC774 \uBCF4\uC5EC\uC694.",
    CHARISMATIC_INTENSE: "\uD654\uBA74\uC744 \uB2E8\uBC88\uC5D0 \uC7A1\uB294 \uAC15\uD55C \uC874\uC7AC\uAC10\uC774 \uBE44\uAD50\uC801 \uB69C\uB837\uD574\uC694."
  };
  const eyeLabel = labelFeature(features.eyeExpression, {
    warm_gentle: "\uC628\uD654\uD55C \uB208\uB9E4",
    cold_piercing: "\uB0A0\uCE74\uB85C\uC6B4 \uC2DC\uC120",
    intense_threatening: "\uAC15\uD55C \uC555\uBC15\uAC10\uC774 \uC788\uB294 \uB208\uBE5B",
    mysterious_deep: "\uAE4A\uACE0 \uC77D\uAE30 \uC5B4\uB824\uC6B4 \uC2DC\uC120",
    bright_youthful: "\uBC1D\uACE0 \uC0DD\uAE30 \uC788\uB294 \uB208\uB9E4"
  });
  const contourLabel = labelFeature(features.faceContour, {
    round_soft: "\uBD80\uB4DC\uB7EC\uC6B4 \uC5BC\uAD74 \uC724\uACFD",
    oval_neutral: "\uBB34\uB09C\uD55C \uD0C0\uC6D0\uD615 \uC724\uACFD",
    angular_refined: "\uC815\uB3C8\uB41C \uAC01\uC9C4 \uC724\uACFD",
    broad_heavy: "\uB113\uACE0 \uBB35\uC9C1\uD55C \uC724\uACFD"
  });
  const presenceLabel = labelFeature(features.overallPresence, {
    approachable: "\uD3B8\uC548\uD55C \uBD84\uC704\uAE30",
    cool_composed: "\uC815\uC81C\uB41C \uCE68\uCC29\uD568",
    imposing_tough: "\uAC15\uD55C \uC555\uB3C4\uAC10",
    magnetic_intense: "\uAC15\uD55C \uBAB0\uC785\uAC10",
    mysterious: "\uC27D\uAC8C \uC77D\uD788\uC9C0 \uC54A\uB294 \uBD84\uC704\uAE30"
  });
  return `${faceTypeSummary[faceType]} ${eyeLabel}, ${contourLabel}, ${presenceLabel}\uC774 \uD568\uAED8 \uBCF4\uC785\uB2C8\uB2E4.`;
}
__name(buildSummary, "buildSummary");
__name2(buildSummary, "buildSummary");
function isImageDataUrl(value) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value);
}
__name(isImageDataUrl, "isImageDataUrl");
__name2(isImageDataUrl, "isImageDataUrl");
async function callVisionAPI(apiKey, imageDataUrl, model = "gpt-4.1-mini") {
  if (!isImageDataUrl(imageDataUrl)) {
    throw new Error("Only image data URLs are supported.");
  }
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: SYSTEM_PROMPT }]
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: FEATURES_PROMPT },
            { type: "input_image", image_url: imageDataUrl, detail: "high" }
          ]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "face_visual_features",
          strict: true,
          schema: featuresSchema
        }
      }
    })
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vision API request failed: ${response.status} ${text}`);
  }
  const payload = await response.json();
  if (!payload.output_text) {
    throw new Error("Vision API returned an empty response.");
  }
  const features = parseFeatures(extractJson(payload.output_text));
  const vector = buildVectorFromFeatures(features);
  const { faceType, confidence } = pickFaceType(vector);
  return {
    faceType,
    confidence,
    vector,
    summary: buildSummary(features, faceType)
  };
}
__name(callVisionAPI, "callVisionAPI");
__name2(callVisionAPI, "callVisionAPI");
function fallbackClassify(genderPreference) {
  if (genderPreference === "male") {
    return {
      faceType: "SHARP_COOL",
      confidence: 0.3,
      vector: { power: 18, elegance: 22, intellect: 30, warmth: 16, mystery: 14 },
      summary: "AI \uBD84\uC11D\uC744 \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uAE30\uBCF8 \uC720\uD615\uC73C\uB85C \uACB0\uACFC\uB97C \uB9CC\uB4E4\uC5C8\uC5B4\uC694.",
      isFallback: true
    };
  }
  if (genderPreference === "female") {
    return {
      faceType: "ELEGANT_REFINED",
      confidence: 0.3,
      vector: { power: 8, elegance: 36, intellect: 24, warmth: 20, mystery: 12 },
      summary: "AI \uBD84\uC11D\uC744 \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uAE30\uBCF8 \uC720\uD615\uC73C\uB85C \uACB0\uACFC\uB97C \uB9CC\uB4E4\uC5C8\uC5B4\uC694.",
      isFallback: true
    };
  }
  return {
    faceType: "INTELLECTUAL_SERIOUS",
    confidence: 0.3,
    vector: { power: 12, elegance: 20, intellect: 36, warmth: 18, mystery: 14 },
    summary: "AI \uBD84\uC11D\uC744 \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uAE30\uBCF8 \uC720\uD615\uC73C\uB85C \uACB0\uACFC\uB97C \uB9CC\uB4E4\uC5C8\uC5B4\uC694.",
    isFallback: true
  };
}
__name(fallbackClassify, "fallbackClassify");
__name2(fallbackClassify, "fallbackClassify");
var characters = [
  // ───────────────────────────────────────────────
  // RUGGED 전용 캐릭터 (로맨스/청춘 계열 절대 금지)
  // ───────────────────────────────────────────────
  {
    id: "violent-crimes-detective",
    name: "\uAC15\uB825\uBC18 \uD615\uC0AC",
    title: "\uD604\uC7A5\uC744 \uC9C1\uC811 \uBC00\uACE0 \uAC00\uB294 \uC778\uBB3C",
    shortDescription: "\uD604\uC7A5\uC744 \uB204\uBE44\uBA70 \uC0AC\uAC74\uC744 \uD574\uACB0\uD558\uB294 \uD589\uB3D9\uD30C \uD615\uC0AC",
    allowedFaceTypes: ["RUGGED", "CHARISMATIC_INTENSE"],
    vector: { power: 48, elegance: 5, intellect: 22, warmth: 10, mystery: 15 },
    genres: ["\uBC94\uC8C4", "\uC561\uC158", "\uC2A4\uB9B4\uB7EC"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uAC15\uB825\uBC18 \uD615\uC0AC. \uB4E4\uC5B4\uC624\uC790\uB9C8\uC790 \uC7A5\uBA74\uC774 \uC0B4\uC544\uB098\uB294 \uD0C0\uC785."
  },
  {
    id: "villain-rival",
    name: "\uC545\uC5ED \uB77C\uC774\uBC8C",
    title: "\uC7A5\uBA74\uC758 \uAE34\uC7A5\uC744 \uBC14\uAFB8\uB294 \uC778\uBB3C",
    shortDescription: "\uC8FC\uC778\uACF5\uACFC \uAC15\uD558\uAC8C \uB300\uB9BD\uD558\uBA70 \uAE34\uC7A5\uC744 \uB9CC\uB4DC\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["RUGGED", "CHARISMATIC_INTENSE", "MYSTERIOUS_DARK"],
    vector: { power: 35, elegance: 15, intellect: 18, warmth: 5, mystery: 27 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uB290\uC640\uB974", "\uBC94\uC8C4"],
    roleType: "\uB77C\uC774\uBC8C",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uC545\uC5ED \uB77C\uC774\uBC8C. \uC870\uC6A9\uD55C\uB370 \uACF5\uAE30\uAC00 \uB2EC\uB77C\uC9C0\uB294 \uD0C0\uC785."
  },
  {
    id: "noir-strategist",
    name: "\uB290\uC640\uB974 \uC870\uC9C1\uC758 \uC804\uB7B5\uAC00",
    title: "\uB0AE\uC740 \uD1A4\uC73C\uB85C \uC7A5\uBA74\uC744 \uC6C0\uCF1C\uC950\uB294 \uC778\uBB3C",
    shortDescription: "\uC5B4\uB460 \uC18D\uC5D0\uC11C \uD310\uC744 \uC124\uACC4\uD558\uB294 \uB0C9\uD639\uD55C \uC804\uB7B5\uAC00",
    allowedFaceTypes: ["RUGGED", "CHARISMATIC_INTENSE", "MYSTERIOUS_DARK"],
    vector: { power: 32, elegance: 12, intellect: 25, warmth: 5, mystery: 26 },
    genres: ["\uB290\uC640\uB974", "\uBC94\uC8C4", "\uC2A4\uB9B4\uB7EC"],
    roleType: "\uB77C\uC774\uBC8C",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uB290\uC640\uB974 \uC870\uC9C1\uC758 \uC804\uB7B5\uAC00. \uB0AE\uC740 \uD1A4\uC778\uB370\uB3C4 \uAE34\uC7A5\uAC10\uC774 \uD070 \uD0C0\uC785."
  },
  // ───────────────────────────────────────────────
  // SHARP_COOL 계열
  // ───────────────────────────────────────────────
  {
    id: "cold-prosecutor",
    name: "\uB0C9\uCCA0\uD55C \uAC80\uC0AC",
    title: "\uB9D0\uBCF4\uB2E4 \uD310\uB2E8\uC774 \uBA3C\uC800 \uB0A8\uB294 \uC778\uBB3C",
    shortDescription: "\uC774\uC131\uACFC \uB17C\uB9AC\uB85C \uC0AC\uAC74\uC744 \uD30C\uD5E4\uCE58\uB294 \uC5D8\uB9AC\uD2B8 \uAC80\uC0AC",
    allowedFaceTypes: ["SHARP_COOL", "INTELLECTUAL_SERIOUS"],
    vector: { power: 10, elegance: 22, intellect: 42, warmth: 8, mystery: 18 },
    genres: ["\uBC95\uC815", "\uBC94\uC8C4", "\uBBF8\uC2A4\uD130\uB9AC"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uB0C9\uCCA0\uD55C \uAC80\uC0AC. \uC870\uC6A9\uD55C\uB370 \uC7A5\uBA74\uC744 \uC7A1\uB294 \uCABD."
  },
  {
    id: "chaebol-heir",
    name: "\uC7AC\uBC8C\uAC00 \uD6C4\uACC4\uC790",
    title: "\uD654\uB824\uD568\uBCF4\uB2E4 \uBB34\uAC8C\uAC10\uC774 \uBA3C\uC800 \uBCF4\uC774\uB294 \uC778\uBB3C",
    shortDescription: "\uAD8C\uB825\uACFC \uCC45\uC784\uC744 \uB3D9\uC2DC\uC5D0 \uC9CA\uC5B4\uC9C4 \uAE30\uC5C5 \uD6C4\uACC4\uC790",
    allowedFaceTypes: ["SHARP_COOL", "ELEGANT_REFINED", "INTELLECTUAL_SERIOUS"],
    vector: { power: 18, elegance: 38, intellect: 26, warmth: 10, mystery: 8 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uB85C\uB9E8\uC2A4"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "male",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uC7AC\uBC8C\uAC00 \uD6C4\uACC4\uC790. \uC870\uC6A9\uD55C\uB370 \uC874\uC7AC\uAC10\uC774 \uD070 \uCABD."
  },
  {
    id: "cold-ceo",
    name: "\uB0C9\uBBF8\uB0A8 CEO",
    title: "\uB9D0\uC218\uBCF4\uB2E4 \uC874\uC7AC\uAC10\uC774 \uBA3C\uC800 \uC624\uB294 \uC778\uBB3C",
    shortDescription: "\uCC28\uAC11\uC9C0\uB9CC \uAC15\uD55C \uCE74\uB9AC\uC2A4\uB9C8\uB97C \uAC00\uC9C4 \uAE30\uC5C5 \uB9AC\uB354",
    allowedFaceTypes: ["SHARP_COOL", "ELEGANT_REFINED"],
    vector: { power: 18, elegance: 38, intellect: 25, warmth: 5, mystery: 14 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uB85C\uB9E8\uC2A4", "\uB290\uC640\uB974"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "male",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uB0C9\uBBF8\uB0A8 CEO. \uB9D0\uC218\uBCF4\uB2E4 \uC874\uC7AC\uAC10\uC774 \uBA3C\uC800 \uB0A8\uB294 \uD0C0\uC785."
  },
  {
    id: "young-monarch",
    name: "\uC0AC\uADF9\uC758 \uC80A\uC740 \uAD70\uC8FC",
    title: "\uB9D0\uC218\uBCF4\uB2E4 \uACB0\uB2E8\uC774 \uBA3C\uC800 \uBCF4\uC774\uB294 \uC778\uBB3C",
    shortDescription: "\uB098\uB77C\uB97C \uC774\uB044\uB294 \uC80A\uACE0 \uACB0\uB2E8\uB825 \uC788\uB294 \uC655",
    allowedFaceTypes: ["SHARP_COOL", "INTELLECTUAL_SERIOUS", "CHARISMATIC_INTENSE"],
    vector: { power: 24, elegance: 26, intellect: 26, warmth: 10, mystery: 14 },
    genres: ["\uC0AC\uADF9", "\uD310\uD0C0\uC9C0", "\uB4DC\uB77C\uB9C8"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "male",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uC0AC\uADF9\uC758 \uC80A\uC740 \uAD70\uC8FC. \uB9D0\uBCF4\uB2E4 \uACB0\uC774 \uBA3C\uC800 \uB0A8\uB294 \uD0C0\uC785."
  },
  {
    id: "secret-agent",
    name: "\uBE44\uBC00\uC694\uC6D0",
    title: "\uD3C9\uC628\uD55C\uB370 \uBE44\uBC00\uC774 \uC788\uC5B4 \uBCF4\uC774\uB294 \uC778\uBB3C",
    shortDescription: "\uC815\uCCB4\uB97C \uC228\uAE30\uACE0 \uC784\uBB34\uB97C \uC218\uD589\uD558\uB294 \uCCA9\uBCF4 \uC694\uC6D0",
    allowedFaceTypes: ["SHARP_COOL", "MYSTERIOUS_DARK", "CHARISMATIC_INTENSE"],
    vector: { power: 25, elegance: 18, intellect: 25, warmth: 7, mystery: 25 },
    genres: ["\uC561\uC158", "\uC2A4\uB9B4\uB7EC", "\uBC94\uC8C4"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uBE44\uBC00\uC694\uC6D0. \uD3C9\uC628\uD55C\uB370 \uC228\uAE34 \uAC8C \uC788\uC5B4 \uBCF4\uC774\uB294 \uCABD."
  },
  // ───────────────────────────────────────────────
  // ELEGANT_REFINED 계열 (느와르/거친 역할 금지)
  // ───────────────────────────────────────────────
  {
    id: "chaebol-heiress",
    name: "\uC7AC\uBC8C\uAC00 \uC0C1\uC18D\uB140",
    title: "\uC6B0\uC544\uD55C\uB370 \uC27D\uAC8C \uD754\uB4E4\uB9AC\uC9C0 \uC54A\uB294 \uC778\uBB3C",
    shortDescription: "\uAD8C\uB825\uACFC \uCC45\uC784\uC744 \uB3D9\uC2DC\uC5D0 \uC9CA\uC5B4\uC9C4 \uAE30\uC5C5 \uC0C1\uC18D\uB140",
    allowedFaceTypes: ["ELEGANT_REFINED"],
    vector: { power: 8, elegance: 52, intellect: 20, warmth: 12, mystery: 8 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uB85C\uB9E8\uC2A4"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "female",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uC7AC\uBC8C\uAC00 \uC0C1\uC18D\uB140. \uC6B0\uC544\uD55C\uB370 \uC874\uC7AC\uAC10\uC774 \uD070 \uCABD."
  },
  {
    id: "cold-ceo-female",
    name: "\uB0C9\uBBF8\uB140 CEO",
    title: "\uCC28\uBD84\uD55C\uB370 \uB2E8\uBC88\uC5D0 \uC911\uC2EC\uC744 \uC7A1\uB294 \uC778\uBB3C",
    shortDescription: "\uCC28\uAC11\uC9C0\uB9CC \uAC15\uD55C \uCE74\uB9AC\uC2A4\uB9C8\uB97C \uAC00\uC9C4 \uAE30\uC5C5 \uB9AC\uB354",
    allowedFaceTypes: ["ELEGANT_REFINED", "SHARP_COOL"],
    vector: { power: 10, elegance: 46, intellect: 24, warmth: 8, mystery: 12 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uB85C\uB9E8\uC2A4", "\uB290\uC640\uB974"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "female",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uB0C9\uBBF8\uB140 CEO. \uB9D0\uBCF4\uB2E4 \uBD84\uC704\uAE30\uB85C \uC7A5\uBA74\uC744 \uC7A1\uB294 \uD0C0\uC785."
  },
  {
    id: "young-queen",
    name: "\uC0AC\uADF9\uC758 \uC80A\uC740 \uC5EC\uAD70\uC8FC",
    title: "\uBD80\uB4DC\uB7EC\uC6CC \uBCF4\uC5EC\uB3C4 \uACB0\uB2E8\uC774 \uC120\uBA85\uD55C \uC778\uBB3C",
    shortDescription: "\uB098\uB77C\uB97C \uC774\uB044\uB294 \uC80A\uACE0 \uB2E8\uB2E8\uD55C \uC5EC\uC131 \uAD70\uC8FC",
    allowedFaceTypes: ["ELEGANT_REFINED", "INTELLECTUAL_SERIOUS"],
    vector: { power: 12, elegance: 38, intellect: 26, warmth: 12, mystery: 12 },
    genres: ["\uC0AC\uADF9", "\uD310\uD0C0\uC9C0", "\uB4DC\uB77C\uB9C8"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "female",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uC0AC\uADF9\uC758 \uC80A\uC740 \uC5EC\uAD70\uC8FC. \uBD80\uB4DC\uB7EC\uC6CC \uBCF4\uC5EC\uB3C4 \uBB34\uAC8C\uAC10\uC774 \uB0A8\uB294 \uD0C0\uC785."
  },
  {
    id: "romance-second-lead-female",
    name: "\uB85C\uB9E8\uC2A4 \uC11C\uBE0C\uB140",
    title: "\uC55E\uBCF4\uB2E4 \uC606\uC5D0\uC11C \uB354 \uC624\uB798 \uB0A8\uB294 \uC778\uBB3C",
    shortDescription: "\uC8FC\uC778\uACF5\uC744 \uB3D5\uC9C0\uB9CC \uC0AC\uB791\uC740 \uC774\uB8E8\uC5B4\uC9C0\uC9C0 \uC54A\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["ELEGANT_REFINED", "WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 5, elegance: 30, intellect: 12, warmth: 40, mystery: 13 },
    genres: ["\uB85C\uB9E8\uC2A4", "\uCCAD\uCD98"],
    roleType: "\uC11C\uBE0C",
    genderTone: "female",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uB85C\uB9E8\uC2A4 \uC11C\uBE0C\uB140. \uC9C0\uB098\uAC04 \uB4A4\uAC00 \uB354 \uAE30\uC5B5\uB098\uB294 \uCABD."
  },
  // ───────────────────────────────────────────────
  // INTELLECTUAL_SERIOUS 계열
  // ───────────────────────────────────────────────
  {
    id: "genius-profiler",
    name: "\uCC9C\uC7AC \uD504\uB85C\uD30C\uC77C\uB7EC",
    title: "\uD06C\uAC8C \uD754\uB4E4\uB9AC\uC9C0 \uC54A\uC544\uB3C4 \uC774\uBBF8 \uC77D\uACE0 \uC788\uB294 \uC778\uBB3C",
    shortDescription: "\uBC94\uC8C4\uC790\uC758 \uC2EC\uB9AC\uB97C \uC77D\uC5B4\uB0B4\uB294 \uBD84\uC11D \uC804\uBB38\uAC00",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "SHARP_COOL", "MYSTERIOUS_DARK"],
    vector: { power: 8, elegance: 18, intellect: 48, warmth: 5, mystery: 21 },
    genres: ["\uBC94\uC8C4", "\uC2A4\uB9B4\uB7EC", "\uBBF8\uC2A4\uD130\uB9AC"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uCC9C\uC7AC \uD504\uB85C\uD30C\uC77C\uB7EC. \uCC28\uBD84\uD55C\uB370 \uB2E4 \uBCF4\uACE0 \uC788\uC744 \uAC83 \uAC19\uC740 \uCABD."
  },
  {
    id: "genius-hacker",
    name: "\uCC9C\uC7AC \uD574\uCEE4",
    title: "\uC815\uBA74\uBCF4\uB2E4 \uB4A4\uC5D0\uC11C \uD310\uC744 \uBC14\uAFB8\uB294 \uC778\uBB3C",
    shortDescription: "\uB514\uC9C0\uD138 \uC138\uACC4\uC5D0\uC11C \uBAA8\uB4E0 \uAC83\uC744 \uAFF0\uB6AB\uB294 \uCC9C\uC7AC \uD574\uCEE4",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "MYSTERIOUS_DARK", "SHARP_COOL"],
    vector: { power: 8, elegance: 12, intellect: 48, warmth: 5, mystery: 27 },
    genres: ["\uC2A4\uB9B4\uB7EC", "\uBC94\uC8C4", "\uBBF8\uC2A4\uD130\uB9AC"],
    roleType: "\uC870\uB825\uC790",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uCC9C\uC7AC \uD574\uCEE4. \uC870\uC6A9\uD55C\uB370 \uD310\uC774 \uBC14\uB00C\uB294 \uB290\uB08C."
  },
  {
    id: "medical-elite-doctor",
    name: "\uBA54\uB514\uCEEC \uB4DC\uB77C\uB9C8 \uC5D8\uB9AC\uD2B8 \uC758\uC0AC",
    title: "\uCE68\uCC29\uD568\uC774 \uBA3C\uC800 \uBBFF\uC74C\uC744 \uB9CC\uB4DC\uB294 \uC778\uBB3C",
    shortDescription: "\uC0DD\uBA85\uC744 \uC0B4\uB9AC\uB294 \uB0C9\uC815\uD558\uACE0 \uB6F0\uC5B4\uB09C \uC2E4\uB825\uC758 \uC758\uC0AC",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "SHARP_COOL"],
    vector: { power: 8, elegance: 26, intellect: 46, warmth: 12, mystery: 8 },
    genres: ["\uBA54\uB514\uCEEC", "\uB4DC\uB77C\uB9C8"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uBA54\uB514\uCEEC \uB4DC\uB77C\uB9C8 \uC5D8\uB9AC\uD2B8 \uC758\uC0AC. \uCE68\uCC29\uD55C\uB370 \uBBFF\uC74C\uC774 \uAC00\uB294 \uCABD."
  },
  {
    id: "palace-strategist",
    name: "\uAD81\uC911 \uCC45\uC0AC",
    title: "\uC55E\uBCF4\uB2E4 \uB4A4\uC5D0\uC11C \uB354 \uD06C\uAC8C \uC791\uB3D9\uD558\uB294 \uC778\uBB3C",
    shortDescription: "\uC655\uC744 \uBCF4\uC88C\uD558\uBA70 \uC804\uB7B5\uC744 \uC138\uC6B0\uB294 \uC9C0\uB7B5\uAC00",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "MYSTERIOUS_DARK", "SHARP_COOL"],
    vector: { power: 8, elegance: 18, intellect: 48, warmth: 10, mystery: 16 },
    genres: ["\uC0AC\uADF9", "\uBBF8\uC2A4\uD130\uB9AC", "\uD310\uD0C0\uC9C0"],
    roleType: "\uC870\uB825\uC790",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uAD81\uC911 \uCC45\uC0AC. \uC870\uC6A9\uD788 \uD310\uC744 \uC6C0\uC9C1\uC774\uB294 \uD0C0\uC785."
  },
  {
    id: "investigative-reporter",
    name: "\uD0D0\uC0AC\uBCF4\uB3C4 \uAE30\uC790",
    title: "\uB05D\uAE4C\uC9C0 \uC774\uC720\uB97C \uCC3E\uB294 \uC778\uBB3C",
    shortDescription: "\uC9C4\uC2E4\uC744 \uB05D\uAE4C\uC9C0 \uD30C\uD5E4\uCE58\uB294 \uC9D1\uC694\uD55C \uAE30\uC790",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "WARM_FRIENDLY", "SHARP_COOL"],
    vector: { power: 12, elegance: 14, intellect: 38, warmth: 22, mystery: 14 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uBC94\uC8C4", "\uBBF8\uC2A4\uD130\uB9AC"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uD0D0\uC0AC\uBCF4\uB3C4 \uAE30\uC790. \uC870\uC6A9\uD788 \uB05D\uAE4C\uC9C0 \uD30C\uACE0\uB4DC\uB294 \uD0C0\uC785."
  },
  {
    id: "political-aide",
    name: "\uC57C\uB9DD \uC788\uB294 \uC815\uCE58 \uBCF4\uC88C\uAD00",
    title: "\uD55C \uAC78\uC74C \uB4A4\uC5D0\uC11C \uB354 \uD070 \uD310\uC744 \uBCF4\uB294 \uC778\uBB3C",
    shortDescription: "\uC55E\uC5D0 \uB098\uC11C\uC9C0 \uC54A\uC544\uB3C4 \uD750\uB984\uC744 \uC124\uACC4\uD558\uB294 \uC815\uCE58 \uBCF4\uC88C\uAD00",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "SHARP_COOL"],
    vector: { power: 12, elegance: 24, intellect: 44, warmth: 8, mystery: 12 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uBC95\uC815", "\uB290\uC640\uB974"],
    roleType: "\uC870\uB825\uC790",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uC57C\uB9DD \uC788\uB294 \uC815\uCE58 \uBCF4\uC88C\uAD00. \uC870\uC6A9\uD55C\uB370 \uC18D\uB3C4\uAC10 \uC788\uAC8C \uD310\uC744 \uC77D\uB294 \uCABD."
  },
  // ───────────────────────────────────────────────
  // WARM_FRIENDLY / SOFT_YOUTH 계열 (느와르/강인 계열 금지)
  // ───────────────────────────────────────────────
  {
    id: "romance-lead",
    name: "\uB85C\uB9E8\uC2A4 \uC8FC\uC778\uACF5",
    title: "\uAD00\uACC4\uC758 \uD55C\uAC00\uC6B4\uB370\uB97C \uC9C0\uB098\uAC00\uB294 \uC778\uBB3C",
    shortDescription: "\uC0AC\uB791 \uC774\uC57C\uAE30\uC758 \uC911\uC2EC\uC5D0 \uC11C \uC788\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 5, elegance: 18, intellect: 10, warmth: 55, mystery: 12 },
    genres: ["\uB85C\uB9E8\uC2A4", "\uB4DC\uB77C\uB9C8"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uB85C\uB9E8\uC2A4 \uC8FC\uC778\uACF5. \uD55C \uC7A5\uBA74\uBCF4\uB2E4 \uAD00\uACC4\uC131\uC774 \uBA3C\uC800 \uB5A0\uC624\uB974\uB294 \uD0C0\uC785."
  },
  {
    id: "romance-second-lead-male",
    name: "\uB85C\uB9E8\uC2A4 \uC11C\uBE0C\uB0A8",
    title: "\uC55E\uBCF4\uB2E4 \uC606\uC5D0\uC11C \uB354 \uC624\uB798 \uB0A8\uB294 \uC778\uBB3C",
    shortDescription: "\uC8FC\uC778\uACF5\uC744 \uB3D5\uC9C0\uB9CC \uC0AC\uB791\uC740 \uC774\uB8E8\uC5B4\uC9C0\uC9C0 \uC54A\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH", "MYSTERIOUS_DARK"],
    vector: { power: 8, elegance: 18, intellect: 14, warmth: 38, mystery: 22 },
    genres: ["\uB85C\uB9E8\uC2A4", "\uCCAD\uCD98"],
    roleType: "\uC11C\uBE0C",
    genderTone: "male",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uB85C\uB9E8\uC2A4 \uC11C\uBE0C\uB0A8. \uC9C0\uB098\uAC04 \uB4A4\uAC00 \uB354 \uAE30\uC5B5\uB098\uB294 \uCABD."
  },
  {
    id: "best-friend",
    name: "\uC8FC\uC778\uACF5\uC758 \uBBFF\uC74C\uC9C1\uD55C \uCE5C\uAD6C",
    title: "\uACC1\uC5D0 \uC788\uC744\uC218\uB85D \uB354 \uC88B\uC544\uC9C0\uB294 \uC778\uBB3C",
    shortDescription: "\uD56D\uC0C1 \uACC1\uC5D0\uC11C \uD798\uC774 \uB418\uC5B4\uC8FC\uB294 \uBBFF\uC74C\uC9C1\uD55C \uCE5C\uAD6C",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 8, elegance: 10, intellect: 10, warmth: 58, mystery: 14 },
    genres: ["\uCCAD\uCD98", "\uB4DC\uB77C\uB9C8", "\uB85C\uB9E8\uC2A4"],
    roleType: "\uC870\uB825\uC790",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uC8FC\uC778\uACF5\uC758 \uBBFF\uC74C\uC9C1\uD55C \uCE5C\uAD6C. \uACC1\uC5D0 \uB458\uC218\uB85D \uB354 \uBE5B\uB098\uB294 \uD0C0\uC785."
  },
  {
    id: "campus-romance-lead",
    name: "\uCEA0\uD37C\uC2A4 \uB85C\uB9E8\uC2A4 \uC8FC\uC778\uACF5",
    title: "\uD48B\uD48B\uD55C\uB370 \uADF8\uB0E5 \uAC00\uBCCD\uC9C0\uB9CC\uC740 \uC54A\uC740 \uC778\uBB3C",
    shortDescription: "\uB300\uD559\uC744 \uBC30\uACBD\uC73C\uB85C \uC0AC\uB791\uC744 \uADF8\uB824\uAC00\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["SOFT_YOUTH", "WARM_FRIENDLY"],
    vector: { power: 5, elegance: 14, intellect: 12, warmth: 56, mystery: 13 },
    genres: ["\uCCAD\uCD98", "\uB85C\uB9E8\uC2A4", "\uB4DC\uB77C\uB9C8"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uCEA0\uD37C\uC2A4 \uB85C\uB9E8\uC2A4 \uC8FC\uC778\uACF5. \uC0B0\uB73B\uD55C\uB370 \uC11C\uC0AC\uAC00 \uBD99\uB294 \uCABD."
  },
  {
    id: "band-leader",
    name: "\uCCAD\uCD98\uBB3C \uBC34\uB4DC\uBD80 \uC120\uBC30",
    title: "\uB4F1\uC7A5\uD558\uC790\uB9C8\uC790 \uB9AC\uB4EC\uC774 \uC0DD\uAE30\uB294 \uC778\uBB3C",
    shortDescription: "\uC74C\uC545\uACFC \uC5F4\uC815\uC73C\uB85C \uBB34\uB300\uB97C \uC774\uB044\uB294 \uBC34\uB4DC \uB9AC\uB354",
    allowedFaceTypes: ["SOFT_YOUTH", "WARM_FRIENDLY", "CHARISMATIC_INTENSE"],
    vector: { power: 15, elegance: 12, intellect: 10, warmth: 38, mystery: 25 },
    genres: ["\uCCAD\uCD98", "\uB85C\uB9E8\uC2A4", "\uB4DC\uB77C\uB9C8"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uCCAD\uCD98\uBB3C \uBC34\uB4DC\uBD80 \uC120\uBC30. \uB4F1\uC7A5\uB9CC\uC73C\uB85C \uBC15\uC790\uAC00 \uC0DD\uAE30\uB294 \uD0C0\uC785."
  },
  {
    id: "warm-lawyer",
    name: "\uB530\uB73B\uD55C \uB3D9\uB124 \uBCC0\uD638\uC0AC",
    title: "\uB2E8\uD638\uD568\uBCF4\uB2E4 \uC0AC\uB78C \uCABD\uC73C\uB85C \uAE30\uC6B0\uB294 \uC778\uBB3C",
    shortDescription: "\uC0AC\uB78C\uC744 \uBA3C\uC800 \uC0DD\uAC01\uD558\uB294 \uC778\uAC04\uC801\uC778 \uBCC0\uD638\uC0AC",
    allowedFaceTypes: ["WARM_FRIENDLY", "INTELLECTUAL_SERIOUS"],
    vector: { power: 10, elegance: 14, intellect: 32, warmth: 38, mystery: 6 },
    genres: ["\uBC95\uC815", "\uB4DC\uB77C\uB9C8", "\uB85C\uB9E8\uC2A4"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uB530\uB73B\uD55C \uB3D9\uB124 \uBCC0\uD638\uC0AC. \uBD80\uB4DC\uB7FD\uC9C0\uB9CC \uC57D\uD558\uC9C0 \uC54A\uC740 \uD0C0\uC785."
  },
  {
    id: "cafe-owner",
    name: "\uAC10\uC131 \uCE74\uD398 \uC0AC\uC7A5",
    title: "\uBD84\uC704\uAE30\uB85C \uC7A5\uBA74\uC744 \uBD99\uC7A1\uB294 \uC778\uBB3C",
    shortDescription: "\uB530\uB73B\uD55C \uBD84\uC704\uAE30\uB85C \uC0AC\uB78C\uB4E4\uC744 \uB04C\uC5B4\uB4E4\uC774\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 5, elegance: 22, intellect: 10, warmth: 50, mystery: 13 },
    genres: ["\uB85C\uB9E8\uC2A4", "\uB4DC\uB77C\uB9C8", "\uCCAD\uCD98"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uAC10\uC131 \uCE74\uD398 \uC0AC\uC7A5. \uBD80\uB4DC\uB7FD\uACE0 \uC740\uADFC\uD558\uAC8C \uAE30\uC5B5\uB098\uB294 \uD0C0\uC785."
  },
  // ───────────────────────────────────────────────
  // MYSTERIOUS_DARK 계열
  // ───────────────────────────────────────────────
  {
    id: "mystery-writer",
    name: "\uBBF8\uC2A4\uD130\uB9AC \uC791\uAC00\uD615 \uC778\uBB3C",
    title: "\uC124\uBA85\uBCF4\uB2E4 \uC5EC\uBC31\uC774 \uBA3C\uC800 \uAD81\uAE08\uD55C \uC778\uBB3C",
    shortDescription: "\uC0AC\uAC74\uC758 \uBCF8\uC9C8\uC744 \uAFF0\uB6AB\uC5B4\uBCF4\uB294 \uD1B5\uCC30\uB825 \uC788\uB294 \uC791\uAC00",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "INTELLECTUAL_SERIOUS"],
    vector: { power: 5, elegance: 18, intellect: 28, warmth: 12, mystery: 37 },
    genres: ["\uBBF8\uC2A4\uD130\uB9AC", "\uC2A4\uB9B4\uB7EC", "\uD310\uD0C0\uC9C0"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uBBF8\uC2A4\uD130\uB9AC \uC791\uAC00\uD615 \uC778\uBB3C. \uB2E4 \uBCF4\uC5EC\uC8FC\uC9C0 \uC54A\uC544 \uB354 \uAD81\uAE08\uD55C \uCABD."
  },
  {
    id: "fantasy-advisor",
    name: "\uD310\uD0C0\uC9C0 \uC138\uACC4\uC758 \uB9C8\uBC95 \uCC38\uBAA8",
    title: "\uC870\uC6A9\uD55C\uB370 \uC138\uACC4\uAD00\uC744 \uB113\uD788\uB294 \uC778\uBB3C",
    shortDescription: "\uB9C8\uBC95\uACFC \uC9C0\uD61C\uB85C \uC8FC\uC778\uACF5\uC744 \uB3D5\uB294 \uC870\uC5B8\uC790",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "INTELLECTUAL_SERIOUS"],
    vector: { power: 5, elegance: 18, intellect: 25, warmth: 12, mystery: 40 },
    genres: ["\uD310\uD0C0\uC9C0", "\uC0AC\uADF9", "\uBBF8\uC2A4\uD130\uB9AC"],
    roleType: "\uC870\uB825\uC790",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uCE90\uC2A4\uD305 \uACB0\uACFC\uB294 \uD310\uD0C0\uC9C0 \uC138\uACC4\uC758 \uB9C8\uBC95 \uCC38\uBAA8. \uC870\uC6A9\uD55C\uB370 \uC138\uACC4\uAD00\uC774 \uC0DD\uAE30\uB294 \uD0C0\uC785."
  },
  {
    id: "suspense-suspect",
    name: "\uC11C\uC2A4\uD39C\uC2A4\uBB3C \uD575\uC2EC \uC6A9\uC758\uC790",
    title: "\uC88B\uC740 \uCABD\uC778\uC9C0 \uC27D\uAC8C \uB2E8\uC815\uD560 \uC218 \uC5C6\uB294 \uC778\uBB3C",
    shortDescription: "\uC9C4\uC2E4\uC744 \uC228\uAE30\uACE0 \uC788\uB294 \uC758\uC2EC\uC758 \uC911\uC2EC \uC778\uBB3C",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "CHARISMATIC_INTENSE", "SHARP_COOL"],
    vector: { power: 14, elegance: 16, intellect: 20, warmth: 8, mystery: 42 },
    genres: ["\uC2A4\uB9B4\uB7EC", "\uBBF8\uC2A4\uD130\uB9AC", "\uBC94\uC8C4"],
    roleType: "\uB77C\uC774\uBC8C",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uACB0\uACFC\uB294 \uC11C\uC2A4\uD39C\uC2A4\uBB3C \uD575\uC2EC \uC6A9\uC758\uC790. \uD3C9\uC628\uD55C\uB370 \uACC4\uC18D \uC2E0\uACBD \uC4F0\uC774\uB294 \uD0C0\uC785."
  },
  {
    id: "mysterious-helper",
    name: "\uBE44\uBC00\uC744 \uAC00\uC9C4 \uC870\uB825\uC790",
    title: "\uC124\uBA85\uB418\uC9C0 \uC54A\uC740 \uBC30\uACBD\uC774 \uB354 \uAD81\uAE08\uD55C \uC778\uBB3C",
    shortDescription: "\uC8FC\uC778\uACF5\uC744 \uB3D5\uC9C0\uB9CC \uC27D\uAC8C \uB2E4 \uC77D\uD788\uC9C0 \uC54A\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "WARM_FRIENDLY"],
    vector: { power: 5, elegance: 15, intellect: 22, warmth: 25, mystery: 33 },
    genres: ["\uBBF8\uC2A4\uD130\uB9AC", "\uD310\uD0C0\uC9C0", "\uC2A4\uB9B4\uB7EC"],
    roleType: "\uC870\uB825\uC790",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uBE44\uBC00\uC744 \uAC00\uC9C4 \uC870\uB825\uC790. \uCE5C\uC808\uD55C\uB370 \uB05D\uAE4C\uC9C0 \uB2E4 \uBCF4\uC774\uC9C4 \uC54A\uB294 \uD0C0\uC785."
  },
  // ───────────────────────────────────────────────
  // CHARISMATIC_INTENSE 계열
  // ───────────────────────────────────────────────
  {
    id: "revenge-mastermind",
    name: "\uBCF5\uC218\uADF9 \uD575\uC2EC \uC778\uBB3C",
    title: "\uBC1D\uAC8C \uD758\uB824 \uBCF4\uB0B4\uC9C0 \uC54A\uB294 \uC778\uBB3C",
    shortDescription: "\uACFC\uAC70\uB97C \uB418\uAC1A\uAE30 \uC704\uD574 \uCE58\uBC00\uD558\uAC8C \uC6C0\uC9C1\uC774\uB294 \uC778\uBB3C",
    allowedFaceTypes: ["CHARISMATIC_INTENSE", "MYSTERIOUS_DARK", "SHARP_COOL"],
    vector: { power: 22, elegance: 18, intellect: 26, warmth: 8, mystery: 26 },
    genres: ["\uB4DC\uB77C\uB9C8", "\uB290\uC640\uB974", "\uBC94\uC8C4"],
    roleType: "\uC8FC\uC778\uACF5",
    genderTone: "neutral",
    shareCopy: "\uB0B4 \uBA54\uC778 \uCE90\uB9AD\uD130\uB294 \uBCF5\uC218\uADF9 \uD575\uC2EC \uC778\uBB3C. \uC6C3\uACE0 \uC788\uC5B4\uB3C4 \uC0AC\uC5F0\uC774 \uB290\uAEF4\uC9C0\uB294 \uCABD."
  }
];
function cosineSimilarity2(a, b) {
  const keys = ["power", "elegance", "intellect", "warmth", "mystery"];
  const dot = keys.reduce((sum, k) => sum + a[k] * b[k], 0);
  const magA = Math.sqrt(keys.reduce((sum, k) => sum + a[k] ** 2, 0));
  const magB = Math.sqrt(keys.reduce((sum, k) => sum + b[k] ** 2, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}
__name(cosineSimilarity2, "cosineSimilarity2");
__name2(cosineSimilarity2, "cosineSimilarity");
function toDisplayScore(similarity, allSimilarities, rank) {
  const min = Math.min(...allSimilarities);
  const max = Math.max(...allSimilarities);
  const range = max - min;
  if (range < 1e-3) return rank === 0 ? 88 : rank === 1 ? 80 : 74;
  const normalized = (similarity - min) / range;
  const [low, high] = rank === 0 ? [82, 95] : rank === 1 ? [75, 85] : [70, 80];
  return Math.round(low + normalized * (high - low));
}
__name(toDisplayScore, "toDisplayScore");
__name2(toDisplayScore, "toDisplayScore");
function buildReason(faceType, characterName) {
  const contextMap = {
    RUGGED: "\uAC15\uC778\uD558\uACE0 \uAC70\uCE5C \uC778\uC0C1\uC774",
    SHARP_COOL: "\uB0A0\uCE74\uB86D\uACE0 \uCC28\uAC00\uC6B4 \uC778\uC0C1\uC774",
    WARM_FRIENDLY: "\uB530\uB73B\uD558\uACE0 \uCE5C\uADFC\uD55C \uBD84\uC704\uAE30\uAC00",
    ELEGANT_REFINED: "\uC6B0\uC544\uD558\uACE0 \uC815\uB3C8\uB41C \uC778\uC0C1\uC774",
    INTELLECTUAL_SERIOUS: "\uC9C0\uC801\uC774\uACE0 \uC9C4\uC9C0\uD55C \uBD84\uC704\uAE30\uAC00",
    SOFT_YOUTH: "\uBD80\uB4DC\uB7FD\uACE0 \uCCAD\uCD98\uC801\uC778 \uC5D0\uB108\uC9C0\uAC00",
    MYSTERIOUS_DARK: "\uC2E0\uBE44\uB86D\uACE0 \uC5B4\uB450\uC6B4 \uBD84\uC704\uAE30\uAC00",
    CHARISMATIC_INTENSE: "\uAC15\uB82C\uD558\uACE0 \uCE74\uB9AC\uC2A4\uB9C8 \uC788\uB294 \uC874\uC7AC\uAC10\uC774"
  };
  return `${contextMap[faceType]} ${characterName} \uC5ED\uD560\uACFC \uC798 \uC5B4\uC6B8\uB9BD\uB2C8\uB2E4.`;
}
__name(buildReason, "buildReason");
__name2(buildReason, "buildReason");
function selectCharacter(faceType, vector, genderPreference) {
  let candidates = characters.filter((c) => c.allowedFaceTypes.includes(faceType));
  if (genderPreference) {
    const filtered = candidates.filter(
      (c) => c.genderTone === "neutral" || c.genderTone === genderPreference
    );
    candidates = filtered.length >= 3 ? filtered : candidates.filter((c) => c.genderTone === "neutral");
  }
  if (candidates.length < 3) {
    candidates = genderPreference ? characters.filter((c) => c.genderTone === "neutral" || c.genderTone === genderPreference) : [...characters];
  }
  const scored = candidates.map((character) => ({
    character,
    similarity: cosineSimilarity2(vector, character.vector)
  })).sort((a, b) => b.similarity - a.similarity);
  const allSims = scored.map((s) => s.similarity);
  const toMatch = /* @__PURE__ */ __name2((item, rank) => ({
    character: item.character,
    matchScore: toDisplayScore(item.similarity, allSims, rank),
    reason: buildReason(faceType, item.character.name)
  }), "toMatch");
  const [first, second, third] = scored;
  return {
    faceType,
    vector,
    main: toMatch(first, 0),
    supports: [toMatch(second, 1), toMatch(third, 2)],
    summary: ""
    // 호출 측에서 FaceAnalysisResult.summary로 채움
  };
}
__name(selectCharacter, "selectCharacter");
__name2(selectCharacter, "selectCharacter");
var onRequestPost = /* @__PURE__ */ __name2(async ({ request, env }) => {
  try {
    const body = await request.json();
    if (!body.fileName) {
      return Response.json({ error: "fileName is required" }, { status: 400 });
    }
    if (!body.imageDataUrl) {
      return Response.json({ error: "imageDataUrl is required" }, { status: 400 });
    }
    if (!/^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(body.imageDataUrl)) {
      return Response.json({ error: "imageDataUrl must be an image data URL" }, { status: 400 });
    }
    const apiKey = env.OPENAI_API_KEY;
    const mockMode = env.AI_MOCK_MODE !== "false";
    let analysis = null;
    if (!mockMode && apiKey && body.imageDataUrl) {
      try {
        analysis = await callVisionAPI(apiKey, body.imageDataUrl, env.OPENAI_MODEL);
      } catch (error) {
        console.error("Vision API failed, falling back:", error);
      }
    }
    if (!analysis) {
      analysis = fallbackClassify(body.genderPreference);
    }
    const casting = selectCharacter(
      analysis.faceType,
      analysis.vector,
      body.genderPreference
    );
    casting.summary = analysis.summary;
    casting.isFallback = analysis.isFallback;
    return Response.json({ result: casting });
  } catch (error) {
    console.error("Analyze API route failed:", error);
    return Response.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}, "onRequestPost");
var routes = [
  {
    routePath: "/api/analyze",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-EpCQA5/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-EpCQA5/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.6147314703881293.js.map
