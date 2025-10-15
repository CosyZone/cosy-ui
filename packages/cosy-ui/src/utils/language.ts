import type { AstroGlobal } from "astro";

// 默认语言
export const DEFAULT_LANGUAGE = "en";

/**
 * 语言工具模块
 *
 * 提供语言相关的工具函数，用于多语言支持
 */
export class LanguageUtil {
	static getLanguageName(code: string | undefined): string {
		switch (code) {
			case "en":
				return "English";
			case "zh-cn":
				return "简体中文";
			case "zh":
				return "中文";
			default:
				return code || "not known";
		}
	}

	/**
	 * 获取当前语言
	 * @param astro Astro全局对象
	 * @returns 当前应使用的语言代码
	 */
	static getCurrentLanguage(astro: AstroGlobal): string {
		// 尝试从Astro全局对象中获取语言
		const astroLang = astro.currentLocale;
		if (astroLang) {
			return astroLang;
		}
		// 尝试从URL中获取语言
		const urlLang = LanguageUtil.getLanguageFromURL(astro.url.pathname);
		if (urlLang) {
			return urlLang;
		}

		// 尝试从浏览器设置中获取语言
		const browserLang = LanguageUtil.getLanguageFromBrowser();
		if (browserLang) {
			return browserLang;
		}

		// 尝试从Astro全局对象中获取语言
		const preferredLocale = astro.preferredLocale;
		if (preferredLocale) {
			return preferredLocale;
		}

		// 如果无法检测，返回默认语言
		return DEFAULT_LANGUAGE;
	}

	/**
	 * 从URL中提取语言代码
	 * @param url 当前URL
	 * @returns 从URL中提取的语言代码，如果无法提取则返回undefined
	 */
	private static getLanguageFromURL(url: string): string | undefined {
		let currentUrl = url;

		if (currentUrl === undefined) {
			if (typeof window === "undefined") return undefined;
			currentUrl = window.location.href;
		}

		// 尝试从路径中提取语言代码
		// 例如: /zh-cn/components/button
		const pathMatch = currentUrl.match(/^\/([\w-]+)\//);
		if (pathMatch) {
			return pathMatch[1];
		}

		// 尝试从查询参数中提取语言代码
		// 例如: ?lang=zh-cn
		const urlParams = new URLSearchParams(currentUrl.split("?")[1]);
		const langParam = urlParams.get("lang");
		if (langParam) {
			return langParam;
		}

		return undefined;
	}

	/**
	 * 从浏览器设置中获取首选语言
	 * @returns 从浏览器设置中获取的语言代码，如果无法获取则返回undefined
	 */
	private static getLanguageFromBrowser(): string | undefined {
		if (typeof navigator === "undefined") return undefined;

		const browserLang = navigator.language;

		if (browserLang) {
			return browserLang.toLowerCase();
		}

		return undefined;
	}
}
