/**
 * 布局示例的侧边栏配置
 * 所有子页面共享此配置
 */
import type { ISidebarItem } from "@coffic/cosy-ui";

export function getSidebarItems(currentLocale: string): ISidebarItem[] {
	const t = (zh: string, en: string) => (currentLocale === "zh-cn" ? zh : en);

	return [
		{
			text: t("布局示例", "Layout Examples"),
			href: `/${currentLocale}/demos/layouts`,
			items: [
				{
					text: t("首页", "Home"),
					href: `/${currentLocale}/demos/layouts`,
				},
				{
					text: t("文档布局", "Document Layout"),
					href: `/${currentLocale}/demos/layouts/doc_layout`,
				},
				{
					text: t("网格布局", "Grid Layout"),
					href: `/${currentLocale}/demos/layouts/grid_layout`,
				},
			],
		},
	];
}
