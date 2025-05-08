import { type CollectionEntry } from 'astro:content';
import { BaseDB } from './BaseDB';
import ExperimentDoc from '../entities/ExperimentDoc';
import { logger } from '../utils/logger';

export const COLLECTION_NAME = 'experiments' as const;
export type ExperimentEntry = CollectionEntry<typeof COLLECTION_NAME>;

/**
 * 实验数据库类，用于管理实验内容集合
 *
 * 目录结构：
 * ```
 * experiments/
 * ├── safari_itp/           # 实验目录
 * │   ├── images/          # 实验图片资源
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
class ExperimentDB extends BaseDB<typeof COLLECTION_NAME, ExperimentEntry, ExperimentDoc> {
	protected collectionName = COLLECTION_NAME;

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
	 * @returns 返回路径参数数组
	 */
	async getStaticPaths() {
		const debug = false;
		const docs = await this.getEntries();

		if (debug) {
			logger.array('所有文档', docs);
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
			logger.array('所有文档的路径', paths);
		}

		return paths;
	}
}

// 创建并导出单例实例
const experimentDB = new ExperimentDB();
export default experimentDB;
