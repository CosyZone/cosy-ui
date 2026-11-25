/**
 * 把现有构建产物 app.css 解析为规则表，用于：
 * 1) 提取主题变量（供手写 tokens.css 参考）
 * 2) 提取每个工具类的原始声明（供手写工具类层核对）
 *
 * 用法: node scripts/native-css/extract-compiled.mjs <app.css> <outDir>
 */
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
const outDir = process.argv[3] || "/tmp/cosy-native/compiled";
if (!src) throw new Error("usage: extract-compiled.mjs <app.css> [outDir]");

let text = fs.readFileSync(src, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

const rules = [];

function parseBlock(i, context) {
	let prelude = "";
	while (i < text.length) {
		const ch = text[i];
		if (ch === "{") {
			const p = prelude.trim();
			const start = i + 1;
			if (p.startsWith("@")) {
				if (/^@(property|keyframes|font-face|counter-style)/.test(p)) {
					let depth = 1;
					let j = start;
					while (j < text.length && depth > 0) {
						if (text[j] === "{") depth++;
						else if (text[j] === "}") depth--;
						j++;
					}
					rules.push({ prelude: p, body: text.slice(start, j - 1), context });
					prelude = "";
					i = j;
					continue;
				}
				i = parseBlock(start, [...context, p]);
				prelude = "";
				continue;
			}
			let j = start;
			while (j < text.length && text[j] !== "}") j++;
			rules.push({ prelude: p, body: text.slice(start, j), context });
			prelude = "";
			i = j + 1;
			continue;
		}
		if (ch === "}") return i + 1;
		prelude += ch;
		i++;
	}
	return i;
}

parseBlock(0, []);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "rules.json"), JSON.stringify(rules, null, 1));

// 类名 -> 声明（多选择器时按逗号拆分）
const byClass = {};
const addClass = (sel, body, context) => {
	const m = sel.match(/\.((?:\\.|[A-Za-z0-9_\-])+)/g);
	if (!m) return;
	for (const raw of m) {
		const cls = raw.slice(1).replace(/\\(.)/g, "$1");
		if (!cls.startsWith("cosy")) continue;
		(byClass[cls] ||= []).push({ selector: sel.trim(), body, context });
	}
};
for (const r of rules) {
	if (!r.body) continue;
	if (r.prelude.startsWith("@property")) continue;
	for (const sel of r.prelude.split(",")) addClass(sel, r.body, r.context);
}
fs.writeFileSync(path.join(outDir, "by-class.json"), JSON.stringify(byClass, null, 1));

const themeRules = rules.filter(
	(r) =>
		/--color-(base|primary|secondary|accent|neutral|info|success|warning|error)|--p:|--b1:/.test(
			r.body || "",
		) && /data-theme|:root|:host|@theme/.test(r.prelude + r.context.join(" ")),
);
fs.writeFileSync(path.join(outDir, "theme-rules.json"), JSON.stringify(themeRules, null, 1));

console.log({
	rules: rules.length,
	classes: Object.keys(byClass).length,
	themeRules: themeRules.length,
}, `-> ${outDir}`);