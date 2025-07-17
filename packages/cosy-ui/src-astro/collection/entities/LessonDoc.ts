import type { LessonEntry } from '../LessonRepo';
import { lessonRepo } from '../LessonRepo';
import { cosyLogger } from '../../cosy';
import { SidebarItemEntity } from './SidebarItem';
import { LinkUtil } from '../../../src/utils/link';
import type { SidebarProvider } from '../types';
import { render } from 'astro:content';
import type { IHeadingType } from '../../types/heading';
import { BaseDoc } from './BaseDoc';

/**
 * 课程文档类，配合 LessonRepo 使用
 *
 * 目录结构：
 * ```
 * lessons/
 * ├── build_your_own_web_toolbox/      # 课程目录
 * │   ├── images/                      # 课程图片资源
 * │   ├── components/                  # 课程组件
 * │   ├── en/                          # 英文版本
 * │   │   ├── index.mdx                # 课程首页
 * │   │   ├── 1.mdx                    # 第一章
 * │   │   └── 2.mdx                    # 第二章
 * │   └── zh-cn/                       # 中文版本
 * │       ├── index.mdx                # 课程首页
 * │       ├── 1.mdx                    # 第一章
 * │       └── 2.mdx                    # 第二章
 * └── learn_astro/                     # 另一个课程
 *     ├── en/
 *     │   ├── index.mdx
 *     │   ├── 1.mdx
 *     │   └── 2.mdx
 *     └── zh-cn/
 *         ├── index.mdx
 *         ├── 1.mdx
 *         └── 2.mdx
 * ```
 *
 * 说明：
 * - 每个课程（如 build_your_own_web_toolbox）是一个独立的目录
 * - 课程目录可以包含多语言版本（en, zh-cn 等）
 * - 每个语言版本包含完整的课程内容
 * - 课程目录可以作为 git 子模块独立管理
 */
export default class LessonDoc extends BaseDoc implements SidebarProvider {
    entry: LessonEntry;
    collectionName = 'lessons' as const;

    constructor(entry: LessonEntry) {
        super();
        this.entry = entry;
    }

    isBook(): boolean {
        return this.entry.id.split('/').length === 2;
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
            throw new Error('Level must be greater than 0');
        }

        if (level >= this.getLevel()) {
            cosyLogger.debug('当前文档的ID：' + this.entry.id);
            cosyLogger.debug('当前文档的Level：' + this.getLevel());
            cosyLogger.debug('正在获取祖先ID，level：' + level);

            throw new Error('Level must be less than the document level');
        }

        if (ancestorIds.length < level) {
            cosyLogger.debug('当前文档的ID\n' + this.entry.id);
            cosyLogger.array('当前文档的祖先IDs', ancestorIds);
            cosyLogger.debug('正在获取祖先ID，level:\n' + level);

            throw new Error('Level must be greater than 0');
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

    getLang(): string {
        const debug = false;
        const parts = this.entry.id.split('/');
        const lang = parts[1];
        if (debug) {
            cosyLogger.info(`获取 ${this.entry.id} 的语言: ${lang}`);
        }
        return lang;
    }

    getSlug(): string {
        return this.getId().split('/').slice(1).join('/');
    }

    getDescription(): string {
        return this.entry.data.description as string;
    }

    async getBookId(): Promise<string> {
        return this.getTopDocId();
    }

    async getBook(): Promise<LessonDoc | null> {
        const bookId = await this.getBookId();
        return await lessonRepo.find(bookId);
    }

    getLink(): string {
        const debug = false;
        const lang = this.getLang();
        const link = LinkUtil.getLessonLink(lang, this.getId());
        if (debug) {
            cosyLogger.info(`获取 ${this.entry.id} 的链接: ${link}`);
        }
        return link;
    }

    getHTML(): string {
        const debug = false;
        if (debug) {
            cosyLogger.info(`获取 ${this.entry.id} 的 HTML`);
        }
        return this.entry.rendered?.html || '';
    }

    getHeadings(): IHeadingType[] {
        const debug = false;
        if (debug) {
            cosyLogger.info(`获取 ${this.entry.id} 的 headings`);
        }
        return (this.entry.rendered?.metadata?.headings as IHeadingType[]) || [];
    }

    async getTopDoc(): Promise<LessonDoc | null> {
        const bookId = await this.getBookId();
        return await lessonRepo.find(bookId);
    }

    async getChildren(): Promise<LessonDoc[]> {
        return await lessonRepo.getChildren(this.entry.id);
    }

    async getDescendants(): Promise<LessonDoc[]> {
        return await lessonRepo.getDescendantDocs(this.entry.id);
    }

    async render(): Promise<any> {
        return await render(this.entry);
    }

    async toSidebarItem(): Promise<SidebarItemEntity> {
        const debug = false;
        const children = await this.getChildren();
        let childItems = await Promise.all(
            children.map((child) => child.toSidebarItem())
        );
        if (this.isBook()) {
            childItems = [...childItems];
        }
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
