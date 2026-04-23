import { actorReferencesByFaceType, workReferencesByGenre } from "@/data/references";
import type { CharacterGenre } from "@/data/characters";
import type { GenreKey } from "@/data/genres";
import type { Locale } from "@/lib/i18n";
import type { CastingResult, ResultReferences, WorkReference, ActorReference, GenderPreference } from "@/types/result";

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

type AnyRef = { title?: unknown; name?: unknown };
function dedupeBy<T extends AnyRef>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const raw = item.title ?? item.name;
    const key = typeof raw === "string"
      ? raw
      : (raw as { ko?: string } | undefined)?.ko ?? "";
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildReferences(
  result: CastingResult,
  genderPreference?: GenderPreference,
  locale: Locale = "ko",
): ResultReferences {
  // ── 작품 레퍼런스 ──────────────────────────────────────────
  // 메인 캐릭터 장르에서 최대 2개의 GenreKey 추출
  const mainGenres = result.main.character.genres;
  const genreKeys: GenreKey[] = [];
  for (const genre of mainGenres) {
    const key = genreLabelToKey[genre];
    if (key && !genreKeys.includes(key)) {
      genreKeys.push(key);
      if (genreKeys.length >= 2) break;
    }
  }

  const primaryPool   = genreKeys[0] ? dedupeBy(workReferencesByGenre[genreKeys[0]] ?? []) : [];
  const secondaryPool = genreKeys[1] ? dedupeBy(workReferencesByGenre[genreKeys[1]] ?? []) : [];

  // 보조 장르가 있으면 primary 2 + secondary 1, 없으면 primary 3
  const primaryCount = secondaryPool.length > 0 ? 2 : 3;

  const primaryPicked   = shuffle(primaryPool).slice(0, primaryCount);
  const secondaryPicked = shuffle(secondaryPool).slice(0, 1);

  const works = dedupeBy([...primaryPicked, ...secondaryPicked])
    .slice(0, 3)
    .map((w): WorkReference => ({
      title: (w.title as { ko: string; en: string; ja: string })[locale]
        ?? (w.title as { ko: string }).ko,
      note: (w.note as { ko: string; en: string; ja: string })[locale]
        ?? (w.note as { ko: string }).ko,
    }));

  // ── 배우 레퍼런스 ──────────────────────────────────────────
  const faceRefs = actorReferencesByFaceType[result.faceType];
  const actorPool = genderPreference === "female" ? faceRefs.female : faceRefs.male;
  const actors = shuffle(dedupeBy(actorPool ?? []))
    .slice(0, 3)
    .map((a): ActorReference => ({
      name: (a.name as { ko: string; en: string; ja: string })[locale]
        ?? (a.name as { ko: string }).ko,
      note: (a.note as { ko: string; en: string; ja: string })[locale]
        ?? (a.note as { ko: string }).ko,
    }));

  return { works, actors };
}
