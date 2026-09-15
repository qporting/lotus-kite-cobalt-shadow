import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { O as ArrowLeft } from "../_libs/lucide-react.mjs";
import { i as Route$3 } from "./router-CWQ1Tqqr.mjs";
import { c as homeSearch, h as useInventoryHydrated, t as AppShell } from "./store-CIbqbaJH.mjs";
import { t as ItemForm } from "./item-form-zViuCiPr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/add-TcKAVOAa.js
var import_jsx_runtime = require_jsx_runtime();
function AddItemPage() {
	const hydrated = useInventoryHydrated();
	const search = Route$3.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			search: homeSearch,
			className: "mb-4 inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-6 font-display text-3xl font-medium tracking-tight",
			children: "Remember this"
		}),
		hydrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemForm, { prefill: search }, `${search.q ?? ""}-${search.name ?? ""}-${search.location ?? ""}`) : null
	] });
}
//#endregion
export { AddItemPage as component };
