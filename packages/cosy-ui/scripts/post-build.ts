import { buildAstro } from "./build-astro";
import { buildStyle } from "./build-style";
import { buildVue } from "./build-vue";
import { buildSrc } from "./build-src";

async function postBuild() {
    try {
        // 并行执行所有构建任务
        await Promise.all([
            buildStyle(),
            buildSrc(),
            buildAstro(),
            buildVue(),
        ]);
    } catch (error) {
        console.error("❌ 后处理任务失败:", error);
        process.exit(1);
    }
}

postBuild();
