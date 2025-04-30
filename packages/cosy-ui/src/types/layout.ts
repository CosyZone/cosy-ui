import type { SidebarSection } from "./sidebar";

export interface AppLayoutProps {
    /**
     * 页面标题
     */
    title: string;

    /**
     * 页面描述
     */
    description?: string;

    /**
     * 页面关键词
     */
    keywords?: string;

    /**
     * 网站名称
     * @default "文档中心"
     */
    siteName?: string;

    /**
     * Logo图片
     * @default "/logo.svg"
     */
    logo?: ImageMetadata;

    /**
     * Logo链接地址
     * @default "/"
     */
    logoHref?: string;

    /**
     * 侧边栏项目
     */
    sidebarItems: SidebarSection[];

    /**
     * 是否显示侧边栏
     * @default true
     */
    showSidebar?: boolean;

    /**
     * 是否显示目录
     * @default true
     */
    showTableOfContents?: boolean;

    /**
     * 是否显示页眉
     * @default true
     */
    showHeader?: boolean;

    /**
     * 是否显示页脚
     * @default true
     */
    showFooter?: boolean;

    /**
     * 自定义头部内容
     */
    head?: astroHTML.JSX.Element;

    /**
     * 页面类名
     */
    class?: string;

    /**
     * 类名列表
     */
    'class:list'?: any;

    /**
     * 调试模式，显示各个部分的边框
     * @default false
     */
    debug?: boolean;

    /**
     * 导航项目
     */
    navItems?: Array<{
        href: string;
        label: string;
        match: (path: string) => boolean;
    }>;

    /**
     * 语言列表
     */
    languages?: Array<{ code: string; name: string }>;

    /**
     * 当前语言
     */
    currentLocale?: string;

    /**
     * 基础路径，用于处理网站部署在二级目录的情况
     * @default ""
     */
    basePath?: string;

    /**
     * Header 组件的高度
     * @default "md"
     */
    headerHeight?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    /**
     * 内容区域是否全宽
     *
     * 当设置为 true 时：
     * - 内容区域将占满整个可用宽度
     * - 不会应用默认的容器和内边距
     * - 用户需要自行控制内容的布局、容器和边距
     * - 适合创建全宽背景的hero区域、分栏布局等
     * - 目录导航会固定在页面右侧
     *
     * 当设置为 false 时（默认）：
     * - 内容区域会有固定的最大宽度和内边距
     * - 使用标准的文档布局
     *
     * @default false
     *
     * @example
     * ```astro
     * <AppLayout contentFullWidth={true}>
     *   <!-- 内容将占满整个宽度 -->
     * </AppLayout>
     * ```
     */
    contentFullWidth?: boolean;

    /**
     * 页脚相关配置
     */
    // Footer 相关参数
    /**
     * 页脚标语
     * @default "优雅、高效的组件库"
     */
    footerSlogan?: string;

    /**
     * 公司名称
     * @default 与siteName相同
     */
    footerCompany?: string;

    /**
     * 版权信息
     * @default "保留所有权利"
     */
    footerCopyright?: string;

    /**
     * 页脚横幅标语
     * @default "构建美好的数字体验"
     */
    footerInspirationalSlogan?: string;

    /**
     * ICP备案号
     */
    footerIcp?: string;

    /**
     * 网站Logo
     */
    footerLogo?: { src: string; alt: string };

    /**
     * 产品链接列表
     */
    footerProducts?: Array<{ name: string; href: string; external?: boolean }>;

    /**
     * 关于我们链接
     * @default "/about"
     */
    footerAboutLink?: string;

    /**
     * 联系我们链接
     * @default "/contact"
     */
    footerContactLink?: string;

    /**
     * 服务条款链接
     */
    footerTermsLink?: string;

    /**
     * 隐私政策链接
     */
    footerPrivacyLink?: string;

    /**
     * 社交媒体链接列表
     */
    footerSocialLinks?: string[];

    /**
     * 团队介绍链接
     */
    footerTeamLink?: string;

    /**
     * 加入我们链接
     */
    footerCareersLink?: string;

    /**
     * 新闻动态链接
     */
    footerNewsLink?: string;

    /**
     * 发展历程链接
     */
    footerHistoryLink?: string;

    /**
     * 合作伙伴链接
     */
    footerPartnersLink?: string;

    /**
     * 技术博客链接
     */
    footerBlogLink?: string;

    /**
     * 常见问题链接
     */
    footerFaqLink?: string;

    /**
     * 媒体报道链接
     */
    footerMediaLink?: string;

    /**
     * 技术栈链接
     */
    footerTechStackLink?: string;

    /**
     * 首页链接
     */
    footerHomeLink?: string;

    /**
     * 是否默认展开侧边栏（移动端）
     * @default false
     */
    defaultSidebarOpen?: boolean;

    /**
     * 是否不使用内容区域顶部外边距
     * @default false
     */
    noContentMarginTop?: boolean;


}