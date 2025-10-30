/**
 * PhotoWall Vue 组件示例导出
 */

import PhotoWallVueBackgroundContainer from "./PhotoWallVueBackgroundContainer.astro";
import PhotoWallVueBasic from "./PhotoWallVueBasic.vue";
import PhotoWallVueClickableContainer from "./PhotoWallVueClickableContainer.astro";
import PhotoWallVueGapContainer from "./PhotoWallVueGapContainer.astro";
import PhotoWallVueHoverContainer from "./PhotoWallVueHoverContainer.astro";
import PhotoWallVuePaddingContainer from "./PhotoWallVuePaddingContainer.astro";
import PhotoWallVueRoundedContainer from "./PhotoWallVueRoundedContainer.astro";
import PhotoWallVueSubtitleContainer from "./PhotoWallVueSubtitleContainer.astro";
import PhotoWallVueTitle from "./PhotoWallVueTitle.vue";
import PhotoWallVueTitleContainer from "./PhotoWallVueTitleContainer.astro";
import PhotoWallVueWidthContainer from "./PhotoWallVueWidthContainer.astro";

export const PhotoWallVuePackage = {
	Basic: PhotoWallVueBasic,
	BackgroundContainer: PhotoWallVueBackgroundContainer,
	ClickableContainer: PhotoWallVueClickableContainer,
	GapContainer: PhotoWallVueGapContainer,
	HoverContainer: PhotoWallVueHoverContainer,
	PaddingContainer: PhotoWallVuePaddingContainer,
	RoundedContainer: PhotoWallVueRoundedContainer,
	SubtitleContainer: PhotoWallVueSubtitleContainer,
	Title: PhotoWallVueTitle,
	TitleContainer: PhotoWallVueTitleContainer,
	WidthContainer: PhotoWallVueWidthContainer,
};
