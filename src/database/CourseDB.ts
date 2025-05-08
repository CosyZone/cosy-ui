import CourseDoc from '../entities/CourseDoc';
import { getCollection, type CollectionEntry } from 'astro:content';
import { BaseDB } from './BaseDB';

export const COLLECTION_NAME = 'courses' as const;
export type CourseEntry = CollectionEntry<typeof COLLECTION_NAME>;

/**
 * 课程数据库类，用于管理课程内容集合。
 *
 * 目录结构：
 * ```
 * courses/
 * ├── zh-cn/
 * │   ├── web-development/
 * │   │   ├── index.md
 * │   │   ├── chapter1
 * │   │   │   ├── index.md
 * │   │   │   ├── content.md
 * │   │   │   └── ...
 * │   │   └── chapter2
 * │   │       ├── index.md
 * │   │       ├── content.md
 * │   │       └── ...
 * │   └── mobile-dev/
 * │       ├── index.md
 * │       └── ...
 * └── en/
 *     └── ...
 * ```
 */
class CourseDB extends BaseDB<typeof COLLECTION_NAME, CourseEntry, CourseDoc> {
	protected collectionName = COLLECTION_NAME;

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
		const entries = await getCollection(COLLECTION_NAME, ({ id }) => {
			return id.startsWith(lang) && id.split('/').length === 2;
		});
		return entries.map((entry) => new CourseDoc(entry));
	}

	/**
	 * 获取用于 Astro 静态路由生成的路径参数，专门配合 [lang]/courses/[...slug].astro 使用
	 *
	 * @returns 返回路径参数数组
	 */
	async getStaticPaths(): Promise<{ params: { lang: string; slug: string } }[]> {
		const entries = await getCollection(COLLECTION_NAME);
		return entries.map((entry) => {
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

// 创建并导出单例实例
const courseDB = new CourseDB();
export default courseDB;
