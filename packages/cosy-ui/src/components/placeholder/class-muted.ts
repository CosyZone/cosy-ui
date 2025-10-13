/**
 * Placeholder 组件的 muted 属性类名计算
 */

/**
 * 获取 Placeholder 的 muted 类名
 * @param muted 是否使用柔和色背景
 * @returns 对应的类名
 */
export function getPlaceholderMutedClass(muted?: boolean): string {
    if (muted) {
        return "cosy:bg-gray-100 cosy:dark:bg-gray-800";
    }
    return "";
}
