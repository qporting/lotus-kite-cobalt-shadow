import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as ArrowLeft, d as Pencil, f as Package, h as MapPin, i as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$1 } from "./router-CWQ1Tqqr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as formatPath, c as homeSearch, f as relativeAdded, h as useInventoryHydrated, i as cn, m as useInventory, n as Button, t as AppShell } from "./store-CIbqbaJH.mjs";
import { i as categoryLabel, t as CATEGORY_ICONS } from "./categories-BonfHP_X.mjs";
import { a as AlertDialogDescription, c as AlertDialogTitle, i as AlertDialogContent, n as AlertDialogAction, o as AlertDialogFooter, r as AlertDialogCancel, s as AlertDialogHeader, t as AlertDialog } from "./alert-dialog-BMpQCh68.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/items._itemId-rdhJoVfa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", {
	variants: { variant: {
		default: "bg-secondary text-secondary-foreground",
		primary: "bg-primary text-primary-foreground",
		outline: "shadow-border text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function ItemDetailPage() {
	const { itemId } = Route$1.useParams();
	const hydrated = useInventoryHydrated();
	const item = useInventory((s) => s.items.find((i) => i.id === itemId));
	const deleteItem = useInventory((s) => s.deleteItem);
	const navigate = useNavigate();
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-64 rounded-xl bg-card shadow-border" }) });
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-2xl font-medium",
		children: "That item is gone."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		className: "mt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			search: homeSearch,
			children: "Back to search"
		})
	})] });
	const Icon = CATEGORY_ICONS[item.category] ?? Package;
	const location = formatPath(item.locationPath);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			search: homeSearch,
			className: "mb-4 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
		}),
		item.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: item.photo,
			alt: item.name,
			className: "mb-5 aspect-photo w-full rounded-xl object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex aspect-photo w-full items-center justify-center rounded-xl bg-muted text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "size-12",
				strokeWidth: 1.25
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-medium tracking-tight",
			children: item.name
		}),
		location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			search: {
				q: "",
				place: item.placeId ?? "",
				category: ""
			},
			className: "mt-3 flex items-start gap-2 text-base text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-1 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: location })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted-foreground",
			children: "No location recorded."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-center gap-2",
			children: [item.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: categoryLabel(item.category) }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-muted-foreground",
				children: ["Added ", relativeAdded(item.createdAt)]
			})]
		}),
		item.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 rounded-lg bg-card p-4 text-foreground shadow-border",
			children: item.notes
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/items/$itemId/edit",
					params: { itemId: item.id },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" }), "Edit"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "destructive",
				className: "flex-1",
				onClick: () => setConfirm(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Delete"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: confirm,
			onOpenChange: setConfirm,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, { children: [
				"Delete ",
				item.name,
				"?"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This removes it from your memory. You can always add it again later." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Keep it" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				className: "bg-destructive text-destructive-foreground",
				onClick: () => {
					deleteItem(item.id);
					toast.success("Deleted.");
					navigate({
						to: "/",
						search: homeSearch
					});
				},
				children: "Delete"
			})] })] })
		})
	] });
}
//#endregion
export { ItemDetailPage as component };
