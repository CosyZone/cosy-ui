export interface INavItem {
	/**
	 * 导航项的标题
	 */
	title: string;

	/**
	 * 导航项的链接地址
	 */
	href: string;

	/**
	 * 导航项的图标名称
	 */
	icon?: string;

	/**
	 * 点击事件处理函数
	 */
	onClick?: string;

	/**
	 * 子导航项
	 */
	children?: INavItem[];
}
