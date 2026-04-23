import { actorReferencesByFaceType, workReferencesByGenre } from "@/data/references";
import type { CharacterGenre } from "@/data/characters";
import type { GenreKey } from "@/data/genres";
import type { CastingResult, ResultReferences, WorkReference, ActorReference } from "@/types/result";

/** CharacterGenre → GenreKey 변환 (작품 레퍼런스 조회용) */
const genreLabelToKey: Partial<Record<CharacterGenre, GenreKey>> = {
  법정: "legal",
  범죄: "crime",
  로맨스: "romance",
  스릴러: "thriller",
  액션: "crime",     // 가장 가까운 매핑
  청춘: "youth",
  사극: "historical",
  느와르: "noir",
  메디컬: "medical",
  미스터리: "mystery",
  판타지: "fantasy",
  드라마: undefined, // 직접 매핑 없음 — 다음 장르로 넘어감
};

function dedupeBy<T extends { title?: string; name?: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.title ?? item.name ?? "";
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildReferences(result: CastingResult): ResultReferences {
  // 작품 레퍼런스: 메인 캐릭터의 장르 순서대로 매핑되는 첫 번째 GenreKey 사용
  const mainGenres = result.main.character.genres;
  let worksGenreKey: GenreKey | undefined;

  for (const genre of mainGenres) {
    const key = genreLabelToKey[genre];
    if (key) {
      worksGenreKey = key;
      break;
    }
  }

  const works = dedupeBy(
    worksGenreKey ? (workReferencesByGenre[worksGenreKey] ?? []) : [],
  ).slice(0, 3) as WorkReference[];

  // 배우 레퍼런스: 얼굴 타입 기반
  const actors = dedupeBy(
    actorReferencesByFaceType[result.faceType] ?? [],
  ).slice(0, 3) as ActorReference[];

  return { works, actors };
}
