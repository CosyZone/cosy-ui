import { LangEntry, langEntryHandler } from "./lang_entry";

/**
 * 提供快捷访问的LangPackage
 *
 * 这个类提供了一系列静态方法，用于快速创建和配置多语言文本条目。
 * 它是对 LangEntry 类的便捷封装，简化了多语言文本的创建和管理过程。
 *
 * 使用示例：
 * ```typescript
 * // 创建一个空的语言条目并逐步添加翻译
 * const emptyEntry = LangPackage.make();
 * emptyEntry.setZh('你好').setEn('Hello');
 *
 * // 从对象创建语言条目
 * const fromObj = LangPackage.from({
 *   'zh-cn': '你好',
 *   'en': 'Hello',
 *   'ja': 'こんにちは'
 * });
 *
 * // 创建只包含中英文的语言条目
 * const zhEnEntry = LangPackage.zhEn('你好', 'Hello');
 *
 * // 创建所有语言都使用相同文本的条目（适用于品牌名等）
 * const brandName = LangPackage.common('Cosy UI');
 *
 * // 访问翻译的方式
 * console.log(zhEnEntry.get('zh-cn')); // 你好
 * console.log(zhEnEntry['zh-cn']);     // 你好 (通过代理实现的属性访问)
 * console.log(zhEnEntry.en);           // Hello (简写形式)
 * ```
 */
export class LangPackage {
	/**
	 * 创建一个新的空语言条目
	 *
	 * @returns 返回一个代理包装的 LangEntry 实例，可以通过属性方式访问翻译
	 * @example
	 * const entry = LangPackage.make();
	 * entry.setZh('你好').setEn('Hello');
	 */
	static make(): LangEntry {
		return new Proxy(new LangEntry(), langEntryHandler);
	}

	/**
	 * 从对象创建语言条目
	 *
	 * @param obj 包含语言翻译的对象，键为语言代码，值为对应的翻译文本
	 * @returns 返回一个代理包装的 LangEntry 实例
	 * @example
	 * const entry = LangPackage.from({
	 *   'zh-cn': '你好',
	 *   'en': 'Hello',
	 *   'ja': 'こんにちは'
	 * });
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
	 *
	 * @param zh 中文文本
	 * @param en 英文文本
	 * @returns 返回一个代理包装的 LangEntry 实例
	 * @example
	 * const entry = LangPackage.zhEn('你好', 'Hello');
	 * console.log(entry.zh-cn); // 你好
	 * console.log(entry.en);    // Hello
	 */
	static zhEn(zh: string, en: string): LangEntry {
		return new Proxy(new LangEntry().setZh(zh).setEn(en), langEntryHandler);
	}

	/**
	 * 创建所有语言都使用相同文本的语言条目
	 * 适用于品牌名、产品名等不需要翻译的文本
	 *
	 * @param text 所有语言共用的文本
	 * @returns 返回一个代理包装的 LangEntry 实例
	 * @example
	 * const brandName = LangPackage.common('Cosy UI');
	 * // 所有语言都会返回相同的值
	 * console.log(brandName.zh-cn); // Cosy UI
	 * console.log(brandName.en);    // Cosy UI
	 */
	static common(text: string): LangEntry {
		return new Proxy(new LangEntry().setAll(text), langEntryHandler);
	}

	/**
	 * 设置中文文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 *
	 * @param text 中文文本
	 * @returns 返回一个代理包装的 LangEntry 实例，只包含中文翻译
	 * @example
	 * const entry = LangPackage.setZh('你好');
	 */
	static setZh(text: string): LangEntry {
		return new Proxy(new LangEntry().setZh(text), langEntryHandler);
	}

	/**
	 * 设置英文文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 *
	 * @param text 英文文本
	 * @returns 返回一个代理包装的 LangEntry 实例，只包含英文翻译
	 * @example
	 * const entry = LangPackage.setEn('Hello');
	 */
	static setEn(text: string): LangEntry {
		return new Proxy(new LangEntry().setEn(text), langEntryHandler);
	}

	/**
	 * 设置日文文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 *
	 * @param text 日文文本
	 * @returns 返回一个代理包装的 LangEntry 实例，只包含日文翻译
	 * @example
	 * const entry = LangPackage.setJa('こんにちは');
	 */
	static setJa(text: string): LangEntry {
		return new Proxy(new LangEntry().setJa(text), langEntryHandler);
	}

	/**
	 * 设置任意语言的文本
	 * 快捷方法，直接返回一个新的LangEntry实例
	 *
	 * @param lang 语言代码
	 * @param text 文本内容
	 * @returns 返回一个代理包装的 LangEntry 实例，包含指定语言的翻译
	 * @example
	 * const entry = LangPackage.set('fr', 'Bonjour');
	 */
	static set(lang: string, text: string): LangEntry {
		return new Proxy(new LangEntry().set(lang, text), langEntryHandler);
	}
}
