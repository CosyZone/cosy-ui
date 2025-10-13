// Astro 示例组件
import BasicUsage from "./ContainerBasic.astro";
import WithPadding from "./ContainerPaddingContainer.astro";
import WithMargin from "./ContainerMarginContainer.astro";
import WithBackground from "./ContainerBackgroundContainer.astro";
import WithBorder from "./ContainerBorderContainer.astro";
import WithRounded from "./ContainerRoundedContainer.astro";
import WithFlex from "./ContainerFlexContainer.astro";
import WithGap from "./ContainerGapContainer.astro";
import WithWidth from "./ContainerWidthsContainer.astro";
import WithHeight from "./ContainerHeightContainer.astro";
import WithAspectRatio from "./ContainerAspectRatioContainer.astro";
import WithFit from "./ContainerFitContainer.astro";
import CustomStyle from "./ContainerCustomClassContainer.astro";
import ContainerMuted from "./ContainerMuted.astro";
import ContainerMutedTest from "./ContainerMutedTest.astro";

// Props 容器组件
import PaddingContainer from "./ContainerPaddingContainer.astro";
import MarginContainer from "./ContainerMarginContainer.astro";
import BackgroundContainer from "./ContainerBackgroundContainer.astro";
import BorderContainer from "./ContainerBorderContainer.astro";
import RoundedContainer from "./ContainerRoundedContainer.astro";
import FlexContainer from "./ContainerFlexContainer.astro";
import GapContainer from "./ContainerGapContainer.astro";
import WidthContainer from "./ContainerWidthsContainer.astro";
import HeightContainer from "./ContainerHeightContainer.astro";
import AspectRatioContainer from "./ContainerAspectRatioContainer.astro";
import FitContainer from "./ContainerFitContainer.astro";
import ClassContainer from "./ContainerCustomClassContainer.astro";
import ContainerMutedContainer from "./ContainerMutedContainer.astro";
import ContainerMutedTestContainer from "./ContainerMutedTestContainer.astro";

// 导出组件
export {
	BasicUsage,
	WithPadding,
	WithMargin,
	WithBackground,
	WithBorder,
	WithRounded,
	WithFlex,
	WithGap,
	WithWidth,
	WithHeight,
	WithAspectRatio,
	WithFit,
	CustomStyle,
	ContainerMuted,
	ContainerMutedTest,
};

export {
	PaddingContainer,
	MarginContainer,
	BackgroundContainer,
	BorderContainer,
	RoundedContainer,
	FlexContainer,
	GapContainer,
	WidthContainer,
	HeightContainer,
	AspectRatioContainer,
	FitContainer,
	ClassContainer,
	ContainerMutedContainer,
	ContainerMutedTestContainer,
};

// 组件包结构
export const ComponentPackage = {
	ComponentContainers: {
		BasicUsage,
		WithPadding,
		WithMargin,
		WithBackground,
		WithBorder,
		WithRounded,
		WithFlex,
		WithGap,
		WithWidth,
		WithHeight,
		WithAspectRatio,
		WithFit,
		CustomStyle,
		PaddingContainer,
		MarginContainer,
		BackgroundContainer,
		BorderContainer,
		RoundedContainer,
		FlexContainer,
		GapContainer,
		WidthContainer,
		HeightContainer,
		AspectRatioContainer,
		FitContainer,
		ClassContainer,
		MutedContainer: ContainerMutedContainer,
		MutedTestContainer: ContainerMutedTestContainer,
	},
};
