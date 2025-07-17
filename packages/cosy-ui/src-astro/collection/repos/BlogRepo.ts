import BlogDoc from '../entities/BlogDoc';
import type Tag from '../entities/Tag';
import { cosyLogger } from '../../cosy';
import { defineCollection, z, type CollectionEntry } from 'astro:content';
import { BaseDB } from './BaseDB';
import { glob } from 'astro/loaders';
import { COLLECTION_BLOG, type BlogEntry } from '..';

/**
 * 博客数据库类，用于管理博客内容集合。
 *
 * 目录结构：
 * ```
 * blogs/
 * ├── zh-cn/
 * │   ├── typescript-intro.md      # 文章内容  
 * │   ├── images/                  # 文章相关图片
 * │   └── web-performance.md
 * └── en/
 *     └── typescript-intro.md
 *     └── images/
 *     └── web-performance.md
 * ```
 */
class BlogRepo extends BaseDB<typeof COLLECTION_BLOG, BlogEntry, BlogDoc> {
    protected collectionName = COLLECTION_BLOG;

    protected createDoc(entry: BlogEntry): BlogDoc {
        return BlogDoc.fromEntry(entry);
    }

    /**
     * 获取所有博客
     *
     * @returns {Promise<BlogDoc[]>} 返回所有博客
     */
    async allBlogs(): Promise<BlogDoc[]> {
        const debug = false;
        const entries = await this.getDocsByDepth(2);

        if (debug) {
            cosyLogger.array('所有博客文档', entries);
        }

        return entries;
    }

    /**
     * 获取指定语言的所有博客
     *
     * @param lang - 语言代码
     * @returns {Promise<BlogDoc[]>} 返回指定语言的所有博客
     */
    async allBlogsByLang(lang: string): Promise<BlogDoc[]> {
        const docs = await this.allBlogs();
        const filteredEntries = docs.filter((doc) => doc.getId().startsWith(lang));

        return filteredEntries;
    }

    /**
     * 获取用于 Astro 静态路由生成的路径参数，专门配合 [lang]/blogs/[slug].astro 使用
     *
     * @param debug - 是否开启调试模式
     * @returns 返回路径参数数组
     */
    async getStaticPaths(debug: boolean = false) {
        const docs = await this.allBlogs();

        const paths = docs.map((doc) => {
            return {
                params: {
                    lang: doc.getLang(),
                    slug: doc.getSlug(),
                },
            };
        });

        if (debug) {
            cosyLogger.array('所有博客文档的路径', paths);
        }

        return paths;
    }

    /**
     * 获取所有博客标签
     * 标签会根据语言和名称去重，使用复合键 "lang:name" 确保唯一性
     *
     * @returns 返回所有标签数组
     * 返回格式：
     * [
     *   { name: 'typescript', lang: 'zh-cn', count: 5 },
     *   { name: 'javascript', lang: 'en', count: 3 }
     * ]
     */
    async getTags(): Promise<Tag[]> {
        const tagsMap = new Map<string, Tag>();
        const posts = await this.allBlogs();

        posts.forEach((post) => {
            post.getTags().forEach((tag) => {
                const key = `${tag.lang}:${tag.name}`;
                if (!tagsMap.has(key)) {
                    tagsMap.set(key, tag);
                }
            });
        });

        return Array.from(tagsMap.values());
    }

    /**
     * 获取指定语言的博客标签
     *
     * @param lang - 语言代码（如 'zh-cn', 'en'）
     * @returns 返回指定语言的标签数组
     */
    async getTagsByLang(lang: string): Promise<Tag[]> {
        const debug = false;
        const tagsMap = new Map<string, Tag>();
        const posts = await this.allBlogsByLang(lang);

        if (debug) {
            cosyLogger.array('posts', posts);
        }

        if (posts.length === 0) {
            return [];
        }

        posts.forEach((post) => {
            post.getTags().forEach((tag) => {
                const key = `${tag.lang}:${tag.name}`;
                if (!tagsMap.has(key)) {
                    tagsMap.set(key, tag);
                }
            });
        });

        if (debug) {
            cosyLogger.array('tags', Array.from(tagsMap.values()));
        }

        return Array.from(tagsMap.values());
    }

    /**
     * 获取指定标签和语言的博客文章
     *
     * @param tag - 标签名称
     * @param lang - 语言代码
     * @returns 返回匹配的博客文档数组
     * @example
     * ```typescript
     * const posts = await blogDB.getBlogsByTag('typescript', 'zh-cn');
     * // 返回所有包含 'typescript' 标签的中文博客
     * ```
     */
    async getBlogsByTag(tag: string, lang: string): Promise<BlogDoc[]> {
        const posts = await this.allBlogsByLang(lang);
        return posts.filter((post) => post.getTags().some((t) => t.name === tag));
    }

    /**
     * 获取标签的静态路径参数，用于生成标签页面的路由，专门配合 [lang]/blogs/tag/[name].astro 使用
     *
     * @returns 返回所有标签的路径参数数组
     * 返回格式：
     * [
     *   { params: { lang: 'zh-cn', name: 'typescript' } },
     *   { params: { lang: 'en', name: 'javascript' } }
     * ]
     */
    async getTagsStaticPaths() {
        const debug = false;
        const tags = await this.getTags();

        const paths = tags.map((tag) => {
            return {
                params: {
                    lang: tag.lang,
                    name: tag.name,
                },
            };
        });

        if (debug) {
            cosyLogger.array('所有的标签路径', paths);
        }

        return paths;
    }

    makeBlogCollection = (base: string) => {
        return defineCollection({
            loader: glob({
                pattern: '**/*.{md,mdx}',
                base,
            }),
            schema: z.object({
                title: z.string(),
                description: z.string().optional(),
                tags: z.array(z.string()).optional(),
                date: z.date().optional(),
                authors: z
                    .array(
                        z.object({
                            name: z.string(),
                            picture: z.string().optional(),
                            url: z.string().optional(),
                        })
                    )
                    .optional(),
            }),
        });
    };
}

// 创建并导出单例实例
export const blogRepo = new BlogRepo();
