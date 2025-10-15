/**
 * Container 组件的 muted 属性类名计算
 */

export interface IContainerMutedOptions {
	/**
	 * 是否使用柔和色样式（未激活状态）
	 */
	muted?: boolean;
}

/**
 * 获取 Container 的 muted 类名
 * @param options muted 选项
 * @returns 对应的类名
 */
export function getContainerMutedClass(
	options: IContainerMutedOptions,
): string {
	if (options.muted) {
		return "container-muted";
	}
	return "";
}
