// Hero 示例组件
import EHeroBasic from './EHeroBasic.astro';
import EHeroAlignCenter from './EHeroAlignCenter.astro';
import EHeroAlignLeft from './EHeroAlignLeft.astro';
import EHeroAlignRight from './EHeroAlignRight.astro';
import EHeroBackgroundImage from './EHeroBackgroundImage.astro';
import EHeroGradientBackground from './EHeroGradientBackground.astro';
import EHeroPlainBackground from './EHeroPlainBackground.astro';
import EHeroWithButton from './EHeroWithButton.astro';
import EHeroWithImage from './EHeroWithImage.astro';

// Hero 容器组件
import EHeroAlignContainer from './EHeroAlignContainer.astro';
import EHeroBackgroundContainer from './EHeroBackgroundContainer.astro';
import EHeroBackgroundImageContainer from './EHeroBackgroundImageContainer.astro';
import EHeroBasicContainer from './EHeroBasicContainer.astro';
import EHeroWithButtonContainer from './EHeroWithButtonContainer.astro';
import EHeroWithImageContainer from './EHeroWithImageContainer.astro';

export const HeroPackage = {
    HeroContainers: {
        Basic: EHeroBasicContainer,
        Align: EHeroAlignContainer,
        Background: EHeroBackgroundContainer,
        BackgroundImage: EHeroBackgroundImageContainer,
        WithButton: EHeroWithButtonContainer,
        WithImage: EHeroWithImageContainer,
    },
    HeroExamples: {
        Basic: EHeroBasic,
        AlignCenter: EHeroAlignCenter,
        AlignLeft: EHeroAlignLeft,
        AlignRight: EHeroAlignRight,
        BackgroundImage: EHeroBackgroundImage,
        GradientBackground: EHeroGradientBackground,
        PlainBackground: EHeroPlainBackground,
        WithButton: EHeroWithButton,
        WithImage: EHeroWithImage,
    },
}; 