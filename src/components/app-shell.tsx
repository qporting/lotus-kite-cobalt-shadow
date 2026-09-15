import { Link } from "@tanstack/react-router";
import { MapPinned } from "lucide-react";
import type { ReactNode } from "react";
import { homeSearch } from "@/lib/search-params";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Link
            to="/"
            search={homeSearch}
            className="flex min-h-11 items-center gap-2 text-foreground"
          >
            <span className="flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground">
              <MapPinned className="size-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg leading-none font-medium tracking-tight">
              Where Did I Put That?
            </span>
          </Link>
          <Link
            to="/places"
            className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Places
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-2xl px-4 pt-6 pb-[max(6rem,env(safe-area-inset-bottom))]">
        {children}
      </div>
    </div>
  );
}
