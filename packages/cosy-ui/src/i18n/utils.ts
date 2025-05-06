import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function t(lang: string, key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang in ui ? lang as keyof typeof ui : defaultLang][key];
}

export const normalizeLang = (lang: string) => {
    if (lang === 'zh-CN') {
        return 'zh-cn';
    }
    return lang;
}

export const getLangFromSlug = (slug: string) => {
    let lang = slug.split('/')[0];

    return normalizeLang(lang);
}

export const getLangFromPathname = (pathname: string) => {
    // 去除开头的 /
    pathname = pathname.slice(1);

    let lang = pathname.split('/')[0];

    return normalizeLang(lang);
}

export const isValidLang = (lang: string) => {
    return ['zh-cn', 'en'].includes(lang);
}

export const getLang = (...args: string[]) => {
    const debug = false

    if (debug) {
        // eslint-disable-next-line no-console
        console.log('getLang', args);
    }

    for (const arg of args) {
        let normalizedLang = normalizeLang(arg);
        if (isValidLang(normalizedLang)) {
            return normalizedLang;
        }
    }
    return 'zh-cn';
}