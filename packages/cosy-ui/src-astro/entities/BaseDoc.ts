import {
  render,
  type RenderResult,
  type CollectionEntry,
  type DataEntryMap,
} from 'astro:content';
import { SidebarItemEntity, type SidebarProvider } from './SidebarItem';
import { cosyLogger, ERROR_PREFIX } from '../cosy';

/**
 * 文档基类，提供所有文档类型共享的基本功能
 */
export abstract class BaseDoc<
  Collection extends keyof DataEntryMap,
  T extends CollectionEntry<Collection>,
> implements SidebarProvider
{
  protected entry: T;

  constructor(entry: T) {
    this.entry = entry;
  }

  /**
   * 获取顶级文档
   * 子类应该实现此方法以提供正确的顶级文档
   */
  abstract getTopDoc(): Promise<BaseDoc<Collection, T> | null>;

  /**
   * 获取子文档
   * 子类应该实现此方法以提供正确的子文档列表
   */
  abstract getChildren(): Promise<BaseDoc<Collection, T>[]>;

  /**
   * 获取文档的层级深度
   * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，深度为3
   */
  getLevel(): number {
    return this.entry.id.split('/').length;
  }

  /**
   * 获取所有祖先文档的ID
   * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，祖先ID为 ["zh-cn/blog", "zh-cn"]
   * @returns 祖先文档的ID列表
   */
  getAncestorIds(): string[] {
    const parts = this.entry.id.split('/');
    return parts
      .slice(0, -1)
      .map((_part, index) => parts.slice(0, index + 1).join('/'));
  }

  /**
   * 获取指定层级的祖先文档ID
   * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，level=2 的祖先ID为 "zh-cn/blog"
   * @param level 层级深度，从1开始
   * @returns 祖先文档的ID
   */
  getAncestorId(level: number): string {
    const ancestorIds = this.getAncestorIds();

    if (level < 1) {
      cosyLogger.error('Level must be greater than 0');
      throw new Error(ERROR_PREFIX + 'Level must be greater than 0');
    }

    if (level >= this.getLevel()) {
      cosyLogger.debug('当前文档的ID：' + this.entry.id);
      cosyLogger.debug('当前文档的Level：' + this.getLevel());
      cosyLogger.debug('正在获取祖先ID，level：' + level);

      throw new Error(
        ERROR_PREFIX + 'Level must be less than the document level'
      );
    }

    if (ancestorIds.length < level) {
      cosyLogger.debug('当前文档的ID\n' + this.entry.id);
      cosyLogger.array('当前文档的祖先IDs', ancestorIds);
      cosyLogger.debug('正在获取祖先ID，level:\n' + level);

      throw new Error(ERROR_PREFIX + 'Level must be greater than 0');
    }

    return ancestorIds[level - 1];
  }

  /**
   * 获取顶级侧边栏项目
   * 如果有顶级文档，返回顶级文档的侧边栏项目
   * 否则返回当前文档的侧边栏项目
   */
  async getTopSidebarItem(): Promise<SidebarItemEntity> {
    const topDoc = await this.getTopDoc();
    if (topDoc) {
      return await topDoc.toSidebarItem();
    }

    return new SidebarItemEntity({
      text: this.getTitle(),
      items: [],
      link: this.getLink(),
    });
  }

  /**
   * 获取父文档ID
   * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，父ID为 "zh-cn/blog"
   *
   * @returns 父文档ID，如果没有父文档则返回null
   */
  getParentId(): string | null {
    return this.getAncestorId(this.getLevel() - 1);
  }

  /**
   * 获取顶级文档的ID
   * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，顶级ID为 "zh-cn/blog"
   *
   * 默认实现假设顶级ID是前两部分
   * 子类可以根据需要覆盖此方法
   */
  getTopDocId(): string {
    const level = this.getLevel();

    if (level <= 2) {
      return this.entry.id;
    }

    return this.getAncestorId(2);
  }

  /**
   * 获取文档ID
   */
  getId(): string {
    return this.entry.id;
  }

  /**
   * 获取文档标题
   */
  getTitle(): string {
    return this.entry.data.title as string;
  }

  /**
   * 获取文档语言
   */
  getLang(): string {
    return this.entry.id.split('/')[0];
  }

  /**
   * 获取文档slug
   */
  getSlug(): string {
    return this.getId().split('/').slice(1).join('/');
  }

  /**
   * 获取文档描述
   */
  getDescription(): string {
    return this.entry.data.description as string;
  }

  /**
   * 获取文档链接
   * 每个子类必须实现此方法以提供正确的链接
   */
  abstract getLink(): string;

  /**
   * 渲染文档内容
   */
  async render(): Promise<RenderResult> {
    return await render(this.entry);
  }

  /**
   * 转换为侧边栏项目
   * 如果文档有子文档，会包含子文档的侧边栏项目
   */
  async toSidebarItem(): Promise<SidebarItemEntity> {
    const debug = false;

    const children = await this.getChildren();
    const childItems = await Promise.all(
      children.map((child) => child.toSidebarItem())
    );

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
