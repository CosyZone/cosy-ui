// 定义文本内容的类型
type TextContent = Record<string, Record<string, string>>;

// 多语言文本内容
export const texts: Record<string, TextContent> = {
    en: {
        tableOfContents: {
            title: 'Table of Contents',
            loading: 'Loading...',
        },
        footer: {
            products: 'Products',
            about: 'About',
            aboutUs: 'About Us',
            team: 'Our Team',
            careers: 'Careers',
            contactUs: 'Contact Us',
            resources: 'Resources',
            news: 'News',
            blog: 'Blog',
            faq: 'FAQ',
            history: 'History',
            techStack: 'Tech Stack',
            legal: 'Legal',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            slogan: 'Build a beautiful digital experience',
            allRightsReserved: 'All Rights Reserved',
            friendlyLinks: 'Friendly Links',
        },
    },
    'zh-cn': {
        tableOfContents: {
            title: '目录',
            loading: '加载中...',
        },
        footer: {
            products: '产品',
            about: '关于',
            aboutUs: '关于我们',
            team: '团队介绍',
            careers: '加入我们',
            contactUs: '联系我们',
            defaultSlogan: '优雅、高效的组件库',
            resources: '资源',
            news: '新闻动态',
            blog: '技术博客',
            faq: '常见问题',
            history: '发展历程',
            techStack: '技术栈',
            legal: '法律',
            terms: '服务条款',
            privacy: '隐私政策',
            allRightsReserved: '保留所有权利',
            friendlyLinks: '友情链接',
        },
    },
};

/**
 * 获取指定语言的文本内容
 * @param lang 语言代码
 * @param component 组件名称
 * @param key 文本键名
 * @returns 对应的文本内容
 */
export function getText(lang: string, component: string, key: string): string {
    return texts[lang]?.[component]?.[key] || texts['en'][component]?.[key] || '';
}

/**
 * 创建组件的文本获取函数
 * @param langInfo 语言信息
 * @param component 组件名称
 * @returns 文本获取函数
 */
export function createTextGetter(langInfo: string, component: string) {
    return (key: string): string => getText(langInfo, component, key);
}
