import type { HTMLAttributes } from 'astro/types';

// 定义链接尺寸类型
export type LinkSize = 'sm' | 'md' | 'lg';

// 定义链接变体类型
export type LinkVariant =
    | 'default'
    | 'primary'
    | 'secondary'
    | 'text'
    | 'cta'
    | 'ghost'
    | 'light'
    | 'navigation'
    | 'github';

// 定义链接动画类型
export type LinkAnimation = 'none' | 'hover-lift' | 'hover-glow' | 'hover-scale';

// 定义图标类型（排除需要特殊属性的组件）
export type LinkIconName =
    | 'AlertTriangle'
    | 'AppStoreIcon'
    | 'CalendarIcon'
    | 'ChartIcon'
    | 'CheckCircle'
    | 'CheckIcon'
    | 'ChevronDownIcon'
    | 'ChevronLeftIcon'
    | 'ChevronRightIcon'
    | 'ClipboardIcon'
    | 'CloseIcon'
    | 'CodeIcon'
    | 'DashboardIcon'
    | 'DeleteIcon'
    | 'DocumentIcon'
    | 'DownloadIcon'
    | 'EditIcon'
    | 'ErrorIcon'
    | 'FolderIcon'
    | 'GithubIcon'
    | 'GlobeIcon'
    | 'HeartIcon'
    | 'HomeIcon'
    | 'InfoCircle'
    | 'InfoIcon'
    | 'InboxArchive'
    | 'LinkIcon'
    | 'LinkedinIcon'
    | 'LogOut'
    | 'MailIcon'
    | 'MenuIcon'
    | 'MessageIcon'
    | 'NotificationIcon'
    | 'RefreshIcon'
    | 'ReportIcon'
    | 'SaveIcon'
    | 'SearchIcon'
    | 'SecurityIcon'
    | 'SettingsIcon'
    | 'StarIcon'
    | 'SunCloudyIcon'
    | 'ToolsIcon'
    | 'TwitterIcon'
    | 'UploadIcon'
    | 'UserIcon'
    | 'UsersIcon'
    | 'WalletIcon'
    | 'WarningIcon'
    | 'WebsiteIcon'
    | 'XCircle';

export interface LinkProps extends HTMLAttributes<'a'> {
    href: string;
    external?: boolean;
    block?: boolean;
    class?: string;
    'class:list'?: any;
    variant?: LinkVariant;
    animation?: LinkAnimation;
    size?: LinkSize;
    debug?: boolean;
    btn?: boolean;
    circle?: boolean;
    ghost?: boolean;
    noUnderline?: boolean;
    rounded?: boolean;
    fullWidth?: boolean;
    color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
    align?: 'left' | 'center' | 'right';
    active?: boolean;
    navigationType?: 'previous' | 'next';
    icon?: LinkIconName;
} 
