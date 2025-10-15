/**
 * CodePanel 组件的属性接口
 */
export interface CodePanelProps {
	/** 自定义 CSS 类名，用于覆盖默认样式 */
	class?: string;
	/** 要显示的代码字符串 */
	code: string;
	/** 代码语言，用于语法高亮，默认 'typescript' */
	language?: string;
	/** 是否显示行号，默认 false */
	showLineNumbers?: boolean;
	/** 主题名称，默认 'dark-plus' */
	theme?:
		| "dark-plus"
		| "light-plus"
		| "github-dark"
		| "github-light"
		| "nord"
		| "dracula";
	/** 是否显示在面板中（用于切换），默认 true */
	visible?: boolean;
}
