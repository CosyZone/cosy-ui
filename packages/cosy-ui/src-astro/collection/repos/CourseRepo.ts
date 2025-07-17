import CourseDoc from '../entities/CourseDoc';
import { defineCollection, getCollection, z, type CollectionEntry } from 'astro:content';
import { BaseDB } from './BaseRepo';
import { glob } from 'astro/loaders';

export const COLLECTION_COURSE = 'courses' as const;
export type CourseEntry = CollectionEntry<typeof COLLECTION_COURSE>;

/**
 * 课程数据库类，用于管理课程内容集合。
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
     * 获取指定语言的所有顶级课程，适用于在索引页面展示课程列表的情况
     *
     * @param lang - 语言代码
     * @returns 返回指定语言的顶级课程数组
     */
    async allCoursesByLang(lang: string): Promise<CourseDoc[]> {
        return await getCollection(COLLECTION_COURSE, ({ id }: { id: string }) => {
            return id.startsWith(lang) && id.split('/').length === 2;
        }).map((entry: CourseEntry) => new CourseDoc(entry));
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
     *
     * @param lang - 语言代码（如 'zh-cn', 'en'）
     * @param count - 返回的课程数量（默认4个）
     * @returns 返回精选课程文档数组
     */
    async getFamousCourses(lang: string, count: number = 4): Promise<CourseDoc[]> {
        return (await this.allCoursesByLang(lang))
            .filter((course) => course.isFamous())
            .slice(0, count);
    }

    /**
     * 获取指定语言的课程，并根据标签过滤
     *
     * @param lang - 语言代码（如 'zh-cn', 'en'）
     * @param tag - 标签
     * @returns 返回符合条件的课程文档数组
     */
    async getCoursesWithTag(lang: string, tag: string): Promise<CourseDoc[]> {
        return (await this.allCoursesByLang(lang))
            .filter((course) => course.hasTag(tag));
    }

    makeCourseCollection = (base: string) => {
        return defineCollection({
            loader: glob({
                pattern: '**/*.{md,mdx}',
                base,
            }),
            schema: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                folder: z.boolean().optional(),
                order: z.number().optional(),
                badge: z.string().optional(),
                draft: z.boolean().optional(),
                hidden: z.boolean().optional(),
                famous: z.boolean().optional(),
                tags: z.array(z.string()).optional(),
                category: z.string().optional(),
            }),
        });
    };
}

// 创建并导出单例实例
export const courseRepo = new CourseRepo();
