/**
 * 语言工具模块
 * 
 * 提供语言相关的工具函数，用于多语言支持
 */

// 支持的语言列表
export const SUPPORTED_LANGUAGES = ['en', 'zh-cn', 'zh'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

// 语言来源枚举
export enum LanguageSource {
    USER = 'user',           // 用户指定
    URL = 'url',             // 从URL获取
    BROWSER = 'browser',     // 从浏览器设置获取
    DEFAULT = 'default'      // 默认语言
}

// 语言信息接口
export interface LanguageInfo {
    code: SupportedLanguage;  // 语言代码
    source: LanguageSource;   // 语言来源
}

// 默认语言
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

/**
 * 检查语言是否被支持
 * @param lang 要检查的语言代码
 * @returns 如果语言被支持返回true，否则返回false
 */
export function isLanguageSupported(lang?: string): lang is SupportedLanguage {
    if (!lang) return false;
    return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * 获取有效的语言代码
 * @param lang 用户提供的语言代码
 * @returns 有效的语言代码，如果提供的语言不支持则返回默认语言
 */
export function getValidLanguage(lang?: string): SupportedLanguage {
    if (lang && isLanguageSupported(lang)) {
        return lang;
    }
    return DEFAULT_LANGUAGE;
}

/**
 * 从URL中提取语言代码
 * @param url 当前URL（可选）
 * @returns 从URL中提取的语言代码，如果无法提取则返回undefined
 */
function getLanguageFromURL(url?: string): string | undefined {
    let currentUrl = url;

    if (currentUrl === undefined) {
        if (typeof window === 'undefined') return undefined;
        currentUrl = window.location.href;
    }

    // 尝试从路径中提取语言代码
    // 例如: /zh-cn/components/button
    const pathMatch = currentUrl.match(/^\/([\w-]+)\//);
    if (pathMatch && isLanguageSupported(pathMatch[1])) {
        return pathMatch[1];
    }

    // 如果网站运行在二级目录，则从路径中提取语言代码
    // 例如: /docs/zh-cn/components/button
    const pathMatch2 = currentUrl.match(/^\/([^\/]+)\/([\w-]+)\//);
    if (pathMatch2 && isLanguageSupported(pathMatch2[2])) {
        return pathMatch2[2];
    }

    // 尝试从查询参数中提取语言代码
    // 例如: ?lang=zh-cn
    const urlParams = new URLSearchParams(currentUrl.split('?')[1]);
    const langParam = urlParams.get('lang');
    if (langParam && isLanguageSupported(langParam)) {
        return langParam;
    }

    return undefined;
}

/**
 * 从浏览器设置中获取首选语言
 * @returns 从浏览器设置中获取的语言代码，如果无法获取则返回undefined
 */
function getLanguageFromBrowser(): string | undefined {
    if (typeof navigator === 'undefined') return undefined;

    // 获取浏览器语言
    const browserLang = navigator.language.toLowerCase();

    // 检查完整匹配
    if (isLanguageSupported(browserLang)) {
        return browserLang;
    }

    // 检查语言前缀匹配
    // 例如: zh-TW -> zh-cn
    const langPrefix = browserLang.split('-')[0];
    for (const lang of SUPPORTED_LANGUAGES) {
        if (lang.startsWith(langPrefix)) {
            return lang;
        }
    }

    return undefined;
}

/**
 * 自动检测当前语言
 * @param url 当前URL（可选）
 * @returns 检测到的语言信息，包括语言代码和来源
 */
function detectLanguage(url?: string): LanguageInfo {
    // 尝试从URL中获取语言
    const urlLang = getLanguageFromURL(url);
    if (urlLang) {
        return {
            code: urlLang as SupportedLanguage,
            source: LanguageSource.URL
        };
    }

    // 尝试从浏览器设置中获取语言
    const browserLang = getLanguageFromBrowser();
    if (browserLang) {
        return {
            code: browserLang as SupportedLanguage,
            source: LanguageSource.BROWSER
        };
    }

    // 如果无法检测，返回默认语言
    return {
        code: DEFAULT_LANGUAGE,
        source: LanguageSource.DEFAULT
    };
}

/**
 * 获取当前语言
 * @param userLang 用户指定的语言（可选）
 * @param url 当前URL（可选）
 * @returns 当前应使用的语言信息，包括语言代码和来源
 */
export function getCurrentLanguage(userLang?: string, url?: string): LanguageInfo {
    // 如果用户指定了语言，优先使用用户指定的语言
    if (userLang) {
        if (isLanguageSupported(userLang)) {
            return {
                code: userLang as SupportedLanguage,
                source: LanguageSource.USER
            };
        } else {
            // 用户指定的语言不支持，使用默认语言
            return {
                code: DEFAULT_LANGUAGE,
                source: LanguageSource.DEFAULT
            };
        }
    }

    // 否则自动检测语言
    return detectLanguage();
} 
