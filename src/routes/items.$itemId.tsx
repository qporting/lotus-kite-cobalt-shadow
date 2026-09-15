import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_ICONS, categoryLabel } from "@/lib/categories";
import { relativeAdded } from "@/lib/format";
import { formatPath } from "@/lib/places";
import { homeSearch } from "@/lib/search-params";
import { useInventory, useInventoryHydrated } from "@/lib/store";
import { Package } from "lucide-react";

export const Route = createFileRoute("/items/$itemId")({
  component: ItemDetailPage,
});

function ItemDetailPage() {
  const { itemId } = Route.useParams();
  const hydrated = useInventoryHydrated();
  const item = useInventory((s) => s.items.find((i) => i.id === itemId));
  const deleteItem = useInventory((s) => s.deleteItem);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  if (!hydrated) {
    return (
      <AppShell>
        <div className="h-64 rounded-xl bg-card shadow-border" />
      </AppShell>
    );
  }

  if (!item) {
    return (
      <AppShell>
        <p className="font-display text-2xl font-medium">That item is gone.</p>
        <Button asChild className="mt-4">
          <Link to="/" search={homeSearch}>Back to search</Link>
        </Button>
      </AppShell>
    );
  }

  const Icon = CATEGORY_ICONS[item.category] ?? Package;
  const location = formatPath(item.locationPath);

  return (
    <AppShell>
      <Link
        to="/"
        search={homeSearch}
        className="mb-4 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      {item.photo ? (
        <img
          src={item.photo}
          alt={item.name}
          className="mb-5 aspect-photo w-full rounded-xl object-cover"
        />
      ) : (
        <div className="mb-5 flex aspect-photo w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="size-12" strokeWidth={1.25} />
        </div>
      )}

      <h1 className="font-display text-3xl font-medium tracking-tight">{item.name}</h1>

      {location ? (
        <Link
          to="/"
          search={{ q: "", place: item.placeId ?? "", category: "" }}
          className="mt-3 flex items-start gap-2 text-base text-foreground"
        >
          <MapPin className="mt-1 size-4 shrink-0 text-primary" />
          <span>{location}</span>
        </Link>
      ) : (
        <p className="mt-3 text-muted-foreground">No location recorded.</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {item.category ? <Badge>{categoryLabel(item.category)}</Badge> : null}
        <span className="text-sm text-muted-foreground">Added {relativeAdded(item.createdAt)}</span>
      </div>

      {item.notes ? (
        <p className="mt-5 rounded-lg bg-card p-4 text-foreground shadow-border">{item.notes}</p>
      ) : null}

      <div className="mt-8 flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to="/items/$itemId/edit" params={{ itemId: item.id }}>
            <Pencil className="size-4" />
            Edit
          </Link>
        </Button>
        <Button variant="destructive" className="flex-1" onClick={() => setConfirm(true)}>
          <Trash2 className="size-4" />
          Delete
        </Button>
      </div>

      <AlertDialog open={confirm} onOpenChange={setConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {item.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from your memory. You can always add it again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep it</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => {
                deleteItem(item.id);
                toast.success("Deleted.");
                void navigate({ to: "/", search: homeSearch });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
