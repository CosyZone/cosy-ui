import type { NavItem, UserMenuItem } from '@coffic/cosy-ui';

export const navItems: NavItem[] = [
    { href: "/dashboard", text: "仪表盘" },
    { href: "/dashboard/users", text: "用户管理" },
    { href: "/dashboard/settings", text: "系统设置" },
    { href: "/dashboard/reports", icon: "chart", text: "报表" }
];

export const userMenuItems: UserMenuItem[] = [
    { href: "/profile", text: "个人资料" },
    { href: "/settings", text: "设置" },
    { href: "/logout", text: "退出登录" }
]; 
