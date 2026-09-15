import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { C as ChevronRight, O as ArrowLeft, t as X, u as Plus, x as Ellipsis } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as homeSearch, h as useInventoryHydrated, i as cn, m as useInventory, n as Button, o as getChildren, s as getDescendantIds, t as AppShell } from "./store-CIbqbaJH.mjs";
import { t as Input } from "./input-xTlaG56F.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-BMpQCh68.mjs";
import { a as Trigger, i as Root2, n as Item2, r as Portal2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/places-CqRmqlIY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-foreground/30", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-5 text-card-foreground shadow-border-hover", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute top-3 right-3 rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-4 space-y-1 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-display text-xl font-medium tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 min-w-40 overflow-hidden rounded-lg bg-card p-1 text-card-foreground shadow-border-hover", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, destructive, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none select-none focus:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50", destructive && "text-destructive focus:bg-destructive/10", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
function PlacesPage() {
	const hydrated = useInventoryHydrated();
	const places = useInventory((s) => s.places);
	const items = useInventory((s) => s.items);
	const addPlace = useInventory((s) => s.addPlace);
	const renamePlace = useInventory((s) => s.renamePlace);
	const deletePlace = useInventory((s) => s.deletePlace);
	const [nameOpen, setNameOpen] = (0, import_react.useState)(false);
	const [nameValue, setNameValue] = (0, import_react.useState)("");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [parentId, setParentId] = (0, import_react.useState)(null);
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const [expanded, setExpanded] = (0, import_react.useState)(/* @__PURE__ */ new Set(["place-house", "place-garage"]));
	const counts = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const place of places) {
			const ids = getDescendantIds(place.id, places);
			map.set(place.id, items.filter((item) => item.placeId && ids.has(item.placeId)).length);
		}
		return map;
	}, [places, items]);
	const roots = getChildren(null, places);
	function openCreate(parent) {
		setEditing(null);
		setParentId(parent);
		setNameValue("");
		setNameOpen(true);
	}
	function openRename(place) {
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
			setExpanded((prev) => /* @__PURE__ */ new Set([
				...prev,
				id,
				parentId ?? ""
			]));
			toast.success("Place added.");
		}
		setNameOpen(false);
	}
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-xl bg-card shadow-border" }) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			search: homeSearch,
			className: "mb-4 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-medium tracking-tight",
				children: "Places"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "House, garage, drawers — nested however you store things."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => openCreate(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add"]
			})]
		}),
		roots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl bg-card px-5 py-10 text-center shadow-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-medium",
					children: "No places yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Start with House, Garage, or a vehicle."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => openCreate(null),
					children: "Add a place"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "rounded-xl bg-card py-1 shadow-border",
			children: roots.map((place) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRow, {
				place,
				places,
				counts,
				expanded,
				onToggle: (id) => setExpanded((prev) => {
					const next = new Set(prev);
					if (next.has(id)) next.delete(id);
					else next.add(id);
					return next;
				}),
				onAddChild: openCreate,
				onRename: openRename,
				onDelete: setPendingDelete,
				depth: 0
			}, place.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: nameOpen,
			onOpenChange: setNameOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Rename place" : "New place" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					submitName();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					value: nameValue,
					onChange: (e) => setNameValue(e.target.value),
					placeholder: "Workbench"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: editing ? "Save" : "Add place"
				}) })]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: Boolean(pendingDelete),
			onOpenChange: (open) => !open && setPendingDelete(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
				"Delete ",
				pendingDelete?.name,
				"?"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "Nested places move up one level. Items keep their recorded path." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				className: "bg-destructive text-destructive-foreground",
				onClick: () => {
					if (pendingDelete) deletePlace(pendingDelete.id);
					setPendingDelete(null);
					toast.success("Place removed.");
				},
				children: "Delete"
			})] })] })
		})
	] });
}
function PlaceRow({ place, places, counts, expanded, onToggle, onAddChild, onRename, onDelete, depth }) {
	const children = getChildren(place.id, places);
	const isOpen = expanded.has(place.id);
	const count = counts.get(place.id) ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1 py-1 pr-2",
		style: { paddingLeft: 8 + depth * 16 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-9 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
				onClick: () => onToggle(place.id),
				"aria-label": isOpen ? "Collapse" : "Expand",
				disabled: children.length === 0,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `size-4 transition-transform duration-150 ${isOpen && children.length ? "rotate-90" : ""} ${children.length ? "" : "opacity-0"}` })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				search: {
					q: "",
					place: place.id,
					category: ""
				},
				className: "min-w-0 flex-1 rounded-sm px-1 py-2 text-left hover:bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate font-medium",
					children: place.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [
						count,
						" ",
						count === 1 ? "item" : "items"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					"aria-label": `Actions for ${place.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "size-4" })
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
				align: "end",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onSelect: () => onAddChild(place.id),
						children: "Add inside"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						onSelect: () => onRename(place),
						children: "Rename"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
						destructive: true,
						onSelect: () => onDelete(place),
						children: "Delete"
					})
				]
			})] })
		]
	}), isOpen && children.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRow, {
		place: child,
		places,
		counts,
		expanded,
		onToggle,
		onAddChild,
		onRename,
		onDelete,
		depth: depth + 1
	}, child.id)) })] });
}
//#endregion
export { PlacesPage as component };
