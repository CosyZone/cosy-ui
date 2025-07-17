import type { SidebarItemEntity } from "./entities/SidebarItem";

/**
 * 侧边栏提供者接口
 * 实现此接口的类可以提供侧边栏项目
 */
export interface SidebarProvider {
    /**
     * 转换为侧边栏项目
     */
    toSidebarItem(): Promise<SidebarItemEntity>;

    /**
     * 获取顶级侧边栏项目
     */
    getTopSidebarItem?(): Promise<SidebarItemEntity>;
}
