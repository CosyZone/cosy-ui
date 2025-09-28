/**
 * 轴向内边距类名映射（水平 px 与 垂直 py）
 */

import type { PaddingSize } from './padding';

export const paddingXClasses: Record<PaddingSize, string> = {
    none: 'cosy:px-0',
    xs: 'cosy:px-1',
    sm: 'cosy:px-2',
    md: 'cosy:px-4',
    lg: 'cosy:px-6',
    xl: 'cosy:px-8',
    '2xl': 'cosy:px-10',
    '3xl': 'cosy:px-12',
    '4xl': 'cosy:px-16',
    '5xl': 'cosy:px-20',
} as const;

export const paddingYClasses: Record<PaddingSize, string> = {
    none: 'cosy:py-0',
    xs: 'cosy:py-1',
    sm: 'cosy:py-2',
    md: 'cosy:py-4',
    lg: 'cosy:py-6',
    xl: 'cosy:py-8',
    '2xl': 'cosy:py-10',
    '3xl': 'cosy:py-12',
    '4xl': 'cosy:py-16',
    '5xl': 'cosy:py-20',
} as const;

export const paddingTopClasses: Record<PaddingSize, string> = {
    none: 'cosy:pt-0',
    xs: 'cosy:pt-1',
    sm: 'cosy:pt-2',
    md: 'cosy:pt-4',
    lg: 'cosy:pt-6',
    xl: 'cosy:pt-8',
    '2xl': 'cosy:pt-10',
    '3xl': 'cosy:pt-12',
    '4xl': 'cosy:pt-16',
    '5xl': 'cosy:pt-20',
} as const;

export const paddingBottomClasses: Record<PaddingSize, string> = {
    none: 'cosy:pb-0',
    xs: 'cosy:pb-1',
    sm: 'cosy:pb-2',
    md: 'cosy:pb-4',
    lg: 'cosy:pb-6',
    xl: 'cosy:pb-8',
    '2xl': 'cosy:pb-10',
    '3xl': 'cosy:pb-12',
    '4xl': 'cosy:pb-16',
    '5xl': 'cosy:pb-20',
} as const;

export const paddingLeftClasses: Record<PaddingSize, string> = {
    none: 'cosy:pl-0',
    xs: 'cosy:pl-1',
    sm: 'cosy:pl-2',
    md: 'cosy:pl-4',
    lg: 'cosy:pl-6',
    xl: 'cosy:pl-8',
    '2xl': 'cosy:pl-10',
    '3xl': 'cosy:pl-12',
    '4xl': 'cosy:pl-16',
    '5xl': 'cosy:pl-20',
} as const;

export const paddingRightClasses: Record<PaddingSize, string> = {
    none: 'cosy:pr-0',
    xs: 'cosy:pr-1',
    sm: 'cosy:pr-2',
    md: 'cosy:pr-4',
    lg: 'cosy:pr-6',
    xl: 'cosy:pr-8',
    '2xl': 'cosy:pr-10',
    '3xl': 'cosy:pr-12',
    '4xl': 'cosy:pr-16',
    '5xl': 'cosy:pr-20',
} as const;


