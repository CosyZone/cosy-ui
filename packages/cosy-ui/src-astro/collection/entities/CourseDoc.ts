import { cosyLogger } from '../../cosy';
import { SidebarItemEntity } from './SidebarItem';
import type { CourseEntry } from '../CourseRepo';
import { courseRepo } from '../CourseRepo';
import { LinkUtil } from '../../../src/utils/link';
import type { SidebarProvider } from '../types';
import { render } from 'astro:content';
import { BaseDoc } from './BaseDoc';

export default class CourseDoc extends BaseDoc implements SidebarProvider {
    entry: CourseEntry;

    constructor(entry: CourseEntry) {
        super();
        this.entry = entry;
    }

    static fromEntry(entry: CourseEntry) {
        return new CourseDoc(entry);
    }

    getAncestorIds(): string[] {
        const parts = this.entry.id.split('/');
        return parts
            .slice(0, -1)
            .map((_part: string, index: number) => parts.slice(0, index + 1).join('/'));
    }

    getAncestorId(level: number): string {
        const ancestorIds = this.getAncestorIds();

        if (level < 1) {
            cosyLogger.error('Level must be greater than 0');
            throw new Error('Level must be greater than 0');
        }

        if (level >= this.getLevel()) {
            cosyLogger.debug('当前文档的ID：' + this.entry.id);
            cosyLogger.debug('当前文档的Level：' + this.getLevel());
            cosyLogger.debug('正在获取祖先ID，level：' + level);

            throw new Error('Level must be less than the document level');
        }

        if (ancestorIds.length < level) {
            cosyLogger.debug('当前文档的ID\n' + this.entry.id);
            cosyLogger.array('当前文档的祖先IDs', ancestorIds);
            cosyLogger.debug('正在获取祖先ID，level:\n' + level);

            throw new Error('Level must be greater than 0');
        }

        return ancestorIds[level - 1];
    }

    getParentId(): string | null {
        return this.getAncestorId(this.getLevel() - 1);
    }

    getTopDocId(): string {
        const level = this.getLevel();
        if (level <= 2) {
            return this.entry.id;
        }
        return this.getAncestorId(2);
    }

    getSlug(): string {
        return this.getId().split('/').slice(1).join('/');
    }

    getDescription(): string {
        return this.entry.data.description as string;
    }

    getOrder(): number {
        return this.entry.data.order ?? 0;
    }

    isFolder(): boolean {
        return this.entry.data.folder ?? false;
    }

    async getTopDoc(): Promise<CourseDoc | null> {
        const id = this.getTopDocId();
        const doc = await courseRepo.find(id);
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
        const doc = await courseRepo.find(id);
        return doc;
    }

    async getChildren(): Promise<CourseDoc[]> {
        const debug = false;
        const children = (await courseRepo.getChildren(this.entry.id)).sort(
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

    async toSidebarItem(): Promise<SidebarItemEntity> {
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

    getLink(): string {
        return LinkUtil.getCourseLink(this.entry.id);
    }

    async render(): Promise<any> {
        return await render(this.entry);
    }

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
}
