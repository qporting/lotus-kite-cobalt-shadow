import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react";
import { useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getChildren, getDescendantIds } from "@/lib/places";
import { homeSearch } from "@/lib/search-params";
import { useInventory, useInventoryHydrated } from "@/lib/store";
import type { Place } from "@/lib/types";

export const Route = createFileRoute("/places")({
  component: PlacesPage,
});

function PlacesPage() {
  const hydrated = useInventoryHydrated();
  const places = useInventory((s) => s.places);
  const items = useInventory((s) => s.items);
  const addPlace = useInventory((s) => s.addPlace);
  const renamePlace = useInventory((s) => s.renamePlace);
  const deletePlace = useInventory((s) => s.deletePlace);

  const [nameOpen, setNameOpen] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [editing, setEditing] = useState<Place | null>(null);
  const [parentId, setParentId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Place | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["place-house", "place-garage"]));

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const place of places) {
      const ids = getDescendantIds(place.id, places);
      map.set(
        place.id,
        items.filter((item) => item.placeId && ids.has(item.placeId)).length,
      );
    }
    return map;
  }, [places, items]);

  const roots = getChildren(null, places);

  function openCreate(parent: string | null) {
    setEditing(null);
    setParentId(parent);
    setNameValue("");
    setNameOpen(true);
  }

  function openRename(place: Place) {
    setEditing(place);
    setParentId(place.parentId);
    setNameValue(place.name);
    setNameOpen(true);
  }

  function submitName() {
    const trimmed = nameValue.trim();
    if (!trimmed) return;
    if (editing) {
      renamePlace(editing.id, trimmed);
      toast.success("Renamed.");
    } else {
      const id = addPlace(trimmed, parentId);
      setExpanded((prev) => new Set([...prev, id, parentId ?? ""]));
      toast.success("Place added.");
    }
    setNameOpen(false);
  }

  if (!hydrated) {
    return (
      <AppShell>
        <div className="h-64 rounded-xl bg-card shadow-border" />
      </AppShell>
    );
  }

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
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium tracking-tight">Places</h1>
          <p className="mt-1 text-sm text-muted-foreground">House, garage, drawers — nested however you store things.</p>
        </div>
        <Button size="sm" onClick={() => openCreate(null)}>
          <Plus className="size-4" />
          Add
        </Button>
      </div>

      {roots.length === 0 ? (
        <div className="rounded-xl bg-card px-5 py-10 text-center shadow-border">
          <p className="font-display text-xl font-medium">No places yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Start with House, Garage, or a vehicle.</p>
          <Button className="mt-4" onClick={() => openCreate(null)}>
            Add a place
          </Button>
        </div>
      ) : (
        <ul className="rounded-xl bg-card py-1 shadow-border">
          {roots.map((place) => (
            <PlaceRow
              key={place.id}
              place={place}
              places={places}
              counts={counts}
              expanded={expanded}
              onToggle={(id) =>
                setExpanded((prev) => {
                  const next = new Set(prev);
                  if (next.has(id)) next.delete(id);
                  else next.add(id);
                  return next;
                })
              }
              onAddChild={openCreate}
              onRename={openRename}
              onDelete={setPendingDelete}
              depth={0}
            />
          ))}
        </ul>
      )}

      <Dialog open={nameOpen} onOpenChange={setNameOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Rename place" : "New place"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitName();
            }}
          >
            <Input
              autoFocus
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              placeholder="Workbench"
            />
            <DialogFooter>
              <Button type="submit">{editing ? "Save" : "Add place"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pendingDelete?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Nested places move up one level. Items keep their recorded path.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={() => {
                if (pendingDelete) deletePlace(pendingDelete.id);
                setPendingDelete(null);
                toast.success("Place removed.");
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

function PlaceRow({
  place,
  places,
  counts,
  expanded,
  onToggle,
  onAddChild,
  onRename,
  onDelete,
  depth,
}: {
  place: Place;
  places: Place[];
  counts: Map<string, number>;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onRename: (place: Place) => void;
  onDelete: (place: Place) => void;
  depth: number;
}) {
  const children = getChildren(place.id, places);
  const isOpen = expanded.has(place.id);
  const count = counts.get(place.id) ?? 0;

  return (
    <li>
      <div
        className="flex items-center gap-1 py-1 pr-2"
        style={{ paddingLeft: 8 + depth * 16 }}
      >
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted"
          onClick={() => onToggle(place.id)}
          aria-label={isOpen ? "Collapse" : "Expand"}
          disabled={children.length === 0}
        >
          <ChevronRight
            className={`size-4 transition-transform duration-150 ${isOpen && children.length ? "rotate-90" : ""} ${children.length ? "" : "opacity-0"}`}
          />
        </button>
        <Link
          to="/"
          search={{ q: "", place: place.id, category: "" }}
          className="min-w-0 flex-1 rounded-sm px-1 py-2 text-left hover:bg-muted"
        >
          <span className="block truncate font-medium">{place.name}</span>
          <span className="text-xs text-muted-foreground">
            {count} {count === 1 ? "item" : "items"}
          </span>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${place.name}`}>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onAddChild(place.id)}>Add inside</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => onRename(place)}>Rename</DropdownMenuItem>
            <DropdownMenuItem destructive onSelect={() => onDelete(place)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && children.length > 0 && (
        <ul>
          {children.map((child) => (
            <PlaceRow
              key={child.id}
              place={child}
              places={places}
              counts={counts}
              expanded={expanded}
              onToggle={onToggle}
              onAddChild={onAddChild}
              onRename={onRename}
              onDelete={onDelete}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
