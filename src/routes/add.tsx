import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ItemForm } from "@/components/item-form";
import { homeSearch } from "@/lib/search-params";
import { useInventoryHydrated } from "@/lib/store";

export const Route = createFileRoute("/add")({
  component: AddItemPage,
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
    name: typeof search.name === "string" ? search.name : undefined,
    location: typeof search.location === "string" ? search.location : undefined,
  }),
});

function AddItemPage() {
  const hydrated = useInventoryHydrated();
  const search = Route.useSearch();

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
      <h1 className="mb-6 font-display text-3xl font-medium tracking-tight">Remember this</h1>
      {hydrated ? (
        <ItemForm
          key={`${search.q ?? ""}-${search.name ?? ""}-${search.location ?? ""}`}
          prefill={search}
        />
      ) : null}
    </AppShell>
  );
}
