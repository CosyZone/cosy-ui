/**
 * PhotoWall Astro 组件类型定义
 */

// 照片卡片尺寸类型
export type PhotoCardSize = "xs" | "sm" | "md" | "lg" | "xl";

// 照片卡片形状类型 - 已废弃，现在强制使用正方形
export type PhotoCardShape = "square";

// 照片卡片样式类型
export type PhotoCardStyle = "default" | "gradient" | "image" | "text";

// 照片卡片数据接口
export interface PhotoCardData {
	id: string;
	src: string;
	alt?: string;
	title?: string;
	subtitle?: string;
	size?: PhotoCardSize;
	/** 卡片形状 - 已废弃，现在强制使用正方形 */
	shape?: PhotoCardShape;
	style?: PhotoCardStyle;
	gradient?: string;
	backgroundColor?: string;
	textColor?: string;
	href?: string;
	target?: "_blank" | "_self";
}

// PhotoWall 组件属性接口
export interface IPhotoWallProps {
	/** 照片卡片数据数组 */
	photos: PhotoCardData[];
	/** 容器内边距 */
	padding?: PaddingSize;
	/** 卡片圆角大小 */
	rounded?: RoundedSize;
	/** 卡片间距 */
	gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
	/** 是否启用悬停效果 */
	hover?: boolean;
	/** 是否启用点击效果 */
	clickable?: boolean;
	/** 容器宽度 */
	width?: Size;
	/** 容器背景色 */
	background?: BackgroundColor;
	/** 是否显示边框 */
	border?: boolean;
	/** 是否居中显示 */
	centered?: boolean;
	/** 中心标题 */
	title?: string;
	/** 中心副标题 */
	subtitle?: string;
	/** 自定义类名 */
	class?: string;
	/** 自定义样式 */
	style?: string;
}

// 导入通用类型
import type { PaddingSize, RoundedSize } from "../../src/common";
import type { BackgroundColor } from "../../src/common/backgrounds";
import type { Size } from "../../src/common/size";
