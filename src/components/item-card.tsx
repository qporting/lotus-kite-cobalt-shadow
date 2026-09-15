import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { CATEGORY_ICONS, categoryLabel } from "@/lib/categories";
import { relativeAdded } from "@/lib/format";
import { formatPath } from "@/lib/places";
import type { Item } from "@/lib/types";
import { Package } from "lucide-react";

export function ItemCard({ item }: { item: Item }) {
  const Icon = CATEGORY_ICONS[item.category] ?? Package;
  const location = formatPath(item.locationPath) || "No location yet";

  return (
    <Link
      to="/items/$itemId"
      params={{ itemId: item.id }}
      className="flex gap-3 rounded-xl bg-card p-2 shadow-border transition-[box-shadow,transform] duration-150 hover:shadow-border-hover active:scale-[0.99]"
    >
      {item.photo ? (
        <img
          src={item.photo}
          alt=""
          className="size-16 shrink-0 rounded-md object-cover"
        />
      ) : (
        <div className="flex size-16 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-6" strokeWidth={1.5} />
        </div>
      )}
      <div className="min-w-0 flex-1 py-0.5">
        <p className="truncate font-medium text-foreground">{item.name}</p>
        <p className="mt-0.5 flex items-start gap-1 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.75} />
          <span className="line-clamp-2">{location}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {relativeAdded(item.createdAt)}
          {item.category ? ` · ${categoryLabel(item.category)}` : ""}
        </p>
      </div>
    </Link>
  );
}
