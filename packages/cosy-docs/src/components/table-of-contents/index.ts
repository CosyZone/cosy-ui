// 导入示例组件
import Basic from './Basic.astro';
import ContainerSelector from './ContainerSelector.astro';
import Fixed from './Fixed.astro';
import MaxDepth from './MaxDepth.astro';
import MinHeadings from './MinHeadings.astro';
import Selector from './Selector.astro';
import Title from './Title.astro';

// 导入容器组件
import BasicContainer from './BasicContainer.astro';
import ContainerSelectorContainer from './ContainerSelectorContainer.astro';
import FixedContainer from './FixedContainer.astro';
import MaxDepthContainer from './MaxDepthContainer.astro';
import MinHeadingsContainer from './MinHeadingsContainer.astro';
import SelectorContainer from './SelectorContainer.astro';
import TitleContainer from './TitleContainer.astro';

// 导出示例组件
export {
    Basic,
    ContainerSelector,
    Fixed,
    MaxDepth,
    MinHeadings,
    Selector,
    Title,
};

// 导出容器组件
export {
    BasicContainer,
    ContainerSelectorContainer,
    FixedContainer,
    MaxDepthContainer,
    MinHeadingsContainer,
    SelectorContainer,
    TitleContainer,
};

// 导出 ComponentPackage 用于文档
export const TableOfContentsPackage = {
    Basic: BasicContainer,
    ContainerSelector: ContainerSelectorContainer,
    Fixed: FixedContainer,
    MaxDepth: MaxDepthContainer,
    MinHeadings: MinHeadingsContainer,
    Selector: SelectorContainer,
    Title: TitleContainer,
}; 
