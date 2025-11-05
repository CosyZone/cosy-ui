interface ThemeManager {
	updateActiveTheme: (currentTheme: string) => void;
	handleThemeClick: (this: HTMLElement) => void;
	initialize: () => void;
	setTheme: (theme: string) => void;
	detectSystemTheme: () => string;
}

/**
 * 创建主题管理器
 *
 * 提供主题切换、主题持久化存储和系统主题检测等功能
 *
 * @returns ThemeManager 主题管理器对象
 */
export function createThemeManager(): ThemeManager {
	const getThemeItems = () =>
		document.querySelectorAll<HTMLElement>(
			"[data-theme-id], .cosy\\:theme-item",
		);

	const updateActiveTheme = (currentTheme: string) => {
		const themeItems = getThemeItems();
		themeItems.forEach((item) => {
			const themeId = item.getAttribute("data-theme-id");
			const isActive = themeId === currentTheme;

			// 设置元素的 data-active 属性
			item.setAttribute("data-active", String(isActive));

			// 更新 CheckIcon 显示状态
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
		});
	};

	function handleThemeClick(this: HTMLElement) {
		const theme = this.getAttribute("data-theme-id");
		if (theme) {
			setTheme(theme);
		}
	}

	/**
	 * 获取实际应用的主题
	 * 如果选择的是 "default"，则根据系统主题返回实际主题
	 *
	 * @param theme 用户选择的主题ID
	 * @returns 实际应用的主题ID
	 */
	const getActualTheme = (theme: string): string => {
		if (theme === "default") {
			const systemTheme = detectSystemTheme();
			return systemTheme === "dark" ? "dark" : "default";
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
	 * 从本地存储中获取主题设置，如果没有则尝试使用系统主题，最后使用默认主题
	 */
	const initialize = () => {
		// 从本地存储中获取主题
		let savedTheme = localStorage.getItem("theme");

		// 如果没有保存的主题，则尝试使用系统主题
		if (!savedTheme) {
			const systemTheme = detectSystemTheme();
			if (systemTheme === "dark") {
				savedTheme = "dark";
			} else {
				savedTheme = "default"; // 默认使用默认主题
			}
		}

		// 设置主题（会自动处理 default 主题的动态映射）
		setTheme(savedTheme);

		// 添加主题切换事件监听器
		const themeItems = Array.from(
			document.querySelectorAll<HTMLElement>("[data-theme-id]"),
		);

		themeItems.forEach((item) => {
			item.removeEventListener("click", handleThemeClick);
			item.addEventListener("click", handleThemeClick);
		});

		// 监听系统主题变化
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", (e) => {
				const currentSavedTheme = localStorage.getItem("theme");

				// 如果用户选择的是 "default" 主题，则跟随系统主题变化
				if (currentSavedTheme === "default") {
					setTheme("default"); // 重新设置，会根据系统主题自动映射
				} else if (!currentSavedTheme) {
					// 如果用户没有手动设置过主题，则跟随系统主题变化
					setTheme(e.matches ? "dark" : "default");
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
