import { titleCase } from "./utils";

export type ParsedPlacement = {
  name: string;
  locationSegments: string[];
};

const QUESTION_RE =
  /^(where|find|do i|did i|what|show me|have i|is there|any\b)/i;

const LEAD_IN_RE =
  /^(i put(?:\s+my)?|i've put|i stored|i left|put(?:\s+the)?|stored|left|keep|keeping)\s+/i;

const ITEM_LEAD_RE = /^(?:my|the|some|a|an|extra|spare)\s+/i;

export function looksLikeQuestion(input: string): boolean {
  return QUESTION_RE.test(input.trim());
}

export function looksLikePlacement(input: string): boolean {
  const text = input.trim();
  if (text.length < 8) return false;
  if (looksLikeQuestion(text)) return false;
  if (LEAD_IN_RE.test(text)) return true;
  return /\s+(inside|in the|into|in|on the|under|behind|at the)\s+/i.test(text);
}

export function parsePlacement(input: string): ParsedPlacement | null {
  const raw = input.trim().replace(/[.!?]+$/, "");
  if (!raw || looksLikeQuestion(raw)) return null;

  const prep = raw.match(
    /\s+(inside(?:\s+the)?|in the|into(?:\s+the)?|on the|under(?:\s+the)?|behind(?:\s+the)?|at the|in|on|at)\s+/i,
  );
  if (!prep || prep.index == null) return null;

  let itemPart = raw.slice(0, prep.index).replace(LEAD_IN_RE, "");
  itemPart = itemPart.replace(ITEM_LEAD_RE, "");
  itemPart = itemPart.replace(/\s+(are|is|were|was)$/i, "").trim();

  const locPart = raw.slice(prep.index + prep[0].length).trim();
  const locationSegments = splitLocation(locPart);

  if (!itemPart || locationSegments.length === 0) return null;

  return {
    name: titleCase(itemPart),
    locationSegments: locationSegments.map((seg) => titleCase(seg)),
  };
}

function splitLocation(loc: string): string[] {
  return loc
    .split(/\s*(?:,|→|->|\/|;|\binside(?:\s+the)?\b|\bin the\b|\bin\b)\s*/i)
    .map((part) => part.replace(/^(the|a|an)\s+/i, "").trim())
    .filter(Boolean);
}

const STOPWORDS = new Set([
  "where",
  "are",
  "is",
  "was",
  "were",
  "the",
  "my",
  "mine",
  "a",
  "an",
  "any",
  "did",
  "i",
  "put",
  "find",
  "do",
  "does",
  "have",
  "got",
  "own",
  "already",
  "please",
  "show",
  "me",
  "there",
  "of",
  "for",
  "and",
  "or",
  "to",
  "in",
  "on",
  "at",
  "that",
  "this",
  "those",
  "these",
  "what",
  "whats",
]);

export function searchTokens(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((token) => token && !STOPWORDS.has(token) && token.length > 1)
    .flatMap(stems);
}

function stems(word: string): string[] {
  const out = [word];
  if (word.endsWith("ies") && word.length > 4) out.push(`${word.slice(0, -3)}y`);
  else if (word.endsWith("es") && word.length > 4) out.push(word.slice(0, -2));
  else if (word.endsWith("s") && word.length > 3) out.push(word.slice(0, -1));
  return out;
}

export function isPossessionQuery(query: string): boolean {
  return /^(do i have|have i got|do i own|is there|are there|any )\b/i.test(
    query.trim(),
  );
}
