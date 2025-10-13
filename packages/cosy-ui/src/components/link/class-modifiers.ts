/**
 * 获取 Link 组件的修饰符类名
 * @param btn 是否为按钮风格
 * @param noUnderline 是否移除下划线
 * @param fullWidth 是否占满宽度
 * @param active 是否为激活状态
 * @param debug 是否显示调试边框
 * @returns 修饰符类名数组
 */
export function getLinkModifierClasses(
    btn: boolean,
    noUnderline: boolean,
    fullWidth: boolean,
    active: boolean,
    debug: boolean,
): string[] {
    const classes: string[] = [];

    // 非按钮风格下的无下划线
    if (!btn && noUnderline) {
        classes.push("cosy:no-underline cosy:hover:no-underline");
    }

    // 宽度100%
    if (fullWidth && !btn) {
        classes.push("cosy:w-full");
    }

    // Active state
    if (active) {
        classes.push("cosy:active");
    }

    // 调试样式
    if (debug) {
        classes.push("cosy:border cosy:border-dashed cosy:border-red-500");
    }

    return classes;
}
