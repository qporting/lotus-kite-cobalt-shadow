import { formatDistanceToNowStrict } from "date-fns";

export function relativeAdded(timestamp: number): string {
  try {
    return formatDistanceToNowStrict(timestamp, { addSuffix: true });
  } catch {
    return "";
  }
}

export function daysAgo(days: number): number {
  return Date.now() - days * 24 * 60 * 60 * 1000;
}
