import type { CollectionEntry } from 'astro:content';

/**
 * 文档基类，提供所有文档类型共享的基本功能
 */
export abstract class BaseDoc {
    /**
    * 集合名称，必须在子类中指定
    * 
    * 例如：
    * ```typescript
    * protected collectionName = 'blogs' as const;
    * ```
    */
    protected abstract collectionName: string;

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


}
