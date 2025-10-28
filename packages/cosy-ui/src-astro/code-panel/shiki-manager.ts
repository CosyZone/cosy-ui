/**
 * Shiki 实例管理器
 * 确保全局只有一个 Shiki 实例，避免重复创建
 */

import type { Highlighter } from "shiki";

let globalHighlighter: Highlighter | null = null;
let initPromise: Promise<Highlighter> | null = null;

/**
 * 获取全局 Shiki 实例
 * @param theme 主题名称
 * @param language 语言名称
 * @returns Promise<Highlighter>
 */
export async function getShikiHighlighter(
	theme: string,
	language: string,
): Promise<Highlighter> {
	// 如果已经有实例，直接返回
	if (globalHighlighter) {
		return globalHighlighter;
	}

	// 如果正在初始化，等待完成
	if (initPromise) {
		return initPromise;
	}

	// 开始初始化
	initPromise = (async () => {
		try {
			const { createHighlighter } = await import("shiki");

			globalHighlighter = await createHighlighter({
				themes: [theme],
				langs: [language],
			});

			return globalHighlighter;
		} catch (error) {
			console.error("Failed to initialize Shiki highlighter:", error);
			throw error;
		}
	})();

	return initPromise;
}

/**
 * 释放 Shiki 实例
 */
export function disposeShikiHighlighter(): void {
	if (globalHighlighter) {
		globalHighlighter.dispose?.();
		globalHighlighter = null;
	}
	initPromise = null;
}

/**
 * 检查是否已初始化
 */
export function isShikiInitialized(): boolean {
	return globalHighlighter !== null;
}
