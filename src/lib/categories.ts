import {
  Binoculars,
  Cable,
  Car,
  Cpu,
  FileText,
  Fish,
  Hammer,
  Home,
  Package,
  Shirt,
  Snowflake,
  Sun,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const DEFAULT_CATEGORIES = [
  "tools",
  "automotive",
  "electronics",
  "cables",
  "household",
  "seasonal",
  "outdoor",
  "hunting",
  "fishing",
  "clothing",
  "documents",
  "hardware",
  "miscellaneous",
] as const;

export type DefaultCategory = (typeof DEFAULT_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<string, string> = {
  tools: "Tools",
  automotive: "Automotive",
  electronics: "Electronics",
  cables: "Cables",
  household: "Household",
  seasonal: "Seasonal",
  outdoor: "Outdoor",
  hunting: "Hunting",
  fishing: "Fishing",
  clothing: "Clothing",
  documents: "Documents",
  hardware: "Hardware",
  miscellaneous: "Miscellaneous",
};

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  tools: Wrench,
  automotive: Car,
  electronics: Cpu,
  cables: Cable,
  household: Home,
  seasonal: Snowflake,
  outdoor: Sun,
  hunting: Binoculars,
  fishing: Fish,
  clothing: Shirt,
  documents: FileText,
  hardware: Hammer,
  miscellaneous: Package,
};

const KEYWORD_MAP: Array<{ category: DefaultCategory; keywords: string[] }> = [
  {
    category: "cables",
    keywords: [
      "hdmi",
      "usb",
      "usb-c",
      "usbc",
      "cable",
      "charger",
      "extension cord",
      "ethernet",
      "power cord",
    ],
  },
  {
    category: "tools",
    keywords: [
      "drill",
      "hammer",
      "screwdriver",
      "wrench",
      "saw",
      "bits",
      "toolbox",
      "clamp",
      "level",
      "tape measure",
    ],
  },
  {
    category: "automotive",
    keywords: [
      "mazda",
      "car",
      "oil",
      "tire",
      "brake",
      "wiper",
      "air filter",
      "jumper",
    ],
  },
  {
    category: "electronics",
    keywords: [
      "battery",
      "batteries",
      "adapter",
      "remote",
      "router",
      "hard drive",
      "ssd",
      "keyboard",
    ],
  },
  {
    category: "seasonal",
    keywords: [
      "christmas",
      "xmas",
      "halloween",
      "decoration",
      "lights",
      "ornament",
      "wreath",
    ],
  },
  {
    category: "fishing",
    keywords: ["fishing", "tackle", "hook", "lure", "bobber", "reel"],
  },
  {
    category: "hunting",
    keywords: ["hunting", "ammo", "camo", "decoy"],
  },
  {
    category: "outdoor",
    keywords: ["tent", "camp", "garden", "hose", "grill"],
  },
  {
    category: "documents",
    keywords: [
      "passport",
      "will",
      "title",
      "paperwork",
      "manual",
      "receipt",
      "document",
    ],
  },
  {
    category: "hardware",
    keywords: [
      "screw",
      "nail",
      "bolt",
      "nut",
      "connector",
      "washer",
      "hinge",
    ],
  },
  {
    category: "clothing",
    keywords: ["coat", "jacket", "boots", "gloves", "hat"],
  },
  {
    category: "household",
    keywords: ["sheet", "towel", "blanket", "pillow", "vacuum", "furnace"],
  },
];

export function categoryLabel(value: string): string {
  if (!value) return "Uncategorized";
  return CATEGORY_LABELS[value] ?? value;
}

export function guessCategory(name: string, notes = ""): string {
  const hay = `${name} ${notes}`.toLowerCase();
  for (const row of KEYWORD_MAP) {
    if (row.keywords.some((kw) => hay.includes(kw))) return row.category;
  }
  return "";
}
