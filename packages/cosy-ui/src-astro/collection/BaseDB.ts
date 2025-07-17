import {
    getCollection,
    getEntry,
    type CollectionEntry,
} from 'astro:content';
import { cosyLogger, ERROR_PREFIX } from '../cosy';
import type { BaseDoc } from './entities/BaseDoc';

/**
 * BaseDB 是所有数据库类的基类，提供了通用的文档操作功能。
 *
 * 使用方法：
 * ```typescript
 * class MyDB extends BaseDB<'collection', MyEntry, MyDoc> {
 *     protected collectionName = 'collection' as const;
 *     protected createDoc(entry: MyEntry): MyDoc {
 *         return new MyDoc(entry);
 *     }
 * }
 *
 * // 使用单例模式获取实例
 * const db = MyDB.getInstance();
 * const docs = await db.allTopLevelDocs();
 * ```
 *
 * 类型参数说明：
 * @template Collection - Astro content collection 的名称
 * @template Entry - Collection 对应的条目类型
 * @template Doc - 文档类型，通常是自定义的文档类
 */
export abstract class BaseDB<
    Collection extends string,
    Entry extends CollectionEntry<Collection>,
    Doc extends BaseDoc<Collection, Entry>,
> {
    /**
     * 集合名称，必须在子类中指定
     * 
     * 例如：
     * ```typescript
     * protected collectionName = 'blogs' as const;
     * ```
     */
    protected abstract collectionName: Collection;

    /**
     * 创建文档实例的方法，必须在子类中实现
     * @param entry - 集合条目
     * @returns 文档实例
     */
    protected abstract createDoc(entry: Entry): Doc;

    /**
     * 获取所有文档的ID
     * @returns 返回所有文档的ID数组
     */
    protected async getAllIds(): Promise<string[]> {
        const entries = await getCollection(this.collectionName);
        return entries.map((entry: CollectionEntry<Collection>) => entry.id);
    }

    /**
     * 获取集合中的所有条目
     * @returns 返回所有条目的数组
     */
    protected async getEntries(): Promise<Entry[]> {
        return await getCollection(this.collectionName);
    }

    /**
     * 获取指定深度的文档
     * 深度是指文档 ID 中斜杠的数量加1
     * 例如：
     * - "blog.md" 深度为1
     * - "zh-cn/blog.md" 深度为2
     * - "zh-cn/tech/blog.md" 深度为3
     *
     * @param depth - 文档深度
     * @returns 返回指定深度的文档数组
     */
    protected async getDocsByDepth(depth: number): Promise<Doc[]> {
        const entries = await getCollection(
            this.collectionName,
            ({ id }: { id: string }) => id.split('/').length === depth
        );

        if (entries.length === 0) {
            cosyLogger.warn(
                `[BaseDB] 没有找到深度为${depth}的文档(collection=${this.collectionName as string})`
            );
            const allEntries = await getCollection(this.collectionName);
            cosyLogger.array(
                '[BaseDB] 所有文档',
                allEntries.map((entry: CollectionEntry<Collection>) => entry.id)
            );
            return [];
        }

        return entries.map((entry: CollectionEntry<Collection>) =>
            this.createDoc(entry as Entry)
        );
    }

    /**
     * 根据ID查找单个文档
     * @param id - 文档ID
     * @param debug - 是否启用调试模式, 默认为false
     * @throws 如果ID不是字符串类型，则抛出错误
     * @throws 如果文档不存在，则返回null
     * @throws 如果发生其他错误，则抛出错误
     * @returns 返回找到的文档，如果不存在则返回null
     */
    async find(id: string, debug: boolean = false): Promise<Doc | null> {
        if (debug) {
            cosyLogger.info(`查找文档，ID: ${id}`);
        }

        if (id == undefined) {
            cosyLogger.error('ID is undefined');
            throw new Error(ERROR_PREFIX + 'ID is undefined');
        }

        if (typeof id !== 'string') {
            cosyLogger.error('ID must be a string, but got ' + typeof id);
            cosyLogger.debug(id);
            throw new Error(
                ERROR_PREFIX + 'ID must be a string, but got ' + typeof id
            );
        }

        // 获取所有文档的ID并排好顺序
        if (debug) {
            const allIds = (await this.getAllIds()).sort();
            cosyLogger.array('所有文档的ID', allIds);
        }

        // 根据ID查找文档
        const entry = await getEntry(this.collectionName, id);
        return entry ? this.createDoc(entry as Entry) : null;
    }

    /**
     * 获取指定文档的直接子文档（不包括更深层级的文档）
     * 例如对于文档 "zh-cn/blog"：
     * - "zh-cn/blog/post1.md" 会被包含
     * - "zh-cn/blog/2024/post2.md" 不会被包含
     *
     * @param parentId - 父文档ID
     * @returns 返回子文档数组
     */
    async getChildren(parentId: string): Promise<Doc[]> {
        const parentLevel = parentId.split('/').length;
        const childrenLevel = parentLevel + 1;

        const entries = await getCollection(
            this.collectionName,
            ({ id }: { id: string }) =>
                id.startsWith(parentId) && id.split('/').length === childrenLevel
        );

        return entries.map((entry: CollectionEntry<Collection>) =>
            this.createDoc(entry as Entry)
        );
    }

    /**
     * 获取指定文档的所有后代文档（包括所有层级）
     * 例如对于文档 "zh-cn/blog"，以下都会被包含：
     * - "zh-cn/blog/post1.md"
     * - "zh-cn/blog/2024/post2.md"
     * - "zh-cn/blog/2024/tech/post3.md"
     *
     * @param parentId - 父文档ID
     * @returns 返回所有后代文档数组
     */
    async getDescendantDocs(parentId: string): Promise<Doc[]> {
        const entries = await getCollection(
            this.collectionName,
            ({ id }: { id: string }) => id.startsWith(parentId)
        );
        return entries.map((entry: CollectionEntry<Collection>) =>
            this.createDoc(entry as Entry)
        );
    }

    /**
     * 获取指定语言和级别的文档
     * 通过检查文档ID是否以指定语言代码开头来筛选
     *
     * @param lang - 语言代码（如 'zh-cn', 'en'）
     * @param level - 文档级别
     * @returns 返回指定语言和级别的文档数组
     */
    protected async allDocsByLangAndLevel(
        lang: string,
        level: number = 1,
        debug: boolean = false
    ): Promise<Doc[]> {
        const collectionName = this.collectionName as string;
        const docs = await this.getDocsByDepth(level);

        if (debug) {
            cosyLogger.array(
                `[BaseDB] 所有${level}级文档(lang=any,collection=${collectionName})`,
                docs
            );
        }

        if (docs.length === 0) {
            cosyLogger.warn(
                `[BaseDB] 没有找到${level}级文档(lang=any,collection=${collectionName})`
            );
            return [];
        }

        const filteredDocs = docs.filter((doc) => {
            const id = (doc as any).getId();
            return id && typeof id === 'string' && id.startsWith(lang);
        });

        if (debug) {
            cosyLogger.array(
                `[BaseDB] 所有${level}级文档(lang=${lang},collection=${collectionName})`,
                filteredDocs
            );
        }

        if (filteredDocs.length === 0) {
            cosyLogger.warn(
                `[BaseDB] 没有找到${level}级文档(lang=${lang},collection=${collectionName})`
            );
            cosyLogger.array(
                `[BaseDB] 所有${level}级文档`,
                docs.map((doc) => doc.getId())
            );
            return [];
        }

        return filteredDocs;
    }

    /**
     * 获取用于 Astro 静态路由生成的路径参数
     * 为每个文档生成包含语言和slug的路径参数
     *
     * @returns 返回路径参数数组，每个元素包含 lang 和 slug
     * @example
     * ```typescript
     * const paths = await db.getStaticPaths();
     * // 返回格式：
     * // [
     * //   { params: { lang: 'zh-cn', slug: 'post1' } },
     * //   { params: { lang: 'en', slug: 'post1' } }
     * // ]
     * ```
     */
    async getStaticPaths() {
        const debug = false;
        const docs = await this.getDescendantDocs('');
        const paths = docs.map((doc) => {
            const docWithMethods = doc as any;
            return {
                params: {
                    lang: docWithMethods.getLang?.() || '',
                    slug: docWithMethods.getSlug?.() || '',
                },
            };
        });

        if (debug) {
            cosyLogger.array('所有文档的路径', paths);
        }

        return paths;
    }
}
