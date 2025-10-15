import type { HTMLAttributes } from "astro/types";
import type { IContainerPropsBase } from "../../src/components/container/containerPropsBase";
import type { ImageSource } from "index";

/**
 * Container 组件的 Astro 版本属性接口（继承基础接口并扩展 Astro 特定属性）
 */
export interface IContainerProps
	extends Omit<IContainerPropsBase, "class">,
		HTMLAttributes<"div"> {
	/**
	 * 背景图片源（本地 ImageMetadata 或 远程 URL）。提供时会用图片铺底作为背景
	 */
	backgroundImage?: ImageSource;

	/**
	 * 自定义类名
	 */
	class?: string;
}
