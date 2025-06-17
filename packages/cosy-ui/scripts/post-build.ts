import { buildAstro } from './build-astro';
import { buildStyle } from './build-style';
import { buildVue } from './build-vue';

async function postBuild() {
    try {
        await buildStyle();
        await buildAstro();
        await buildVue();
    } catch (error) {
        console.error('❌ 后处理任务失败:', error);
        process.exit(1);
    }
}

postBuild();
