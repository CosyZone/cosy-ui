export interface Logo {
	src: string;
	alt: string;
}

export interface Product {
	name: string;
	href: string;
	external?: boolean;
}

export interface FooterProps {
	/**
	 * 关于链接
	 */
	aboutLink?: string;

	/**
	 * 博客链接
	 */
	blogLink?: string;

	/**
	 * 职业链接
	 */
	careersLink?: string;

	/**
	 * 公司名称
	 */
	company: string;

	/**
	 * 联系链接
	 */
	contactLink?: string;

	/**
	 * 版权信息
	 */
	copyright: string;

	/**
	 * 调试模式
	 */
	debug?: boolean;

	/**
	 * 是否启用日志输出
	 * @default false
	 */
	enableLogging?: boolean;

	/**
	 * 常见问题链接
	 */
	faqLink?: string;

	/**
	 * 历史链接
	 */
	historyLink?: string;

	/**
	 * 首页链接
	 */
	homeLink: string;

	/**
	 * ICP备案号
	 */
	icp?: string;

	/**
	 * 激励标语
	 */
	inspirationalSlogan: string;

	/**
	 * 徽标
	 */
	logo?: Logo;

	/**
	 * 媒体链接
	 */
	mediaLink?: string;

	/**
	 * 新闻链接
	 */
	newsLink?: string;

	/**
	 * 合作伙伴链接
	 */
	partnersLink?: string;

	/**
	 * 隐私链接
	 */
	privacyLink?: string;

	/**
	 * 产品
	 */
	products?: Product[];

	/**
	 * 站点名称
	 */
	siteName: string;

	/**
	 * 标语
	 */
	slogan: string;

	/**
	 * 社交链接
	 */
	socialLinks?: string[];

	/**
	 * 团队链接
	 */
	teamLink?: string;

	/**
	 * 技术栈链接
	 */
	techStackLink?: string;

	/**
	 * 条款链接
	 */
	termsLink?: string;
}
