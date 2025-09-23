import type { IAppLayoutAllProps } from './AppLayout.astro';
import type { IFooterProps } from '../footer/types';
import type { IHeaderProps } from '../types/header';
import type { IMainContentProps } from '../types/main';
import type { IMetaProps } from '../../src/common/meta';
import type { ISidebarProps } from '../../src/common/sidebar';
import type { ThemeId } from '../../src/common/themes';

export interface IAppLayoutPropsBuilder {
    /** 设置根元素类名。
     * @param value 类名字符串
     * @returns IAppLayoutPropsBuilder
     */
    class(value: string): IAppLayoutPropsBuilder;
    /** 设置是否只渲染 body（默认 false）。
     * @param value 省略则为 false
     * @returns IAppLayoutPropsBuilder
     */
    bodyOnly(value?: boolean): IAppLayoutPropsBuilder;
    /** 设置主题。
     * @param value 主题 ID
     * @returns IAppLayoutPropsBuilder
     */
    theme(value: ThemeId): IAppLayoutPropsBuilder;
    /** 设置页脚配置。
     * @param value 页脚配置对象
     * @returns IAppLayoutPropsBuilder
     */
    footerConfig(value: IFooterProps): IAppLayoutPropsBuilder;
    /** 设置头部配置。
     * @param value 头部配置对象
     * @returns IAppLayoutPropsBuilder
     */
    headerConfig(value: IHeaderProps): IAppLayoutPropsBuilder;
    /** 设置加载延迟（毫秒）。
     * @param value 毫秒值
     * @returns IAppLayoutPropsBuilder
     */
    loadingDelay(value: number): IAppLayoutPropsBuilder;
    /** 设置主内容配置。
     * @param value 主内容配置对象
     * @returns IAppLayoutPropsBuilder
     */
    mainContentConfig(value: IMainContentProps): IAppLayoutPropsBuilder;
    /** 设置 meta 配置。
     * @param value Meta 配置对象
     * @returns IAppLayoutPropsBuilder
     */
    metaConfig(value: IMetaProps): IAppLayoutPropsBuilder;
    /** 是否显示页脚（默认 true）。
     * @param value 省略则为 true
     * @returns IAppLayoutPropsBuilder
     */
    showFooter(value?: boolean): IAppLayoutPropsBuilder;
    /** 是否显示头部（默认 true）。
     * @param value 省略则为 true
     * @returns IAppLayoutPropsBuilder
     */
    showHeader(value?: boolean): IAppLayoutPropsBuilder;
    /** 是否显示侧边栏（默认 true）。
     * @param value 省略则为 true
     * @returns IAppLayoutPropsBuilder
     */
    showSidebar(value?: boolean): IAppLayoutPropsBuilder;
    /** 设置侧边栏配置。
     * @param value 侧边栏配置对象
     * @returns IAppLayoutPropsBuilder
     */
    sidebarConfig(value: ISidebarProps): IAppLayoutPropsBuilder;
    /** 是否启用 ClientRouter（默认 true）。
     * @param value 省略则为 true
     * @returns IAppLayoutPropsBuilder
     */
    enableClientRouter(value?: boolean): IAppLayoutPropsBuilder;

    /** 构建结果。
     * @returns IAppLayoutAllProps
     */
    build(): IAppLayoutAllProps;
}

/**
 * 以链式方式构建 AppLayout 的 Props。
 * 用法示例：
 *   const layout = AppLayoutProps().showHeader(true).showFooter(true).build();
 */
export function createAppLayoutProps(initial: Partial<IAppLayoutAllProps> = {}): IAppLayoutPropsBuilder {
    let props: IAppLayoutAllProps = {
        bodyOnly: false,
        showFooter: true,
        showHeader: true,
        showSidebar: true,
        enableClientRouter: true,
        ...initial,
    } as IAppLayoutAllProps;

    const api: IAppLayoutPropsBuilder = {
        /** @inheritDoc IAppLayoutPropsBuilder.class */
        class(value) { props = { ...props, class: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.bodyOnly */
        bodyOnly(value = false) { props = { ...props, bodyOnly: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.theme */
        theme(value) { props = { ...props, theme: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.footerConfig */
        footerConfig(value) { props = { ...props, footerConfig: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.headerConfig */
        headerConfig(value) { props = { ...props, headerConfig: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.loadingDelay */
        loadingDelay(value) { props = { ...props, loadingDelay: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.mainContentConfig */
        mainContentConfig(value) { props = { ...props, mainContentConfig: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.metaConfig */
        metaConfig(value) { props = { ...props, metaConfig: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.showFooter */
        showFooter(value = true) { props = { ...props, showFooter: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.showHeader */
        showHeader(value = true) { props = { ...props, showHeader: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.showSidebar */
        showSidebar(value = true) { props = { ...props, showSidebar: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.sidebarConfig */
        sidebarConfig(value) { props = { ...props, sidebarConfig: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.enableClientRouter */
        enableClientRouter(value = true) { props = { ...props, enableClientRouter: value }; return api; },
        /** @inheritDoc IAppLayoutPropsBuilder.build */
        build() { return props; },
    };

    return api;
}

export const AppLayoutProps = createAppLayoutProps;
