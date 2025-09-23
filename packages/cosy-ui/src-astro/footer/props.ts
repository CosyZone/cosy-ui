import type { IFooterProps } from './types';
import type { ImageSource } from '../image/image';

export interface IFooterPropsBuilder {
    /** 设置站点名称。
     * @param value 站点名称
     * @returns IFooterPropsBuilder
     */
    siteName(value: string): IFooterPropsBuilder;
    /** 设置首页链接。
     * @param value 链接
     * @returns IFooterPropsBuilder
     */
    homeLink(value: string): IFooterPropsBuilder;
    /** 设置标语。
     * @param value 标语
     * @returns IFooterPropsBuilder
     */
    slogan(value: string): IFooterPropsBuilder;
    /** 设置公司名称。
     * @param value 公司名称
     * @returns IFooterPropsBuilder
     */
    company(value: string): IFooterPropsBuilder;
    /** 设置激励标语。
     * @param value 标语
     * @returns IFooterPropsBuilder
     */
    inspirationalSlogan(value: string): IFooterPropsBuilder;
    /** 设置背景色。
     * @param value 背景键名（如 primary/10）
     * @returns IFooterPropsBuilder
     */
    background(value: NonNullable<IFooterProps['background']>): IFooterPropsBuilder;
    /** 设置 Logo。
     * @param value 图片源
     * @returns IFooterPropsBuilder
     */
    logo(value: ImageSource): IFooterPropsBuilder;
    /** 设置产品链接数组。
     * @param value 产品数组
     * @returns IFooterPropsBuilder
     */
    products(value: NonNullable<IFooterProps['products']>): IFooterPropsBuilder;
    /** 设置友情链接数组。
     * @param value 链接数组
     * @returns IFooterPropsBuilder
     */
    friendlyLinks(value: NonNullable<IFooterProps['friendlyLinks']>): IFooterPropsBuilder;
    /** 设置社交链接。
     * @param value 社交链接 URL 列表
     * @returns IFooterPropsBuilder
     */
    socialLinks(value: NonNullable<IFooterProps['socialLinks']>): IFooterPropsBuilder;
    /** 设置微信二维码。
     * @param value 图片源
     * @returns IFooterPropsBuilder
     */
    wechatQR(value: ImageSource): IFooterPropsBuilder;
    /** 设置 WhatsApp 二维码。
     * @param value 图片源
     * @returns IFooterPropsBuilder
     */
    whatsappQR(value: ImageSource): IFooterPropsBuilder;
    /** 设置关于信息。*/
    aboutInfo(value: NonNullable<IFooterProps['aboutInfo']>): IFooterPropsBuilder;
    /** 设置信息。*/
    contactInfo(value: NonNullable<IFooterProps['contactInfo']>): IFooterPropsBuilder;
    /** 设置法律信息。*/
    legalInfo(value: NonNullable<IFooterProps['legalInfo']>): IFooterPropsBuilder;
    /** 设置资源信息。*/
    resourcesInfo(value: NonNullable<IFooterProps['resourcesInfo']>): IFooterPropsBuilder;

    /** 构建结果。
     * @returns IFooterProps
     */
    build(): IFooterProps;
}

/**
 * 以链式方式构建 Footer 的 Props。
 */
export function createFooterProps(initial: Partial<IFooterProps> = {}): IFooterPropsBuilder {
    let props: IFooterProps = {
        siteName: '',
        homeLink: '/',
        slogan: '',
        company: '',
        inspirationalSlogan: '',
        ...initial,
    } as IFooterProps;

    const api: IFooterPropsBuilder = {
        /** @inheritDoc IFooterPropsBuilder.siteName */
        siteName(value) { props = { ...props, siteName: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.homeLink */
        homeLink(value) { props = { ...props, homeLink: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.slogan */
        slogan(value) { props = { ...props, slogan: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.company */
        company(value) { props = { ...props, company: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.inspirationalSlogan */
        inspirationalSlogan(value) { props = { ...props, inspirationalSlogan: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.background */
        background(value) { props = { ...props, background: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.logo */
        logo(value) { props = { ...props, logo: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.products */
        products(value) { props = { ...props, products: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.friendlyLinks */
        friendlyLinks(value) { props = { ...props, friendlyLinks: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.socialLinks */
        socialLinks(value) { props = { ...props, socialLinks: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.wechatQR */
        wechatQR(value) { props = { ...props, wechatQR: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.whatsappQR */
        whatsappQR(value) { props = { ...props, whatsappQR: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.aboutInfo */
        aboutInfo(value) { props = { ...props, aboutInfo: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.contactInfo */
        contactInfo(value) { props = { ...props, contactInfo: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.legalInfo */
        legalInfo(value) { props = { ...props, legalInfo: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.resourcesInfo */
        resourcesInfo(value) { props = { ...props, resourcesInfo: value }; return api; },
        /** @inheritDoc IFooterPropsBuilder.build */
        build() { return props; },
    };

    return api;
}

export const FooterProps = createFooterProps;
