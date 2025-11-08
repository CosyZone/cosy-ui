/**
 * Header 和 Footer 示例的侧边栏配置
 * 所有子页面共享此配置
 */
import type { ISidebarItem } from "@coffic/cosy-ui";

export function getSidebarItems(currentLocale: string): ISidebarItem[] {
	const t = (zh: string, en: string) => (currentLocale === "zh-cn" ? zh : en);

	return [
		{
			text: t("Header & Footer 示例", "Header & Footer Examples"),
			href: `/${currentLocale}/demos/headers`,
			items: [
				{
					text: t("首页", "Home"),
					href: `/${currentLocale}/demos/headers`,
				},
				{
					text: t("最简单的 Header", "Minimal Header"),
					href: `/${currentLocale}/demos/headers/minimal_header`,
				},
				{
					text: t("自定义 Header", "Custom Header"),
					href: `/${currentLocale}/demos/headers/custom_header`,
				},
				{
					text: t("自定义 Footer", "Custom Footer"),
					href: `/${currentLocale}/demos/headers/custom_footer`,
				},
				{
					text: t("自定义 Header & Footer", "Custom Header & Footer"),
					href: `/${currentLocale}/demos/headers/custom_header_footer`,
				},
			],
		},
	];
}
