import type { AstroGlobal } from 'astro';
import { LanguageUtil } from '../../index-astro';

export interface SwitcherLink {
    locale: string;
    name: string;
    url: string;
}

// 获取基础路径
const getBaseUrl = (): string => {
    return import.meta.env.BASE_URL;
};

const getLocaleFromUrl = (url: string): string => {
    return url.replace(getBaseUrl(), '').split('/')[0];
};

export async function getSwitcherLinks(astro: AstroGlobal): Promise<SwitcherLink[]> {
    const currentLocale = astro.currentLocale;

    if (currentLocale === undefined) {
        throw new Error('can not get switcher links when i18n is disabled');
    }

    try {
        // 动态导入 astro:i18n 模块，避免在构建时被 Vite 扫描
        // 通过动态构造模块名来避免静态分析
        const moduleName = 'astro' + ':' + 'i18n';
        const astroI18n = await import(/* @vite-ignore */ moduleName);
        const { getRelativeLocaleUrl, getRelativeLocaleUrlList } = astroI18n;

        const currentLocalURLPrefix = getRelativeLocaleUrl(currentLocale, '');
        const pathname = astro.url.pathname + '/';
        const slug = pathname.replace(
            currentLocalURLPrefix,
            ''
        );
        const urls = getRelativeLocaleUrlList(slug);

        return urls.map((url: string) => ({
            locale: getLocaleFromUrl(url),
            name: LanguageUtil.getLanguageName(getLocaleFromUrl(url)),
            url: url
        }));
    } catch (error) {
        console.warn('getSwitcherLinks: Failed to load astro:i18n module:', error);
        return [];
    }
}
