
import { buildStyle } from "./build-style";
import { buildSrc } from "./build-src";

async function postBuild() {
    try {
        await buildStyle();
        await buildSrc();
    } catch (error) {
        console.error("❌ 后处理任务失败:", error);
        process.exit(1);
    }
}

postBuild();
