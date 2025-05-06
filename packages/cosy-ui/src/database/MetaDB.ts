import MetaDoc from "@/models/MetaDoc";
import { logger } from "@/utils/logger";
import { type CollectionEntry } from "astro:content";
import BaseDB from "./BaseDB";

export const COLLECTION_NAME = 'meta' as const;
export type MetaEntry = CollectionEntry<typeof COLLECTION_NAME>;

/**
 * 元数据数据库类，用于管理网站的元数据内容集合（如"关于我们"等页面）
 * 
 * 目录结构：
 * ```
 * meta/
 * ├── zh-cn/                          # 中文内容
 * │   ├── about.md                    # 关于我们
 * │   ├── advice.md                   # 建议
 * └── en/                             # 英文内容
 *     ├── about.md
 *     ├── privacy.md
 *     └── terms.md
 * ```
 */
class MetaDB extends BaseDB<typeof COLLECTION_NAME, MetaEntry, MetaDoc> {
    protected collectionName = COLLECTION_NAME;

    protected createDoc(entry: MetaEntry): MetaDoc {
        return new MetaDoc(entry);
    }

    /**
     * 获取指定文档的兄弟文档
     * 例如：对于 'zh-cn/about'，会返回 'zh-cn' 下的文档
     * 
     * @param targetId - 目标文档ID
     * @returns 返回兄弟文档数组（包括目标文档本身）
     */
    async getSiblings(targetId: string): Promise<MetaDoc[]> {
        const target = await this.find(targetId);
        if (!target) {
            return [];
        }
        const docs = await this.getDocsByDepth(2);
        return docs.filter(doc => doc.getLang() === target.getLang());
    }

    /**
     * 获取用于 Astro 静态路由生成的路径参数，专门配合 [lang]/meta/[slug].astro 使用
     * 
     * @returns 返回路径参数数组
     */
    async getStaticPaths() {
        const debug = false;
        const docs = await this.getDescendantDocs('');

        const paths = docs.map((doc) => {
            return {
                params: {
                    lang: doc.getLang(),
                    slug: doc.getSlug(),
                },
            };
        });

        if (debug) {
            logger.array('所有元数据文档的路径', paths);
        }

        return paths;
    }
}

// 创建并导出单例实例
const metaDB = new MetaDB();
export default metaDB;