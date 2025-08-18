export interface ContainerValidationResult {
    hasConflict: boolean;
    message: string | null;
}

/**
 * 校验 Container 配置是否存在冲突
 * - 当同时显式设置 aspectRatio、width、height（且 width/height ≠ 'none'）时，判定为冲突
 */
export function validateContainerProps(rawProps: Record<string, unknown>): ContainerValidationResult {
    const userSetAspect = Object.prototype.hasOwnProperty.call(rawProps, 'aspectRatio');
    const userSetHeight =
        Object.prototype.hasOwnProperty.call(rawProps, 'height') && (rawProps.height as string | undefined) !== 'none';
    const userSetWidth =
        Object.prototype.hasOwnProperty.call(rawProps, 'width') && (rawProps.width as string | undefined) !== 'none';

    const hasConflict = Boolean(userSetAspect && userSetHeight && userSetWidth);

    return {
        hasConflict,
        message: hasConflict
            ? '配置冲突：请移除 width 或 height，使组件基于 aspectRatio + (width/height) 正确计算尺寸。'
            : null,
    };
}


