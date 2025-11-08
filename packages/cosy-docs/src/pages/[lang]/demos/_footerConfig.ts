/**
 * 共享的 Footer 配置
 * 用于所有 demo 页面
 */

import Logo from "@/assets/logo.png";

/**
 * 获取 Footer 配置
 * @param currentLocale 当前语言（'zh-cn' 或 'en'）
 * @returns Footer 配置对象
 */
export function getFooterConfig(currentLocale: string) {
	const isZhCn = currentLocale === "zh-cn";

	return {
		logo: Logo,
		siteName: "Cosy UI",
		homeLink: `/${currentLocale}/`,
		slogan: isZhCn ? "优雅的组件库" : "Beautiful component library",
		company: "CofficLab",
		inspirationalSlogan: isZhCn ? "让开发更简单" : "Make development easier",
		background: "base-200" as const,
		// 产品系列
		products: [
			{ name: "Cisum", href: "https://coffic.cn/cisum" },
			{ name: "JuiceEditor", href: "https://coffic.cn/juice_editor" },
			{ name: "GitOK", href: "https://coffic.cn/gitok" },
			{ name: "Cosy UI", href: "https://github.com/cosyzone/cosy-ui" },
		],
		// 关于我们
		aboutInfo: {
			aboutLink: `/${currentLocale}/manuals/guide`,
			contactLink: "https://github.com/CosyZone/cosy-ui/issues",
			teamLink: "https://github.com/CosyZone/cosy-ui/graphs/contributors",
			careersLink: "https://github.com/CosyZone/cosy-ui",
		},
		// 法律信息
		legalInfo: {
			termsLink: "https://github.com/CosyZone/cosy-ui",
			privacyLink: "https://github.com/CosyZone/cosy-ui",
			icp: isZhCn ? "演示站点" : "Demo Site",
			icpLink: "https://github.com/CosyZone/cosy-ui",
		},
		// 资源链接
		resourcesInfo: {
			newsLink: `/${currentLocale}/manuals/guide`,
			historyLink: "https://github.com/CosyZone/cosy-ui/releases",
			partnersLink: "https://github.com/CosyZone/cosy-ui",
			blogLink: `/${currentLocale}/manuals/guide`,
			faqLink: `/${currentLocale}/manuals/guide`,
			mediaLink: "https://github.com/CosyZone/cosy-ui",
			techStackLink: `/${currentLocale}/manuals/guide`,
		},
		// 联系信息
		contactInfo: {
			address: isZhCn
				? "上海市浦东新区世纪大道 100 号"
				: "100 Century Ave, Pudong, Shanghai",
			phone: "+86 21 1234 5678",
			email: "hello@cosyui.dev",
			workingHours: isZhCn ? "周一至周五 09:00-18:00" : "Mon-Fri 09:00-18:00",
			wechat: "cosyui_official",
			qq: "12345678",
		},
		// 友情链接
		friendlyLinks: [
			{
				name: "GitHub",
				href: "https://github.com/CosyZone/cosy-ui",
				external: true,
			},
			{
				name: "CofficLab",
				href: "https://cofficlab.com",
				external: true,
			},
			{
				name: isZhCn ? "组件文档" : "Components",
				href: `/${currentLocale}/manuals/components/app-layout`,
				external: false,
			},
			{
				name: isZhCn ? "演示列表" : "Demos",
				href: `/${currentLocale}/demos`,
				external: false,
			},
		],
		// 社交媒体
		socialLinks: [
			"https://github.com/CosyZone/cosy-ui",
			"https://twitter.com/cofficlab",
		],
		// 版权信息
		copyright: isZhCn
			? `© ${new Date().getFullYear()} CofficLab. 保留所有权利`
			: `© ${new Date().getFullYear()} CofficLab. All rights reserved.`,
	};
}
