import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ItemForm } from "@/components/item-form";
import { Button } from "@/components/ui/button";
import { homeSearch } from "@/lib/search-params";
import { useInventory, useInventoryHydrated } from "@/lib/store";

export const Route = createFileRoute("/items/$itemId/edit")({
  component: EditItemPage,
});

function EditItemPage() {
  const { itemId } = Route.useParams();
  const hydrated = useInventoryHydrated();
  const item = useInventory((s) => s.items.find((i) => i.id === itemId));

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

  return (
    <AppShell>
      <Link
        to="/items/$itemId"
        params={{ itemId: item.id }}
        className="mb-4 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <h1 className="mb-6 font-display text-3xl font-medium tracking-tight">Edit item</h1>
      <ItemForm item={item} />
    </AppShell>
  );
}
