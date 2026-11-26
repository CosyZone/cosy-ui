import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const targets = {
	"packages/cosy-ui": [
		"package/dist/index.ts",
		"package/dist/src/Button.astro",
		"package/dist/icons.ts",
		"package/dist/app.css",
	],
	"packages/cosy-ui-vue": [
		"package/dist/index.ts",
		"package/dist/src/index.ts",
		"package/dist/src/app.css",
	],
};

const problems = [];
const packDir = mkdtempSync(path.join(tmpdir(), "cosy-pack-"));

for (const [pkgPath, required] of Object.entries(targets)) {
	const pkgDir = path.join(root, pkgPath);
	const pkgJson = JSON.parse(readFileSync(path.join(pkgDir, "package.json"), "utf8"));

	for (const file of required) {
		if (!existsSync(path.join(pkgDir, file.replace(/^package\//, "")))) {
			problems.push(`${pkgJson.name}: missing build artifact ${file}`);
		}
	}

	const output = execFileSync("pnpm", ["pack", "--pack-destination", packDir], {
		cwd: pkgDir,
		encoding: "utf8",
	});
	const tarball = output.trim().split("\n").at(-1);
	const listing = execFileSync("tar", ["-tzf", tarball], { encoding: "utf8" });

	for (const file of required) {
		if (!listing.includes(file)) {
			problems.push(`${pkgJson.name}: tarball is missing ${file}`);
		}
	}
	if (!listing.includes("package/package.json")) {
		problems.push(`${pkgJson.name}: tarball is missing package.json`);
	}
}

rmSync(packDir, { recursive: true, force: true });

if (problems.length > 0) {
	console.error(`打包检查失败 (${problems.length}):`);
	for (const problem of problems) console.error(`  - ${problem}`);
	process.exit(1);
}

console.log("打包检查通过：两个包的入口文件与样式产物均已包含在 tarball 中。");