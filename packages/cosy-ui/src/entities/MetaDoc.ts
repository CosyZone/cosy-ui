import { SidebarItemEntity } from './SidebarItem';
import type { MetaEntry } from '../database/MetaDB';
import { LinkUtil } from '../utils/link';
import { BaseDoc } from './BaseDoc';
import { metaDB } from '../database/MetaDB';
import { COLLECTION_META } from '../database/MetaDB';

export default class MetaDoc extends BaseDoc<typeof COLLECTION_META, MetaEntry> {
	constructor(entry: MetaEntry) {
		super(entry);
	}

	static fromEntry(entry: MetaEntry) {
		return new MetaDoc(entry);
	}

	getTopDoc(): Promise<MetaDoc | null> {
		return Promise.resolve(null);
	}

	getChildren(): Promise<MetaDoc[]> {
		return Promise.resolve([]);
	}

	getLink(): string {
		return LinkUtil.getMetaLink(this.getLang(), this.getSlug());
	}

	getLang(): string {
		return this.entry.id.split('/')[0];
	}

	/**
	 * 获取元数据页面的 slug
	 * 例如：
	 *  ID: zh-cn/about 的 slug 为 about
	 *  ID: en/privacy 的 slug 为 privacy
	 */
	override getSlug(): string {
		// 从 ID 中获取 slug，即删除以/分割后的第一个元素
		return this.getId().split('/').slice(1).join('/');
	}

	/**
	 * 获取兄弟文档
	 * 例如：对于 'zh-cn/about'，会返回 'zh-cn' 下的其他文档
	 */
	async getSiblingDocs(): Promise<MetaDoc[]> {
		return await metaDB.getSiblings(this.entry.id);
	}

	/**
	 * 获取兄弟文档的侧边栏项目
	 */
	async getSiblingSidebarItems(): Promise<SidebarItemEntity[]> {
		const siblings = await this.getSiblingDocs();
		const siblingItems = await Promise.all(
			siblings.map((sibling) => {
				return new SidebarItemEntity({
					text: sibling.getTitle(),
					link: sibling.getLink(),
				});
			})
		);
		return siblingItems;
	}

	/**
	 * 重写侧边栏项目方法
	 * 对于元数据页面，我们不显示子项目
	 */
	override async toSidebarItem(): Promise<SidebarItemEntity> {
		return new SidebarItemEntity({
			text: this.getTitle(),
			link: this.getLink(),
		});
	}

	/**
	 * 重写顶级侧边栏项目方法
	 * 对于元数据页面，我们显示所有兄弟页面作为侧边栏项目
	 */
	async getTopSidebarItem(): Promise<SidebarItemEntity> {
		return new SidebarItemEntity({
			text: '了解我们',
			items: await this.getSiblingSidebarItems(),
			link: '',
		});
	}
}
