// 共享的配置对象，用于所有 AppLayout 示例组件

export const defaultSidebarItems = [
    { href: "/docs/getting-started", text: "快速开始" },
    { href: "/docs/installation", text: "安装" },
    { href: "/docs/components/button", text: "Button 按钮" },
    { href: "/docs/components/card", text: "Card 卡片" }
];

export const defaultMetaConfig = {
    title: "AppLayout 示例",
    description: "AppLayout 组件示例",
    keywords: "AppLayout, 示例, 组件",
    author: "Cosy UI",
    robots: "index, follow"
};

export const defaultHeaderConfig = {
    logoHref: "/",
    sticky: false,
    navItems: []
};

export const defaultFooterConfig = {
    siteName: "Cosy UI",
    homeLink: "/",
    slogan: "优雅的组件库",
    inspirationalSlogan: "构建美好的用户界面",
    company: "Cosy UI",
    copyright: "© 2025 Cosy UI"
};

export const defaultMainContentConfig = {
    fullWidth: false,
    padding: "md" as const
};
