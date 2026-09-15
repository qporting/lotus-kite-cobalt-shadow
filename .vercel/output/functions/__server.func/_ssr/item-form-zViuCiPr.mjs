import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { T as Camera, g as ImagePlus, h as MapPin, t as X, u as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as formatPath, d as parseLocationInput, i as cn, l as listPlacePaths, m as useInventory, n as Button } from "./store-CIbqbaJH.mjs";
import { t as Input } from "./input-xTlaG56F.mjs";
import { a as guessCategory } from "./categories-BonfHP_X.mjs";
import { a as parsePlacement, i as looksLikePlacement, n as VoiceButton, t as CategoryPills } from "./parse-placement--jm9YtE8.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/item-form-zViuCiPr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LocationPicker({ value, onChange }) {
	const places = useInventory((s) => s.places);
	const [open, setOpen] = (0, import_react.useState)(false);
	const options = (0, import_react.useMemo)(() => listPlacePaths(places), [places]);
	const q = value.trim().toLowerCase();
	const filtered = q ? options.filter((o) => o.label.toLowerCase().includes(q)).slice(0, 8) : options.slice(0, 8);
	const typedSegments = parseLocationInput(value);
	const typedLabel = formatPath(typedSegments);
	const exact = options.some((o) => o.label.toLowerCase() === q);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-sm font-medium",
				htmlFor: "location",
				children: "Location"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "location",
					value,
					autoComplete: "off",
					placeholder: "Garage → Blue toolbox",
					className: "pl-10",
					onChange: (e) => {
						onChange(e.target.value);
						setOpen(true);
					},
					onFocus: () => setOpen(true),
					onBlur: () => {
						window.setTimeout(() => setOpen(false), 150);
					}
				})]
			}),
			open && (filtered.length > 0 || typedLabel && !exact) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "absolute z-20 max-h-64 w-full overflow-auto rounded-lg bg-card p-1 shadow-border-hover",
				children: [filtered.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("flex w-full items-center rounded-sm px-3 py-2 text-left text-sm hover:bg-muted"),
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => {
						onChange(opt.label);
						setOpen(false);
					},
					children: opt.label
				}) }, opt.id)), typedLabel && !exact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-primary hover:bg-muted",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => {
						onChange(typedLabel);
						setOpen(false);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }),
						"Use ",
						typedLabel
					]
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Separate levels with arrows, slashes, or commas."
			})
		]
	});
}
var MAX_EDGE = 960;
var QUALITY = .72;
async function compressImage(file) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
	const width = Math.max(1, Math.round(bitmap.width * scale));
	const height = Math.max(1, Math.round(bitmap.height * scale));
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		bitmap.close();
		return blobToDataUrl(file);
	}
	ctx.drawImage(bitmap, 0, 0, width, height);
	bitmap.close();
	return canvas.toDataURL("image/jpeg", QUALITY);
}
function blobToDataUrl(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(reader.error);
		reader.onload = () => resolve(String(reader.result));
		reader.readAsDataURL(blob);
	});
}
function PhotoField({ value, onChange }) {
	const cameraRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	async function handleFiles(files) {
		const file = files?.[0];
		if (!file) return;
		try {
			onChange(await compressImage(file));
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Photo"
			}),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-xl bg-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "Stored location",
					className: "max-h-64 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "secondary",
					className: "absolute top-2 right-2",
					onClick: () => onChange(null),
					"aria-label": "Remove photo",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: () => cameraRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-4" }), "Camera"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: () => fileRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), "Library"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: cameraRef,
				type: "file",
				accept: "image/*",
				capture: "environment",
				className: "hidden",
				onChange: (e) => {
					handleFiles(e.target.files);
					e.target.value = "";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "image/*",
				className: "hidden",
				onChange: (e) => {
					handleFiles(e.target.files);
					e.target.value = "";
				}
			})
		]
	});
}
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium text-foreground", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-lg bg-card px-3 py-3 text-base text-foreground shadow-border transition-[box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-search disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function initialFrom(item, prefill) {
	const parsed = prefill?.q ? parsePlacement(prefill.q) : null;
	const capture = prefill?.q ?? "";
	const name = item?.name ?? parsed?.name ?? prefill?.name ?? "";
	const location = item ? formatPath(item.locationPath) : parsed ? formatPath(parsed.locationSegments) : prefill?.location ?? "";
	const notes = item?.notes ?? "";
	return {
		capture,
		name,
		location,
		category: item?.category ?? guessCategory(name, notes),
		notes,
		photo: item?.photo ?? null
	};
}
function ItemForm({ item, prefill }) {
	const navigate = useNavigate();
	const addItem = useInventory((s) => s.addItem);
	const updateItem = useInventory((s) => s.updateItem);
	const seed = initialFrom(item, prefill);
	const [capture, setCapture] = (0, import_react.useState)(seed.capture);
	const [name, setName] = (0, import_react.useState)(seed.name);
	const [location, setLocation] = (0, import_react.useState)(seed.location);
	const [category, setCategory] = (0, import_react.useState)(seed.category);
	const [notes, setNotes] = (0, import_react.useState)(seed.notes);
	const [photo, setPhoto] = (0, import_react.useState)(seed.photo);
	const parsed = (0, import_react.useMemo)(() => parsePlacement(capture), [capture]);
	function applyCapture(text) {
		setCapture(text);
		const next = parsePlacement(text);
		if (!next) return;
		setName(next.name);
		setLocation(formatPath(next.locationSegments));
		setCategory((current) => current || guessCategory(next.name, notes));
	}
	function handlePaste(e) {
		const file = [...e.clipboardData.files].find((f) => f.type.startsWith("image/"));
		if (!file) return;
		e.preventDefault();
		compressImage(file).then(setPhoto);
	}
	function onSubmit(e) {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) {
			toast.error("Give the item a name.");
			return;
		}
		const locationSegments = parseLocationInput(location);
		const resolvedCategory = category || guessCategory(trimmed, notes);
		if (item) {
			updateItem(item.id, {
				name: trimmed,
				notes,
				category: resolvedCategory,
				locationSegments,
				photo
			});
			toast.success("Updated.");
			navigate({
				to: "/items/$itemId",
				params: { itemId: item.id }
			});
			return;
		}
		const id = addItem({
			name: trimmed,
			notes,
			category: resolvedCategory,
			locationSegments,
			placeId: null,
			photo
		});
		toast.success("Remembered.");
		navigate({
			to: "/items/$itemId",
			params: { itemId: id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-5",
		onSubmit,
		onPaste: handlePaste,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "capture",
						children: "What did you put where?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "capture",
							value: capture,
							onChange: (e) => applyCapture(e.target.value),
							placeholder: "I put my spare HDMI cables in the blue toolbox in the garage.",
							className: "pr-12"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceButton, {
							className: "absolute top-2 right-2",
							onTranscript: applyCapture
						})]
					}),
					parsed && looksLikePlacement(capture) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: parsed.name
							}),
							" · ",
							formatPath(parsed.locationSegments)
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "name",
					children: "Item"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "name",
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: "HDMI cables",
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationPicker, {
				value: location,
				onChange: setLocation
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoField, {
				value: photo,
				onChange: setPhoto
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPills, {
					value: category,
					onChange: setCategory
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "notes",
					children: "Notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "notes",
					value: notes,
					onChange: (e) => setNotes(e.target.value),
					placeholder: "Look for the small black case on the right."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky bottom-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					size: "lg",
					className: "w-full",
					children: item ? "Save changes" : "Remember this"
				})
			})
		]
	});
}
//#endregion
export { ItemForm as t };
