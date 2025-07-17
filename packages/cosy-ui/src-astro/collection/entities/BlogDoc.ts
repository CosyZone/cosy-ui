import { LinkUtil } from '../../../src/utils/link';
import Tag from './Tag';
import { blogRepo, type BlogEntry } from '..';
import { SidebarItemEntity } from './SidebarItem';
import { cosyLogger, ERROR_PREFIX } from '../../cosy';
import { render } from 'astro:content';
import type { SidebarProvider } from '../types';
import { BaseDoc } from './BaseDoc';

/**
 * 博客文档类，配合 BlogRepo 使用
 *
 * 目录结构：
 * ```
 * blogs/
 * ├── zh-cn/                        # 中文博客目录
 * │   ├── typescript-intro.md      # 文章内容
 * │   ├── images/                  # 文章相关图片
 * │   └── web-performance.md
 * └── en/                          # 英文博客目录
 *     ├── typescript-intro.md
 *     ├── images/
 *     └── web-performance.md
 * ```
 *
 * 说明：
 * - 每个语言（如 zh-cn, en）是一个独立的目录，存放该语言下的所有博客文章
 * - 每篇博客为一个 markdown 文件，文件名即为 slug
 * - 每个语言目录下可包含 images 文件夹，存放该语言博客相关图片
 * - 支持多语言博客内容，便于国际化
 * - 博客目录可作为 git 子模块独立管理
 *
 * 相关：
 * - BlogRepo：博客仓库管理类，负责博客文档的增删查改
 * - BlogDoc：博客文档实体类，封装单篇博客的相关操作
 *
 * 用法示例：
 * ```typescript
 * import BlogDoc from '../entities/BlogDoc';
 * import { blogRepo } from '../BlogRepo';
 *
 * // 获取所有中文博客
 * const blogs = await blogRepo.allBlogsByLang('zh-cn');
 *
 * // 获取博客链接
 * const link = blogs[0].getLink();
 * ```
 */

export default class BlogDoc extends BaseDoc implements SidebarProvider {
    entry: BlogEntry;
    collectionName = 'blogs' as const;

    private constructor(entry: BlogEntry) {
        super();
        this.entry = entry;
    }

    static fromEntry(entry: BlogEntry) {
        return new BlogDoc(entry);
    }

    getAncestorIds(): string[] {
        const parts = this.entry.id.split('/');
        return parts
            .slice(0, -1)
            .map((_part: string, index: number) => parts.slice(0, index + 1).join('/'));
    }

    getAncestorId(level: number): string {
        const ancestorIds = this.getAncestorIds();

        if (level < 1) {
            cosyLogger.error('Level must be greater than 0');
            throw new Error(ERROR_PREFIX + 'Level must be greater than 0');
        }

        if (level >= this.getLevel()) {
            cosyLogger.debug('当前文档的ID：' + this.entry.id);
            cosyLogger.debug('当前文档的Level：' + this.getLevel());
            cosyLogger.debug('正在获取祖先ID，level：' + level);

            throw new Error(
                ERROR_PREFIX + 'Level must be less than the document level'
            );
        }

        if (ancestorIds.length < level) {
            cosyLogger.debug('当前文档的ID\n' + this.entry.id);
            cosyLogger.array('当前文档的祖先IDs', ancestorIds);
            cosyLogger.debug('正在获取祖先ID，level:\n' + level);

            throw new Error(ERROR_PREFIX + 'Level must be greater than 0');
        }

        return ancestorIds[level - 1];
    }

    getParentId(): string | null {
        return this.getAncestorId(this.getLevel() - 1);
    }

    getTopDocId(): string {
        const level = this.getLevel();
        if (level <= 2) {
            return this.entry.id;
        }
        return this.getAncestorId(2);
    }



    getSlug(): string {
        return this.getId().split('/').slice(1).join('/');
    }

    getDescription(): string {
        return this.entry.data.description as string;
    }

    async getTopDoc(): Promise<BlogDoc | null> {
        const id = this.getTopDocId();
        const doc = await blogRepo.find(id);
        return doc;
    }

    async getChildren(): Promise<BlogDoc[]> {
        return await blogRepo.getChildren(this.entry.id);
    }

    getLink(): string {
        return LinkUtil.getBlogLink(this.entry.id, this.getLang());
    }

    getTags(): Tag[] {
        const tags = this.entry.data.tags as string[];
        if (!tags || tags.length === 0) {
            return [];
        }
        return tags.map((tag) => new Tag(tag, 0, this.getLang()));
    }

    getDate(): Date {
        return new Date(this.entry.data.date as Date);
    }

    getDateForDisplay() {
        try {
            const dateObj = new Date(this.entry.data.date as Date);
            if (isNaN(dateObj.getTime())) {
                console.warn(`Invalid date format: ${this.entry.data.date}`);
                return 'Date unavailable: ' + this.getTitle() + ' ' + this.getLink();
            }
            return dateObj.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (error) {
            console.error(`Error formatting date: ${this.entry.data.date}`, error);
            return 'Date unavailable';
        }
    }

    async render(): Promise<any> {
        return await render(this.entry);
    }

    async toSidebarItem(): Promise<SidebarItemEntity> {
        const debug = false;
        const children = await this.getChildren();
        const childItems = await Promise.all(
            children.map((child) => child.toSidebarItem())
        );
        if (debug) {
            cosyLogger.info(`${this.entry.id} 的侧边栏项目`);
            console.log(childItems);
        }
        return new SidebarItemEntity({
            text: this.getTitle(),
            items: childItems,
            link: this.getLink(),
        });
    }

    async getTopSidebarItem(): Promise<SidebarItemEntity> {
        const topDoc = await this.getTopDoc();
        if (topDoc) {
            return await topDoc.toSidebarItem();
        }
        return new SidebarItemEntity({
            text: this.getTitle(),
            items: [],
            link: this.getLink(),
        });
    }
}
