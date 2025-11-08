import { THEME_DEFAULT, THEME_PREFERS_DARK } from "../config/themes.config";

interface ThemeManager {
	updateActiveTheme: (currentTheme: string) => void;
	handleThemeClick: (this: HTMLElement) => void;
	initialize: () => void;
	setTheme: (theme: string) => void;
	detectSystemTheme: () => string;
}

interface ThemeManagerOptions {
	/** 主题选择器，支持多种格式 */
	selectors?: {
		/** 主题项选择器，用于查找所有主题项 */
		items?: string;
		/** 主题 ID 属性名，用于从元素获取主题名称 */
		themeIdAttr?: string;
		/** 旧式主题设置属性名（可选，用于向后兼容） */
		themeSetAttr?: string;
	};
}

/**
 * 创建主题管理器
 *
 * 提供主题切换、主题持久化存储和系统主题检测等功能
 * 支持 Astro 和 Vue 两种使用模式
 *
 * @param options 配置选项，用于自定义选择器
 * @returns ThemeManager 主题管理器对象
 */
export function createThemeManager(
	options: ThemeManagerOptions = {},
): ThemeManager {
	// 默认配置：支持 Astro 模式（data-theme-id）和 Vue 模式（data-theme）
	const {
		selectors = {
			items: "[data-theme-id], [data-theme], .cosy\\:theme-item",
			themeIdAttr: "data-theme-id",
			themeSetAttr: "data-set-theme",
		},
	} = options;

	const getThemeItems = () =>
		document.querySelectorAll<HTMLElement>(selectors.items || "");

	const updateActiveTheme = (currentTheme: string) => {
		const themeItems = getThemeItems();
		themeItems.forEach((item) => {
			// 获取主题 ID（只从主题项属性读取，不使用 data-theme，因为那是根元素的应用主题）
			const themeId =
				item.getAttribute(selectors.themeIdAttr || "data-theme-id") ||
				item.getAttribute(selectors.themeSetAttr || "data-set-theme");
			// 如果没有找到主题 ID，跳过该项
			if (!themeId) {
				return;
			}
			const isActive = themeId === currentTheme;

			// 设置元素的 data-active 属性
			item.setAttribute("data-active", String(isActive));

			// 更新 CheckIcon 显示状态（Astro 模式）
			if (item.classList.contains("cosy:theme-item")) {
				const checkmark = item.querySelector(".cosy\\:theme-check");
				if (checkmark) {
					if (isActive) {
						checkmark.classList.remove("cosy:hidden");
						item.classList.add("cosy:bg-base-200", "cosy:font-medium");
					} else {
						checkmark.classList.add("cosy:hidden");
						item.classList.remove("cosy:bg-base-200", "cosy:font-medium");
					}
				}
			}

			// 旧式主题按钮的类切换行为（Vue 模式）
			if (item.hasAttribute(selectors.themeSetAttr || "data-set-theme")) {
				item.classList.toggle("cosy:bg-primary", isActive);
				item.classList.toggle("cosy:text-primary-content", isActive);
			}
		});
	};

	function handleThemeClick(this: HTMLElement) {
		// 获取主题（只从主题项属性读取，不使用 data-theme）
		const theme =
			this.getAttribute(selectors.themeIdAttr || "data-theme-id") ||
			this.getAttribute(selectors.themeSetAttr || "data-set-theme");
		if (theme) {
			setTheme(theme);
		}
	}

	/**
	 * 从配置文件读取主题配置
	 * 从 TypeScript 配置文件中读取默认主题和暗黑主题名称
	 *
	 * @returns 包含默认主题和暗黑主题名称的对象
	 */
	const getThemeConfig = (): {
		defaultTheme: string;
		prefersDarkTheme: string;
	} => {
		// 从配置文件读取（编译时确定，无 SSR 问题）
		return {
			defaultTheme: THEME_DEFAULT,
			prefersDarkTheme: THEME_PREFERS_DARK,
		};
	};

	/**
	 * 获取实际应用的主题
	 * 如果选择的是 "default"，则根据系统主题返回实际主题
	 * 主题名称从 CSS 变量中读取，实现单一数据源
	 *
	 * @param theme 用户选择的主题ID
	 * @returns 实际应用的主题ID
	 */
	const getActualTheme = (theme: string): string => {
		if (theme === "default" || !theme) {
			const systemTheme = detectSystemTheme();
			const { defaultTheme, prefersDarkTheme } = getThemeConfig();
			// 系统是暗黑模式时使用 prefersDarkTheme，否则使用 defaultTheme
			return systemTheme === "dark" ? prefersDarkTheme : defaultTheme;
		}
		return theme;
	};

	/**
	 * 设置主题
	 *
	 * @param theme 主题ID（用户选择的主题，会保存到 localStorage）
	 */
	const setTheme = (theme: string) => {
		// 保存用户选择的原始主题
		localStorage.setItem("theme", theme);

		// 获取实际应用的主题
		const actualTheme = getActualTheme(theme);

		// 应用实际主题
		document.documentElement.setAttribute("data-theme", actualTheme);

		// 更新 UI 显示（显示用户选择的主题，而不是实际主题）
		updateActiveTheme(theme);
	};

	/**
	 * 检测系统主题偏好（亮色/暗色）
	 *
	 * @returns 'dark' 或 'light'
	 */
	const detectSystemTheme = (): string => {
		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	};

	/**
	 * 初始化主题管理器
	 *
	 * 从本地存储中获取主题设置，如果没有则使用 "default"（会根据系统主题自动映射到 corporate 或 business）
	 */
	const initialize = () => {
		// 从本地存储中获取主题
		let savedTheme = localStorage.getItem("theme");

		// 如果没有保存的主题，则使用 "default"（会根据系统主题自动映射）
		if (!savedTheme) {
			savedTheme = "default";
		}

		// 设置主题（会自动处理 default 主题的动态映射）
		setTheme(savedTheme);

		// 添加主题切换事件监听器
		// 支持多种选择器模式
		const themeItems = [
			...Array.from(
				document.querySelectorAll<HTMLElement>(
					selectors.themeIdAttr
						? `[${selectors.themeIdAttr}]`
						: "[data-theme-id]",
				),
			),
			...Array.from(
				document.querySelectorAll<HTMLElement>(
					selectors.themeSetAttr
						? `[${selectors.themeSetAttr}]`
						: "[data-set-theme]",
				),
			),
			...Array.from(
				document.querySelectorAll<HTMLElement>(".cosy\\:theme-item"),
			),
			...Array.from(document.querySelectorAll<HTMLElement>("[data-theme]")),
		];

		themeItems.forEach((item) => {
			item.removeEventListener("click", handleThemeClick);
			item.addEventListener("click", handleThemeClick);
		});

		// 监听系统主题变化
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (_e) => {
				const currentSavedTheme = localStorage.getItem("theme");

				// 如果用户选择的是 "default" 主题，则跟随系统主题变化
				if (currentSavedTheme === "default" || !currentSavedTheme) {
					setTheme("default"); // 重新设置，会根据系统主题自动映射到 corporate 或 business
				}
			});
	};

	return {
		updateActiveTheme,
		handleThemeClick,
		initialize,
		setTheme,
		detectSystemTheme,
	};
}
