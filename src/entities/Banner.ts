import Feature from './Feature';
import type { Component } from 'vue';

class Banner {
    private translations: Map<string, {
        title: string,
        description: string
    }>;
    private features: Feature[];
    private component: Component | null;
    private componentProps: Record<string, unknown>;

    constructor() {
        this.translations = new Map();
        this.features = [];
        this.component = null;
        this.componentProps = {};
        // Initialize empty entries for both languages
        this.translations.set('zh-cn', { title: '', description: '' });
        this.translations.set('en', { title: '', description: '' });
    }

    static create(): Banner {
        return new Banner();
    }

    public setZhTitle(title: string): Banner {
        const current = this.translations.get('zh-cn') || { title: '', description: '' };
        this.translations.set('zh-cn', { ...current, title });
        return this;
    }

    public setEnTitle(title: string): Banner {
        const current = this.translations.get('en') || { title: '', description: '' };
        this.translations.set('en', { ...current, title });
        return this;
    }

    public setZhDescription(description: string): Banner {
        const current = this.translations.get('zh-cn') || { title: '', description: '' };
        this.translations.set('zh-cn', { ...current, description });
        return this;
    }

    public setEnDescription(description: string): Banner {
        const current = this.translations.get('en') || { title: '', description: '' };
        this.translations.set('en', { ...current, description });
        return this;
    }

    public appendFeature(feature: Feature): Banner {
        this.features.push(feature);
        return this;
    }

    public withFeatures(features: Feature[]): Banner {
        this.features.push(...features);
        return this;
    }

    // 获取指定语言的标题
    public getTitle(lang: string): string {
        return this.translations.get(lang)?.title || '';
    }

    // 获取指定语言的描述
    public getDescription(lang: string): string {
        return this.translations.get(lang)?.description || '';
    }

    // 获取指定语言的特性列表
    public getFeatures(): Feature[] {
        return this.features;
    }

    // 检查是否支持某种语言
    public hasLanguage(lang: string): boolean {
        return this.translations.has(lang);
    }

    // 获取所有支持的语言
    public getSupportedLanguages(): string[] {
        return Array.from(this.translations.keys());
    }

    public setComponent(component: Component): Banner {
        this.component = component;
        return this;
    }

    public getComponent(): Component | null {
        return this.component;
    }

    public setComponentProps(props: Record<string, unknown>): Banner {
        this.componentProps = props;
        return this;
    }

    public getComponentProps(): Record<string, unknown> {
        return this.componentProps;
    }
}

export default Banner;