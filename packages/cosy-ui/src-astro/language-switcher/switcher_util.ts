import { getRelativeLocaleUrl, getRelativeLocaleUrlList } from 'astro:i18n';
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

export function getSwitcherLinks(astro: AstroGlobal): SwitcherLink[] {
    const currentLocale = astro.currentLocale;

    if (currentLocale === undefined) {
        throw new Error('can not get switcher links when i18n is disabled');
    }

    const currentLocalURLPrefix = getRelativeLocaleUrl(currentLocale, '');
    const pathname = astro.url.pathname + '/';
    const slug = pathname.replace(
        currentLocalURLPrefix,
        ''
    );
    const urls = getRelativeLocaleUrlList(slug);

    return urls.map((url) => ({
        locale: getLocaleFromUrl(url),
        name: LanguageUtil.getLanguageName(getLocaleFromUrl(url)),
        url: url
    }));
}
