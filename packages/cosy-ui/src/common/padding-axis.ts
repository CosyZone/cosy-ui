/**
 * 轴向内边距类名映射（水平 px 与 垂直 py）
 */

import type { PaddingSize } from './padding';

export const paddingXClasses: Record<PaddingSize, string> = {
    none: 'cosy:px-0',
    sm: 'cosy:px-2',
    md: 'cosy:px-4',
    lg: 'cosy:px-6',
    xl: 'cosy:px-8',
    '2xl': 'cosy:px-10',
    '3xl': 'cosy:px-12',
    '4xl': 'cosy:px-16',
} as const;

export const paddingYClasses: Record<PaddingSize, string> = {
    none: 'cosy:py-0',
    sm: 'cosy:py-2',
    md: 'cosy:py-4',
    lg: 'cosy:py-6',
    xl: 'cosy:py-8',
    '2xl': 'cosy:py-10',
    '3xl': 'cosy:py-12',
    '4xl': 'cosy:py-16',
} as const;


