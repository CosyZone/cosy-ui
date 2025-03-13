// Write your component's code here!

// 导出 Footer 组件的类型定义
export interface FooterProps {
    /**
     * 版权所有者名称
     */
    copyrightOwner?: string;
    /**
     * 页脚链接列表
     */
    links?: {
        title: string;
        href: string;
    }[];
    /**
     * 社交媒体链接
     */
    socialLinks?: {
        platform: 'github' | 'twitter' | 'linkedin';
        href: string;
    }[];
}