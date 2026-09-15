import { normalize } from "./utils";
import type { Place } from "./types";

export function getAncestors(placeId: string | null, places: Place[]): Place[] {
  if (!placeId) return [];
  const byId = new Map(places.map((p) => [p.id, p]));
  const chain: Place[] = [];
  let current = byId.get(placeId);
  const seen = new Set<string>();
  while (current && !seen.has(current.id)) {
    seen.add(current.id);
    chain.unshift(current);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return chain;
}

export function getPathNames(placeId: string | null, places: Place[]): string[] {
  return getAncestors(placeId, places).map((p) => p.name);
}

export function formatPath(names: string[]): string {
  return names.filter(Boolean).join(" → ");
}

export function getChildren(parentId: string | null, places: Place[]): Place[] {
  return places
    .filter((p) => p.parentId === parentId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getDescendantIds(placeId: string, places: Place[]): Set<string> {
  const ids = new Set<string>([placeId]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const place of places) {
      if (place.parentId && ids.has(place.parentId) && !ids.has(place.id)) {
        ids.add(place.id);
        grew = true;
      }
    }
  }
  return ids;
}

export function listPlacePaths(places: Place[]): Array<{ id: string; names: string[]; label: string }> {
  return places
    .map((place) => {
      const names = getPathNames(place.id, places);
      return { id: place.id, names, label: formatPath(names) };
    })
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function parseLocationInput(value: string): string[] {
  return value
    .split(/\s*(?:,|→|->|\/|;)\s*/)
    .map((part) => part.replace(/^(the|a|an)\s+/i, "").trim())
    .filter(Boolean);
}

export function smartSplitLocation(text: string, places: Place[]): string[] {
  const direct = parseLocationInput(text);
  if (direct.length > 1) return direct;
  const raw = direct[0] ?? text.trim();
  if (!raw) return [];

  const names = [...new Set(places.map((p) => p.name))].sort((a, b) => b.length - a.length);
  const lower = raw.toLowerCase();
  for (const name of names) {
    const n = name.toLowerCase();
    if (lower === n) return [name];
    if (lower.startsWith(`${n} `) || lower.startsWith(`${n},`)) {
      const rest = raw.slice(name.length).replace(/^[\s,/→-]+/, "");
      return rest ? [name, ...smartSplitLocation(rest, places)] : [name];
    }
  }
  return [raw];
}

export function findPlaceByName(name: string, places: Place[], parentId?: string | null): Place | undefined {
  const n = normalize(name);
  const pool =
    parentId === undefined
      ? places
      : places.filter((p) => p.parentId === parentId);
  const matches = pool.filter((p) => normalize(p.name) === n);
  if (matches.length === 0) return undefined;
  if (matches.length === 1) return matches[0];
  return [...matches].sort(
    (a, b) => getAncestors(a.id, places).length - getAncestors(b.id, places).length,
  )[0];
}
