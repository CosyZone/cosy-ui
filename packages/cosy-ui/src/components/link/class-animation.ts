/**
 * 获取 Link 组件的动画类名
 * @param animation 动画效果
 * @returns 动画类名数组
 */
export function getLinkAnimationClasses(
    animation: "none" | "hover-lift" | "hover-glow" | "hover-scale",
): string[] {
    const classes: string[] = [];

    // 动画效果
    if (animation === "hover-lift") {
        classes.push("cosy:hover:-translate-y-0.5 cosy:transition-transform");
    } else if (animation === "hover-glow") {
        classes.push("cosy:hover:brightness-125 cosy:transition-[filter]");
    } else if (animation === "hover-scale") {
        classes.push("cosy:hover:scale-105 cosy:transition-transform");
    }

    return classes;
}
