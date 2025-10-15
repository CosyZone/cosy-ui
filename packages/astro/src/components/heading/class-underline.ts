/**
 * 计算 Heading 组件的下划线相关类名
 * @param underline 是否显示下划线
 * @returns 下划线相关的类名
 */
export function getHeadingUnderlineClass(underline: boolean = false): string {
	return underline
		? "cosy:border-b cosy:pb-2 cosy:border-gray-200 cosy:dark:border-gray-700"
		: "";
}
