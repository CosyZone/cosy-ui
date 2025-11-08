import { LanguageUtil } from "../../src/utils/language";

export interface SwitcherLink {
	locale: string;
	name: string;
	url: string;
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
 *
 * **URL 生成规则**：
 * - 手动构建格式为 `/{locale}{path}` 的 URL
 * - 适用于使用 [lang] 动态路由的项目
 * - 所有语言都会有 URL 前缀，包括默认语言
 *
 * **示例**：
 * - 当前页面：`/zh-cn/manuals` → 英文链接：`/en/manuals`
 * - 当前页面：`/zh-cn` → 英文链接：`/en`
 * - 当前页面：`/en/demos` → 中文链接：`/zh-cn/demos`
 *
 * @param currentLocale - 当前语言代码（如 'zh-cn'）
 * @param pathname - 当前页面路径（如 '/zh-cn/manuals'）
 * @param locales - 所有支持的语言列表（如 ['zh-cn', 'en']）
 * @returns 语言切换链接数组
 */
export const generateSwitcherLinks = (
	currentLocale: string,
	pathname: string,
	locales: string[],
): SwitcherLink[] => {
	try {
		if (locales.length === 0) {
			console.warn("LanguageSwitcher: locales array is empty");
			return [];
		}

		// 获取不含语言前缀的路径
		const pathWithoutLocale = getPathWithoutLocale(
			pathname,
			currentLocale,
			locales,
		);

		// 为每个语言生成切换链接
		return locales.map((locale) => {
			// 手动构建 URL：/{locale}{pathWithoutLocale}
			// 去除尾部斜杠（除了根路径）
			const basePath = `/${locale}${pathWithoutLocale}`;
			const url =
				basePath.endsWith("/") && basePath !== `/${locale}/`
					? basePath.slice(0, -1)
					: basePath === `/${locale}/`
						? `/${locale}`
						: basePath;

			return {
				locale: locale,
				name: LanguageUtil.getLanguageName(locale),
				url: url,
			};
		});
	} catch (error) {
		console.error("LanguageSwitcher: Error generating switcher links:", error);
		throw error;
	}
};
