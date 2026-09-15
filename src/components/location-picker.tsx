import { MapPin, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { formatPath, listPlacePaths, parseLocationInput } from "@/lib/places";
import { useInventory } from "@/lib/store";
import { cn } from "@/lib/utils";

export function LocationPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const places = useInventory((s) => s.places);
  const [open, setOpen] = useState(false);
  const options = useMemo(() => listPlacePaths(places), [places]);

  const q = value.trim().toLowerCase();
  const filtered = q
    ? options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 8)
    : options.slice(0, 8);

  const typedSegments = parseLocationInput(value);
  const typedLabel = formatPath(typedSegments);
  const exact = options.some((o) => o.label.toLowerCase() === q);

  return (
    <div className="relative space-y-2">
      <label className="text-sm font-medium" htmlFor="location">
        Location
      </label>
      <div className="relative">
        <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="location"
          value={value}
          autoComplete="off"
          placeholder="Garage → Blue toolbox"
          className="pl-10"
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
        />
      </div>
      {open && (filtered.length > 0 || (typedLabel && !exact)) && (
        <ul className="absolute z-20 max-h-64 w-full overflow-auto rounded-lg bg-card p-1 shadow-border-hover">
          {filtered.map((opt) => (
            <li key={opt.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center rounded-sm px-3 py-2 text-left text-sm hover:bg-muted",
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(opt.label);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
          {typedLabel && !exact && (
            <li>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-primary hover:bg-muted"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(typedLabel);
                  setOpen(false);
                }}
              >
                <Plus className="size-3.5" />
                Use {typedLabel}
              </button>
            </li>
          )}
        </ul>
      )}
      <p className="text-xs text-muted-foreground">
        Separate levels with arrows, slashes, or commas.
      </p>
    </div>
  );
}
