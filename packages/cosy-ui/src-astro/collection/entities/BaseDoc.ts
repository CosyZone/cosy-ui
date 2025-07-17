import { render, type CollectionEntry } from 'astro:content';

/**
 * 文档基类，提供所有文档类型共享的基本功能
 */
export abstract class BaseDoc {
    abstract entry: CollectionEntry<string>;

    getId(): string {
        return this.entry.id as string;
    }

    getLevel(): number {
        return this.getId().split('/').length;
    }

    getLang(): string {
        return this.entry.id.split('/')[0];
    }

    getTitle(): string {
        return this.entry.data.title as string;
    }

    getDescription(): string {
        return this.entry.data.description as string;
    }

    async render(): Promise<any> {
        return await render(this.entry);
    }
}
