/**
 * 校验：源码中出现的每个 `cosy:` 类名都能在样式层里找到定义。
 *
 * 类名允许在 known-unstyled.json 中登记为例外（历史遗留 / 动态拼接 / 无样式钩子），
 * 登记项必须写明原因，避免无声地新增"写了类名却没有样式"的用法。
 *
 * 用法: node scripts/native-css/check-coverage.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");
const NATIVE_DIRS = [
	"packages/cosy-ui/src-astro/internal/styles",
	"packages/cosy-ui-vue/src/internal/styles",
];
const SOURCE_DIRS = [
	"packages/cosy-ui/src-astro",
	"packages/cosy-ui-vue/src",
	"packages/cosy-docs/src",
	"packages/cosy-docs/content",
	"packages/vue-example/src",
];
const TOKEN_RE = /cosy:[A-Za-z0-9:_/.\[\]%#(),!-]+/g;

function walk(dir, exts, acc = []) {
	if (!fs.existsSync(dir)) return acc;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(p, exts, acc);
		else if (exts.test(entry.name)) acc.push(p);
	}
	return acc;
}

const allow = JSON.parse(
	fs.readFileSync(path.join(import.meta.dirname, "known-unstyled.json"), "utf8"),
);

const defined = new Set();
for (const dir of NATIVE_DIRS) {
	for (const file of walk(path.join(ROOT, dir), /\.css$/)) {
		const css = fs.readFileSync(file, "utf8");
		for (const m of css.matchAll(/\.((?:\\.|[A-Za-z0-9_-])+)/g)) {
			defined.add(`cosy:${m[1].replace(/\\(.)/g, "$1").slice(5)}`);
		}
	}
}

const used = new Map();
for (const dir of SOURCE_DIRS) {
	for (const file of walk(path.join(ROOT, dir), /\.(astro|ts|vue|js|mdx|md)$/)) {
		const text = fs.readFileSync(file, "utf8");
		for (const match of text.match(TOKEN_RE) || []) {
			const token = match.replace(/[.,;)]+$/, "");
			if (!used.has(token)) used.set(token, file.replace(`${ROOT}/`, ""));
		}
	}
}

const missing = [...used].filter(([token]) => !defined.has(token) && !(token in allow));

if (missing.length > 0) {
	console.error(`缺少样式定义的类名 (${missing.length}):`);
	for (const [token, file] of missing) console.error(`  ${token}  <- ${file}`);
	console.error("\n若确属无需样式的历史用法，请登记到 scripts/native-css/known-unstyled.json 并写明原因。");
	process.exit(1);
}

console.log(`样式覆盖率检查通过：${used.size} 个类名，${Object.keys(allow).length} 个登记例外。`);