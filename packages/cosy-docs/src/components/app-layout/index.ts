// 示例组件
import AppLayoutBasic from './Basic.astro';
import CustomStyle from './CustomStyle.astro';

// 容器组件
import BasicContainer from './BasicContainer.astro';
import CustomStyleContainer from './CustomStyleContainer.astro';

export {
    // 示例组件
    AppLayoutBasic,
    CustomStyle,

    // 容器组件
    BasicContainer,
    CustomStyleContainer
};

// 导出 ComponentPackage 用于文档
export const AppLayoutPackage = {
    AppLayoutContainers: {
        Basic: BasicContainer,
        CustomStyle: CustomStyleContainer,
    },
}; 
