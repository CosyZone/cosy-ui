export interface FooterICPProps {
	icp: string;
	icpLink?: string;
}

export interface FooterCopyrightProps {
	company: string;
}

export interface FooterSectionProps {
	title: string;
	links: Array<{
		name: string;
		href?: string;
		external?: boolean;
	}>;
}

import type { ImageSource } from "../image/image";
import type { BackgroundColor } from "../../src/common/backgrounds";
import type { IProduct } from "../types/product";

export interface FooterBrandProps {
	siteName: string;
	homeLink: string;
	slogan: string;
	logo?: ImageSource;
	socialLinks?: Array<{
		url: string;
		platform: string;
		name: string;
	}>;
	wechatQR?: ImageSource;
	whatsappQR?: ImageSource;
}

export interface IFooterProps {
	/** 公司名称 */
	company: string;
	/** 背景色类型，支持所有预设背景色和透明度变体 */
	background?: BackgroundColor;
	/** 友情链接 */
	friendlyLinks?: IProduct[];
	/** 首页链接 */
	homeLink: string;
	/** 激励标语 */
	inspirationalSlogan: string;
	/** 徽标 */
	logo?: ImageSource;
	/** 产品 */
	products?: IProduct[];
	/** 站点名称 */
	siteName: string;
	/** 标语 */
	slogan: string;
	/** 社交链接 */
	socialLinks?: string[];
	/** 微信二维码 */
	wechatQR?: ImageSource;
	/** WhatsApp 二维码 */
	whatsappQR?: ImageSource;
	/** 关于信息 */
	aboutInfo?: IAboutInfo;
	/** 联系方式信息 */
	contactInfo?: IContactInfo;
	/** 法律信息 */
	legalInfo?: ILegalInfo;
	/** 资源信息 */
	resourcesInfo?: IResourcesInfo;
}

export interface IContactInfo {
	/** 地址 */
	address?: string;
	/** 电话 */
	phone?: string;
	/** 邮箱 */
	email?: string;
	/** 工作时间 */
	workingHours?: string;
	/** 微信号 */
	wechat?: string;
	/** QQ号 */
	qq?: string;
}

export interface ILegalInfo {
	/** 服务条款链接 */
	termsLink?: string;
	/** 隐私政策链接 */
	privacyLink?: string;
	/** ICP备案号 */
	icp?: string;
	/** ICP备案链接 */
	icpLink?: string;
}

export interface IResourcesInfo {
	/** 新闻链接 */
	newsLink?: string;
	/** 历史链接 */
	historyLink?: string;
	/** 合作伙伴链接 */
	partnersLink?: string;
	/** 博客链接 */
	blogLink?: string;
	/** 常见问题链接 */
	faqLink?: string;
	/** 媒体链接 */
	mediaLink?: string;
	/** 技术栈链接 */
	techStackLink?: string;
}

export interface IAboutInfo {
	/** 关于链接 */
	aboutLink?: string;
	/** 联系链接 */
	contactLink?: string;
	/** 团队链接 */
	teamLink?: string;
	/** 职业链接 */
	careersLink?: string;
}
