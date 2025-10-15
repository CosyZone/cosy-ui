import { buildAstro } from "./build-astro";

async function postBuild() {
	try {
		await buildAstro();
	} catch (error) {
		console.error("❌ 后处理任务失败:", error);
		process.exit(1);
	}
}

postBuild();
