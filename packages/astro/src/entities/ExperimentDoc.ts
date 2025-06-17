import type { ExperimentEntry } from '../database/ExperimentDB';
import { experimentDB } from '../database/ExperimentDB';
import { cosyLogger } from '../cosy';
import { SidebarItemEntity } from './SidebarItem';
import { LinkUtil } from '../utils/link';
import { COLLECTION_EXPERIMENT } from '../database/ExperimentDB';
import { BaseDoc } from './BaseDoc';
import type { IHeadingType } from '../types/heading';

export default class ExperimentDoc extends BaseDoc<typeof COLLECTION_EXPERIMENT, ExperimentEntry> {
	constructor(entry: ExperimentEntry) {
		super(entry);
	}

	isBook(): boolean {
		return this.entry.id.split('/').length === 2;
	}

	async getBookId(): Promise<string> {
		return this.getTopDocId();
	}

	async getBook(): Promise<ExperimentDoc | null> {
		const bookId = await this.getBookId();
		return await experimentDB.find(bookId);
	}

	getLink(): string {
		const debug = false;
		const lang = this.getLang();
		const link = LinkUtil.getExperimentLink(lang, this.getId());

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

	async getTopDoc(): Promise<ExperimentDoc | null> {
		const bookId = await this.getBookId();
		return await experimentDB.find(bookId);
	}

	async getChildren(): Promise<ExperimentDoc[]> {
		return await experimentDB.getChildren(this.entry.id);
	}

	async getDescendants(): Promise<ExperimentDoc[]> {
		return await experimentDB.getDescendantDocs(this.entry.id);
	}

	override async toSidebarItem(): Promise<SidebarItemEntity> {
		const debug = false;

		const children = await this.getChildren();
		let childItems = await Promise.all(children.map((child) => child.toSidebarItem()));

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
