/**
 * 多语言工具类
 * 提供链式API来创建和管理多语言文本
 */
export class LangEntry {
	private translations: Record<string, string> = {};

	/**
	 * 设置中文文本
	 * @param text 中文文本
	 */
	setZh(text: string): LangEntry {
		this.translations['zh-cn'] = text;
		return this;
	}

	/**
	 * 设置英文文本
	 * @param text 英文文本
	 */
	setEn(text: string): LangEntry {
		this.translations['en'] = text;
		return this;
	}

	/**
	 * 设置日文文本
	 * @param text 日文文本
	 */
	setJa(text: string): LangEntry {
		this.translations['ja'] = text;
		return this;
	}

	/**
	 * 设置任意语言的文本
	 * @param lang 语言代码
	 * @param text 文本内容
	 */
	set(lang: string, text: string): LangEntry {
		this.translations[lang] = text;
		return this;
	}

	/**
	 * 设置所有语言为相同的文本值
	 * 适用于不需要翻译的品牌名、专有名词等
	 * @param text 所有语言共用的文本
	 */
	setAll(text: string): LangEntry {
		// 如果已有语言，则更新它们
		if (Object.keys(this.translations).length > 0) {
			for (const lang of Object.keys(this.translations)) {
				this.translations[lang] = text;
			}
		} else {
			// 默认至少设置中英文
			this.translations['zh-cn'] = text;
			this.translations['en'] = text;
		}
		return this;
	}

	/**
	 * 获取指定语言的文本
	 * @param lang 语言代码
	 * @param defaultValue 默认值，如果未找到翻译则返回此值
	 */
	get(lang: string, defaultValue?: string): string {
		return this.translations[lang] || defaultValue || this.getFirst() || '';
	}

	/**
	 * 获取第一个可用的翻译文本
	 */
	getFirst(): string | undefined {
		const keys = Object.keys(this.translations);
		return keys.length > 0 ? this.translations[keys[0]] : undefined;
	}

	/**
	 * 获取所有可用的语言代码
	 */
	getLanguages(): string[] {
		return Object.keys(this.translations);
	}

	/**
	 * 获取所有翻译
	 */
	getAll(): Record<string, string> {
		return { ...this.translations };
	}

	/**
	 * 合并另一个语言条目
	 * @param other 要合并的语言条目
	 */
	merge(other: LangEntry): LangEntry {
		Object.assign(this.translations, other.getAll());
		return this;
	}

	/**
	 * 检查是否包含指定语言
	 * @param lang 语言代码
	 */
	has(lang: string): boolean {
		return lang in this.translations;
	}

	/**
	 * 转换为普通对象
	 */
	toObject(): Record<string, string> {
		return { ...this.translations };
	}

	/**
	 * 允许以对象属性方式访问翻译
	 * 例如: entry['zh-cn'] 或 entry.en
	 */
	[key: string]: any;
}

// 创建索引访问器的Proxy处理程序
const langEntryHandler: ProxyHandler<LangEntry> = {
	get(target: LangEntry, prop: string | symbol): any {
		// 如果是字符串属性并且不是LangEntry的方法，则尝试作为语言代码获取翻译
		if (
			typeof prop === 'string' &&
			!(prop in Object.getPrototypeOf(target)) &&
			prop !== 'translations'
		) {
			return target.get(prop);
		}

		// 否则返回原始属性
		return (target as any)[prop];
	},
};

/**
 * 提供快捷访问的LangPackage
 * 可以直接通过静态方法创建和配置语言条目
 */
export class LangPackage {
	/**
	 * 创建一个新的语言条目
	 */
	static make(): LangEntry {
		return new Proxy(new LangEntry(), langEntryHandler);
	}

	/**
	 * 从对象创建语言条目
	 * @param obj 包含语言翻译的对象
	 */
	static from(obj: Record<string, string>): LangEntry {
		const entry = new LangEntry();
		Object.entries(obj).forEach(([lang, text]) => {
			entry.set(lang, text);
		});
		return new Proxy(entry, langEntryHandler);
	}

	/**
	 * 创建只包含中文和英文的语言条目
	 * @param zh 中文文本
	 * @param en 英文文本
	 */
	static zhEn(zh: string, en: string): LangEntry {
		return new Proxy(new LangEntry().setZh(zh).setEn(en), langEntryHandler);
	}

	/**
	 * 创建所有语言都使用相同文本的语言条目
	 * 适用于品牌名、产品名等不需要翻译的文本
	 * @param text 所有语言共用的文本
	 */
	static common(text: string): LangEntry {
		return new Proxy(new LangEntry().setAll(text), langEntryHandler);
	}

	/**
	 * 设置中文文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 * @param text 中文文本
	 */
	static setZh(text: string): LangEntry {
		return new Proxy(new LangEntry().setZh(text), langEntryHandler);
	}

	/**
	 * 设置英文文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 * @param text 英文文本
	 */
	static setEn(text: string): LangEntry {
		return new Proxy(new LangEntry().setEn(text), langEntryHandler);
	}

	/**
	 * 设置日文文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 * @param text 日文文本
	 */
	static setJa(text: string): LangEntry {
		return new Proxy(new LangEntry().setJa(text), langEntryHandler);
	}

	/**
	 * 设置任意语言的文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 * @param lang 语言代码
	 * @param text 文本内容
	 */
	static set(lang: string, text: string): LangEntry {
		return new Proxy(new LangEntry().set(lang, text), langEntryHandler);
	}
}
