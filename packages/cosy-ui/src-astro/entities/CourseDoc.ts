import { cosyLogger } from '../cosy';
import { SidebarItemEntity } from './SidebarItem';
import type { CourseEntry } from '../database/CourseDB';
import { courseDB } from '../database/CourseDB';
import { LinkUtil } from '../../src/utils/link';
import { COLLECTION_COURSE } from '../database/CourseDB';
import { BaseDoc } from './BaseDoc';

export default class CourseDoc extends BaseDoc<
    typeof COLLECTION_COURSE,
    CourseEntry
> {
    constructor(entry: CourseEntry) {
        super(entry);
    }

    static fromEntry(entry: CourseEntry) {
        return new CourseDoc(entry);
    }

    getLink(): string {
        return LinkUtil.getCourseLink(this.entry.id);
    }

    getOrder(): number {
        return this.entry.data.order ?? 0;
    }

    isFolder(): boolean {
        return this.entry.data.folder ?? false;
    }

    async getTopDoc(): Promise<CourseDoc | null> {
        const id = this.getTopDocId();
        const doc = await courseDB.find(id);
        return doc;
    }

    async getAncestor(level: number): Promise<CourseDoc | null> {
        const debug = false;
        if (debug) {
            cosyLogger.info(`获取 ${this.entry.id} 的祖先文档，level: ${level}`);
        }

        if (level >= this.getLevel()) {
            if (debug) {
                cosyLogger.info(`祖先文档为自身`);
            }
            return this;
        }

        const id = this.getAncestorId(level);
        const doc = await courseDB.find(id);
        return doc;
    }

    /**
     * 获取子文档
     * @returns 子文档列表
     */
    async getChildren(): Promise<CourseDoc[]> {
        const debug = false;
        const children = (await courseDB.getChildren(this.entry.id)).sort(
            (a, b) => a.getOrder() - b.getOrder()
        );
        if (debug && children.length > 0) {
            cosyLogger.array(
                `${this.entry.id} 的子文档(${children.length})`,
                children.map((child) => `#${child.getOrder()} ${child.entry.id}`)
            );
        }
        return children;
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
            badge: this.entry.data.badge,
        });
    }

    isBook(): boolean {
        return this.entry.id.split('/').length === 2;
    }
}
