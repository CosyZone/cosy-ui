/**
 * 生成 ProductCard 组件的 muted 状态类名
 */

export interface IProductCardMutedOptions {
	/**
	 * 是否使用柔和色背景
	 */
	muted?: boolean;
}

/**
 * 生成 muted 状态的类名
 * @param options 组件选项
 * @returns 类名字符串
 */
export function generateMutedClass(options: IProductCardMutedOptions): string {
	if (!options.muted) {
		return "";
	}

	return "product-card-muted";
}
