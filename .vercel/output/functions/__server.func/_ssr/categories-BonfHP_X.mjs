import { D as Binoculars, E as Cable, S as Cpu, _ as House, a as Sun, b as FileText, c as Shirt, f as Package, n as Wrench, s as Snowflake, v as Hammer, w as Car, y as Fish } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-BonfHP_X.js
var DEFAULT_CATEGORIES = [
	"tools",
	"automotive",
	"electronics",
	"cables",
	"household",
	"seasonal",
	"outdoor",
	"hunting",
	"fishing",
	"clothing",
	"documents",
	"hardware",
	"miscellaneous"
];
var CATEGORY_LABELS = {
	tools: "Tools",
	automotive: "Automotive",
	electronics: "Electronics",
	cables: "Cables",
	household: "Household",
	seasonal: "Seasonal",
	outdoor: "Outdoor",
	hunting: "Hunting",
	fishing: "Fishing",
	clothing: "Clothing",
	documents: "Documents",
	hardware: "Hardware",
	miscellaneous: "Miscellaneous"
};
var CATEGORY_ICONS = {
	tools: Wrench,
	automotive: Car,
	electronics: Cpu,
	cables: Cable,
	household: House,
	seasonal: Snowflake,
	outdoor: Sun,
	hunting: Binoculars,
	fishing: Fish,
	clothing: Shirt,
	documents: FileText,
	hardware: Hammer,
	miscellaneous: Package
};
var KEYWORD_MAP = [
	{
		category: "cables",
		keywords: [
			"hdmi",
			"usb",
			"usb-c",
			"usbc",
			"cable",
			"charger",
			"extension cord",
			"ethernet",
			"power cord"
		]
	},
	{
		category: "tools",
		keywords: [
			"drill",
			"hammer",
			"screwdriver",
			"wrench",
			"saw",
			"bits",
			"toolbox",
			"clamp",
			"level",
			"tape measure"
		]
	},
	{
		category: "automotive",
		keywords: [
			"mazda",
			"car",
			"oil",
			"tire",
			"brake",
			"wiper",
			"air filter",
			"jumper"
		]
	},
	{
		category: "electronics",
		keywords: [
			"battery",
			"batteries",
			"adapter",
			"remote",
			"router",
			"hard drive",
			"ssd",
			"keyboard"
		]
	},
	{
		category: "seasonal",
		keywords: [
			"christmas",
			"xmas",
			"halloween",
			"decoration",
			"lights",
			"ornament",
			"wreath"
		]
	},
	{
		category: "fishing",
		keywords: [
			"fishing",
			"tackle",
			"hook",
			"lure",
			"bobber",
			"reel"
		]
	},
	{
		category: "hunting",
		keywords: [
			"hunting",
			"ammo",
			"camo",
			"decoy"
		]
	},
	{
		category: "outdoor",
		keywords: [
			"tent",
			"camp",
			"garden",
			"hose",
			"grill"
		]
	},
	{
		category: "documents",
		keywords: [
			"passport",
			"will",
			"title",
			"paperwork",
			"manual",
			"receipt",
			"document"
		]
	},
	{
		category: "hardware",
		keywords: [
			"screw",
			"nail",
			"bolt",
			"nut",
			"connector",
			"washer",
			"hinge"
		]
	},
	{
		category: "clothing",
		keywords: [
			"coat",
			"jacket",
			"boots",
			"gloves",
			"hat"
		]
	},
	{
		category: "household",
		keywords: [
			"sheet",
			"towel",
			"blanket",
			"pillow",
			"vacuum",
			"furnace"
		]
	}
];
function categoryLabel(value) {
	if (!value) return "Uncategorized";
	return CATEGORY_LABELS[value] ?? value;
}
function guessCategory(name, notes = "") {
	const hay = `${name} ${notes}`.toLowerCase();
	for (const row of KEYWORD_MAP) if (row.keywords.some((kw) => hay.includes(kw))) return row.category;
	return "";
}
//#endregion
export { guessCategory as a, categoryLabel as i, CATEGORY_LABELS as n, DEFAULT_CATEGORIES as r, CATEGORY_ICONS as t };
