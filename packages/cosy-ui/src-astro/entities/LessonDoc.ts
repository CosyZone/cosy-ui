import type { LessonEntry } from '../database/LessonDB';
import { lessonDB } from '../database/LessonDB';
import { cosyLogger } from '../cosy';
import { SidebarItemEntity } from './SidebarItem';
import { LinkUtil } from '../../src/utils/link';
import { COLLECTION_LESSON } from '../database/LessonDB';
import { BaseDoc } from './BaseDoc';
import type { IHeadingType } from '../types/heading';

/**
 * 课程文档类，配合 LessonDB 使用
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
export default class LessonDoc extends BaseDoc<
  typeof COLLECTION_LESSON,
  LessonEntry
> {
  constructor(entry: LessonEntry) {
    super(entry);
  }

  isBook(): boolean {
    return this.entry.id.split('/').length === 2;
  }

  async getBookId(): Promise<string> {
    return this.getTopDocId();
  }

  async getBook(): Promise<LessonDoc | null> {
    const bookId = await this.getBookId();
    return await lessonDB.find(bookId);
  }

  getLink(): string {
    const debug = false;
    const lang = this.getLang();
    const link = LinkUtil.getLessonLink(lang, this.getId());

    if (debug) {
      cosyLogger.info(`获取 ${this.entry.id} 的链接: ${link}`);
    }

    return link;
  }

  /**
   * 获取文档的语言
   *
   * 文档的 id 格式为 `book-id/zh-cn/chapter-id/lesson-id`
   *
   * @returns 语言
   */
  override getLang(): string {
    const debug = false;

    const parts = this.entry.id.split('/');
    const lang = parts[1];

    if (debug) {
      cosyLogger.info(`获取 ${this.entry.id} 的语言: ${lang}`);
    }

    return lang;
  }

  getHTML(): string {
    const debug = false;

    if (debug) {
      cosyLogger.info(`获取 ${this.entry.id} 的 HTML`);
    }

    return this.entry.rendered?.html || '';
  }

  getHeadings(): IHeadingType[] {
    const debug = false;

    if (debug) {
      cosyLogger.info(`获取 ${this.entry.id} 的 headings`);
    }

    return (this.entry.rendered?.metadata?.headings as IHeadingType[]) || [];
  }

  async getTopDoc(): Promise<LessonDoc | null> {
    const bookId = await this.getBookId();
    return await lessonDB.find(bookId);
  }

  async getChildren(): Promise<LessonDoc[]> {
    return await lessonDB.getChildren(this.entry.id);
  }

  async getDescendants(): Promise<LessonDoc[]> {
    return await lessonDB.getDescendantDocs(this.entry.id);
  }

  override async toSidebarItem(): Promise<SidebarItemEntity> {
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
    });
  }
}
