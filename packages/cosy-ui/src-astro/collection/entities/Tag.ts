import { blogRepo } from '../BlogRepo';
import { SidebarItemEntity } from './SidebarItem';
import { type ITagStaticPath } from '../../types/static-path';
import { LinkUtil } from '../../../src/utils/link';

export class Tag {
    name: string;
    lang: string;
    count: number;

    constructor(name: string, count: number, lang: string) {
        this.name = name;
        this.count = count;
        this.lang = lang;
    }

    toSidebarItem(lang: string): SidebarItemEntity {
        return new SidebarItemEntity({
            text: this.name,
            link: LinkUtil.getTagLink(lang, this.name),
        });
    }

    toTagPath(): ITagStaticPath {
        return {
            params: { slug: this.lang + '/blogs/tag/' + this.name },
            props: { tag: this.name },
        };
    }

    static async makeRootSidebarItem(lang: string): Promise<SidebarItemEntity> {
        const tags = await blogRepo.getTagsByLang(lang);

        return new SidebarItemEntity({
            text: 'Tags',
            link: LinkUtil.getTagLink(lang, ''),
            items: tags.map((tag: Tag) => tag.toSidebarItem(lang)),
        });
    }
}

export default Tag;
