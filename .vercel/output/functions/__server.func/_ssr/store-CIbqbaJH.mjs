import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Slot, N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { m as MapPinned } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as formatDistanceToNowStrict } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-CIbqbaJH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var homeSearch = {
	q: void 0,
	place: void 0,
	category: void 0
};
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-14 max-w-2xl items-center justify-between px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					search: homeSearch,
					className: "flex min-h-11 items-center gap-2 text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-sm bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinned, {
							className: "size-4",
							strokeWidth: 1.75
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg leading-none font-medium tracking-tight",
						children: "Where Did I Put That?"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/places",
					className: "inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
					children: "Places"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl px-4 pt-6 pb-[max(6rem,env(safe-area-inset-bottom))]",
			children
		})]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function titleCase(value) {
	return value.trim().replace(/\s+/g, " ").split(" ").map((word) => {
		if (!word) return word;
		if (word === word.toUpperCase() && word.length <= 5) return word;
		const lower = word.toLowerCase();
		if ([
			"hdmi",
			"usb",
			"usbc",
			"usb-c",
			"hdmi",
			"tv",
			"pc"
		].includes(lower)) {
			if (lower === "usbc" || lower === "usb-c") return "USB-C";
			if (lower === "hdmi") return "HDMI";
			if (lower === "usb") return "USB";
			return word.toUpperCase();
		}
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}).join(" ");
}
function normalize(value) {
	return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
function newId() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-border hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			outline: "bg-card text-foreground shadow-border hover:shadow-border-hover",
			ghost: "text-foreground hover:bg-muted",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function relativeAdded(timestamp) {
	try {
		return formatDistanceToNowStrict(timestamp, { addSuffix: true });
	} catch {
		return "";
	}
}
function daysAgo(days) {
	return Date.now() - days * 24 * 60 * 60 * 1e3;
}
var SEED_PLACES = [
	{
		id: "place-house",
		name: "House",
		parentId: null,
		createdAt: daysAgo(400)
	},
	{
		id: "place-garage",
		name: "Garage",
		parentId: "place-house",
		createdAt: daysAgo(400)
	},
	{
		id: "place-workbench",
		name: "Workbench",
		parentId: "place-garage",
		createdAt: daysAgo(390)
	},
	{
		id: "place-top-drawer",
		name: "Top drawer",
		parentId: "place-workbench",
		createdAt: daysAgo(390)
	},
	{
		id: "place-bottom-drawer",
		name: "Bottom drawer",
		parentId: "place-workbench",
		createdAt: daysAgo(390)
	},
	{
		id: "place-shelf-2",
		name: "Shelf 2",
		parentId: "place-workbench",
		createdAt: daysAgo(380)
	},
	{
		id: "place-blue-toolbox",
		name: "Blue toolbox",
		parentId: "place-garage",
		createdAt: daysAgo(360)
	},
	{
		id: "place-cabinet",
		name: "Cabinet",
		parentId: "place-garage",
		createdAt: daysAgo(360)
	},
	{
		id: "place-tackle",
		name: "Tackle box",
		parentId: "place-garage",
		createdAt: daysAgo(300)
	},
	{
		id: "place-husky",
		name: "Red Husky toolbox",
		parentId: "place-garage",
		createdAt: daysAgo(320)
	},
	{
		id: "place-husky-2",
		name: "Second drawer",
		parentId: "place-husky",
		createdAt: daysAgo(320)
	},
	{
		id: "place-attic",
		name: "Attic",
		parentId: "place-house",
		createdAt: daysAgo(400)
	},
	{
		id: "place-attic-box",
		name: "Second box on the left",
		parentId: "place-attic",
		createdAt: daysAgo(280)
	},
	{
		id: "place-office",
		name: "Office",
		parentId: "place-house",
		createdAt: daysAgo(400)
	},
	{
		id: "place-desk-drawer",
		name: "Desk drawer",
		parentId: "place-office",
		createdAt: daysAgo(200)
	},
	{
		id: "place-bedroom",
		name: "Bedroom",
		parentId: "place-house",
		createdAt: daysAgo(400)
	},
	{
		id: "place-nightstand",
		name: "Nightstand",
		parentId: "place-bedroom",
		createdAt: daysAgo(180)
	},
	{
		id: "place-basement",
		name: "Basement",
		parentId: "place-house",
		createdAt: daysAgo(400)
	},
	{
		id: "place-storage",
		name: "Storage room",
		parentId: "place-basement",
		createdAt: daysAgo(350)
	},
	{
		id: "place-shelf-4",
		name: "Shelf 4",
		parentId: "place-storage",
		createdAt: daysAgo(350)
	},
	{
		id: "place-vehicle",
		name: "Vehicle",
		parentId: null,
		createdAt: daysAgo(200)
	},
	{
		id: "place-mazda",
		name: "2022 Mazda CX-9",
		parentId: "place-vehicle",
		createdAt: daysAgo(200)
	},
	{
		id: "place-cargo",
		name: "Rear cargo area",
		parentId: "place-mazda",
		createdAt: daysAgo(200)
	},
	{
		id: "place-cargo-bin",
		name: "Storage compartment",
		parentId: "place-cargo",
		createdAt: daysAgo(200)
	}
];
var SEED_ITEMS = [
	{
		id: "seed-hdmi",
		name: "Spare HDMI cables",
		notes: "Two 6-foot cables and one short adapter cable.",
		category: "cables",
		placeId: "place-blue-toolbox",
		locationPath: [
			"House",
			"Garage",
			"Blue toolbox"
		],
		photo: "/seed/hdmi-toolbox.jpg",
		createdAt: daysAgo(12),
		updatedAt: daysAgo(12)
	},
	{
		id: "seed-drill-bits",
		name: "Extra drill bits",
		notes: "Look for the small black case on the right side of the drawer.",
		category: "tools",
		placeId: "place-top-drawer",
		locationPath: [
			"House",
			"Garage",
			"Workbench",
			"Top drawer"
		],
		photo: "/seed/drill-bits.jpg",
		createdAt: daysAgo(90),
		updatedAt: daysAgo(90)
	},
	{
		id: "seed-drill",
		name: "Cordless drill",
		notes: "Battery is usually on the charger on the same shelf.",
		category: "tools",
		placeId: "place-shelf-2",
		locationPath: [
			"House",
			"Garage",
			"Workbench",
			"Shelf 2"
		],
		photo: "/seed/cordless-drill.jpg",
		createdAt: daysAgo(40),
		updatedAt: daysAgo(40)
	},
	{
		id: "seed-connectors",
		name: "Electrical connectors",
		notes: "Bag of wire nuts and spade connectors in the second drawer.",
		category: "hardware",
		placeId: "place-husky-2",
		locationPath: [
			"House",
			"Garage",
			"Red Husky toolbox",
			"Second drawer"
		],
		photo: "/seed/electrical-connectors.jpg",
		createdAt: daysAgo(180),
		updatedAt: daysAgo(180)
	},
	{
		id: "seed-lights",
		name: "Christmas lights",
		notes: "Warm-white strings. Second box on the left as you face the attic stairs.",
		category: "seasonal",
		placeId: "place-attic-box",
		locationPath: [
			"House",
			"Attic",
			"Second box on the left"
		],
		photo: "/seed/christmas-lights.jpg",
		createdAt: daysAgo(280),
		updatedAt: daysAgo(280)
	},
	{
		id: "seed-usbc-office",
		name: "USB-C cable",
		notes: "The longer braided one.",
		category: "cables",
		placeId: "place-desk-drawer",
		locationPath: [
			"House",
			"Office",
			"Desk drawer"
		],
		photo: "/seed/usbc-cables.jpg",
		createdAt: daysAgo(21),
		updatedAt: daysAgo(21)
	},
	{
		id: "seed-usbc-nightstand",
		name: "USB-C cable",
		notes: "Short overnight charging cable.",
		category: "cables",
		placeId: "place-nightstand",
		locationPath: [
			"House",
			"Bedroom",
			"Nightstand"
		],
		photo: null,
		createdAt: daysAgo(8),
		updatedAt: daysAgo(8)
	},
	{
		id: "seed-usbc-garage",
		name: "USB-C cable",
		notes: "Spare in the electronics bin mixed with old chargers.",
		category: "cables",
		placeId: "place-cabinet",
		locationPath: [
			"House",
			"Garage",
			"Cabinet"
		],
		photo: null,
		createdAt: daysAgo(60),
		updatedAt: daysAgo(60)
	},
	{
		id: "seed-air-filters",
		name: "Spare Mazda air filters",
		notes: "Cabin and engine filters, still in the boxes.",
		category: "automotive",
		placeId: "place-cabinet",
		locationPath: [
			"House",
			"Garage",
			"Cabinet"
		],
		photo: null,
		createdAt: daysAgo(70),
		updatedAt: daysAgo(70)
	},
	{
		id: "seed-hooks",
		name: "Extra fishing hooks",
		notes: "Size 4 and 6 in the top tray of the tackle box.",
		category: "fishing",
		placeId: "place-tackle",
		locationPath: [
			"House",
			"Garage",
			"Tackle box"
		],
		photo: null,
		createdAt: daysAgo(110),
		updatedAt: daysAgo(110)
	},
	{
		id: "seed-batteries",
		name: "AA batteries",
		notes: "Half-used pack. Also a few AAA mixed in.",
		category: "electronics",
		placeId: "place-desk-drawer",
		locationPath: [
			"House",
			"Office",
			"Desk drawer"
		],
		photo: null,
		createdAt: daysAgo(16),
		updatedAt: daysAgo(16)
	},
	{
		id: "seed-furnace",
		name: "Extra furnace filters",
		notes: "16x25x1. Two left.",
		category: "household",
		placeId: "place-shelf-4",
		locationPath: [
			"House",
			"Basement",
			"Storage room",
			"Shelf 4"
		],
		photo: null,
		createdAt: daysAgo(45),
		updatedAt: daysAgo(45)
	},
	{
		id: "seed-jumper",
		name: "Jumper cables",
		notes: "Rolled up in the cargo compartment under the floor.",
		category: "automotive",
		placeId: "place-cargo-bin",
		locationPath: [
			"Vehicle",
			"2022 Mazda CX-9",
			"Rear cargo area",
			"Storage compartment"
		],
		photo: null,
		createdAt: daysAgo(95),
		updatedAt: daysAgo(95)
	}
];
function getAncestors(placeId, places) {
	if (!placeId) return [];
	const byId = new Map(places.map((p) => [p.id, p]));
	const chain = [];
	let current = byId.get(placeId);
	const seen = /* @__PURE__ */ new Set();
	while (current && !seen.has(current.id)) {
		seen.add(current.id);
		chain.unshift(current);
		current = current.parentId ? byId.get(current.parentId) : void 0;
	}
	return chain;
}
function getPathNames(placeId, places) {
	return getAncestors(placeId, places).map((p) => p.name);
}
function formatPath(names) {
	return names.filter(Boolean).join(" → ");
}
function getChildren(parentId, places) {
	return places.filter((p) => p.parentId === parentId).sort((a, b) => a.name.localeCompare(b.name));
}
function getDescendantIds(placeId, places) {
	const ids = /* @__PURE__ */ new Set([placeId]);
	let grew = true;
	while (grew) {
		grew = false;
		for (const place of places) if (place.parentId && ids.has(place.parentId) && !ids.has(place.id)) {
			ids.add(place.id);
			grew = true;
		}
	}
	return ids;
}
function listPlacePaths(places) {
	return places.map((place) => {
		const names = getPathNames(place.id, places);
		return {
			id: place.id,
			names,
			label: formatPath(names)
		};
	}).sort((a, b) => a.label.localeCompare(b.label));
}
function parseLocationInput(value) {
	return value.split(/\s*(?:,|→|->|\/|;)\s*/).map((part) => part.replace(/^(the|a|an)\s+/i, "").trim()).filter(Boolean);
}
function smartSplitLocation(text, places) {
	const direct = parseLocationInput(text);
	if (direct.length > 1) return direct;
	const raw = direct[0] ?? text.trim();
	if (!raw) return [];
	const names = [...new Set(places.map((p) => p.name))].sort((a, b) => b.length - a.length);
	const lower = raw.toLowerCase();
	for (const name of names) {
		const n = name.toLowerCase();
		if (lower === n) return [name];
		if (lower.startsWith(`${n} `) || lower.startsWith(`${n},`)) {
			const rest = raw.slice(name.length).replace(/^[\s,/→-]+/, "");
			return rest ? [name, ...smartSplitLocation(rest, places)] : [name];
		}
	}
	return [raw];
}
function findPlaceByName(name, places, parentId) {
	const n = normalize(name);
	const matches = (parentId === void 0 ? places : places.filter((p) => p.parentId === parentId)).filter((p) => normalize(p.name) === n);
	if (matches.length === 0) return void 0;
	if (matches.length === 1) return matches[0];
	return [...matches].sort((a, b) => getAncestors(a.id, places).length - getAncestors(b.id, places).length)[0];
}
function refreshItemPaths(items, places) {
	return items.map((item) => {
		if (!item.placeId) return item;
		const locationPath = getPathNames(item.placeId, places);
		if (locationPath.length === 0) return item;
		return {
			...item,
			locationPath
		};
	});
}
var useInventory = create()(persist((set, get) => ({
	items: [],
	places: [],
	customCategories: [],
	initialized: false,
	seedIfNeeded: () => {
		if (get().initialized) return;
		set({
			items: SEED_ITEMS,
			places: SEED_PLACES,
			initialized: true
		});
	},
	loadSample: () => {
		const { items, places } = get();
		const itemIds = new Set(items.map((i) => i.id));
		const placeIds = new Set(places.map((p) => p.id));
		set({
			items: [...SEED_ITEMS.filter((i) => !itemIds.has(i.id)), ...items],
			places: [...places, ...SEED_PLACES.filter((p) => !placeIds.has(p.id))],
			initialized: true
		});
	},
	ensurePath: (segments) => {
		const cleaned = segments.map((s) => s.trim()).filter(Boolean);
		if (cleaned.length === 0) return null;
		const split = smartSplitLocation(cleaned.join(" → "), get().places);
		const names = split.length ? split : cleaned;
		let parentId = null;
		let remaining = [...names];
		const first = findPlaceByName(remaining[0] ?? "", get().places);
		if (first) {
			parentId = first.id;
			remaining = remaining.slice(1);
		}
		for (const name of remaining) {
			const existing = findPlaceByName(name, get().places, parentId);
			if (existing) {
				parentId = existing.id;
				continue;
			}
			parentId = get().addPlace(name, parentId);
		}
		return parentId;
	},
	addItem: (draft) => {
		const id = newId();
		const now = Date.now();
		let placeId = draft.placeId;
		if (!placeId && draft.locationSegments.length > 0) placeId = get().ensurePath(draft.locationSegments);
		const locationPath = placeId ? getPathNames(placeId, get().places) : draft.locationSegments;
		const item = {
			id,
			name: draft.name.trim(),
			notes: draft.notes.trim(),
			category: draft.category,
			placeId,
			locationPath,
			photo: draft.photo,
			createdAt: now,
			updatedAt: now
		};
		set((s) => ({
			items: [item, ...s.items],
			initialized: true
		}));
		return id;
	},
	updateItem: (id, draft) => {
		let nextPlaceId = draft.placeId;
		if (draft.locationSegments && draft.locationSegments.length > 0) nextPlaceId = get().ensurePath(draft.locationSegments);
		set((s) => {
			const current = s.items.find((i) => i.id === id);
			if (!current) return s;
			const placeId = nextPlaceId === void 0 ? current.placeId : nextPlaceId;
			const locationPath = placeId ? getPathNames(placeId, s.places) : draft.locationSegments && draft.locationSegments.length > 0 ? draft.locationSegments : current.locationPath;
			return { items: s.items.map((item) => item.id === id ? {
				...item,
				name: draft.name?.trim() ?? item.name,
				notes: draft.notes ?? item.notes,
				category: draft.category ?? item.category,
				photo: draft.photo === void 0 ? item.photo : draft.photo,
				placeId,
				locationPath,
				updatedAt: Date.now()
			} : item) };
		});
	},
	deleteItem: (id) => {
		set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
	},
	addPlace: (name, parentId) => {
		const trimmed = name.trim();
		const existing = get().places.find((p) => p.parentId === parentId && normalize(p.name) === normalize(trimmed));
		if (existing) return existing.id;
		const id = newId();
		const place = {
			id,
			name: trimmed,
			parentId,
			createdAt: Date.now()
		};
		set((s) => ({
			places: [...s.places, place],
			initialized: true
		}));
		return id;
	},
	renamePlace: (id, name) => {
		const trimmed = name.trim();
		if (!trimmed) return;
		set((s) => {
			const places = s.places.map((p) => p.id === id ? {
				...p,
				name: trimmed
			} : p);
			return {
				places,
				items: refreshItemPaths(s.items, places)
			};
		});
	},
	deletePlace: (id) => {
		set((s) => {
			const target = s.places.find((p) => p.id === id);
			if (!target) return s;
			const places = s.places.filter((p) => p.id !== id).map((p) => p.parentId === id ? {
				...p,
				parentId: target.parentId
			} : p);
			return {
				places,
				items: refreshItemPaths(s.items.map((item) => {
					if (item.placeId !== id) return item;
					return {
						...item,
						placeId: target.parentId,
						locationPath: target.parentId ? getPathNames(target.parentId, places) : item.locationPath,
						updatedAt: Date.now()
					};
				}), places)
			};
		});
	},
	addCustomCategory: (name) => {
		const trimmed = name.trim();
		if (!trimmed) return;
		set((s) => {
			if (s.customCategories.some((c) => normalize(c) === normalize(trimmed))) return s;
			return { customCategories: [...s.customCategories, trimmed] };
		});
	}
}), {
	name: "wdipt-v1",
	skipHydration: true,
	partialize: (state) => ({
		items: state.items,
		places: state.places,
		customCategories: state.customCategories,
		initialized: state.initialized
	})
}));
function useInventoryHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const persistApi = useInventory.persist;
		const finish = () => {
			useInventory.getState().seedIfNeeded();
			setHydrated(true);
		};
		if (!persistApi) {
			finish();
			return;
		}
		if (persistApi.hasHydrated()) {
			finish();
			return;
		}
		const unsub = persistApi.onFinishHydration(() => finish());
		persistApi.rehydrate();
		return unsub;
	}, []);
	return hydrated;
}
//#endregion
export { formatPath as a, homeSearch as c, parseLocationInput as d, relativeAdded as f, useInventoryHydrated as h, cn as i, listPlacePaths as l, useInventory as m, Button as n, getChildren as o, titleCase as p, buttonVariants as r, getDescendantIds as s, AppShell as t, normalize as u };
