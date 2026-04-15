export type FaceType =
  | "RUGGED"
  | "SHARP_COOL"
  | "WARM_FRIENDLY"
  | "ELEGANT_REFINED"
  | "INTELLECTUAL_SERIOUS"
  | "SOFT_YOUTH"
  | "MYSTERIOUS_DARK"
  | "CHARISMATIC_INTENSE";

/** 5차원 인상 벡터 — 항상 합계 100 */
export type FaceVector = {
  power: number;     // 강인함 (거칠고 터프한 존재감)
  elegance: number;  // 우아함 (정돈되고 세련된 인상)
  intellect: number; // 지성   (냉철하고 분석적인 눈빛)
  warmth: number;    // 감성   (따뜻하고 친근한 분위기)
  mystery: number;   // 신비   (어둡고 속을 알 수 없는 분위기)
};

export type CharacterGenderTone = "male" | "female" | "neutral";

export type CharacterGenre =
  | "법정"
  | "범죄"
  | "드라마"
  | "로맨스"
  | "스릴러"
  | "액션"
  | "청춘"
  | "사극"
  | "느와르"
  | "메디컬"
  | "미스터리"
  | "판타지";

export type CharacterRoleType = "주인공" | "서브" | "조력자" | "라이벌";

export type Character = {
  id: string;
  name: string;
  title: string;
  shortDescription: string;
  /** 이 캐릭터가 나올 수 있는 얼굴 타입. 이 목록에 없는 타입에선 절대 후보가 되지 않음 */
  allowedFaceTypes: FaceType[];
  /** 캐릭터의 5차원 인상 벡터 — 합계 100 */
  vector: FaceVector;
  genres: CharacterGenre[];
  roleType: CharacterRoleType;
  genderTone: CharacterGenderTone;
  shareCopy: string;
};

export const characters: Character[] = [
  // ───────────────────────────────────────────────
  // RUGGED 전용 캐릭터 (로맨스/청춘 계열 절대 금지)
  // ───────────────────────────────────────────────
  {
    id: "violent-crimes-detective",
    name: "강력반 형사",
    title: "현장을 직접 밀고 가는 인물",
    shortDescription: "현장을 누비며 사건을 해결하는 행동파 형사",
    allowedFaceTypes: ["RUGGED", "CHARISMATIC_INTENSE"],
    vector: { power: 48, elegance: 5, intellect: 22, warmth: 10, mystery: 15 },
    genres: ["범죄", "액션", "스릴러"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 강력반 형사. 들어오자마자 장면이 살아나는 타입.",
  },
  {
    id: "villain-rival",
    name: "악역 라이벌",
    title: "장면의 긴장을 바꾸는 인물",
    shortDescription: "주인공과 강하게 대립하며 긴장을 만드는 인물",
    allowedFaceTypes: ["RUGGED", "CHARISMATIC_INTENSE", "MYSTERIOUS_DARK"],
    vector: { power: 35, elegance: 15, intellect: 18, warmth: 5, mystery: 27 },
    genres: ["드라마", "느와르", "범죄"],
    roleType: "라이벌",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 악역 라이벌. 조용한데 공기가 달라지는 타입.",
  },
  {
    id: "noir-strategist",
    name: "느와르 조직의 전략가",
    title: "낮은 톤으로 장면을 움켜쥐는 인물",
    shortDescription: "어둠 속에서 판을 설계하는 냉혹한 전략가",
    allowedFaceTypes: ["RUGGED", "CHARISMATIC_INTENSE", "MYSTERIOUS_DARK"],
    vector: { power: 32, elegance: 12, intellect: 25, warmth: 5, mystery: 26 },
    genres: ["느와르", "범죄", "스릴러"],
    roleType: "라이벌",
    genderTone: "neutral",
    shareCopy: "내 결과는 느와르 조직의 전략가. 낮은 톤인데도 긴장감이 큰 타입.",
  },

  // ───────────────────────────────────────────────
  // SHARP_COOL 계열
  // ───────────────────────────────────────────────
  {
    id: "cold-prosecutor",
    name: "냉철한 검사",
    title: "말보다 판단이 먼저 남는 인물",
    shortDescription: "이성과 논리로 사건을 파헤치는 엘리트 검사",
    allowedFaceTypes: ["SHARP_COOL", "INTELLECTUAL_SERIOUS"],
    vector: { power: 10, elegance: 22, intellect: 42, warmth: 8, mystery: 18 },
    genres: ["법정", "범죄", "미스터리"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 냉철한 검사. 조용한데 장면을 잡는 쪽.",
  },
  {
    id: "chaebol-heir",
    name: "재벌가 후계자",
    title: "화려함보다 무게감이 먼저 보이는 인물",
    shortDescription: "권력과 책임을 동시에 짊어진 기업 후계자",
    allowedFaceTypes: ["SHARP_COOL", "ELEGANT_REFINED", "INTELLECTUAL_SERIOUS"],
    vector: { power: 18, elegance: 38, intellect: 26, warmth: 10, mystery: 8 },
    genres: ["드라마", "로맨스"],
    roleType: "주인공",
    genderTone: "male",
    shareCopy: "내 메인 캐릭터는 재벌가 후계자. 조용한데 존재감이 큰 쪽.",
  },
  {
    id: "cold-ceo",
    name: "냉미남 CEO",
    title: "말수보다 존재감이 먼저 오는 인물",
    shortDescription: "차갑지만 강한 카리스마를 가진 기업 리더",
    allowedFaceTypes: ["SHARP_COOL", "ELEGANT_REFINED"],
    vector: { power: 18, elegance: 38, intellect: 25, warmth: 5, mystery: 14 },
    genres: ["드라마", "로맨스", "느와르"],
    roleType: "주인공",
    genderTone: "male",
    shareCopy: "내 메인 캐릭터는 냉미남 CEO. 말수보다 존재감이 먼저 남는 타입.",
  },
  {
    id: "young-monarch",
    name: "사극의 젊은 군주",
    title: "말수보다 결단이 먼저 보이는 인물",
    shortDescription: "나라를 이끄는 젊고 결단력 있는 왕",
    allowedFaceTypes: ["SHARP_COOL", "INTELLECTUAL_SERIOUS", "CHARISMATIC_INTENSE"],
    vector: { power: 24, elegance: 26, intellect: 26, warmth: 10, mystery: 14 },
    genres: ["사극", "판타지", "드라마"],
    roleType: "주인공",
    genderTone: "male",
    shareCopy: "내 결과는 사극의 젊은 군주. 말보다 결이 먼저 남는 타입.",
  },
  {
    id: "secret-agent",
    name: "비밀요원",
    title: "평온한데 비밀이 있어 보이는 인물",
    shortDescription: "정체를 숨기고 임무를 수행하는 첩보 요원",
    allowedFaceTypes: ["SHARP_COOL", "MYSTERIOUS_DARK", "CHARISMATIC_INTENSE"],
    vector: { power: 25, elegance: 18, intellect: 25, warmth: 7, mystery: 25 },
    genres: ["액션", "스릴러", "범죄"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 비밀요원. 평온한데 숨긴 게 있어 보이는 쪽.",
  },

  // ───────────────────────────────────────────────
  // ELEGANT_REFINED 계열 (느와르/거친 역할 금지)
  // ───────────────────────────────────────────────
  {
    id: "chaebol-heiress",
    name: "재벌가 상속녀",
    title: "우아한데 쉽게 흔들리지 않는 인물",
    shortDescription: "권력과 책임을 동시에 짊어진 기업 상속녀",
    allowedFaceTypes: ["ELEGANT_REFINED"],
    vector: { power: 8, elegance: 52, intellect: 20, warmth: 12, mystery: 8 },
    genres: ["드라마", "로맨스"],
    roleType: "주인공",
    genderTone: "female",
    shareCopy: "내 메인 캐릭터는 재벌가 상속녀. 우아한데 존재감이 큰 쪽.",
  },
  {
    id: "cold-ceo-female",
    name: "냉미녀 CEO",
    title: "차분한데 단번에 중심을 잡는 인물",
    shortDescription: "차갑지만 강한 카리스마를 가진 기업 리더",
    allowedFaceTypes: ["ELEGANT_REFINED", "SHARP_COOL"],
    vector: { power: 10, elegance: 46, intellect: 24, warmth: 8, mystery: 12 },
    genres: ["드라마", "로맨스", "느와르"],
    roleType: "주인공",
    genderTone: "female",
    shareCopy: "내 메인 캐릭터는 냉미녀 CEO. 말보다 분위기로 장면을 잡는 타입.",
  },
  {
    id: "young-queen",
    name: "사극의 젊은 여군주",
    title: "부드러워 보여도 결단이 선명한 인물",
    shortDescription: "나라를 이끄는 젊고 단단한 여성 군주",
    allowedFaceTypes: ["ELEGANT_REFINED", "INTELLECTUAL_SERIOUS"],
    vector: { power: 12, elegance: 38, intellect: 26, warmth: 12, mystery: 12 },
    genres: ["사극", "판타지", "드라마"],
    roleType: "주인공",
    genderTone: "female",
    shareCopy: "내 결과는 사극의 젊은 여군주. 부드러워 보여도 무게감이 남는 타입.",
  },
  {
    id: "romance-second-lead-female",
    name: "로맨스 서브녀",
    title: "앞보다 옆에서 더 오래 남는 인물",
    shortDescription: "주인공을 돕지만 사랑은 이루어지지 않는 인물",
    allowedFaceTypes: ["ELEGANT_REFINED", "WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 5, elegance: 30, intellect: 12, warmth: 40, mystery: 13 },
    genres: ["로맨스", "청춘"],
    roleType: "서브",
    genderTone: "female",
    shareCopy: "내 결과는 로맨스 서브녀. 지나간 뒤가 더 기억나는 쪽.",
  },

  // ───────────────────────────────────────────────
  // INTELLECTUAL_SERIOUS 계열
  // ───────────────────────────────────────────────
  {
    id: "genius-profiler",
    name: "천재 프로파일러",
    title: "크게 흔들리지 않아도 이미 읽고 있는 인물",
    shortDescription: "범죄자의 심리를 읽어내는 분석 전문가",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "SHARP_COOL", "MYSTERIOUS_DARK"],
    vector: { power: 8, elegance: 18, intellect: 48, warmth: 5, mystery: 21 },
    genres: ["범죄", "스릴러", "미스터리"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 결과는 천재 프로파일러. 차분한데 다 보고 있을 것 같은 쪽.",
  },
  {
    id: "genius-hacker",
    name: "천재 해커",
    title: "정면보다 뒤에서 판을 바꾸는 인물",
    shortDescription: "디지털 세계에서 모든 것을 꿰뚫는 천재 해커",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "MYSTERIOUS_DARK", "SHARP_COOL"],
    vector: { power: 8, elegance: 12, intellect: 48, warmth: 5, mystery: 27 },
    genres: ["스릴러", "범죄", "미스터리"],
    roleType: "조력자",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 천재 해커. 조용한데 판이 바뀌는 느낌.",
  },
  {
    id: "medical-elite-doctor",
    name: "메디컬 드라마 엘리트 의사",
    title: "침착함이 먼저 믿음을 만드는 인물",
    shortDescription: "생명을 살리는 냉정하고 뛰어난 실력의 의사",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "SHARP_COOL"],
    vector: { power: 8, elegance: 26, intellect: 46, warmth: 12, mystery: 8 },
    genres: ["메디컬", "드라마"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 메디컬 드라마 엘리트 의사. 침착한데 믿음이 가는 쪽.",
  },
  {
    id: "palace-strategist",
    name: "궁중 책사",
    title: "앞보다 뒤에서 더 크게 작동하는 인물",
    shortDescription: "왕을 보좌하며 전략을 세우는 지략가",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "MYSTERIOUS_DARK", "SHARP_COOL"],
    vector: { power: 8, elegance: 18, intellect: 48, warmth: 10, mystery: 16 },
    genres: ["사극", "미스터리", "판타지"],
    roleType: "조력자",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 궁중 책사. 조용히 판을 움직이는 타입.",
  },
  {
    id: "investigative-reporter",
    name: "탐사보도 기자",
    title: "끝까지 이유를 찾는 인물",
    shortDescription: "진실을 끝까지 파헤치는 집요한 기자",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "WARM_FRIENDLY", "SHARP_COOL"],
    vector: { power: 12, elegance: 14, intellect: 38, warmth: 22, mystery: 14 },
    genres: ["드라마", "범죄", "미스터리"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 탐사보도 기자. 조용히 끝까지 파고드는 타입.",
  },
  {
    id: "political-aide",
    name: "야망 있는 정치 보좌관",
    title: "한 걸음 뒤에서 더 큰 판을 보는 인물",
    shortDescription: "앞에 나서지 않아도 흐름을 설계하는 정치 보좌관",
    allowedFaceTypes: ["INTELLECTUAL_SERIOUS", "SHARP_COOL"],
    vector: { power: 12, elegance: 24, intellect: 44, warmth: 8, mystery: 12 },
    genres: ["드라마", "법정", "느와르"],
    roleType: "조력자",
    genderTone: "neutral",
    shareCopy: "내 결과는 야망 있는 정치 보좌관. 조용한데 속도감 있게 판을 읽는 쪽.",
  },

  // ───────────────────────────────────────────────
  // WARM_FRIENDLY / SOFT_YOUTH 계열 (느와르/강인 계열 금지)
  // ───────────────────────────────────────────────
  {
    id: "romance-lead",
    name: "로맨스 주인공",
    title: "관계의 한가운데를 지나가는 인물",
    shortDescription: "사랑 이야기의 중심에 서 있는 인물",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 5, elegance: 18, intellect: 10, warmth: 55, mystery: 12 },
    genres: ["로맨스", "드라마"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 로맨스 주인공. 한 장면보다 관계성이 먼저 떠오르는 타입.",
  },
  {
    id: "romance-second-lead-male",
    name: "로맨스 서브남",
    title: "앞보다 옆에서 더 오래 남는 인물",
    shortDescription: "주인공을 돕지만 사랑은 이루어지지 않는 인물",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH", "MYSTERIOUS_DARK"],
    vector: { power: 8, elegance: 18, intellect: 14, warmth: 38, mystery: 22 },
    genres: ["로맨스", "청춘"],
    roleType: "서브",
    genderTone: "male",
    shareCopy: "내 결과는 로맨스 서브남. 지나간 뒤가 더 기억나는 쪽.",
  },
  {
    id: "best-friend",
    name: "주인공의 믿음직한 친구",
    title: "곁에 있을수록 더 좋아지는 인물",
    shortDescription: "항상 곁에서 힘이 되어주는 믿음직한 친구",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 8, elegance: 10, intellect: 10, warmth: 58, mystery: 14 },
    genres: ["청춘", "드라마", "로맨스"],
    roleType: "조력자",
    genderTone: "neutral",
    shareCopy: "내 결과는 주인공의 믿음직한 친구. 곁에 둘수록 더 빛나는 타입.",
  },
  {
    id: "campus-romance-lead",
    name: "캠퍼스 로맨스 주인공",
    title: "풋풋한데 그냥 가볍지만은 않은 인물",
    shortDescription: "대학을 배경으로 사랑을 그려가는 인물",
    allowedFaceTypes: ["SOFT_YOUTH", "WARM_FRIENDLY"],
    vector: { power: 5, elegance: 14, intellect: 12, warmth: 56, mystery: 13 },
    genres: ["청춘", "로맨스", "드라마"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 캠퍼스 로맨스 주인공. 산뜻한데 서사가 붙는 쪽.",
  },
  {
    id: "band-leader",
    name: "청춘물 밴드부 선배",
    title: "등장하자마자 리듬이 생기는 인물",
    shortDescription: "음악과 열정으로 무대를 이끄는 밴드 리더",
    allowedFaceTypes: ["SOFT_YOUTH", "WARM_FRIENDLY", "CHARISMATIC_INTENSE"],
    vector: { power: 15, elegance: 12, intellect: 10, warmth: 38, mystery: 25 },
    genres: ["청춘", "로맨스", "드라마"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 청춘물 밴드부 선배. 등장만으로 박자가 생기는 타입.",
  },
  {
    id: "warm-lawyer",
    name: "따뜻한 동네 변호사",
    title: "단호함보다 사람 쪽으로 기우는 인물",
    shortDescription: "사람을 먼저 생각하는 인간적인 변호사",
    allowedFaceTypes: ["WARM_FRIENDLY", "INTELLECTUAL_SERIOUS"],
    vector: { power: 10, elegance: 14, intellect: 32, warmth: 38, mystery: 6 },
    genres: ["법정", "드라마", "로맨스"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 따뜻한 동네 변호사. 부드럽지만 약하지 않은 타입.",
  },
  {
    id: "cafe-owner",
    name: "감성 카페 사장",
    title: "분위기로 장면을 붙잡는 인물",
    shortDescription: "따뜻한 분위기로 사람들을 끌어들이는 인물",
    allowedFaceTypes: ["WARM_FRIENDLY", "SOFT_YOUTH"],
    vector: { power: 5, elegance: 22, intellect: 10, warmth: 50, mystery: 13 },
    genres: ["로맨스", "드라마", "청춘"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 감성 카페 사장. 부드럽고 은근하게 기억나는 타입.",
  },

  // ───────────────────────────────────────────────
  // MYSTERIOUS_DARK 계열
  // ───────────────────────────────────────────────
  {
    id: "mystery-writer",
    name: "미스터리 작가형 인물",
    title: "설명보다 여백이 먼저 궁금한 인물",
    shortDescription: "사건의 본질을 꿰뚫어보는 통찰력 있는 작가",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "INTELLECTUAL_SERIOUS"],
    vector: { power: 5, elegance: 18, intellect: 28, warmth: 12, mystery: 37 },
    genres: ["미스터리", "스릴러", "판타지"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 결과는 미스터리 작가형 인물. 다 보여주지 않아 더 궁금한 쪽.",
  },
  {
    id: "fantasy-advisor",
    name: "판타지 세계의 마법 참모",
    title: "조용한데 세계관을 넓히는 인물",
    shortDescription: "마법과 지혜로 주인공을 돕는 조언자",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "INTELLECTUAL_SERIOUS"],
    vector: { power: 5, elegance: 18, intellect: 25, warmth: 12, mystery: 40 },
    genres: ["판타지", "사극", "미스터리"],
    roleType: "조력자",
    genderTone: "neutral",
    shareCopy: "내 캐스팅 결과는 판타지 세계의 마법 참모. 조용한데 세계관이 생기는 타입.",
  },
  {
    id: "suspense-suspect",
    name: "서스펜스물 핵심 용의자",
    title: "좋은 쪽인지 쉽게 단정할 수 없는 인물",
    shortDescription: "진실을 숨기고 있는 의심의 중심 인물",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "CHARISMATIC_INTENSE", "SHARP_COOL"],
    vector: { power: 14, elegance: 16, intellect: 20, warmth: 8, mystery: 42 },
    genres: ["스릴러", "미스터리", "범죄"],
    roleType: "라이벌",
    genderTone: "neutral",
    shareCopy: "내 결과는 서스펜스물 핵심 용의자. 평온한데 계속 신경 쓰이는 타입.",
  },
  {
    id: "mysterious-helper",
    name: "비밀을 가진 조력자",
    title: "설명되지 않은 배경이 더 궁금한 인물",
    shortDescription: "주인공을 돕지만 쉽게 다 읽히지 않는 인물",
    allowedFaceTypes: ["MYSTERIOUS_DARK", "WARM_FRIENDLY"],
    vector: { power: 5, elegance: 15, intellect: 22, warmth: 25, mystery: 33 },
    genres: ["미스터리", "판타지", "스릴러"],
    roleType: "조력자",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 비밀을 가진 조력자. 친절한데 끝까지 다 보이진 않는 타입.",
  },

  // ───────────────────────────────────────────────
  // CHARISMATIC_INTENSE 계열
  // ───────────────────────────────────────────────
  {
    id: "revenge-mastermind",
    name: "복수극 핵심 인물",
    title: "밝게 흘려 보내지 않는 인물",
    shortDescription: "과거를 되갚기 위해 치밀하게 움직이는 인물",
    allowedFaceTypes: ["CHARISMATIC_INTENSE", "MYSTERIOUS_DARK", "SHARP_COOL"],
    vector: { power: 22, elegance: 18, intellect: 26, warmth: 8, mystery: 26 },
    genres: ["드라마", "느와르", "범죄"],
    roleType: "주인공",
    genderTone: "neutral",
    shareCopy: "내 메인 캐릭터는 복수극 핵심 인물. 웃고 있어도 사연이 느껴지는 쪽.",
  },
];
