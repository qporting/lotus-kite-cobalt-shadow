import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { o as Square, p as Mic } from "../_libs/lucide-react.mjs";
import { i as cn, m as useInventory, n as Button, p as titleCase } from "./store-CIbqbaJH.mjs";
import { t as Input } from "./input-xTlaG56F.mjs";
import { i as categoryLabel, n as CATEGORY_LABELS, r as DEFAULT_CATEGORIES } from "./categories-BonfHP_X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parse-placement--jm9YtE8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPills({ value, onChange, allowCustom = true, includeAll = false }) {
	const custom = useInventory((s) => s.customCategories);
	const addCustom = useInventory((s) => s.addCustomCategory);
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const cats = [
		...includeAll ? [{
			id: "",
			label: "All"
		}] : [],
		...DEFAULT_CATEGORIES.map((id) => ({
			id,
			label: CATEGORY_LABELS[id]
		})),
		...custom.map((name) => ({
			id: name,
			label: categoryLabel(name)
		}))
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1",
			children: [cats.map((cat) => {
				const active = value === cat.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onChange(cat.id),
					className: cn("h-9 shrink-0 rounded-full px-3 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"),
					children: cat.label
				}, cat.id || "all");
			}), allowCustom && !adding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setAdding(true),
				className: "h-9 shrink-0 rounded-full bg-card px-3 text-sm font-medium text-muted-foreground shadow-border hover:text-foreground",
				children: "Add"
			})]
		}), allowCustom && adding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "flex gap-2",
			onSubmit: (e) => {
				e.preventDefault();
				const name = draft.trim();
				if (name) {
					addCustom(name);
					onChange(name);
				}
				setDraft("");
				setAdding(false);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus: true,
				value: draft,
				onChange: (e) => setDraft(e.target.value),
				placeholder: "Custom category",
				"aria-label": "Custom category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "sm",
				children: "Save"
			})]
		})]
	});
}
function getSpeechRecognition() {
	if (typeof window === "undefined") return null;
	const w = window;
	return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function VoiceButton({ onTranscript, className }) {
	const Rec = getSpeechRecognition();
	const recRef = (0, import_react.useRef)(null);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [supported, setSupported] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setSupported(Boolean(getSpeechRecognition()));
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			recRef.current?.abort();
		};
	}, []);
	if (!supported || !Rec) return null;
	function toggle() {
		const Ctor = getSpeechRecognition();
		if (listening) {
			recRef.current?.stop();
			setListening(false);
			return;
		}
		if (!Ctor) return;
		const rec = new Ctor();
		rec.lang = "en-US";
		rec.continuous = false;
		rec.interimResults = false;
		rec.onresult = (event) => {
			const text = event.results[0]?.[0]?.transcript ?? "";
			if (text) onTranscript(text);
		};
		rec.onerror = () => setListening(false);
		rec.onend = () => setListening(false);
		recRef.current = rec;
		rec.start();
		setListening(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: listening ? "default" : "ghost",
		size: "icon",
		className: cn(className),
		onClick: toggle,
		"aria-pressed": listening,
		"aria-label": listening ? "Stop listening" : "Speak",
		children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" })
	});
}
var QUESTION_RE = /^(where|find|do i|did i|what|show me|have i|is there|any\b)/i;
var LEAD_IN_RE = /^(i put(?:\s+my)?|i've put|i stored|i left|put(?:\s+the)?|stored|left|keep|keeping)\s+/i;
var ITEM_LEAD_RE = /^(?:my|the|some|a|an|extra|spare)\s+/i;
function looksLikeQuestion(input) {
	return QUESTION_RE.test(input.trim());
}
function looksLikePlacement(input) {
	const text = input.trim();
	if (text.length < 8) return false;
	if (looksLikeQuestion(text)) return false;
	if (LEAD_IN_RE.test(text)) return true;
	return /\s+(inside|in the|into|in|on the|under|behind|at the)\s+/i.test(text);
}
function parsePlacement(input) {
	const raw = input.trim().replace(/[.!?]+$/, "");
	if (!raw || looksLikeQuestion(raw)) return null;
	const prep = raw.match(/\s+(inside(?:\s+the)?|in the|into(?:\s+the)?|on the|under(?:\s+the)?|behind(?:\s+the)?|at the|in|on|at)\s+/i);
	if (!prep || prep.index == null) return null;
	let itemPart = raw.slice(0, prep.index).replace(LEAD_IN_RE, "");
	itemPart = itemPart.replace(ITEM_LEAD_RE, "");
	itemPart = itemPart.replace(/\s+(are|is|were|was)$/i, "").trim();
	const locationSegments = splitLocation(raw.slice(prep.index + prep[0].length).trim());
	if (!itemPart || locationSegments.length === 0) return null;
	return {
		name: titleCase(itemPart),
		locationSegments: locationSegments.map((seg) => titleCase(seg))
	};
}
function splitLocation(loc) {
	return loc.split(/\s*(?:,|→|->|\/|;|\binside(?:\s+the)?\b|\bin the\b|\bin\b)\s*/i).map((part) => part.replace(/^(the|a|an)\s+/i, "").trim()).filter(Boolean);
}
var STOPWORDS = /* @__PURE__ */ new Set([
	"where",
	"are",
	"is",
	"was",
	"were",
	"the",
	"my",
	"mine",
	"a",
	"an",
	"any",
	"did",
	"i",
	"put",
	"find",
	"do",
	"does",
	"have",
	"got",
	"own",
	"already",
	"please",
	"show",
	"me",
	"there",
	"of",
	"for",
	"and",
	"or",
	"to",
	"in",
	"on",
	"at",
	"that",
	"this",
	"those",
	"these",
	"what",
	"whats"
]);
function searchTokens(query) {
	return query.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter((token) => token && !STOPWORDS.has(token) && token.length > 1).flatMap(stems);
}
function stems(word) {
	const out = [word];
	if (word.endsWith("ies") && word.length > 4) out.push(`${word.slice(0, -3)}y`);
	else if (word.endsWith("es") && word.length > 4) out.push(word.slice(0, -2));
	else if (word.endsWith("s") && word.length > 3) out.push(word.slice(0, -1));
	return out;
}
function isPossessionQuery(query) {
	return /^(do i have|have i got|do i own|is there|are there|any )\b/i.test(query.trim());
}
//#endregion
export { parsePlacement as a, looksLikePlacement as i, VoiceButton as n, searchTokens as o, isPossessionQuery as r, CategoryPills as t };
