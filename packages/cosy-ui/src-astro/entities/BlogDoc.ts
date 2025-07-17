import type { BlogEntry } from '../collection/BlogDB';
import { LinkUtil } from '../../src/utils/link';
import Tag from './Tag';
import { BaseDoc } from './BaseDoc';
import { COLLECTION_BLOG } from '../collection/BlogDB';
import { blogDB } from '../collection/BlogDB';

/**
 * 博客文档类，配合 BlogDB 使用
 *
 * 目录结构：
 * ```
 * blogs/
 * ├── zh-cn/                        # 中文博客目录
 * │   ├── typescript-intro.md      # 文章内容
 * │   ├── images/                  # 文章相关图片
 * │   └── web-performance.md
 * └── en/                          # 英文博客目录
 *     ├── typescript-intro.md
 *     ├── images/
 *     └── web-performance.md
 * ```
 *
 * 说明：
 * - 每个语言（如 zh-cn, en）是一个独立的目录，存放该语言下的所有博客文章
 * - 每篇博客为一个 markdown 文件，文件名即为 slug
 * - 每个语言目录下可包含 images 文件夹，存放该语言博客相关图片
 * - 支持多语言博客内容，便于国际化
 * - 博客目录可作为 git 子模块独立管理
 *
 * 相关：
 * - BlogDB：博客数据库管理类，负责博客文档的增删查改
 * - BlogDoc：博客文档实体类，封装单篇博客的相关操作
 *
 * 用法示例：
 * ```typescript
 * import BlogDoc from '../entities/BlogDoc';
 * import { blogDB } from '../database/BlogDB';
 *
 * // 获取所有中文博客
 * const blogs = await blogDB.allBlogsByLang('zh-cn');
 *
 * // 获取博客链接
 * const link = blogs[0].getLink();
 * ```
 */

export default class BlogDoc extends BaseDoc<
  typeof COLLECTION_BLOG,
  BlogEntry
> {
  private constructor(entry: BlogEntry) {
    super(entry);
  }

  static fromEntry(entry: BlogEntry) {
    return new BlogDoc(entry);
  }

  async getTopDoc(): Promise<BlogDoc | null> {
    const id = this.getTopDocId();
    const doc = await blogDB.find(id);
    return doc;
  }

  async getChildren(): Promise<BlogDoc[]> {
    return await blogDB.getChildren(this.entry.id);
  }

  getLink(): string {
    return LinkUtil.getBlogLink(this.entry.id, this.getLang());
  }

  getTags(): Tag[] {
    const tags = this.entry.data.tags as string[];

    if (!tags || tags.length === 0) {
      return [];
    }

    return tags.map((tag) => new Tag(tag, 0, this.getLang()));
  }

  getDate(): Date {
    return new Date(this.entry.data.date as Date);
  }

  getDateForDisplay() {
    try {
      const dateObj = new Date(this.entry.data.date as Date);

      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        console.warn(`Invalid date format: ${this.entry.data.date}`);
        return 'Date unavailable: ' + this.getTitle() + ' ' + this.getLink();
      }
      return dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error(`Error formatting date: ${this.entry.data.date}`, error);
      return 'Date unavailable';
    }
  }
}
