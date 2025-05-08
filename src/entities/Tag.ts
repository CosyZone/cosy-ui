import blogDB from '../database/BlogDB';
import { SidebarItem } from './SidebarItem';
import { type TagStaticPath } from '../types/static-path';
import { LinkUtil } from '../utils/link';

export class Tag {
	name: string;
	lang: string;
	count: number;

	constructor(name: string, count: number, lang: string) {
		this.name = name;
		this.count = count;
		this.lang = lang;
	}

	toSidebarItem(lang: string): SidebarItem {
		return new SidebarItem({
			label: this.name,
			link: LinkUtil.getTagLink(lang, this.name),
		});
	}

	toTagPath(): TagStaticPath {
		return {
			params: { slug: this.lang + '/blogs/tag/' + this.name },
			props: { tag: this.name },
		};
	}

	static async makeRootSidebarItem(lang: string): Promise<SidebarItem> {
		const tags = await blogDB.getTagsByLang(lang);

		return new SidebarItem({
			label: 'Tags',
			link: LinkUtil.getTagLink(lang, ''),
			items: tags.map((tag: Tag) => tag.toSidebarItem(lang)),
		});
	}
}

export default Tag;
