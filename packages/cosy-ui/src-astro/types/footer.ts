import type { ILogo, IProduct } from './product';
import type { BackgroundColor } from '../../src/common/backgrounds';

export interface IFooterProps {
    /**
     * 关于链接
     */
    aboutLink?: string;

    /**
     * 博客链接
     */
    blogLink?: string;

    /**
     * 职业链接
     */
    careersLink?: string;

    /**
     * 公司名称
     */
    company: string;

    /**
     * 联系链接
     */
    contactLink?: string;

    /**
     * 版权信息
     */
    copyright: string;

    /**
     * 背景色类型，支持所有预设背景色和透明度变体
     * @default "base-200"
     */
    background?: BackgroundColor;

    /**
     * 调试模式
     */
    debug?: boolean;

    /**
     * 是否启用日志输出
     * @default false
     */
    enableLogging?: boolean;

    /**
     * 常见问题链接
     */
    faqLink?: string;

    /**
     * 友情链接
     */
    friendlyLinks?: IProduct[];

    /**
     * 历史链接
     */
    historyLink?: string;

    /**
     * 首页链接
     */
    homeLink: string;

    /**
     * ICP备案号
     */
    icp?: string;

    /**
     * ICP备案链接
     */
    icpLink?: string;

    /**
     * 激励标语
     */
    inspirationalSlogan: string;

    /**
     * 徽标
     */
    logo?: ILogo;

    /**
     * 媒体链接
     */
    mediaLink?: string;

    /**
     * 新闻链接
     */
    newsLink?: string;

    /**
     * 合作伙伴链接
     */
    partnersLink?: string;

    /**
     * 隐私链接
     */
    privacyLink?: string;

    /**
     * 产品
     */
    products?: IProduct[];

    /**
     * 站点名称
     */
    siteName: string;

    /**
     * 标语
     */
    slogan: string;

    /**
     * 社交链接
     */
    socialLinks?: string[];

    /**
     * 团队链接
     */
    teamLink?: string;

    /**
     * 技术栈链接
     */
    techStackLink?: string;

    /**
     * 条款链接
     */
    termsLink?: string;
}
