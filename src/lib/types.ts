export type Item = {
  id: string;
  name: string;
  notes: string;
  category: string;
  placeId: string | null;
  locationPath: string[];
  photo: string | null;
  createdAt: number;
  updatedAt: number;
};

export type Place = {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: number;
};

export type ItemDraft = {
  name: string;
  notes: string;
  category: string;
  locationSegments: string[];
  placeId: string | null;
  photo: string | null;
};
