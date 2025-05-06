import { render, type RenderResult, type CollectionEntry, type DataEntryMap } from "astro:content";
import { SidebarItem, type SidebarProvider } from "../entities/SidebarItem";
import { logger } from "../utils/logger";

/**
 * 文档基类，提供所有文档类型共享的基本功能
 */
export default abstract class BaseDoc<Collection extends keyof DataEntryMap, T extends CollectionEntry<Collection>> implements SidebarProvider {
    protected entry: T;

    constructor(entry: T) {
        this.entry = entry;
    }

    /**
     * 获取文档ID
     */
    getId(): string {
        return this.entry.id;
    }

    /**
     * 获取文档标题
     */
    getTitle(): string {
        return this.entry.data.title as string;
    }

    /**
     * 获取文档语言
     */
    getLang(): string {
        return this.entry.id.split('/')[0];
    }

    /**
     * 获取文档slug
     */
    getSlug(): string {
        return this.getId().split('/').slice(1).join('/');
    }

    /**
     * 获取文档描述
     */
    getDescription(): string {
        return this.entry.data.description as string;
    }

    /**
     * 获取文档链接
     * 每个子类必须实现此方法以提供正确的链接
     */
    abstract getLink(): string;

    /**
     * 渲染文档内容
     */
    async render(): Promise<RenderResult> {
        return await render(this.entry);
    }

    /**
     * 获取文档的层级深度
     * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，深度为3
     */
    getLevel(): number {
        return this.entry.id.split('/').length;
    }

    /**
     * 转换为侧边栏项目
     * 基本实现，只包含当前文档
     */
    async toSidebarItem(): Promise<SidebarItem> {
        return new SidebarItem({
            label: this.getTitle(),
            link: this.getLink(),
        });
    }
}

/**
 * 层级文档基类，为有层级结构的文档类型提供额外功能
 * 例如课程等有父子关系的文档
 */
export abstract class HierarchicalDoc<Collection extends keyof DataEntryMap, T extends CollectionEntry<Collection>> extends BaseDoc<Collection, T> {
    /**
     * 获取父文档ID
     * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，父ID为 "zh-cn/blog"
     * 
     * @returns 父文档ID，如果没有父文档则返回null
     */
    getParentId(): string | null {
        const parts = this.entry.id.split('/');
        return parts.length > 1 ? parts.slice(0, -1).join('/') : null;
    }

    /**
     * 获取顶级文档的ID
     * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，顶级ID为 "zh-cn/blog"
     * 
     * 默认实现假设顶级ID是前两部分
     * 子类可以根据需要覆盖此方法
     */
    async getTopDocId(): Promise<string> {
        const id = this.entry.id;
        const parts = id.split('/');
        return parts[0] + '/' + parts[1];
    }

    /**
     * 获取顶级文档
     * 子类应该实现此方法以提供正确的顶级文档
     */
    abstract getTopDoc(): Promise<HierarchicalDoc<Collection, T> | null>;

    /**
     * 获取子文档
     * 子类应该实现此方法以提供正确的子文档列表
     */
    abstract getChildren(): Promise<HierarchicalDoc<Collection, T>[]>;

    /**
     * 转换为侧边栏项目
     * 如果文档有子文档，会包含子文档的侧边栏项目
     */
    override async toSidebarItem(): Promise<SidebarItem> {
        const debug = false;

        const children = await this.getChildren();
        const childItems = await Promise.all(children.map(child => child.toSidebarItem()));

        if (debug) {
            logger.info(`${this.entry.id} 的侧边栏项目`);
            // eslint-disable-next-line no-console
            console.log(childItems);
        }

        return new SidebarItem({
            label: this.getTitle(),
            items: childItems,
            link: this.getLink(),
        });
    }

    /**
     * 获取顶级侧边栏项目
     * 如果有顶级文档，返回顶级文档的侧边栏项目
     * 否则返回当前文档的侧边栏项目
     */
    async getTopSidebarItem(): Promise<SidebarItem> {
        const topDoc = await this.getTopDoc();
        if (topDoc) {
            return await topDoc.toSidebarItem();
        }

        return new SidebarItem({
            label: this.getTitle(),
            items: [],
            link: this.getLink(),
        });
    }
} 
