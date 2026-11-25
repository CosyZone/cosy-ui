/**
 * 收集 cosy-ui 源码与构建产物中实际出现的 `cosy:` 类名，
 * 作为手写样式层覆盖率的唯一依据。
 *
 * 用法: node scripts/native-css/extract-usage.mjs [--json]
 * 输出: /tmp/cosy-native/usage.json 与 /tmp/cosy-native/tokens.txt
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const OUT_DIR = "/tmp/cosy-native";
const TOKEN_RE = /cosy:[A-Za-z0-9:_/.\[\]%#(),!-]+/g;

const SOURCE_DIRS = [
	"packages/cosy-ui/src-astro",
	"packages/cosy-ui-vue/src",
	"packages/cosy-docs/src",
	"packages/cosy-docs/content",
	"packages/vue-example/src",
];
const BUILD_DIRS = ["packages/cosy-docs/dist", "packages/vue-example/dist"];

function walk(dir, exts) {
	const acc = [];
	if (!fs.existsSync(dir)) return acc;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) acc.push(...walk(p, exts));
		else if (exts.test(entry.name)) acc.push(p);
	}
	return acc;
}

const counts = new Map();
const origins = new Map();

function record(file, kind) {
	const text = fs.readFileSync(file, "utf8");
	for (const match of text.match(TOKEN_RE) || []) {
		const token = match.replace(/[.,;]+$/, "");
		counts.set(token, (counts.get(token) || 0) + 1);
		let set = origins.get(token);
		if (!set) origins.set(token, (set = new Set()));
		set.add(kind);
	}
}

for (const dir of SOURCE_DIRS) {
	for (const file of walk(path.join(ROOT, dir), /\.(astro|ts|vue|js|mdx|md|html)$/))
		record(file, "source");
}
for (const dir of BUILD_DIRS) {
	for (const file of walk(path.join(ROOT, dir), /\.(html|js)$/))
		record(file, "build");
}

const tokens = [...counts.keys()].sort();
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(
	path.join(OUT_DIR, "usage.json"),
	JSON.stringify(
		Object.fromEntries(tokens.map((t) => [t, { count: counts.get(t), origins: [...origins.get(t)] }])),
		null,
		2,
	),
);
fs.writeFileSync(path.join(OUT_DIR, "tokens.txt"), `${tokens.join("\n")}\n`);

if (process.argv.includes("--json")) {
	console.log(JSON.stringify({ total: tokens.length, tokens }, null, 2));
} else {
	console.log(`tokens: ${tokens.length}`);
	console.log(`source-only: ${tokens.filter((t) => origins.get(t).has("source") && !origins.get(t).has("build")).length}`);
	console.log(`build-only: ${tokens.filter((t) => !origins.get(t).has("source")).length}`);
	console.log(`-> ${OUT_DIR}/tokens.txt`);
}