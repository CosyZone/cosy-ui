// Astro 示例组件

import WithAspectRatio from "./ContainerAspectRatioContainer.astro";
import AspectRatioContainer from "./ContainerAspectRatioContainer.astro";
import WithBackground from "./ContainerBackgroundContainer.astro";
import BackgroundContainer from "./ContainerBackgroundContainer.astro";
import BackgroundImageContainer from "./ContainerBackgroundImageContainer.astro";
import BasicUsage from "./ContainerBasic.astro";
import WithBorder from "./ContainerBorderContainer.astro";
import BorderContainer from "./ContainerBorderContainer.astro";
import CustomStyle from "./ContainerCustomClassContainer.astro";
import ClassContainer from "./ContainerCustomClassContainer.astro";
import WithFit from "./ContainerFitContainer.astro";
import FitContainer from "./ContainerFitContainer.astro";
import WithFlex from "./ContainerFlexContainer.astro";
import FlexContainer from "./ContainerFlexContainer.astro";
import WithGap from "./ContainerGapContainer.astro";
import GapContainer from "./ContainerGapContainer.astro";
import WithHeight from "./ContainerHeightContainer.astro";
import HeightContainer from "./ContainerHeightContainer.astro";
import WithMargin from "./ContainerMarginContainer.astro";
import MarginContainer from "./ContainerMarginContainer.astro";
import ContainerMuted from "./ContainerMuted.astro";
import ContainerMutedContainer from "./ContainerMutedContainer.astro";
import ContainerMutedTest from "./ContainerMutedTest.astro";
import ContainerMutedTestContainer from "./ContainerMutedTestContainer.astro";
import WithPadding from "./ContainerPaddingContainer.astro";
// Props 容器组件
import PaddingContainer from "./ContainerPaddingContainer.astro";
import WithRounded from "./ContainerRoundedContainer.astro";
import RoundedContainer from "./ContainerRoundedContainer.astro";
import ShadowContainer from "./ContainerShadowContainer.astro";
import ShadowContainerContainer from "./ContainerShadowContainer.astro";
import WithWidth from "./ContainerWidthsContainer.astro";
import WidthContainer from "./ContainerWidthsContainer.astro";

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
	ShadowContainer,
	BackgroundImageContainer,
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
	ShadowContainerContainer,
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
		ShadowContainer: ShadowContainerContainer,
		BackgroundImageContainer,
	},
};
