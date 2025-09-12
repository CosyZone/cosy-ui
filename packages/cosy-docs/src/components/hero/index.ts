// Hero 示例组件
import HeroBasic from './HeroBasic.astro';
import HeroBasicContainer from './HeroBasicContainer.astro';
import HeroAlignContainer from './HeroAlignContainer.astro';

// Hero 容器组件
import AlignContainer from './AlignContainer.astro';
import BackgroundContainer from './BackgroundContainer.astro';
import BackgroundImageContainer from './BackgroundImageContainer.astro';
import BasicContainer from './BasicContainer.astro';
import WithButtonContainer from './WithButtonContainer.astro';
import WithImageContainer from './WithImageContainer.astro';
import HeroAppSlotContainer from './HeroAppSlotContainer.astro';

export const HeroPackage = {
    HeroExamples: {
        Basic: HeroBasic,
    },
    HeroContainers: {
        Align: HeroAlignContainer,
        Background: BackgroundContainer,
        BackgroundImage: BackgroundImageContainer,
        BackgroundOverlay: BackgroundImageContainer,
        Description: BasicContainer,
        Image: WithImageContainer,
        ImagePosition: WithImageContainer,
        Links: WithButtonContainer,
        OverlayOpacity: BackgroundImageContainer,
        Title: BasicContainer,
        App: HeroAppSlotContainer,
    },
    // 保持向后兼容
    Basic: BasicContainer,
    Align: AlignContainer,
    Background: BackgroundContainer,
    BackgroundImage: BackgroundImageContainer,
    WithButton: WithButtonContainer,
    WithImage: WithImageContainer,
}; 
