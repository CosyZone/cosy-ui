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
    getRelativeLocaleUrlList: (slug: string) => string[];
}

/**
 * 获取基础 URL
 */
export const getBaseUrl = (): string => {
    return import.meta.env.BASE_URL || "/";
};

/**
 * 从 URL 中提取语言代码
 */
export const getLocaleFromUrl = (url: string): string => {
    return url.replace(getBaseUrl(), "").split("/")[0];
};

/**
 * 生成语言切换链接
 * @param astroI18n - astro:i18n 模块
 * @param currentLocale - 当前语言代码
 * @param pathname - 当前页面路径
 * @returns 语言切换链接数组
 */
export const generateSwitcherLinks = (
    astroI18n: IAstroI18n,
    currentLocale: string,
    pathname: string,
): SwitcherLink[] => {
    try {
        const { getRelativeLocaleUrl, getRelativeLocaleUrlList } = astroI18n;

        const currentLocalURLPrefix = getRelativeLocaleUrl(currentLocale, "");
        const pathWithSlash = `${pathname}/`;
        const slug = pathWithSlash.replace(currentLocalURLPrefix, "");
        const urls = getRelativeLocaleUrlList(slug);

        return urls.map((url: string) => ({
            locale: getLocaleFromUrl(url),
            name: LanguageUtil.getLanguageName(getLocaleFromUrl(url)),
            url: url,
        }));
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
