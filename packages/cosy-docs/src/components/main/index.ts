import MainArticle from "./MainArticle.astro";
import MainArticleContainer from "./MainArticleContainer.astro";
import MainBasic from "./MainBasic.astro";
import MainBasicContainer from "./MainBasicContainer.astro";
import MainBgAccent from "./MainBgAccent.astro";
import MainBgBase200 from "./MainBgBase200.astro";
import MainBgCustom from "./MainBgCustom.astro";
import MainBgPrimary from "./MainBgPrimary.astro";
import MainBgSecondary from "./MainBgSecondary.astro";
import MainBorder from "./MainBorder.astro";
import MainBorderContainer from "./MainBorderContainer.astro";
import MainBorderLg from "./MainBorderLg.astro";
import MainBorderNone from "./MainBorderNone.astro";
import MainBorderSm from "./MainBorderSm.astro";
import MainBorderXl from "./MainBorderXl.astro";
import MainCustomBg from "./MainCustomBg.astro";
import MainCustomBgContainer from "./MainCustomBgContainer.astro";
import MainCustomPadding from "./MainCustomPadding.astro";
import MainCustomPaddingContainer from "./MainCustomPaddingContainer.astro";
import MainCustomSize from "./MainCustomSize.astro";
import MainCustomSizeContainer from "./MainCustomSizeContainer.astro";
import MainLayout from "./MainLayout.astro";
import MainLayoutColumn from "./MainLayoutColumn.astro";
import MainLayoutContainer from "./MainLayoutContainer.astro";
import MainNormal from "./MainNormal.astro";
import MainPaddingAxis from "./MainPaddingAxis.astro";
import MainPaddingAxisContainer from "./MainPaddingAxisContainer.astro";
import MainPaddingIndividual from "./MainPaddingIndividual.astro";
import MainSize from "./MainSize.astro";
import MainSizeContainer from "./MainSizeContainer.astro";
import MainSizeFull from "./MainSizeFull.astro";
import MainSizeLg from "./MainSizeLg.astro";
import MainSizeMd from "./MainSizeMd.astro";
import MainSizeXl from "./MainSizeXl.astro";

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
