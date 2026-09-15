import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import { newId, normalize } from "./utils";
import { SEED_ITEMS, SEED_PLACES } from "./seed";
import {
  findPlaceByName,
  getPathNames,
  smartSplitLocation,
} from "./places";
import type { Item, ItemDraft, Place } from "./types";

type InventoryState = {
  items: Item[];
  places: Place[];
  customCategories: string[];
  initialized: boolean;
  addItem: (draft: ItemDraft) => string;
  updateItem: (id: string, draft: Partial<ItemDraft> & { name?: string }) => void;
  deleteItem: (id: string) => void;
  addPlace: (name: string, parentId: string | null) => string;
  renamePlace: (id: string, name: string) => void;
  deletePlace: (id: string) => void;
  ensurePath: (segments: string[]) => string | null;
  addCustomCategory: (name: string) => void;
  loadSample: () => void;
  seedIfNeeded: () => void;
};

function refreshItemPaths(items: Item[], places: Place[]): Item[] {
  return items.map((item) => {
    if (!item.placeId) return item;
    const locationPath = getPathNames(item.placeId, places);
    if (locationPath.length === 0) return item;
    return { ...item, locationPath };
  });
}

export const useInventory = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],
      places: [],
      customCategories: [],
      initialized: false,

      seedIfNeeded: () => {
        if (get().initialized) return;
        set({
          items: SEED_ITEMS,
          places: SEED_PLACES,
          initialized: true,
        });
      },

      loadSample: () => {
        const { items, places } = get();
        const itemIds = new Set(items.map((i) => i.id));
        const placeIds = new Set(places.map((p) => p.id));
        set({
          items: [...SEED_ITEMS.filter((i) => !itemIds.has(i.id)), ...items],
          places: [...places, ...SEED_PLACES.filter((p) => !placeIds.has(p.id))],
          initialized: true,
        });
      },

      ensurePath: (segments) => {
        const cleaned = segments.map((s) => s.trim()).filter(Boolean);
        if (cleaned.length === 0) return null;
        const split = smartSplitLocation(cleaned.join(" → "), get().places);
        const names = split.length ? split : cleaned;

        let parentId: string | null = null;
        let remaining = [...names];
        const first = findPlaceByName(remaining[0] ?? "", get().places);
        if (first) {
          parentId = first.id;
          remaining = remaining.slice(1);
        }

        for (const name of remaining) {
          const existing = findPlaceByName(name, get().places, parentId);
          if (existing) {
            parentId = existing.id;
            continue;
          }
          parentId = get().addPlace(name, parentId);
        }
        return parentId;
      },

      addItem: (draft) => {
        const id = newId();
        const now = Date.now();
        let placeId = draft.placeId;
        if (!placeId && draft.locationSegments.length > 0) {
          placeId = get().ensurePath(draft.locationSegments);
        }
        const locationPath = placeId
          ? getPathNames(placeId, get().places)
          : draft.locationSegments;
        const item: Item = {
          id,
          name: draft.name.trim(),
          notes: draft.notes.trim(),
          category: draft.category,
          placeId,
          locationPath,
          photo: draft.photo,
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ items: [item, ...s.items], initialized: true }));
        return id;
      },

      updateItem: (id, draft) => {
        let nextPlaceId = draft.placeId;
        if (draft.locationSegments && draft.locationSegments.length > 0) {
          nextPlaceId = get().ensurePath(draft.locationSegments);
        }
        set((s) => {
          const current = s.items.find((i) => i.id === id);
          if (!current) return s;
          const placeId = nextPlaceId === undefined ? current.placeId : nextPlaceId;
          const locationPath = placeId
            ? getPathNames(placeId, s.places)
            : draft.locationSegments && draft.locationSegments.length > 0
              ? draft.locationSegments
              : current.locationPath;
          return {
            items: s.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    name: draft.name?.trim() ?? item.name,
                    notes: draft.notes ?? item.notes,
                    category: draft.category ?? item.category,
                    photo: draft.photo === undefined ? item.photo : draft.photo,
                    placeId,
                    locationPath,
                    updatedAt: Date.now(),
                  }
                : item,
            ),
          };
        });
      },

      deleteItem: (id) => {
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
      },

      addPlace: (name, parentId) => {
        const trimmed = name.trim();
        const existing = get().places.find(
          (p) => p.parentId === parentId && normalize(p.name) === normalize(trimmed),
        );
        if (existing) return existing.id;
        const id = newId();
        const place: Place = {
          id,
          name: trimmed,
          parentId,
          createdAt: Date.now(),
        };
        set((s) => ({ places: [...s.places, place], initialized: true }));
        return id;
      },

      renamePlace: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((s) => {
          const places = s.places.map((p) => (p.id === id ? { ...p, name: trimmed } : p));
          return { places, items: refreshItemPaths(s.items, places) };
        });
      },

      deletePlace: (id) => {
        set((s) => {
          const target = s.places.find((p) => p.id === id);
          if (!target) return s;
          const places = s.places
            .filter((p) => p.id !== id)
            .map((p) => (p.parentId === id ? { ...p, parentId: target.parentId } : p));
          const items = s.items.map((item) => {
            if (item.placeId !== id) return item;
            return {
              ...item,
              placeId: target.parentId,
              locationPath: target.parentId
                ? getPathNames(target.parentId, places)
                : item.locationPath,
              updatedAt: Date.now(),
            };
          });
          return { places, items: refreshItemPaths(items, places) };
        });
      },

      addCustomCategory: (name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((s) => {
          if (s.customCategories.some((c) => normalize(c) === normalize(trimmed))) {
            return s;
          }
          return { customCategories: [...s.customCategories, trimmed] };
        });
      },
    }),
    {
      name: "wdipt-v1",
      skipHydration: true,
      partialize: (state) => ({
        items: state.items,
        places: state.places,
        customCategories: state.customCategories,
        initialized: state.initialized,
      }),
    },
  ),
);

export function useInventoryHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const persistApi = useInventory.persist;
    const finish = () => {
      useInventory.getState().seedIfNeeded();
      setHydrated(true);
    };

    if (!persistApi) {
      finish();
      return;
    }

    if (persistApi.hasHydrated()) {
      finish();
      return;
    }

    const unsub = persistApi.onFinishHydration(() => finish());
    void persistApi.rehydrate();
    return unsub;
  }, []);

  return hydrated;
}
