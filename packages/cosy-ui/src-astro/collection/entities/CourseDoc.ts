import { cosyLogger } from '../../cosy';
import { SidebarItemEntity } from './SidebarItem';
import { LinkUtil } from '../../../src/utils/link';
import type { SidebarProvider } from '../types';
import { defineCollection, getCollection, render, z, type CollectionEntry } from 'astro:content';
import { BaseDoc } from './BaseDoc';
import { glob } from 'astro/loaders';
import { BaseDB } from '../repos/BaseDB';

export const COLLECTION_COURSE = 'courses' as const;
export type CourseEntry = CollectionEntry<typeof COLLECTION_COURSE>;

/**
 * 课程文档类，配合 CourseRepo 使用
 *
 * 目录结构：
 * ```
 * courses/
 * ├── zh-cn/                  # 中文版本
 * │   ├── web-development/    # 课程1
 * │   │   ├── index.md        # 课程文档
 * │   │   ├── chapter1
 * │   │   │   ├── index.md
 * │   │   │   ├── content.md
 * │   │   │   └── ...
 * │   │   └── chapter2
 * │   │       ├── index.md
 * │   │       ├── content.md
 * │   │       └── ...
 * │   └── mobile-dev/        # 课程2
 * │       ├── index.md
 * │       └── ...
 * └── en/                    # 英文版本
 *     └── ...
 * ```
 */
export default class CourseDoc extends BaseDoc implements SidebarProvider {
    entry: CourseEntry;
    repo: CourseRepo;
    collectionName = 'courses' as const;

    constructor(entry: CourseEntry) {
        super();
        this.entry = entry;
        this.repo = new CourseRepo();
    }

    static fromEntry(entry: CourseEntry) {
        return new CourseDoc(entry);
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

    getSlug(): string {
        return this.getId().split('/').slice(1).join('/');
    }

    getDescription(): string {
        return this.entry.data.description as string;
    }

    getOrder(): number {
        return this.entry.data.order ?? 0;
    }

    isFolder(): boolean {
        return this.entry.data.folder ?? false;
    }

    async getTopDoc(): Promise<CourseDoc | null> {
        const id = this.getTopDocId();
        const doc = await this.repo.find(id);
        return doc;
    }

    async getAncestor(level: number): Promise<CourseDoc | null> {
        const debug = false;
        if (debug) {
            cosyLogger.info(`获取 ${this.entry.id} 的祖先文档，level: ${level}`);
        }

        if (level >= this.getLevel()) {
            if (debug) {
                cosyLogger.info(`祖先文档为自身`);
            }
            return this;
        }

        const id = this.getAncestorId(level);
        const doc = await this.repo.find(id);
        return doc;
    }

    async getChildren(): Promise<CourseDoc[]> {
        const debug = false;
        const children = (await this.repo.getChildren(this.entry.id)).sort(
            (a, b) => a.getOrder() - b.getOrder()
        );
        if (debug && children.length > 0) {
            cosyLogger.array(
                `${this.entry.id} 的子文档(${children.length})`,
                children.map((child) => `#${child.getOrder()} ${child.entry.id}`)
            );
        }
        return children;
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
            badge: this.entry.data.badge,
        });
    }

    isBook(): boolean {
        return this.entry.id.split('/').length === 2;
    }

    getLink(): string {
        return LinkUtil.getCourseLink(this.entry.id);
    }

    async render(): Promise<any> {
        return await render(this.entry);
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



    makeCourseCollection = (base: string) => {
        return defineCollection({
            loader: glob({
                pattern: '**/*.{md,mdx}',
                base,
            }),
            schema: z.object({
                title: z.string(),
                description: z.string(),
                folder: z.boolean(),
                order: z.number(),
                badge: z.string(),
                draft: z.boolean(),
                hidden: z.boolean(),
            }),
        });
    };
}

class CourseRepo extends BaseDB<
    typeof COLLECTION_COURSE,
    CourseEntry,
    CourseDoc
> {
    protected collectionName = COLLECTION_COURSE;

    protected createDoc(entry: CourseEntry): CourseDoc {
        return new CourseDoc(entry);
    }

    /**
     * 获取指定语言的所有顶级课程
     *
     * @param lang - 语言代码
     * @returns 返回指定语言的顶级课程数组
     */
    async allCoursesByLang(lang: string): Promise<CourseDoc[]> {
        const entries = await getCollection(COLLECTION_COURSE, ({ id }: { id: string }) => {
            return id.startsWith(lang) && id.split('/').length === 2;
        });
        return entries.map((entry: CourseEntry) => new CourseDoc(entry));
    }

    /**
     * 获取用于 Astro 静态路由生成的路径参数，专门配合 [lang]/courses/[...slug].astro 使用
     *
     * @returns 返回路径参数数组
     */
    async getStaticPaths(): Promise<
        { params: { lang: string; slug: string } }[]
    > {
        const entries = await getCollection(COLLECTION_COURSE);
        return entries.map((entry: CourseEntry) => {
            const doc = new CourseDoc(entry);
            return {
                params: {
                    lang: doc.getLang(),
                    slug: doc.getSlug(),
                },
            };
        });
    }

    /**
     * 获取精选课程
     * 返回指定语言的前4个顶级课程文档
     *
     * @param lang - 语言代码（如 'zh-cn', 'en'）
     * @returns 返回精选课程文档数组（最多4个）
     */
    async getFamousCourses(lang: string): Promise<CourseDoc[]> {
        const courses = await this.allCoursesByLang(lang);
        return courses.slice(0, 4);
    }
}
