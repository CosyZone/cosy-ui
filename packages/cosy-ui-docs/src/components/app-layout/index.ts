/**
 * 文档项目中的 App Layout 示例组件
 */

// 示例组件
import AppLayoutBasic from './AppLayoutBasic.astro.js';
import EAppLayoutCustomStyle from './EAppLayoutCustomStyle.astro.js';

// 容器组件
import EAppLayoutBasicContainer from './EAppLayoutBasicContainer.astro.js';
import EAppLayoutCustomStyleContainer from './EAppLayoutCustomStyleContainer.astro.js';

export {
    // 示例组件
    AppLayoutBasic,
    EAppLayoutCustomStyle,

    // 容器组件
    EAppLayoutBasicContainer,
    EAppLayoutCustomStyleContainer
};

// 导出 ComponentPackage 用于文档
export const AppLayoutPackage = {
    AppLayoutContainers: {
        Basic: EAppLayoutBasicContainer,
        CustomStyle: EAppLayoutCustomStyleContainer,
    },
}; 