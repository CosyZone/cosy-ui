/**
 * 多语言工具类
 *
 * 这个类提供了一套完整的多语言文本管理工具，用于在组件库中处理国际化需求。
 * 主要特点：
 * - 提供链式API来创建和管理多语言文本
 * - 支持动态添加和获取不同语言的文本
 * - 可以通过属性访问器直接获取特定语言的文本
 * - 支持合并多个语言条目
 *
 * 使用示例：
 * ```typescript
 * // 创建并设置多语言文本
 * const entry = new LangEntry()
 *   .setZh('你好')
 *   .setEn('Hello')
 *   .setJa('こんにちは');
 *
 * // 获取特定语言的文本
 * console.log(entry.get('zh-cn')); // 你好
 *
 * // 使用代理后可以通过属性访问
 * // 需要通过 langEntryHandler 创建代理
 * const proxiedEntry = new Proxy(entry, langEntryHandler);
 * console.log(proxiedEntry.en);      // Hello
 * console.log(proxiedEntry['zh-cn']); // 你好
 * ```
 */
export class LangEntry {
	private translations: Record<string, string> = {};

	/**
	 * 设置中文文本
	 *
	 * @param text 中文文本
	 * @returns 返回当前实例，支持链式调用
	 * @example
	 * const entry = new LangEntry().setZh('你好');
	 */
	setZh(text: string): LangEntry {
		this.translations["zh-cn"] = text;
		return this;
	}

	/**
	 * 设置英文文本
	 *
	 * @param text 英文文本
	 * @returns 返回当前实例，支持链式调用
	 * @example
	 * const entry = new LangEntry().setEn('Hello');
	 */
	setEn(text: string): LangEntry {
		this.translations["en"] = text;
		return this;
	}

	/**
	 * 设置日文文本
	 *
	 * @param text 日文文本
	 * @returns 返回当前实例，支持链式调用
	 * @example
	 * const entry = new LangEntry().setJa('こんにちは');
	 */
	setJa(text: string): LangEntry {
		this.translations["ja"] = text;
		return this;
	}

	/**
	 * 设置任意语言的文本
	 *
	 * @param lang 语言代码，如 'fr' 表示法语，'de' 表示德语等
	 * @param text 文本内容
	 * @returns 返回当前实例，支持链式调用
	 * @example
	 * const entry = new LangEntry().set('fr', 'Bonjour').set('de', 'Hallo');
	 */
	set(lang: string, text: string): LangEntry {
		this.translations[lang] = text;
		return this;
	}

	/**
	 * 设置所有语言为相同的文本值
	 * 适用于不需要翻译的品牌名、专有名词等
	 *
	 * @param text 所有语言共用的文本
	 * @returns 返回当前实例，支持链式调用
	 * @example
	 * const brandName = new LangEntry().setAll('Cosy UI');
	 */
	setAll(text: string): LangEntry {
		// 如果已有语言，则更新它们
		if (Object.keys(this.translations).length > 0) {
			for (const lang of Object.keys(this.translations)) {
				this.translations[lang] = text;
			}
		} else {
			// 默认至少设置中英文
			this.translations["zh-cn"] = text;
			this.translations["en"] = text;
		}
		return this;
	}

	/**
	 * 获取指定语言的文本
	 *
	 * @param lang 语言代码
	 * @param defaultValue 默认值，如果未找到翻译则返回此值
	 * @returns 指定语言的文本，如果不存在则返回默认值或第一个可用的翻译或空字符串
	 * @example
	 * const entry = new LangEntry().setZh('你好').setEn('Hello');
	 * console.log(entry.get('zh-cn'));        // 你好
	 * console.log(entry.get('fr', 'Default')); // Default
	 */
	get(lang: string, defaultValue?: string): string {
		return this.translations[lang] || defaultValue || this.getFirst() || "";
	}

	/**
	 * 获取第一个可用的翻译文本
	 *
	 * @returns 第一个可用的翻译文本，如果没有任何翻译则返回 undefined
	 * @example
	 * const entry = new LangEntry().setEn('Hello').setZh('你好');
	 * console.log(entry.getFirst()); // 取决于对象属性顺序，可能是 'Hello' 或 '你好'
	 */
	getFirst(): string | undefined {
		const keys = Object.keys(this.translations);
		return keys.length > 0 ? this.translations[keys[0]] : undefined;
	}

	/**
	 * 获取所有可用的语言代码
	 *
	 * @returns 所有已设置翻译的语言代码数组
	 * @example
	 * const entry = new LangEntry().setZh('你好').setEn('Hello');
	 * console.log(entry.getLanguages()); // ['zh-cn', 'en']
	 */
	getLanguages(): string[] {
		return Object.keys(this.translations);
	}

	/**
	 * 获取所有翻译
	 *
	 * @returns 包含所有语言翻译的对象副本
	 * @example
	 * const entry = new LangEntry().setZh('你好').setEn('Hello');
	 * console.log(entry.getAll()); // { 'zh-cn': '你好', 'en': 'Hello' }
	 */
	getAll(): Record<string, string> {
		return { ...this.translations };
	}

	/**
	 * 合并另一个语言条目
	 * 如果两个条目有相同的语言，则后者会覆盖前者
	 *
	 * @param other 要合并的语言条目
	 * @returns 返回当前实例，支持链式调用
	 * @example
	 * const entry1 = new LangEntry().setZh('你好').setEn('Hello');
	 * const entry2 = new LangEntry().setJa('こんにちは').setEn('Hi');
	 * entry1.merge(entry2);
	 * console.log(entry1.getAll()); // { 'zh-cn': '你好', 'en': 'Hi', 'ja': 'こんにちは' }
	 */
	merge(other: LangEntry): LangEntry {
		Object.assign(this.translations, other.getAll());
		return this;
	}

	/**
	 * 检查是否包含指定语言
	 *
	 * @param lang 语言代码
	 * @returns 如果包含指定语言则返回 true，否则返回 false
	 * @example
	 * const entry = new LangEntry().setZh('你好').setEn('Hello');
	 * console.log(entry.has('zh-cn')); // true
	 * console.log(entry.has('ja'));    // false
	 */
	has(lang: string): boolean {
		return lang in this.translations;
	}

	/**
	 * 转换为普通对象
	 *
	 * @returns 包含所有语言翻译的对象副本
	 * @example
	 * const entry = new LangEntry().setZh('你好').setEn('Hello');
	 * const obj = entry.toObject();
	 * console.log(obj); // { 'zh-cn': '你好', 'en': 'Hello' }
	 */
	toObject(): Record<string, string> {
		return { ...this.translations };
	}

	/**
	 * 允许以对象属性方式访问翻译
	 * 例如: entry['zh-cn'] 或 entry.en
	 *
	 * 注意：这个索引签名本身不提供功能，实际的属性访问是通过 langEntryHandler 代理实现的
	 */
	[key: string]: any;
}

/**
 * 创建索引访问器的Proxy处理程序
 *
 * 这个处理程序允许通过属性访问方式获取语言翻译，例如：
 * - entry.en 代替 entry.get('en')
 * - entry['zh-cn'] 代替 entry.get('zh-cn')
 *
 * @example
 * const entry = new LangEntry().setZh('你好').setEn('Hello');
 * const proxiedEntry = new Proxy(entry, langEntryHandler);
 * console.log(proxiedEntry.en);      // Hello
 * console.log(proxiedEntry['zh-cn']); // 你好
 */
export const langEntryHandler: ProxyHandler<LangEntry> = {
	get(target: LangEntry, prop: string | symbol): any {
		// 如果是字符串属性并且不是LangEntry的方法，则尝试作为语言代码获取翻译
		if (
			typeof prop === "string" &&
			!(prop in Object.getPrototypeOf(target)) &&
			prop !== "translations"
		) {
			return target.get(prop);
		}

		// 否则返回原始属性
		return (target as any)[prop];
	},
};
