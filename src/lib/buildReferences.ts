import { actorReferencesByMood, workReferencesByGenre } from "@/data/references";
import type {
  CharacterRecommendation,
  ResultReferences,
  WorkReference,
  ActorReference,
} from "@/types/result";

function dedupeBy<T extends { title?: string; name?: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.title ?? item.name ?? "";
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export function buildReferences(
  recommendation: CharacterRecommendation,
  moodTags: string[],
): ResultReferences {
  const works = dedupeBy(
    recommendation.topGenres.flatMap((genre) => workReferencesByGenre[genre.key] ?? []),
  ).slice(0, 3) as WorkReference[];

  const actors = dedupeBy(
    moodTags.flatMap((mood) => actorReferencesByMood[mood as keyof typeof actorReferencesByMood] ?? []),
  ).slice(0, 3) as ActorReference[];

  return { works, actors };
}
