/**
 * 背景样式示例的侧边栏配置
 * 所有子页面共享此配置
 */
import type { ISidebarItem } from "@coffic/cosy-ui";

export function getSidebarItems(currentLocale: string): ISidebarItem[] {
	const t = (zh: string, en: string) => (currentLocale === "zh-cn" ? zh : en);

	return [
		{
			text: t("背景样式", "Background Styles"),
			href: `/${currentLocale}/demos/backgrounds`,
			items: [
				{
					text: t("首页", "Home"),
					href: `/${currentLocale}/demos/backgrounds`,
				},
				{
					text: t("玻璃态效果", "Glassmorphism"),
					href: `/${currentLocale}/demos/backgrounds/glassmorphism`,
				},
				{
					text: t("网格渐变", "Mesh Gradient"),
					href: `/${currentLocale}/demos/backgrounds/mesh-gradient`,
				},
				{
					text: t("噪点纹理", "Noise Texture"),
					href: `/${currentLocale}/demos/backgrounds/noise`,
				},
				{
					text: t("动态渐变", "Animated Gradient"),
					href: `/${currentLocale}/demos/backgrounds/animated-gradient`,
				},
				{
					text: t("自定义背景", "Custom Background"),
					href: `/${currentLocale}/demos/backgrounds/custom_background`,
				},
			],
		},
	];
}
