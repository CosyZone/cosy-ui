import Hero from './Hero.astro';
import HeroBasic from './HeroBasic.astro';
import HeroAlignCenter from './HeroAlignCenter.astro';
import HeroAlignLeft from './HeroAlignLeft.astro';
import HeroAlignRight from './HeroAlignRight.astro';
import HeroWithImage from './HeroWithImage.astro';
import HeroWithButton from './HeroWithButton.astro';
import HeroPlainBackground from './HeroPlainBackground.astro';
import HeroGradientBackground from './HeroGradientBackground.astro';
import HeroBackgroundImage from './HeroBackgroundImage.astro';
import HeroBasicContainer from './HeroBasicContainer.astro';
import HeroAlignContainer from './HeroAlignContainer.astro';
import HeroWithImageContainer from './HeroWithImageContainer.astro';
import HeroWithButtonContainer from './HeroWithButtonContainer.astro';
import HeroBackgroundContainer from './HeroBackgroundContainer.astro';
import HeroBackgroundImageContainer from './HeroBackgroundImageContainer.astro';

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
        BackgroundImage: HeroBackgroundImageContainer
    }
};