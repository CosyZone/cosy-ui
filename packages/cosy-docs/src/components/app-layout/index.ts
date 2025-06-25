/**
 * 文档项目中的 App Layout 示例组件
 */

// 示例组件
import AppLayoutBasic from './AppLayoutBasic.astro';
import EAppLayoutCustomStyle from './EAppLayoutCustomStyle.astro';

// 容器组件
import EAppLayoutBasicContainer from './EAppLayoutBasicContainer.astro';
import EAppLayoutCustomStyleContainer from './EAppLayoutCustomStyleContainer.astro';

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
