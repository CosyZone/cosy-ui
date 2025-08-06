// Hero 示例组件
import Basic from './Basic.astro';
import AlignCenter from './AlignCenter.astro';
import AlignLeft from './AlignLeft.astro';
import AlignRight from './AlignRight.astro';
import BackgroundImage from './BackgroundImage.astro';
import GradientBackground from './GradientBackground.astro';
import PlainBackground from './PlainBackground.astro';
import WithButton from './WithButton.astro';
import WithImage from './WithImage.astro';
import WithImportedImage from './WithImportedImage.astro';
import WithImportedBackground from './WithImportedBackground.astro';

// Hero 容器组件
import AlignContainer from './AlignContainer.astro';
import BackgroundContainer from './BackgroundContainer.astro';
import BackgroundImageContainer from './BackgroundImageContainer.astro';
import BasicContainer from './BasicContainer.astro';
import WithButtonContainer from './WithButtonContainer.astro';
import WithImageContainer from './WithImageContainer.astro';

export const HeroPackage = {
    HeroContainers: {
        Basic: BasicContainer,
        Align: AlignContainer,
        Background: BackgroundContainer,
        BackgroundImage: BackgroundImageContainer,
        WithButton: WithButtonContainer,
        WithImage: WithImageContainer,
    },
    HeroExamples: {
        Basic: Basic,
        AlignCenter: AlignCenter,
        AlignLeft: AlignLeft,
        AlignRight: AlignRight,
        BackgroundImage: BackgroundImage,
        GradientBackground: GradientBackground,
        PlainBackground: PlainBackground,
        WithButton: WithButton,
        WithImage: WithImage,
        WithImportedImage: WithImportedImage,
        WithImportedBackground: WithImportedBackground,
    },
}; 
