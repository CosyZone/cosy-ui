export interface IArticleProps {
	/**
	 * 文章的类名
	 */
	class?: string;

	/**
	 * 类名列表
	 */
	'class:list'?: any;

	/**
	 * 内联样式
	 */
	style?: string;

	/**
	 * 文章宽度
	 * @default "medium"
	 */
	width?: 'narrow' | 'medium' | 'wide' | 'full';
}
