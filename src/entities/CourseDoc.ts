import { logger } from '../utils/logger';
import { SidebarItemEntity } from './SidebarItem';
import type { CourseEntry } from '../database/CourseDB';
import courseDB from '../database/CourseDB';
import { LinkUtil } from '../utils/link';
import { HierarchicalDoc } from './BaseDoc';
import { COLLECTION_COURSE } from '../database/CourseDB';

export default class CourseDoc extends HierarchicalDoc<typeof COLLECTION_COURSE, CourseEntry> {
	constructor(entry: CourseEntry) {
		super(entry);
	}

	static fromEntry(entry: CourseEntry) {
		return new CourseDoc(entry);
	}

	getLink(): string {
		return LinkUtil.getCourseLink(this.entry.id);
	}

	async getTopDoc(): Promise<CourseDoc | null> {
		const id = await this.getTopDocId();
		const doc = await courseDB.find(id);
		return doc;
	}

	async getChildren(): Promise<CourseDoc[]> {
		return await courseDB.getChildren(this.entry.id);
	}

	override async toSidebarItem(): Promise<SidebarItemEntity> {
		const debug = false;
		const children = await this.getChildren();
		let childItems = await Promise.all(children.map((child) => child.toSidebarItem()));

		if (this.isBook()) {
			childItems = [...childItems];
		}

		if (debug) {
			logger.info(`${this.entry.id} 的侧边栏项目`);
			console.log(childItems);
		}

		return new SidebarItemEntity({
			text: this.getTitle(),
			items: childItems,
			link: this.getLink(),
		});
	}

	isBook(): boolean {
		return this.entry.id.split('/').length === 2;
	}
}
