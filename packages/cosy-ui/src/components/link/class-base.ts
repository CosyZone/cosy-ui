/**
 * 获取 Link 组件的基础类名
 * @param block 是否为块级显示
 * @param icon 是否有图标
 * @param hoverImage 是否有悬停图片
 * @returns 基础类名数组
 */
export function getLinkBaseClasses(
    block: boolean,
    icon: string | undefined,
    hoverImage: any,
): string[] {
    return [
        // 基础链接样式
        "cosy:items-center cosy:cursor-pointer cosy:transition-all cosy:duration-200",

        // 显示方式
        block ? "cosy:flex cosy:w-full" : "cosy:inline-flex",

        // 悬停图片功能需要相对定位和 group 类
        hoverImage && "cosy:relative cosy:group",

        // 图标和文字间距（当有图标时添加间距）
        icon && "cosy:gap-2",
    ];
}
