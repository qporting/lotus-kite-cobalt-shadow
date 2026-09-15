import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_LABELS, DEFAULT_CATEGORIES, categoryLabel } from "@/lib/categories";
import { useInventory } from "@/lib/store";
import { cn } from "@/lib/utils";

export function CategoryPills({
  value,
  onChange,
  allowCustom = true,
  includeAll = false,
}: {
  value: string;
  onChange: (next: string) => void;
  allowCustom?: boolean;
  includeAll?: boolean;
}) {
  const custom = useInventory((s) => s.customCategories);
  const addCustom = useInventory((s) => s.addCustomCategory);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const cats = [
    ...(includeAll ? [{ id: "", label: "All" }] : []),
    ...DEFAULT_CATEGORIES.map((id) => ({ id, label: CATEGORY_LABELS[id] })),
    ...custom.map((name) => ({ id: name, label: categoryLabel(name) })),
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {cats.map((cat) => {
          const active = value === cat.id;
          return (
            <button
              key={cat.id || "all"}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                "h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150",
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted",
              )}
            >
              {cat.label}
            </button>
          );
        })}
        {allowCustom && !adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="h-9 shrink-0 rounded-full bg-card px-3 text-sm font-medium text-muted-foreground shadow-border hover:text-foreground"
          >
            Add
          </button>
        )}
      </div>
      {allowCustom && adding && (
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const name = draft.trim();
            if (name) {
              addCustom(name);
              onChange(name);
            }
            setDraft("");
            setAdding(false);
          }}
        >
          <Input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Custom category"
            aria-label="Custom category"
          />
          <Button type="submit" size="sm">
            Save
          </Button>
        </form>
      )}
    </div>
  );
}
