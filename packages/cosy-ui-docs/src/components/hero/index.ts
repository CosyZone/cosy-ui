// Hero 示例组件
import EHeroBasic from './EHeroBasic.astro.js';
import EHeroAlignCenter from './EHeroAlignCenter.astro.js';
import EHeroAlignLeft from './EHeroAlignLeft.astro.js';
import EHeroAlignRight from './EHeroAlignRight.astro.js';
import EHeroBackgroundImage from './EHeroBackgroundImage.astro.js';
import EHeroGradientBackground from './EHeroGradientBackground.astro.js';
import EHeroPlainBackground from './EHeroPlainBackground.astro.js';
import EHeroWithButton from './EHeroWithButton.astro.js';
import EHeroWithImage from './EHeroWithImage.astro.js';

// Hero 容器组件
import EHeroAlignContainer from './EHeroAlignContainer.astro.js';
import EHeroBackgroundContainer from './EHeroBackgroundContainer.astro.js';
import EHeroBackgroundImageContainer from './EHeroBackgroundImageContainer.astro.js';
import EHeroBasicContainer from './EHeroBasicContainer.astro.js';
import EHeroWithButtonContainer from './EHeroWithButtonContainer.astro.js';
import EHeroWithImageContainer from './EHeroWithImageContainer.astro.js';

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