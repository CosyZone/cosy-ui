import { LanguageUtil } from "../../src/utils/language";

export interface SwitcherLink {
	locale: string;
	name: string;
	url: string;
}

/**
 * Astro i18n 模块类型定义
 */
export interface IAstroI18n {
	getRelativeLocaleUrl: (locale: string, path: string) => string;
	getRelativeLocaleUrlList?: (slug: string) => string[];
	locales?: string[];
	defaultLocale?: string;
	routing?: {
		prefixDefaultLocale?: boolean;
	};
}

/**
 * 获取路径部分（去除语言前缀）
 * @param pathname - 完整路径
 * @param localePrefix - 语言前缀（如 /zh-cn/ 或 /zh-cn）
 * @returns 不含语言前缀的路径
 */
const getPathWithoutLocale = (
	pathname: string,
	_currentLocale: string,
	locales: string[],
): string => {
	// 规范化路径：移除末尾的斜杠（除非是根路径）
	const normalizedPath =
		pathname.endsWith("/") && pathname !== "/"
			? pathname.slice(0, -1)
			: pathname;

	// 如果是根路径，返回空字符串
	if (normalizedPath === "/" || normalizedPath === "") {
		return "";
	}

	// 尝试移除语言前缀
	// 检查是否以 /locale 或 /locale/ 开头
	for (const locale of locales) {
		const prefix = `/${locale}`;

		// 情况1: /zh-cn -> 空（首页）
		if (normalizedPath === prefix) {
			return "";
		}

		// 情况2: /zh-cn/xxx -> /xxx
		if (normalizedPath.startsWith(`${prefix}/`)) {
			return normalizedPath.slice(prefix.length);
		}
	}

	// 没有匹配到任何语言前缀，说明是默认语言（prefixDefaultLocale: false）
	// 直接返回路径
	return normalizedPath;
};

/**
 * 生成语言切换链接
 * @param astroI18n - astro:i18n 模块
 * @param currentLocale - 当前语言代码
 * @param pathname - 当前页面路径
 * @param locales - 所有支持的语言列表（可选，如果不提供则从配置中获取）
 * @returns 语言切换链接数组
 */
export const generateSwitcherLinks = (
	astroI18n: IAstroI18n,
	currentLocale: string,
	pathname: string,
	locales?: string[],
): SwitcherLink[] => {
	try {
		const { getRelativeLocaleUrl } = astroI18n;

		// 获取语言列表
		const supportedLocales = locales || astroI18n.locales || [];

		if (supportedLocales.length === 0) {
			console.warn(
				"LanguageSwitcher: No locales found. Please provide locales config.",
			);
			return [];
		}

		// 获取不含语言前缀的路径
		const pathWithoutLocale = getPathWithoutLocale(
			pathname,
			currentLocale,
			supportedLocales,
		);

		/**
		 * 智能检测路由模式
		 *
		 * 通过测试 getRelativeLocaleUrl 的实际行为来判断是否使用 [lang] 动态路由：
		 * 1. 测试生成默认语言的根路径 URL
		 * 2. 如果返回的是 '/' 但当前 URL 有语言前缀，说明：
		 *    - 配置是 prefixDefaultLocale: false
		 *    - 但项目实际使用了 [lang] 动态路由
		 *    - 这种情况下需要手动为所有语言添加前缀
		 */
		const defaultLocale = astroI18n.defaultLocale || supportedLocales[0];
		const testUrl = getRelativeLocaleUrl(defaultLocale, "");
		const currentPathHasPrefix =
			pathname.startsWith(`/${currentLocale}/`) ||
			pathname === `/${currentLocale}`;

		// 如果默认语言的根路径是 '/' 但当前路径有语言前缀，说明使用了动态路由
		const useDynamicLangRoute =
			(testUrl === "/" || testUrl === "") && currentPathHasPrefix;

		// 为每个语言生成切换链接
		return supportedLocales.map((locale) => {
			let url: string;

			// 如果检测到使用动态 [lang] 路由，手动构建 URL
			if (useDynamicLangRoute) {
				// 手动构建 URL：/{locale}{pathWithoutLocale}
				url = `/${locale}${pathWithoutLocale || "/"}`;
			} else {
				// 使用 Astro 的 getRelativeLocaleUrl（标准模式）
				url = getRelativeLocaleUrl(
					locale,
					pathWithoutLocale === "/" ? "" : pathWithoutLocale,
				);
			}

			return {
				locale: locale,
				name: LanguageUtil.getLanguageName(locale),
				url: url,
			};
		});
	} catch (error) {
		console.warn("LanguageSwitcher: Error generating switcher links:", error);
		throw error;
	}
};

/**
 * 检查语言切换器是否应该渲染
 * @param currentLocale - 当前语言代码
 * @param astroI18n - astro:i18n 模块
 * @returns 是否应该渲染的状态信息
 */
export const checkSwitcherRenderState = (
	currentLocale: string | undefined,
	astroI18n: IAstroI18n | undefined,
): {
	shouldRender: boolean;
	currentLanguageName?: string;
	warnings?: string[];
} => {
	const warnings: string[] = [];

	if (!currentLocale) {
		return { shouldRender: false, warnings };
	}

	if (!astroI18n) {
		return { shouldRender: false, warnings };
	}

	return {
		shouldRender: true,
		currentLanguageName: LanguageUtil.getLanguageName(currentLocale),
	};
};
