import MainArticle from "./MainArticle.astro";
import MainArticleContainer from "./MainArticleContainer.astro";
import MainBasic from "./MainBasic.astro";
import MainBasicContainer from "./MainBasicContainer.astro";
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
import MainLayoutContainer from "./MainLayoutContainer.astro";
import MainPaddingAxis from "./MainPaddingAxis.astro";
import MainPaddingAxisContainer from "./MainPaddingAxisContainer.astro";
import MainSize from "./MainSize.astro";
import MainSizeContainer from "./MainSizeContainer.astro";

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
