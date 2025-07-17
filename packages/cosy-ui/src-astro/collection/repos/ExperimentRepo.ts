import { defineCollection, z, type CollectionEntry } from 'astro:content';
import { BaseDB } from './BaseRepo';
import ExperimentDoc from '../entities/ExperimentDoc';
import { cosyLogger } from '../../cosy';
import { glob } from 'astro/loaders';

export const COLLECTION_EXPERIMENT = 'experiments' as const;
export type ExperimentEntry = CollectionEntry<typeof COLLECTION_EXPERIMENT>;

/**
 * 实验数据库类，用于管理实验内容集合
 *
 * 目录结构：
 * ```
 * experiments/
 * ├── safari_itp/           # 实验目录
 * │   ├── images/           # 实验图片资源
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
class ExperimentRepo extends BaseDB<
    typeof COLLECTION_EXPERIMENT,
    ExperimentEntry,
    ExperimentDoc
> {
    protected collectionName = COLLECTION_EXPERIMENT;

    protected createDoc(entry: ExperimentEntry): ExperimentDoc {
        return new ExperimentDoc(entry);
    }

    /**
     * 获取指定语言的所有课程
     *
     * @param {string} lang - 语言代码
     * @returns {Promise<ExperimentDoc[]>} 返回指定语言的所有课程
     */
    async allExperiments(lang: string): Promise<ExperimentDoc[]> {
        const docs = await this.getDocsByDepth(2);
        return docs.filter((doc) => doc.getId().endsWith(lang));
    }

    /**
     * 获取用于 Astro 静态路由生成的路径参数
     *
     * @param debug - 是否开启调试模式
     * @returns 返回路径参数数组
     */
    async getStaticPaths(debug: boolean = false) {
        const docs = await this.getEntries();

        if (debug) {
            cosyLogger.array('所有文档', docs);
        }

        const paths = docs.map((doc) => {
            const id = doc.id;
            const lang = id.split('/')[1];

            let slug = '';
            if (id.endsWith(lang)) {
                slug = id.replace(`${lang}`, '');
            } else {
                slug = id.replace(`${lang}/`, '');
            }

            return {
                params: {
                    lang: lang,
                    slug: slug,
                },
            };
        });

        if (debug) {
            cosyLogger.array('所有文档的路径', paths);
        }

        return paths;
    }

    makeExperimentCollection = (base: string) => {
        return defineCollection({
            loader: glob({
                pattern: '**/*.{md,mdx}',
                base,
            }),
            schema: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                pubDate: z.date().optional(),
            }),
        });
    };
}

// 创建并导出单例实例
export const experimentRepo = new ExperimentRepo();
