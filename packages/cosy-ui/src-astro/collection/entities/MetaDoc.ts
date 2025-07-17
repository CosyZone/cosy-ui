import { SidebarItemEntity } from './SidebarItem';
import type { MetaEntry } from '../MetaRepo';
import { LinkUtil } from '../../../src/utils/link';
import { metaRepo } from '../MetaRepo';
import type { SidebarProvider } from '../types';
import { cosyLogger } from '../../cosy';
import { BaseDoc } from './BaseDoc';

export default class MetaDoc extends BaseDoc implements SidebarProvider {
    entry: MetaEntry;
    collectionName = 'meta' as const;

    constructor(entry: MetaEntry) {
        super();
        this.entry = entry;
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
        // 从 ID 中获取 slug，即删除以/分割后的第一个元素
        return this.getId().split('/').slice(1).join('/');
    }

    getDescription(): string {
        return this.entry.data.description as string;
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

    async getSiblingDocs(): Promise<MetaDoc[]> {
        return await metaRepo.getSiblings(this.entry.id);
    }

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

    async toSidebarItem(): Promise<SidebarItemEntity> {
        return new SidebarItemEntity({
            text: this.getTitle(),
            link: this.getLink(),
        });
    }

    async getTopSidebarItem(): Promise<SidebarItemEntity> {
        return new SidebarItemEntity({
            text: '了解我们',
            items: await this.getSiblingSidebarItems(),
            link: '',
        });
    }
}
