//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Ik2ctCE6.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/add",
			"/places",
			"/items/$itemId"
		],
		preloads: [
			"/assets/index-BivjEXpu.js",
			"/assets/createLucideIcon-C20vfABw.js",
			"/assets/preload-helper-BVbIk2KQ.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-BivjEXpu.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CF47iAVE.js",
			"/assets/categories-CEhs9wZ3.js",
			"/assets/store-DLYbwDbh.js",
			"/assets/parse-placement-CFK6A4bo.js",
			"/assets/input-ST5NucBB.js"
		]
	},
	"/add": {
		filePath: "/workspace/src/routes/add.tsx",
		children: void 0,
		preloads: [
			"/assets/add-w4IaPD67.js",
			"/assets/dist-CqacX-Pp.js",
			"/assets/item-form-Dg27WlkH.js",
			"/assets/store-DLYbwDbh.js"
		]
	},
	"/places": {
		filePath: "/workspace/src/routes/places.tsx",
		children: void 0,
		preloads: [
			"/assets/places-6EDMZx-A.js",
			"/assets/dist-CqacX-Pp.js",
			"/assets/store-DLYbwDbh.js",
			"/assets/input-ST5NucBB.js",
			"/assets/x-DMoEanoA.js",
			"/assets/alert-dialog-BgWj17dZ.js"
		]
	},
	"/items/$itemId": {
		filePath: "/workspace/src/routes/items.$itemId.tsx",
		children: ["/items/$itemId/edit"],
		preloads: [
			"/assets/items._itemId-CLjSiF6e.js",
			"/assets/dist-CqacX-Pp.js",
			"/assets/categories-CEhs9wZ3.js",
			"/assets/store-DLYbwDbh.js",
			"/assets/alert-dialog-BgWj17dZ.js"
		]
	},
	"/items/$itemId/edit": {
		filePath: "/workspace/src/routes/items.$itemId.edit.tsx",
		children: void 0,
		preloads: ["/assets/items._itemId.edit-cfhfnzCJ.js", "/assets/item-form-Dg27WlkH.js"]
	}
} });
//#endregion
export { tsrStartManifest };
