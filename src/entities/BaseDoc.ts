import { render, type RenderResult, type CollectionEntry, type DataEntryMap } from 'astro:content';
import { SidebarItemEntity, type SidebarProvider } from './SidebarItem';

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
	 * 获取文档的层级深度
	 * 例如：对于 ID 为 "zh-cn/blog/typescript" 的文档，深度为3
	 */
	getLevel(): number {
		return this.entry.id.split('/').length;
	}

	/**
	 * 转换为侧边栏项目
	 * 基本实现，只包含当前文档
	 */
	async toSidebarItem(): Promise<SidebarItemEntity> {
		return new SidebarItemEntity({
			text: this.getTitle(),
			link: this.getLink(),
		});
	}
}
