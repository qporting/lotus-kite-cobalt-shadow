import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { CategoryPills } from "@/components/category-pills";
import { LocationPicker } from "@/components/location-picker";
import { PhotoField } from "@/components/photo-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VoiceButton } from "@/components/voice-button";
import { guessCategory } from "@/lib/categories";
import { looksLikePlacement, parsePlacement } from "@/lib/parse-placement";
import { formatPath, parseLocationInput } from "@/lib/places";
import { compressImage } from "@/lib/photo";
import { useInventory } from "@/lib/store";
import type { Item } from "@/lib/types";

type Prefill = {
  q?: string;
  name?: string;
  location?: string;
};

function initialFrom(item?: Item, prefill?: Prefill) {
  const parsed = prefill?.q ? parsePlacement(prefill.q) : null;
  const capture = prefill?.q ?? "";
  const name = item?.name ?? parsed?.name ?? prefill?.name ?? "";
  const location =
    item ? formatPath(item.locationPath) : parsed
      ? formatPath(parsed.locationSegments)
      : prefill?.location ?? "";
  const notes = item?.notes ?? "";
  const category = item?.category ?? guessCategory(name, notes);
  const photo = item?.photo ?? null;
  return { capture, name, location, category, notes, photo };
}

export function ItemForm({ item, prefill }: { item?: Item; prefill?: Prefill }) {
  const navigate = useNavigate();
  const addItem = useInventory((s) => s.addItem);
  const updateItem = useInventory((s) => s.updateItem);
  const seed = initialFrom(item, prefill);

  const [capture, setCapture] = useState(seed.capture);
  const [name, setName] = useState(seed.name);
  const [location, setLocation] = useState(seed.location);
  const [category, setCategory] = useState(seed.category);
  const [notes, setNotes] = useState(seed.notes);
  const [photo, setPhoto] = useState<string | null>(seed.photo);

  const parsed = useMemo(() => parsePlacement(capture), [capture]);

  function applyCapture(text: string) {
    setCapture(text);
    const next = parsePlacement(text);
    if (!next) return;
    setName(next.name);
    setLocation(formatPath(next.locationSegments));
    setCategory((current) => current || guessCategory(next.name, notes));
  }

  function handlePaste(e: React.ClipboardEvent) {
    const file = [...e.clipboardData.files].find((f) => f.type.startsWith("image/"));
    if (!file) return;
    e.preventDefault();
    void compressImage(file).then(setPhoto);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("Give the item a name.");
      return;
    }
    const locationSegments = parseLocationInput(location);
    const resolvedCategory = category || guessCategory(trimmed, notes);
    if (item) {
      updateItem(item.id, {
        name: trimmed,
        notes,
        category: resolvedCategory,
        locationSegments,
        photo,
      });
      toast.success("Updated.");
      void navigate({ to: "/items/$itemId", params: { itemId: item.id } });
      return;
    }
    const id = addItem({
      name: trimmed,
      notes,
      category: resolvedCategory,
      locationSegments,
      placeId: null,
      photo,
    });
    toast.success("Remembered.");
    void navigate({ to: "/items/$itemId", params: { itemId: id } });
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} onPaste={handlePaste}>
      <div className="space-y-2">
        <Label htmlFor="capture">What did you put where?</Label>
        <div className="relative">
          <Textarea
            id="capture"
            value={capture}
            onChange={(e) => applyCapture(e.target.value)}
            placeholder="I put my spare HDMI cables in the blue toolbox in the garage."
            className="pr-12"
          />
          <VoiceButton
            className="absolute top-2 right-2"
            onTranscript={applyCapture}
          />
        </div>
        {parsed && looksLikePlacement(capture) && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{parsed.name}</span>
            {" · "}
            {formatPath(parsed.locationSegments)}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Item</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="HDMI cables"
          required
        />
      </div>

      <LocationPicker value={location} onChange={setLocation} />

      <PhotoField value={photo} onChange={setPhoto} />

      <div className="space-y-2">
        <p className="text-sm font-medium">Category</p>
        <CategoryPills value={category} onChange={setCategory} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Look for the small black case on the right."
        />
      </div>

      <div className="sticky bottom-4">
        <Button type="submit" size="lg" className="w-full">
          {item ? "Save changes" : "Remember this"}
        </Button>
      </div>
    </form>
  );
}
