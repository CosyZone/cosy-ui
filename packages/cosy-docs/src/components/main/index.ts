import MainBasic from './MainBasic.astro';
import MainCustomSize from './MainCustomSize.astro';
import MainCustomPadding from './MainCustomPadding.astro';
import MainCustomBg from './MainCustomBg.astro';
import MainBgPrimary from './MainBgPrimary.astro';
import MainBgSecondary from './MainBgSecondary.astro';
import MainBgAccent from './MainBgAccent.astro';
import MainBgBase200 from './MainBgBase200.astro';
import MainBgCustom from './MainBgCustom.astro';
import MainBorder from './MainBorder.astro';
import MainBorderNone from './MainBorderNone.astro';
import MainBorderSm from './MainBorderSm.astro';
import MainBorderLg from './MainBorderLg.astro';
import MainBorderXl from './MainBorderXl.astro';
import MainLayout from './MainLayout.astro';
import MainLayoutColumn from './MainLayoutColumn.astro';
import MainPaddingAxis from './MainPaddingAxis.astro';
import MainPaddingIndividual from './MainPaddingIndividual.astro';
import MainSize from './MainSize.astro';
import MainSizeMd from './MainSizeMd.astro';
import MainSizeLg from './MainSizeLg.astro';
import MainSizeXl from './MainSizeXl.astro';
import MainSizeFull from './MainSizeFull.astro';
import MainArticle from './MainArticle.astro';
import MainNormal from './MainNormal.astro';

import MainBasicContainer from './MainBasicContainer.astro';
import MainCustomSizeContainer from './MainCustomSizeContainer.astro';
import MainCustomPaddingContainer from './MainCustomPaddingContainer.astro';
import MainCustomBgContainer from './MainCustomBgContainer.astro';
import MainBorderContainer from './MainBorderContainer.astro';
import MainLayoutContainer from './MainLayoutContainer.astro';
import MainPaddingAxisContainer from './MainPaddingAxisContainer.astro';
import MainSizeContainer from './MainSizeContainer.astro';
import MainArticleContainer from './MainArticleContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: MainBasicContainer,
        CustomSize: MainCustomSizeContainer,
        CustomPadding: MainCustomPaddingContainer,
        CustomBg: MainCustomBgContainer,
        Border: MainBorderContainer,
        Layout: MainLayoutContainer,
        PaddingAxis: MainPaddingAxisContainer,
        Size: MainSizeContainer,
        Article: MainArticleContainer,
    },
    Examples: {
        Basic: MainBasic,
        CustomSize: MainCustomSize,
        CustomPadding: MainCustomPadding,
        CustomBg: MainCustomBg,
        Border: MainBorder,
        BorderNone: MainBorderNone,
        BorderSm: MainBorderSm,
        BorderLg: MainBorderLg,
        BorderXl: MainBorderXl,
        Layout: MainLayout,
        PaddingAxis: MainPaddingAxis,
        Size: MainSize,
        Article: MainArticle,
    },
}; 
