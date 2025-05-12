import type { BlogEntry } from '../database/BlogDB';
import { LinkUtil } from '../utils/link';
import Tag from './Tag';
import { BaseDoc } from './BaseDoc';
import { COLLECTION_BLOG } from '../database/BlogDB';
import { blogDB } from '../database/BlogDB';

export default class BlogDoc extends BaseDoc<typeof COLLECTION_BLOG, BlogEntry> {
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
