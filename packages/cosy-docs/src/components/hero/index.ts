// Hero 容器组件
import AlignContainer from './AlignContainer.astro';
import BackgroundContainer from './BackgroundContainer.astro';
import BackgroundImageContainer from './BackgroundImageContainer.astro';
import BasicContainer from './BasicContainer.astro';
import WithButtonContainer from './WithButtonContainer.astro';
import WithImageContainer from './WithImageContainer.astro';

export const HeroPackage = {
    Basic: BasicContainer,
    Align: AlignContainer,
    Background: BackgroundContainer,
    BackgroundImage: BackgroundImageContainer,
    WithButton: WithButtonContainer,
    WithImage: WithImageContainer,
}; 
