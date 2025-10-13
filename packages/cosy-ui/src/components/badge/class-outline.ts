/**
 * 获取 Badge 组件的描边类名
 * @param outline 是否为描边样式
 * @returns 描边类名
 */
export function getBadgeOutlineClass(outline?: boolean): string {
    return outline ? "cosy:badge-outline" : "";
}
