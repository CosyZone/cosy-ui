/**
 * Main 组件属性验证工具
 * 
 * @description
 * 包含 Main 组件各种属性冲突检测和验证逻辑
 */

import type { ErrorInfo } from './MainError.astro';

/**
 * Padding 属性冲突检测结果
 */
export interface PaddingConflictResult {
    /** 是否存在冲突 */
    hasConflict: boolean;
    /** 冲突类型 */
    conflictType?: 'px-with-pl-pr' | 'py-with-pt-pb';
    /** 冲突描述 */
    message?: string;
}

/**
 * 检查 padding 属性冲突
 * 
 * @param px 水平内边距值
 * @param pl 左侧内边距值
 * @param pr 右侧内边距值
 * @param py 垂直内边距值
 * @param pt 顶部内边距值
 * @param pb 底部内边距值
 * @returns 冲突检测结果
 */
export function validatePaddingConflict(
    px?: string,
    pl?: string,
    pr?: string,
    py?: string,
    pt?: string,
    pb?: string
): PaddingConflictResult {
    const hasPaddingX = px && px !== 'none';
    const hasPaddingLeft = pl && pl !== 'none';
    const hasPaddingRight = pr && pr !== 'none';
    const hasPaddingY = py && py !== 'none';
    const hasPaddingTop = pt && pt !== 'none';
    const hasPaddingBottom = pb && pb !== 'none';

    // 检查水平内边距冲突
    if (hasPaddingX && (hasPaddingLeft || hasPaddingRight)) {
        return {
            hasConflict: true,
            conflictType: 'px-with-pl-pr',
            message: '不能同时使用 px 和 pl/pr 属性，因为它们都会设置水平内边距。请只使用其中一种方式。'
        };
    }

    // 检查垂直内边距冲突
    if (hasPaddingY && (hasPaddingTop || hasPaddingBottom)) {
        return {
            hasConflict: true,
            conflictType: 'py-with-pt-pb',
            message: '不能同时使用 py 和 pt/pb 属性，因为它们都会设置垂直内边距。请只使用其中一种方式。'
        };
    }

    return {
        hasConflict: false
    };
}

/**
 * 检查是否有有效的 padding 值
 * 
 * @param value padding 值
 * @returns 是否为有效值
 */
export function isValidPaddingValue(value?: string): boolean {
    return Boolean(value && value !== 'none');
}

/**
 * 获取 padding 冲突的解决方案建议
 * 
 * @param conflictType 冲突类型
 * @returns 解决方案建议
 */
export function getPaddingConflictSolution(conflictType: string): string[] {
    switch (conflictType) {
        case 'px-with-pl-pr':
            return [
                '使用 px 设置左右相同的内边距',
                '或使用 pl 和 pr 分别设置左右内边距'
            ];
        case 'py-with-pt-pb':
            return [
                '使用 py 设置上下相同的内边距',
                '或使用 pt 和 pb 分别设置上下内边距'
            ];
        default:
            return [];
    }
}

/**
 * 创建 padding 冲突错误信息
 * 
 * @param px 水平内边距值
 * @param pl 左侧内边距值
 * @param pr 右侧内边距值
 * @param py 垂直内边距值
 * @param pt 顶部内边距值
 * @param pb 底部内边距值
 * @returns 错误信息对象
 */
export function createPaddingConflictError(
    px?: string,
    pl?: string,
    pr?: string,
    py?: string,
    pt?: string,
    pb?: string
): ErrorInfo | null {
    const conflict = validatePaddingConflict(px, pl, pr, py, pt, pb);

    if (!conflict.hasConflict) {
        return null;
    }

    const solutions = getPaddingConflictSolution(conflict.conflictType || '');

    return {
        title: 'Main 组件属性冲突',
        message: conflict.message || '属性配置存在冲突',
        solutions,
        type: 'conflict'
    };
}

/**
 * 创建通用错误信息
 * 
 * @param title 错误标题
 * @param message 错误描述
 * @param solutions 解决方案列表
 * @param type 错误类型
 * @returns 错误信息对象
 */
export function createErrorInfo(
    title: string,
    message: string,
    solutions: string[] = [],
    type: ErrorInfo['type'] = 'error'
): ErrorInfo {
    return {
        title,
        message,
        solutions,
        type
    };
}
