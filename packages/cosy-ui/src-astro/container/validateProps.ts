export interface IContainerValidationResult {
    hasConflict: boolean;
    messages: string[];
    resolvedFit: 'none' | 'contain' | 'cover';
    suggestFallbackMinHeight: boolean;
}

/**
 * 校验 Container 配置是否存在冲突
 * - 当同时显式设置 aspectRatio、width、height（且 width/height ≠ 'none'）时，判定为冲突
 */
export function validateContainerProps(rawProps: Record<string, unknown>): IContainerValidationResult {
    const userSetAspect = Object.prototype.hasOwnProperty.call(rawProps, 'aspectRatio');
    const userSetHeight =
        Object.prototype.hasOwnProperty.call(rawProps, 'height') && (rawProps.height as string | undefined) !== 'none';
    const userSetWidth =
        Object.prototype.hasOwnProperty.call(rawProps, 'width') && (rawProps.width as string | undefined) !== 'none';

    const messages: string[] = [];
    let hasConflict = false;

    // 规则1：aspectRatio 与 width、height 同时显式设置 → 冲突
    if (userSetAspect && userSetHeight && userSetWidth) {
        hasConflict = true;
        messages.push('配置冲突：已同时设置 aspectRatio、width 与 height。请移除 width 或 height，使组件基于 aspectRatio 正确计算尺寸。');
    }

    // 规则2：fit 依赖 aspectRatio
    const incomingFit = (rawProps.fit as 'none' | 'contain' | 'cover' | undefined) ?? 'none';
    let resolvedFit: 'none' | 'contain' | 'cover' = incomingFit;
    if (incomingFit !== 'none' && !userSetAspect) {
        resolvedFit = 'none';
        messages.push('参数不完整：启用了 fit，但未设置 aspectRatio，已回退为 fit="none"。');
    }

    // 规则3：潜在不可见（无 height、无 fit、无 aspectRatio 且显式 padding="none"）→ 提示并建议最小高度
    const userSetPadding = Object.prototype.hasOwnProperty.call(rawProps, 'padding');
    const paddingValue = (rawProps.padding as string | undefined) ?? 'md';
    const paddingNone = userSetPadding && paddingValue === 'none';
    const hasAspect = userSetAspect;
    const hasExplicitHeight = userSetHeight;
    const hasFitEnabled = resolvedFit !== 'none' && hasAspect;
    let suggestFallbackMinHeight = false;
    if (!hasFitEnabled && !hasAspect && !hasExplicitHeight && paddingNone) {
        suggestFallbackMinHeight = true;
        messages.push('可见性风险：未设置 height/fit/aspectRatio 且 padding="none"，可能导致容器高度为 0。已建议应用最小高度。');
    }

    return {
        hasConflict,
        messages,
        resolvedFit,
        suggestFallbackMinHeight,
    };
}


