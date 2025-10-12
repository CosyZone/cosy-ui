import type { HTMLAttributes } from "astro/types";
import type { FitMode } from "../../src/common/fitmode";
import type { ContentBorderColor } from "../../src/components/container/contentBorderColors";
import type { IContainerPropsBase } from "../../src/components/container/containerPropsBase";
import type { ImageSource } from "index-astro";

/**
 * Container 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IContainerProps
	extends Omit<IContainerPropsBase, "class">,
		HTMLAttributes<"div"> {
	/**
	 * 宽高比（宽/高），设置后容器会保持这个比例
	 */
	aspectRatio?: number;

	/**
	 * 背景图片源（本地 ImageMetadata 或 远程 URL）。提供时会用图片铺底作为背景
	 */
	backgroundImage?: ImageSource;

	/**
	 * 内容适配模式：none（默认）、contain（保持比例，尽量占满且不溢出）、cover（保持比例，铺满并可能裁剪）
	 */
	fit?: FitMode;

	/**
	 * 是否给内容比例盒加边框（仅在 fit 模式下生效）
	 */
	contentBorder?: boolean | ContentBorderColor;

	/**
	 * 是否让内部内容居中显示
	 * @default false
	 */
	contentCentered?: boolean;

	/**
	 * 自定义类名
	 */
	class?: string;
}
