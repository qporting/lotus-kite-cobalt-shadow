import { normalize } from "./utils";
import { isPossessionQuery, searchTokens } from "./parse-placement";
import { formatPath } from "./places";
import type { Item } from "./types";

export type RankedItem = Item & { score: number };

function haystack(item: Item): string {
  return normalize(
    `${item.name} ${formatPath(item.locationPath)} ${item.notes} ${item.category}`,
  );
}

export function rankItems(items: Item[], query: string): RankedItem[] {
  const q = query.trim();
  if (!q) {
    return [...items]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .map((item) => ({ ...item, score: 0 }));
  }

  const tokens = [...new Set(searchTokens(q))];
  const qn = normalize(q);

  const ranked: RankedItem[] = [];
  for (const item of items) {
    const name = normalize(item.name);
    const loc = normalize(formatPath(item.locationPath));
    const notes = normalize(item.notes);
    const cat = normalize(item.category);
    const hay = haystack(item);

    let score = 0;
    if (name === qn) score += 120;
    else if (name.startsWith(qn) || qn.startsWith(name)) score += 90;
    else if (name.includes(qn)) score += 70;

    for (const token of tokens) {
      if (!token) continue;
      if (name === token || name.split(" ").includes(token)) {
        score += 40;
      } else if (name.includes(token)) {
        score += 28;
      } else if (loc.includes(token)) {
        score += 16;
      } else if (cat.includes(token)) {
        score += 12;
      } else if (notes.includes(token)) {
        score += 8;
      }
    }

    if (tokens.length > 0 && tokens.every((t) => hay.includes(t))) {
      score += 36;
    }

    if (score > 0) ranked.push({ ...item, score });
  }

  ranked.sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt);

  if (isPossessionQuery(q) && tokens.length > 0) {
    const all = ranked.filter((item) => tokens.every((t) => haystack(item).includes(t)));
    if (all.length > 0) return all;
  }

  return ranked;
}