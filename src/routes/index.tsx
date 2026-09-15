import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { CategoryPills } from "@/components/category-pills";
import { ItemCard } from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/voice-button";
import { isPossessionQuery, looksLikePlacement, parsePlacement } from "@/lib/parse-placement";
import { formatPath, getDescendantIds } from "@/lib/places";
import { rankItems } from "@/lib/search";
import { useInventory, useInventoryHydrated } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: Home,
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
    place: typeof search.place === "string" ? search.place : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
  }),
});

function Home() {
  const { q: qParam = "", place: placeParam = "", category: categoryParam = "" } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const hydrated = useInventoryHydrated();
  const items = useInventory((s) => s.items);
  const places = useInventory((s) => s.places);
  const loadSample = useInventory((s) => s.loadSample);
  const [query, setQuery] = useState(qParam);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const parsed = useMemo(() => parsePlacement(query), [query]);
  const showCapture = looksLikePlacement(query) && parsed;

  const placeFilterIds = useMemo(() => {
    if (!placeParam) return null;
    return getDescendantIds(placeParam, places);
  }, [placeParam, places]);

  const filtered = useMemo(() => {
    let pool = items;
    if (placeFilterIds) pool = pool.filter((i) => i.placeId && placeFilterIds.has(i.placeId));
    if (categoryParam) pool = pool.filter((i) => i.category === categoryParam);
    return rankItems(pool, showCapture ? parsed.name : query);
  }, [items, placeFilterIds, categoryParam, query, showCapture, parsed]);

  const placeName = places.find((p) => p.id === placeParam)?.name;
  const possession = isPossessionQuery(query) && filtered.length > 0 && query.trim().length > 0;

  function commitQuery(next: string) {
    setQuery(next);
    void navigate({
      search: (prev) => ({ ...prev, q: next }),
      replace: true,
    });
  }

  return (
    <AppShell>
      <section className="mb-6">
        <h1 className="font-display text-3xl leading-tight font-medium tracking-tight text-foreground sm:text-4xl">
          Where is it?
        </h1>
        <p className="mt-1 text-muted-foreground">A memory for the things you put down.</p>
      </section>

      <form
        role="search"
        className="relative mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          commitQuery(query);
        }}
      >
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => commitQuery(e.target.value)}
          placeholder="Where are my drill bits?"
          aria-label="Search your stuff"
          className="h-14 w-full rounded-xl bg-card pr-14 pl-12 text-base text-foreground shadow-search placeholder:text-muted-foreground focus-visible:outline-none"
        />
        <VoiceButton
          className="absolute top-1.5 right-1.5"
          onTranscript={commitQuery}
        />
      </form>

      {showCapture && parsed && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 shadow-border">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Record this?
            </p>
            <p className="truncate font-medium">{parsed.name}</p>
            <p className="truncate text-sm text-muted-foreground">
              {formatPath(parsed.locationSegments)}
            </p>
          </div>
          <Button asChild>
            <Link
              to="/add"
              search={{ q: query, name: parsed.name, location: formatPath(parsed.locationSegments) }}
            >
              Save
            </Link>
          </Button>
        </div>
      )}

      <div className="mb-5">
        <CategoryPills
          value={categoryParam}
          includeAll
          allowCustom={false}
          onChange={(next) =>
            void navigate({
              search: (prev) => ({ ...prev, category: next }),
              replace: true,
            })
          }
        />
      </div>

      {!hydrated ? (
        <div className="space-y-3" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-card shadow-border" />
          ))}
        </div>
      ) : (
        <>
          {placeName && (
            <div className="mb-3 flex items-center justify-between text-sm">
              <p className="text-muted-foreground">
                In <span className="font-medium text-foreground">{placeName}</span>
              </p>
              <button
                type="button"
                className="h-11 text-sm font-medium text-primary"
                onClick={() =>
                  void navigate({ search: (prev) => ({ ...prev, place: "" }), replace: true })
                }
              >
                Clear
              </button>
            </div>
          )}

          {query.trim() && (
            <p className="mb-3 text-sm text-muted-foreground">
              {possession
                ? `Yes — ${filtered.length} recorded.`
                : filtered.length === 1
                  ? "1 match"
                  : `${filtered.length} matches`}
            </p>
          )}

          {!query.trim() && items.length > 0 && (
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">Recently added</h2>
          )}

          {filtered.length > 0 ? (
            <ul className="stagger-in space-y-2.5">
              {filtered.map((item) => (
                <li key={item.id}>
                  <ItemCard item={item} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              query={query}
              hasItems={items.length > 0}
              onLoadSample={loadSample}
            />
          )}
        </>
      )}

      <Link
        to="/add"
        search={{ q: looksLikePlacement(query) ? query : "", name: "", location: "" }}
        className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-base font-medium text-primary-foreground shadow-border-hover"
      >
        <Plus className="size-5" />
        Add
      </Link>
    </AppShell>
  );
}

function EmptyState({
  query,
  hasItems,
  onLoadSample,
}: {
  query: string;
  hasItems: boolean;
  onLoadSample: () => void;
}) {
  if (query.trim()) {
    return (
      <div className="rounded-xl bg-card px-5 py-8 text-center shadow-border">
        <p className="font-display text-xl font-medium">Nothing recorded for that.</p>
        <p className="mt-1 text-sm text-muted-foreground">Save it now so you can find it later.</p>
        <Button asChild className="mt-4">
          <Link to="/add" search={{ q: query, name: query, location: "" }}>
            Add {query.trim()}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-card px-5 py-10 text-center shadow-border">
      <p className="font-display text-2xl font-medium">Nothing stored yet</p>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Record an item in a few seconds. Search for it months later.
      </p>
      <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
        <Button asChild>
          <Link to="/add" search={{ q: "", name: "", location: "" }}>
            Add an item
          </Link>
        </Button>
        {!hasItems && (
          <Button type="button" variant="outline" onClick={onLoadSample}>
            Load a sample garage
          </Button>
        )}
      </div>
    </div>
  );
}
