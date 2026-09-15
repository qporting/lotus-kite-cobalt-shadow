import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-CWQ1Tqqr.mjs";
import { c as homeSearch, h as useInventoryHydrated, m as useInventory, n as Button, t as AppShell } from "./store-CIbqbaJH.mjs";
import { t as ItemForm } from "./item-form-zViuCiPr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/items._itemId.edit-tzgQUmwp.js
var import_jsx_runtime = require_jsx_runtime();
function EditItemPage() {
	const { itemId } = Route.useParams();
	const hydrated = useInventoryHydrated();
	const item = useInventory((s) => s.items.find((i) => i.id === itemId));
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/items/$itemId",
			params: { itemId: item.id },
			className: "mb-4 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 font-display text-3xl font-medium tracking-tight",
			children: "Edit item"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemForm, { item })
	] });
}
//#endregion
export { EditItemPage as component };
