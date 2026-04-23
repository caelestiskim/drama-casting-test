import type { CharacterGenre } from "@/data/characters";

export type GenreKey =
  | "romance"
  | "crime"
  | "thriller"
  | "legal"
  | "youth"
  | "fantasy"
  | "historical"
  | "noir"
  | "medical"
  | "mystery";

export const genreMeta: Record<
  GenreKey,
  {
    label: CharacterGenre;
    description: string;
  }
> = {
  romance: {
    label: "로맨스",
    description: "두 사람 사이의 감정선이 또렷하게 살아나는 장르",
  },
  crime: {
    label: "범죄",
    description: "사건과 대립이 분명해서 몰입감이 큰 장르",
  },
  thriller: {
    label: "스릴러",
    description: "긴장감이 오래 가고 반전이 잘 붙는 장르",
  },
  legal: {
    label: "법정",
    description: "말의 무게와 판단이 중요한 장르",
  },
  youth: {
    label: "청춘",
    description: "지금의 분위기와 에너지가 잘 살아나는 장르",
  },
  fantasy: {
    label: "판타지",
    description: "현실 밖 설정도 자연스럽게 어울리는 장르",
  },
  historical: {
    label: "사극",
    description: "무게감 있는 말투와 분위기가 살아나는 장르",
  },
  noir: {
    label: "느와르",
    description: "어둡고 묵직한 긴장감이 잘 어울리는 장르",
  },
  medical: {
    label: "메디컬",
    description: "침착함과 믿음이 먼저 필요한 장르",
  },
  mystery: {
    label: "미스터리",
    description: "한 번 더 보게 되는 궁금증이 남는 장르",
  },
};
