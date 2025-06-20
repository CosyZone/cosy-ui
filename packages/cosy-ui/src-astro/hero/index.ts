import Hero from './Hero.astro';
import HeroBasic from './EHeroBasic.astro';
import HeroAlignCenter from './EHeroAlignCenter.astro';
import HeroAlignLeft from './EHeroAlignLeft.astro';
import HeroAlignRight from './EHeroAlignRight.astro';
import HeroWithImage from './EHeroWithImage.astro';
import HeroWithButton from './EHeroWithButton.astro';
import HeroPlainBackground from './EHeroPlainBackground.astro';
import HeroGradientBackground from './EHeroGradientBackground.astro';
import HeroBackgroundImage from './EHeroBackgroundImage.astro';
import HeroBasicContainer from './EHeroBasicContainer.astro';
import HeroAlignContainer from './EHeroAlignContainer.astro';
import HeroWithImageContainer from './EHeroWithImageContainer.astro';
import HeroWithButtonContainer from './EHeroWithButtonContainer.astro';
import HeroBackgroundContainer from './EHeroBackgroundContainer.astro';
import HeroBackgroundImageContainer from './EHeroBackgroundImageContainer.astro';

export { Hero };

export const HeroPackage = {
    Hero,
    HeroBasic,
    HeroAlignCenter,
    HeroAlignLeft,
    HeroAlignRight,
    HeroWithImage,
    HeroWithButton,
    HeroPlainBackground,
    HeroGradientBackground,
    HeroBackgroundImage,
    HeroContainers: {
        Basic: HeroBasicContainer,
        Align: HeroAlignContainer,
        WithImage: HeroWithImageContainer,
        WithButton: HeroWithButtonContainer,
        Background: HeroBackgroundContainer,
        BackgroundImage: HeroBackgroundImageContainer,
    },
};
