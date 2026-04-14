import { genreMeta } from "@/data/genres";
import type { Locale } from "@/lib/i18n";
import type { Character } from "@/data/characters";
import type { CharacterRecommendation, ResultCopy } from "@/types/result";

type CharacterCopyPreset = {
  heroSummary: string;
  oneLiner: string;
  intro: string;
  share: string;
};

const copyPresets: Record<string, CharacterCopyPreset> = {
  "cold-prosecutor": {
    heroSummary: "차분하게 장면을 끌고 가는 역할이 잘 어울려요.",
    oneLiner: "차갑게 밀어붙이기보다, 끝까지 침착하게 판을 읽는 쪽입니다.",
    intro: "말이 많지 않아도 존재감이 남습니다. 조용한 장면에서도 중심이 쉽게 흐려지지 않습니다.",
    share: "오늘의 메인 캐릭터는 냉철한 검사. 조용한데 오래 남는 쪽.",
  },
  "violent-crimes-detective": {
    heroSummary: "정적인 장면보다 힘 있게 밀고 가는 역할이 잘 어울려요.",
    oneLiner: "가만히 있기보다 직접 부딪히는 장면이 더 잘 어울립니다.",
    intro: "등장하자마자 속도가 붙는 타입입니다. 정리된 장면보다 현장의 온도가 먼저 떠오릅니다.",
    share: "오늘의 메인 캐릭터는 강력반 형사. 들어오자마자 장면이 살아나는 타입.",
  },
  "chaebol-heir": {
    heroSummary: "가볍기보다 묵직한 존재감이 먼저 보이는 타입이에요.",
    oneLiner: "화려하게 흔들기보다, 묵직하게 자리를 지키는 쪽입니다.",
    intro: "쉽게 풀어 보이지는 않지만 시선이 갑니다. 말수보다 분위기가 먼저 일을 합니다.",
    share: "오늘의 메인 캐릭터는 재벌가 후계자. 조용한데 존재감은 확실한 쪽.",
  },
  "chaebol-heiress": {
    heroSummary: "우아하지만 단단한 중심이 먼저 보이는 타입이에요.",
    oneLiner: "화려하게 꾸미기보다, 차분하게 중심을 잡는 쪽입니다.",
    intro: "한 장면 안에서도 쉽게 흐려지지 않습니다. 부드러워 보여도 무게감이 먼저 남습니다.",
    share: "오늘의 메인 캐릭터는 재벌가 상속녀. 우아한데 존재감은 확실한 쪽.",
  },
  "romance-lead": {
    heroSummary: "감정선이 중요한 장면의 중심에 잘 어울려요.",
    oneLiner: "가볍게 스쳐 지나가기보다, 관계의 중심에 남는 타입입니다.",
    intro: "달콤하게만 흐르지 않습니다. 감정선이 붙는 장면에서 더 오래 기억됩니다.",
    share: "오늘의 메인 캐릭터는 로맨스 주인공. 한 장면보다 관계성이 먼저 떠오르는 타입.",
  },
  "romance-second-lead-male": {
    heroSummary: "앞에 서기보다 여운을 남기는 역할이 잘 어울려요.",
    oneLiner: "앞에 서기보다, 옆에서 분위기를 더 깊게 만드는 쪽입니다.",
    intro: "지나가듯 등장해도 여운이 남습니다. 가볍지 않고 은근하게 서사를 끌어당깁니다.",
    share: "오늘의 캐스팅 결과는 로맨스 서브남. 지나간 뒤가 더 기억나는 쪽.",
  },
  "romance-second-lead-female": {
    heroSummary: "앞에 서기보다 여운을 남기는 역할이 잘 어울려요.",
    oneLiner: "앞에 서기보다, 옆에서 분위기를 더 깊게 만드는 쪽입니다.",
    intro: "지나가듯 등장해도 여운이 남습니다. 가볍지 않고 은근하게 서사를 끌어당깁니다.",
    share: "오늘의 캐스팅 결과는 로맨스 서브녀. 지나간 뒤가 더 기억나는 쪽.",
  },
  "genius-hacker": {
    heroSummary: "겉보다 숨은 존재감이 더 강하게 느껴지는 타입이에요.",
    oneLiner: "정면으로 드러나기보다, 보이지 않는 곳에서 판을 바꾸는 느낌입니다.",
    intro: "크게 튀지 않아도 장면이 또렷해집니다. 화면 밖 이야기까지 상상하게 만드는 쪽입니다.",
    share: "오늘의 메인 캐릭터는 천재 해커. 조용한데 판이 바뀌는 느낌.",
  },
  "secret-agent": {
    heroSummary: "비밀을 품은 주인공 같은 분위기가 잘 어울려요.",
    oneLiner: "평온해 보여도 어딘가 비밀이 있어 보이는 쪽입니다.",
    intro: "선이 또렷하고, 장면의 공기를 단번에 바꾸는 힘이 있습니다. 한 번 들어오면 계속 시선이 갑니다.",
    share: "오늘의 캐스팅 결과는 비밀요원. 평온한데 숨긴 게 있어 보이는 쪽.",
  },
  "investigative-reporter": {
    heroSummary: "조용하지만 끝까지 밀고 가는 역할이 잘 맞아요.",
    oneLiner: "가볍게 넘기지 않고 끝까지 이유를 찾는 쪽입니다.",
    intro: "차분하지만 물러나지는 않습니다. 한 번 꽂히면 쉽게 놓지 않을 것 같은 인상입니다.",
    share: "오늘의 메인 캐릭터는 탐사보도 기자. 조용히 끝까지 파고드는 타입.",
  },
  "genius-profiler": {
    heroSummary: "말보다 관찰이 먼저 떠오르는 캐릭터에 잘 어울려요.",
    oneLiner: "크게 흔들리지 않아도 이미 다 보고 있는 느낌이 있습니다.",
    intro: "감정으로 먼저 나서기보다 상황을 읽는 쪽에 가깝습니다. 말보다 생각이 먼저 보입니다.",
    share: "오늘의 캐스팅 결과는 천재 프로파일러. 차분한데 다 읽고 있을 것 같은 쪽.",
  },
  "villain-rival": {
    heroSummary: "짧게 나와도 분위기를 바꾸는 역할이 잘 어울려요.",
    oneLiner: "정면으로 부딪히지 않아도 긴장을 만드는 타입입니다.",
    intro: "크게 튀지 않는데도 공기가 달라집니다. 선한 역할보다 서늘한 대립각이 더 자연스럽습니다.",
    share: "오늘의 메인 캐릭터는 악역 라이벌. 조용한데 공기가 달라지는 타입.",
  },
  "best-friend": {
    heroSummary: "주인공 옆에서 더 빛나는 역할이 잘 어울려요.",
    oneLiner: "앞에서 끌고 가기보다, 옆에서 장면을 더 좋게 만드는 쪽입니다.",
    intro: "편하게 보이지만 그냥 스쳐 지나가지는 않습니다. 붙어 있을수록 장면이 살아나는 타입입니다.",
    share: "오늘의 결과는 주인공의 믿음직한 친구. 곁에 둘수록 더 빛나는 타입.",
  },
  "campus-romance-lead": {
    heroSummary: "맑은 분위기로 이야기를 여는 역할이 잘 맞아요.",
    oneLiner: "무겁게 누르기보다, 맑고 선명하게 이야기를 여는 타입입니다.",
    intro: "풋풋함만 있는 쪽은 아닙니다. 가벼운 첫 장면에서도 은근한 서사가 따라붙습니다.",
    share: "오늘의 메인 캐릭터는 캠퍼스 로맨스 주인공. 산뜻한데 서사가 붙는 쪽.",
  },
  "band-leader": {
    heroSummary: "등장만으로 분위기를 끌어올리는 역할이 잘 어울려요.",
    oneLiner: "가만히 있어도 장면에 리듬이 생기는 타입입니다.",
    intro: "시선이 자연스럽게 중앙으로 모입니다. 복잡하게 꾸미지 않아도 에너지가 먼저 보입니다.",
    share: "오늘의 메인 캐릭터는 청춘물 밴드부 선배. 등장만으로 박자가 생기는 타입.",
  },
  "young-monarch": {
    heroSummary: "무게감 있는 한마디가 필요한 역할과 잘 맞아요.",
    oneLiner: "어리게 보이기보다, 조용한 결단이 먼저 느껴지는 쪽입니다.",
    intro: "힘을 과하게 쓰지 않아도 중심이 생깁니다. 화려한 장면보다 무게 있는 장면에서 더 살아납니다.",
    share: "오늘의 캐스팅 결과는 사극의 젊은 군주. 말보다 결이 먼저 남는 타입.",
  },
  "young-queen": {
    heroSummary: "부드러워 보여도 단단한 무게감이 필요한 역할과 잘 맞아요.",
    oneLiner: "조용해 보여도 쉽게 흔들리지 않는 중심이 느껴지는 쪽입니다.",
    intro: "목소리를 높이지 않아도 장면을 붙잡는 힘이 있습니다. 단정한 분위기 안에 결단력이 같이 보입니다.",
    share: "오늘의 캐스팅 결과는 사극의 젊은 여군주. 부드러워 보여도 무게감이 남는 타입.",
  },
  "palace-strategist": {
    heroSummary: "앞에 서기보다 판을 읽는 역할이 잘 어울려요.",
    oneLiner: "앞에 나서기보다, 뒤에서 판을 정리하는 역할이 더 잘 어울립니다.",
    intro: "한마디가 길게 남을 것 같은 분위기가 있습니다. 눈에 띄는 주인공보다 믿고 듣는 인물이 더 가깝습니다.",
    share: "오늘의 메인 캐릭터는 궁중 책사. 조용히 판을 움직이는 타입.",
  },
  "noir-strategist": {
    heroSummary: "어둡고 묵직한 장면에서 존재감이 더 살아나요.",
    oneLiner: "소리치지 않아도 위험한 느낌이 남는 쪽입니다.",
    intro: "정면 승부보다 한 걸음 비켜선 긴장이 어울립니다. 단순한 악역보다 계산된 인물이 더 잘 맞습니다.",
    share: "오늘의 결과는 느와르 조직의 전략가. 낮은 톤인데도 긴장감이 큰 타입.",
  },
  "medical-elite-doctor": {
    heroSummary: "침착함이 먼저 필요한 역할에 잘 어울려요.",
    oneLiner: "다정함보다 정확함이 먼저 보이는 타입입니다.",
    intro: "급한 장면에서도 쉽게 흔들리지 않을 것 같습니다. 차분한데 차갑게만 남지는 않는 쪽입니다.",
    share: "오늘의 메인 캐릭터는 메디컬 드라마 엘리트 의사. 침착한데 믿음이 가는 쪽.",
  },
  "warm-lawyer": {
    heroSummary: "사람 이야기를 품는 역할과 잘 맞는 분위기예요.",
    oneLiner: "단호하게 누르기보다, 사람 쪽으로 먼저 기우는 분위기입니다.",
    intro: "날카롭게 재단하기보다 곁에 남는 쪽입니다. 단정한 말보다 마음을 움직이는 장면이 더 잘 어울립니다.",
    share: "오늘의 캐스팅 결과는 따뜻한 동네 변호사. 부드럽지만 약하지 않은 타입.",
  },
  "mystery-writer": {
    heroSummary: "한 번에 다 읽히지 않는 역할에 특히 잘 어울려요.",
    oneLiner: "설명보다 여백이 더 궁금해지는 얼굴입니다.",
    intro: "밝게 다 드러내기보다 조금 남겨 두는 쪽이 더 잘 어울립니다. 한 장면만으로도 다음 이야기가 궁금해집니다.",
    share: "오늘의 메인 캐릭터는 미스터리 작가형 인물. 다 보여주지 않아 더 궁금한 타입.",
  },
  "fantasy-advisor": {
    heroSummary: "현실보다 조금 더 특별한 세계관에서 더 빛나요.",
    oneLiner: "현실적인 장면보다, 한 번쯤 다른 세계를 열 것 같은 분위기입니다.",
    intro: "앞에 서지 않아도 장면의 결을 바꾸는 힘이 있습니다. 화려하기보다 신비롭게 남는 쪽입니다.",
    share: "오늘의 캐스팅 결과는 판타지 세계의 마법 참모. 조용한데 세계관이 생기는 타입.",
  },
  "revenge-mastermind": {
    heroSummary: "사연이 깊은 주인공 역할과 잘 어울려요.",
    oneLiner: "밝게 흘려보내기보다, 속에 이야기를 오래 품고 있을 것 같은 인상입니다.",
    intro: "한 번 마음을 정하면 쉽게 꺾이지 않을 것 같습니다. 감정보다 결심이 먼저 보이는 타입입니다.",
    share: "오늘의 메인 캐릭터는 복수극 핵심 인물. 웃고 있어도 사연이 느껴지는 쪽.",
  },
  "suspense-suspect": {
    heroSummary: "한 번 더 보게 되는 미묘한 역할에 잘 어울려요.",
    oneLiner: "좋은 쪽인지 아닌지, 쉽게 단정할 수 없게 만드는 얼굴입니다.",
    intro: "처음엔 평온해 보여도 뒤로 갈수록 더 궁금해집니다. 한 장면보다 여운이 길게 남는 타입입니다.",
    share: "오늘의 캐스팅 결과는 서스펜스물 핵심 용의자. 평온한데 계속 신경 쓰이는 타입.",
  },
  "cold-ceo": {
    heroSummary: "차분하게 중심을 잡는 역할이 잘 어울려요.",
    oneLiner: "따뜻하게 끌어안기보다, 차분하게 판을 주도하는 쪽입니다.",
    intro: "크게 감정을 드러내지 않아도 중심이 생깁니다. 무심해 보여도 장면의 결을 바꾸는 힘이 있습니다.",
    share: "오늘의 메인 캐릭터는 냉미남 CEO. 말수보다 존재감이 먼저 남는 타입.",
  },
  "cold-ceo-female": {
    heroSummary: "차분한 카리스마로 중심을 잡는 역할이 잘 어울려요.",
    oneLiner: "세게 밀어붙이기보다, 낮은 톤으로 판을 주도하는 쪽입니다.",
    intro: "쉽게 흔들리지 않는 인상이 먼저 남습니다. 말이 많지 않아도 분위기로 장면을 정리하는 타입입니다.",
    share: "오늘의 메인 캐릭터는 냉미녀 CEO. 말보다 분위기로 장면을 잡는 타입.",
  },
  "cafe-owner": {
    heroSummary: "편안한데 기억에 남는 역할과 잘 맞아요.",
    oneLiner: "세게 밀어붙이기보다, 분위기로 장면을 붙잡는 쪽입니다.",
    intro: "편안한데 밋밋하지 않습니다. 로맨스 한가운데보다 여운 있는 관계성에 더 잘 어울립니다.",
    share: "오늘의 캐스팅 결과는 감성 카페 사장. 부드럽고 은근하게 기억나는 타입.",
  },
  "political-aide": {
    heroSummary: "앞보다 뒤에서 흐름을 움직이는 역할이 잘 맞아요.",
    oneLiner: "앞에 나서기보다, 한 걸음 뒤에서 더 크게 움직이는 쪽입니다.",
    intro: "눈에 띄는 방식보다 흐름을 설계하는 역할이 자연스럽습니다. 조용한데 계산이 보이는 타입입니다.",
    share: "오늘의 메인 캐릭터는 야망 있는 정치 보좌관. 조용한데 판을 읽는 쪽.",
  },
  "mysterious-helper": {
    heroSummary: "친절하지만 어딘가 비밀이 있는 역할에 잘 어울려요.",
    oneLiner: "친절해 보여도 끝까지 다 읽히지는 않는 쪽입니다.",
    intro: "한 번에 설명되지 않을수록 더 매력이 살아납니다. 지나간 뒤가 더 궁금한 타입입니다.",
    share: "오늘의 캐스팅 결과는 비밀을 가진 조력자. 친절한데 끝까지 다 보이진 않는 타입.",
  },
};

const moodAddons: Record<string, string[]> = {
  차분함: [
    "급하게 몰아붙이기보다, 조용히 끝까지 가는 쪽입니다.",
    "말수보다 안정감이 먼저 남습니다.",
  ],
  강렬함: [
    "짧게 지나가도 인상이 분명하게 남습니다.",
    "장면의 온도를 단번에 바꾸는 힘이 있습니다.",
  ],
  부드러움: [
    "세게 누르기보다 여백을 남기는 쪽이 더 잘 맞습니다.",
    "가까이 볼수록 더 좋은 타입입니다.",
  ],
  지적임: [
    "감정에 앞서기보다 상황을 읽는 쪽에 가깝습니다.",
    "한 번에 소비되기보다 곱씹게 되는 분위기입니다.",
  ],
  신비로움: [
    "다 보여주지 않을 때 더 매력이 살아납니다.",
    "설명보다 여운이 먼저 남는 쪽입니다.",
  ],
  친근함: [
    "멀게 두기보다 자연스럽게 가까워지는 인상입니다.",
    "함께 있을수록 더 좋은 장면이 떠오릅니다.",
  ],
  진지함: [
    "웃고 있어도 중심이 쉽게 흐려지지 않습니다.",
    "가볍게 넘기기보다 무게를 붙잡는 쪽입니다.",
  ],
  "화면 존재감": [
    "한 장면만으로도 존재감이 남는 타입입니다.",
    "등장하자마자 시선이 자연스럽게 모입니다.",
  ],
  세련됨: [
    "과하게 꾸미지 않아도 분위기가 정리됩니다.",
    "힘을 많이 주지 않아도 눈에 들어오는 쪽입니다.",
  ],
  청량함: [
    "무겁게 눌리기보다 화면을 환기시키는 힘이 있습니다.",
    "시작 장면의 공기를 바꾸는 데 강합니다.",
  ],
};

const genreAddons: Record<string, string> = {
  로맨스: "가벼운 설렘보다 감정선이 긴 장면에 더 잘 어울립니다.",
  범죄: "사건을 끌고 가는 긴장감이 잘 붙습니다.",
  스릴러: "무슨 일이 생길 것 같은 서늘함이 자연스럽습니다.",
  법정: "말보다 판단이 남는 장면에서 더 힘이 있습니다.",
  청춘: "지금 이 순간의 분위기가 살아나는 장면에 잘 어울립니다.",
  판타지: "현실보다 한 겹 더 낭만적인 장면이 잘 붙습니다.",
  사극: "무게 있는 한마디가 오래 남는 역할이 어울립니다.",
  느와르: "밝게 풀기보다 낮은 톤의 긴장이 잘 맞습니다.",
  메디컬: "침착함과 신뢰가 먼저 필요한 장면에서 강합니다.",
  미스터리: "다 보여주지 않을수록 더 매력적인 쪽입니다.",
};

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pick<T>(items: T[], seed: string) {
  return items[hashString(seed) % items.length];
}

function getTopGenreLabel(recommendation: CharacterRecommendation) {
  return recommendation.topGenres[0]?.label ?? genreMeta.romance.label;
}

function buildShortIntro(
  preset: CharacterCopyPreset,
  character: Character,
  recommendation: CharacterRecommendation,
  moodTag: string,
) {
  const moodLine = pick(moodAddons[moodTag] ?? ["장면이 쉽게 밋밋해지지 않는 타입입니다."], `${character.id}:${moodTag}`);
  const genreLine =
    genreAddons[getTopGenreLabel(recommendation)] ??
    "이야기가 붙을수록 더 또렷해지는 타입입니다.";

  return `${preset.intro} ${moodLine} ${genreLine}`;
}

export function buildResultCopy(
  recommendation: CharacterRecommendation,
  shortSummary: string,
  moodTags: string[],
  locale: Locale = "ko",
): ResultCopy {
  const character = recommendation.main.character;
  const preset = copyPresets[character.id];
  const topMood = moodTags[0] ?? "화면 존재감";
  const topGenre = getTopGenreLabel(recommendation);

  return {
    title: character.name,
    heroSummary: preset.heroSummary,
    oneLiner: preset.oneLiner,
    shortIntro: buildShortIntro(preset, character, recommendation, topMood),
    shareCopy: `${preset.share} 특히 ${topGenre} 장르에서 더 잘 어울려요.`,
    sectionEyebrow:
      locale === "en"
        ? "Your drama casting"
        : locale === "ja"
          ? "あなたのドラマキャスティング"
          : "당신의 드라마 캐스팅",
    topGenreTitle:
      locale === "en"
        ? "Genres that fit you"
        : locale === "ja"
          ? "似合うジャンル"
          : "잘 어울리는 장르",
    supportTitle:
      locale === "en"
        ? "These roles fit too"
        : locale === "ja"
          ? "こんな役も似合います"
          : "이런 역할도 어울려요",
  };
}
