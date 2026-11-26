/**
 * 侧边栏项目
 */
export interface ISidebarItem {
	href: string;
	text: string;
	items?: ISidebarItem[];
	/**
	 * 可选徽标内容
	 */
	badge?: string | number;
}

/**
 * 侧边栏配置
 */
export interface ISidebarProps {
	/**
	 * 侧边栏项目
	 */
	sidebarItems: ISidebarItem[];

	/**
	 * 桌面端类名
	 */
	class?: string;

	/**
	 * 是否开启调试模式，显示边框
	 * @default false
	 */
	debug?: boolean;

	/**
	 * 侧边栏顶部外边距
	 */
	marginTop?:
		| "xs"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| string;

	/**
	 * 侧边栏底部外边距
	 */
	marginBottom?:
		| "xs"
		| "sm"
		| "md"
		| "lg"
		| "xl"
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| string;
}
