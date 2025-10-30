/**
 * PhotoWall 组件示例导出（支持 Astro 和 Vue）
 */

import PhotoWallBackgroundContainer from "./PhotoWallBackgroundContainer.astro";
import PhotoWallBasicContainer from "./PhotoWallBasicContainer.astro";
import PhotoWallClickableContainer from "./PhotoWallClickableContainer.astro";
import PhotoWallGapContainer from "./PhotoWallGapContainer.astro";
import PhotoWallHoverContainer from "./PhotoWallHoverContainer.astro";
import PhotoWallPaddingContainer from "./PhotoWallPaddingContainer.astro";
import PhotoWallRoundedContainer from "./PhotoWallRoundedContainer.astro";
import PhotoWallSubtitleContainer from "./PhotoWallSubtitleContainer.astro";
import PhotoWallTitleContainer from "./PhotoWallTitleContainer.astro";
import PhotoWallWidthContainer from "./PhotoWallWidthContainer.astro";

export const PhotoWallPackage = {
	Basic: PhotoWallBasicContainer,
	BackgroundContainer: PhotoWallBackgroundContainer,
	ClickableContainer: PhotoWallClickableContainer,
	GapContainer: PhotoWallGapContainer,
	HoverContainer: PhotoWallHoverContainer,
	PaddingContainer: PhotoWallPaddingContainer,
	RoundedContainer: PhotoWallRoundedContainer,
	SubtitleContainer: PhotoWallSubtitleContainer,
	TitleContainer: PhotoWallTitleContainer,
	WidthContainer: PhotoWallWidthContainer,
};
