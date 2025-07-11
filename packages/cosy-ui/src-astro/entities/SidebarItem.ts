import { type ISidebarItem } from '../types/sidebar';

/**
 * 侧边栏项目类
 * 用于构建网站的侧边栏导航
 */
export class SidebarItemEntity implements ISidebarItem {
    text: string;
    href: string;
    items: ISidebarItem[];
    badge?: string | number;

    constructor(props: { text: string; link?: string; items?: ISidebarItem[]; badge?: string | number }) {
        this.text = props.text;
        this.href = props.link || '';
        this.items = props.items || [];
        this.badge = props.badge;
    }

    /**
     * 添加子项目
     * @param item 要添加的子项目
     */
    addItem(item: SidebarItemEntity): void {
        this.items.push(item);
    }

    /**
     * 获取所有子项目
     * @returns 子项目数组
     */
    getItems(): SidebarItemEntity[] {
        return this.items.map((item) => new SidebarItemEntity(item));
    }

    /**
     * 获取项目标签
     * @returns 项目标签
     */
    getLabel(): string {
        return this.text;
    }

    /**
     * 获取项目链接
     * @returns 项目链接
     */
    getLink(): string {
        return this.href;
    }

    /**
     * 获取包括自身在内的所有项目
     * @returns 包括自身在内的所有项目
     */
    getItemsIncludingSelf(): SidebarItemEntity[] {
        return [this, ...this.getItems()];
    }

    /**
     * 判断是否是分组（有子项目）
     * @returns 是否是分组
     */
    isGroup(): boolean {
        return this.items.length > 0;
    }

    /**
     * 判断是否不是分组
     * @returns 是否不是分组
     */
    isNotGroup(): boolean {
        return !this.isGroup();
    }
}

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
