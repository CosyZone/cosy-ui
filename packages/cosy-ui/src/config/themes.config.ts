/**
 * 主题配置 - 单一数据源
 * 所有主题相关的配置都在这里定义
 * CSS 和 TypeScript 都从这个文件读取配置
 */

/**
 * 可用主题列表（不包括 "default"，因为它是特殊项）
 */
export const THEME_LIST = [
	"corporate",
	"lemonade",
	"nord",
	"luxury",
	"business",
] as const;

/**
 * 默认主题（明亮模式）
 */
export const THEME_DEFAULT = "corporate" as const;

/**
 * 暗黑模式主题
 */
export const THEME_PREFERS_DARK = "business" as const;

/**
 * 生成 DaisyUI themes 配置字符串
 * 用于 @plugin "daisyui" { themes: ... }
 */
export function getDaisyUIThemesConfig(): string {
	const themes = THEME_LIST.map((theme) => {
		if (theme === THEME_DEFAULT) {
			return `${theme} --default`;
		}
		if (theme === THEME_PREFERS_DARK) {
			return `${theme} --prefersdark`;
		}
		return theme;
	});
	return themes.join(", ");
}
