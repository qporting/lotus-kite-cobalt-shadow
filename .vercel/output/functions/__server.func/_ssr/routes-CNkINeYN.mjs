import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { f as Package, h as MapPin, l as Search, u as Plus } from "../_libs/lucide-react.mjs";
import { a as Route$4 } from "./router-CWQ1Tqqr.mjs";
import { a as formatPath, f as relativeAdded, h as useInventoryHydrated, m as useInventory, n as Button, s as getDescendantIds, t as AppShell, u as normalize } from "./store-CIbqbaJH.mjs";
import { i as categoryLabel, t as CATEGORY_ICONS } from "./categories-BonfHP_X.mjs";
import { a as parsePlacement, i as looksLikePlacement, n as VoiceButton, o as searchTokens, r as isPossessionQuery, t as CategoryPills } from "./parse-placement--jm9YtE8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CNkINeYN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ItemCard({ item }) {
	const Icon = CATEGORY_ICONS[item.category] ?? Package;
	const location = formatPath(item.locationPath) || "No location yet";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/items/$itemId",
		params: { itemId: item.id },
		className: "flex gap-3 rounded-xl bg-card p-2 shadow-border transition-[box-shadow,transform] duration-150 hover:shadow-border-hover active:scale-[0.99]",
		children: [item.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: item.photo,
			alt: "",
			className: "size-16 shrink-0 rounded-md object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex size-16 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-6",
				strokeWidth: 1.5
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 py-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate font-medium text-foreground",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 flex items-start gap-1 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						className: "mt-0.5 size-3.5 shrink-0",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "line-clamp-2",
						children: location
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [relativeAdded(item.createdAt), item.category ? ` · ${categoryLabel(item.category)}` : ""]
				})
			]
		})]
	});
}
function rankItems(items, query) {
	const q = query.trim();
	if (!q) return [...items].sort((a, b) => b.updatedAt - a.updatedAt).map((item) => ({
		...item,
		score: 0
	}));
	const tokens = searchTokens(q);
	const qn = normalize(q);
	const ranked = [];
	for (const item of items) {
		const name = normalize(item.name);
		const loc = normalize(formatPath(item.locationPath));
		const notes = normalize(item.notes);
		const cat = normalize(item.category);
		const hay = `${name} ${loc} ${notes} ${cat}`;
		let score = 0;
		if (name === qn) score += 120;
		else if (name.startsWith(qn) || qn.startsWith(name)) score += 90;
		else if (name.includes(qn)) score += 70;
		for (const token of tokens) {
			if (!token) continue;
			if (name === token) score += 40;
			else if (name.includes(token)) score += 28;
			if (loc.includes(token)) score += 16;
			if (cat.includes(token)) score += 12;
			if (notes.includes(token)) score += 8;
		}
		if (tokens.length > 0 && tokens.every((t) => hay.includes(t))) score += 18;
		if (score > 0) ranked.push({
			...item,
			score
		});
	}
	return ranked.sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt);
}
function Home() {
	const { q: qParam = "", place: placeParam = "", category: categoryParam = "" } = Route$4.useSearch();
	const navigate = useNavigate({ from: "/" });
	const hydrated = useInventoryHydrated();
	const items = useInventory((s) => s.items);
	const places = useInventory((s) => s.places);
	const loadSample = useInventory((s) => s.loadSample);
	const [query, setQuery] = (0, import_react.useState)(qParam);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setQuery(qParam);
	}, [qParam]);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
				e.preventDefault();
				inputRef.current?.focus();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const parsed = (0, import_react.useMemo)(() => parsePlacement(query), [query]);
	const showCapture = looksLikePlacement(query) && parsed;
	const placeFilterIds = (0, import_react.useMemo)(() => {
		if (!placeParam) return null;
		return getDescendantIds(placeParam, places);
	}, [placeParam, places]);
	const filtered = (0, import_react.useMemo)(() => {
		let pool = items;
		if (placeFilterIds) pool = pool.filter((i) => i.placeId && placeFilterIds.has(i.placeId));
		if (categoryParam) pool = pool.filter((i) => i.category === categoryParam);
		return rankItems(pool, showCapture ? parsed.name : query);
	}, [
		items,
		placeFilterIds,
		categoryParam,
		query,
		showCapture,
		parsed
	]);
	const placeName = places.find((p) => p.id === placeParam)?.name;
	const possession = isPossessionQuery(query) && filtered.length > 0 && query.trim().length > 0;
	function commitQuery(next) {
		setQuery(next);
		navigate({
			search: (prev) => ({
				...prev,
				q: next
			}),
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl leading-tight font-medium tracking-tight text-foreground sm:text-4xl",
				children: "Where is it?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "A memory for the things you put down."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			role: "search",
			className: "relative mb-4",
			onSubmit: (e) => {
				e.preventDefault();
				commitQuery(query);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					value: query,
					onChange: (e) => commitQuery(e.target.value),
					placeholder: "Where are my drill bits?",
					"aria-label": "Search your stuff",
					className: "h-14 w-full rounded-xl bg-card pr-14 pl-12 text-base text-foreground shadow-search placeholder:text-muted-foreground focus-visible:outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
					className: "absolute top-1.5 right-1.5",
					onTranscript: commitQuery
				})
			]
		}),
		showCapture && parsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 shadow-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
						children: "Record this?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-medium",
						children: parsed.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm text-muted-foreground",
						children: formatPath(parsed.locationSegments)
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/add",
					search: {
						q: query,
						name: parsed.name,
						location: formatPath(parsed.locationSegments)
					},
					children: "Save"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPills, {
				value: categoryParam,
				includeAll: true,
				allowCustom: false,
				onChange: (next) => void navigate({
					search: (prev) => ({
						...prev,
						category: next
					}),
					replace: true
				})
			})
		}),
		!hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			"aria-hidden": "true",
			children: [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 rounded-xl bg-card shadow-border" }, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			placeName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground",
					children: ["In ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: placeName
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 text-sm font-medium text-primary",
					onClick: () => void navigate({
						search: (prev) => ({
							...prev,
							place: ""
						}),
						replace: true
					}),
					children: "Clear"
				})]
			}),
			query.trim() && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted-foreground",
				children: possession ? `Yes — ${filtered.length} recorded.` : filtered.length === 1 ? "1 match" : `${filtered.length} matches`
			}),
			!query.trim() && items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-sm font-medium text-muted-foreground",
				children: "Recently added"
			}),
			filtered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "stagger-in space-y-2.5",
				children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemCard, { item }) }, item.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				query,
				hasItems: items.length > 0,
				onLoadSample: loadSample
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/add",
			search: {
				q: looksLikePlacement(query) ? query : "",
				name: "",
				location: ""
			},
			className: "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex h-14 items-center gap-2 rounded-full bg-primary px-5 text-base font-medium text-primary-foreground shadow-border-hover",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" }), "Add"]
		})
	] });
}
function EmptyState({ query, hasItems, onLoadSample }) {
	if (query.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card px-5 py-8 text-center shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-medium",
				children: "Nothing recorded for that."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Save it now so you can find it later."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/add",
					search: {
						q: query,
						name: query,
						location: ""
					},
					children: ["Add ", query.trim()]
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card px-5 py-10 text-center shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-medium",
				children: "Nothing stored yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-sm text-sm text-muted-foreground",
				children: "Record an item in a few seconds. Search for it months later."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/add",
						search: {
							q: "",
							name: "",
							location: ""
						},
						children: "Add an item"
					})
				}), !hasItems && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: onLoadSample,
					children: "Load a sample garage"
				})]
			})
		]
	});
}
//#endregion
export { Home as component };
