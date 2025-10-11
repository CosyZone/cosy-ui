/**
 * 校验容器尺寸相关配置
 * @param props - Container 组件属性
 * @returns 校验失败的错误消息数组
 */
export function validateSizing(props: Record<string, unknown>): string[] {
    const messages: string[] = [];

    const hasAspectRatio = Object.prototype.hasOwnProperty.call(props, "aspectRatio");
    const hasHeight = Object.prototype.hasOwnProperty.call(props, "height") &&
        (props.height as string | undefined) !== "none";
    const hasWidth = Object.prototype.hasOwnProperty.call(props, "width") &&
        (props.width as string | undefined) !== "none";

    // 规则1：aspectRatio、width、height 不能同时设置
    if (hasAspectRatio && hasHeight && hasWidth) {
        messages.push(
            "不能同时设置 aspectRatio、width 与 height。可两两组合，但不能同时设置3个。",
        );
    }

    // 规则2：启用 fit 时必须设置 aspectRatio
    const fit = props.fit as string;
    if (fit && fit !== "none" && !hasAspectRatio) {
        messages.push(
            '参数不完整：启用了 fit，但未设置 aspectRatio。',
        );
    }

    // 规则3：警告可能的高度为0情况
    // const padding = props.padding as string;
    // if (padding === "none" && !hasAspectRatio && !hasHeight && (!fit || fit === "none")) {
    //     messages.push(
    //         '可见性风险：未设置 height/fit/aspectRatio 且 padding="none"，可能导致容器高度为 0。',
    //     );
    // }

    return messages;
}