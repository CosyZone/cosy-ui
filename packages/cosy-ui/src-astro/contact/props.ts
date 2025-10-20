import type { HTMLAttributes } from "astro/types";
import type { BackgroundColor } from "../../src/common/backgrounds";

/**
 * Contact 组件的属性接口
 */
export interface ContactProps extends HTMLAttributes<"div"> {
	/** 地址信息 */
	address?: string;

	/** 背景色类型，支持所有预设背景色和透明度变体 */
	background?: BackgroundColor;

	/** 自定义CSS类，可用于覆盖默认样式 */
	class?: string;

	/** 是否使用紧凑模式 */
	compact?: boolean;

	/** 联系信息描述 */
	description?: string;

	/** 电子邮件地址 */
	email?: string;

	/** Facebook链接 */
	facebook?: string;

	/** GitHub链接 */
	github?: string;

	/** LinkedIn链接 */
	linkedin?: string;

	/** 电话号码 */
	phone?: string;

	/** 联系信息标题 */
	title?: string;

	/** Twitter链接 */
	twitter?: string;

	/** 网站链接 */
	website?: string;

	/** 微信二维码图片源，支持本地图片或远程URL */
	wechatQR?: any; // ImageSource 类型

	/** WhatsApp 二维码图片源，支持本地图片或远程URL */
	whatsappQR?: any; // ImageSource 类型
}
