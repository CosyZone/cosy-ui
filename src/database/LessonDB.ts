import { type CollectionEntry } from 'astro:content';
import { BaseDB } from './BaseDB';
import LessonDoc from '../entities/LessonDoc';
import { cosyLogger } from '../cosy';

export const COLLECTION_LESSON = 'lessons' as const;
export type LessonEntry = CollectionEntry<typeof COLLECTION_LESSON>;

/**
 * 课程数据库类，用于管理课程内容集合
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
class LessonDB extends BaseDB<typeof COLLECTION_LESSON, LessonEntry, LessonDoc> {
	protected collectionName = COLLECTION_LESSON;

	protected createDoc(entry: LessonEntry): LessonDoc {
		return new LessonDoc(entry);
	}

	/**
	 * 获取指定语言的所有课程
	 *
	 * @param {string} lang - 语言代码
	 * @returns {Promise<LessonDoc[]>} 返回指定语言的所有课程
	 */
	async allLessons(lang: string): Promise<LessonDoc[]> {
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

	/**
	* 获取指定语言和级别的文档
	* 通过检查文档ID是否以指定语言代码开头来筛选
	*
	* @param lang - 语言代码（如 'zh-cn', 'en'）
	* @param level - 文档级别
	* @returns 返回指定语言和级别的文档数组
	*/
	async allDocsByLangAndLevel(lang: string, level: number = 1, debug: boolean = false): Promise<LessonDoc[]> {
		const collectionName = this.collectionName as string;
		const docs = await this.getDocsByDepth(level);

		if (debug) {
			cosyLogger.array(`[BaseDB] 所有${level}级文档(lang=any,collection=${collectionName})`, docs);
		}

		if (docs.length === 0) {
			cosyLogger.warn(`[BaseDB] 没有找到${level}级文档(lang=any,collection=${collectionName})`);
			return [];
		}

		const filteredDocs = docs.filter((doc) => {
			const id = (doc as any).getId();
			return id && typeof id === 'string' && id.endsWith(lang);
		});

		if (debug) {
			cosyLogger.array(`[BaseDB] 所有${level}级文档(lang=${lang},collection=${collectionName})`, filteredDocs);
		}

		if (filteredDocs.length === 0) {
			cosyLogger.warn(`[BaseDB] 没有找到${level}级文档(lang=${lang},collection=${collectionName})`);
			cosyLogger.array(`[BaseDB] 所有${level}级文档`, docs.map((doc) => doc.getId()));
			return [];
		}

		return filteredDocs;
	}
}

// 创建并导出单例实例
export const lessonDB = new LessonDB();
