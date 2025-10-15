
import { buildStyle } from "./build-style";
import { buildVue } from "./build-vue";
import { buildSrc } from "./build-src";

async function postBuild() {
    try {
        await buildStyle();
        await buildSrc();
        await buildVue();
    } catch (error) {
        console.error("❌ 后处理任务失败:", error);
        process.exit(1);
    }
}

postBuild();
