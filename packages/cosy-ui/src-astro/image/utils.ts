/**
 * 图片组件公共工具函数
 */

// 圆角类名映射
export const roundedClasses = {
    none: '',
    sm: 'cosy:rounded-sm',
    md: 'cosy:rounded-md',
    lg: 'cosy:rounded-lg',
    xl: 'cosy:rounded-xl',
    '2xl': 'cosy:rounded-2xl',
    '3xl': 'cosy:rounded-3xl',
    full: 'cosy:rounded-full',
} as const;

// 边框类名映射
export const borderClasses = {
    none: '',
    sm: 'cosy:border cosy:border-base-300',
    md: 'cosy:border-2 cosy:border-base-300',
    lg: 'cosy:border-4 cosy:border-base-300',
    xl: 'cosy:border-8 cosy:border-base-300',
} as const;

// 遮罩类名映射
export const maskClasses = {
    circle: 'cosy:mask cosy:mask-circle',
    decagon: 'cosy:mask cosy:mask-decagon',
    diamond: 'cosy:mask cosy:mask-diamond',
    heart: 'cosy:mask cosy:mask-heart',
    hexagon: 'cosy:mask cosy:mask-hexagon',
    'hexagon-2': 'cosy:mask cosy:mask-hexagon-2',
    none: '',
    pentagon: 'cosy:mask cosy:mask-pentagon',
    square: 'cosy:mask cosy:mask-square',
    squircle: 'cosy:mask cosy:mask-squircle',
    star: 'cosy:mask cosy:mask-star',
    'star-2': 'cosy:mask cosy:mask-star-2',
    triangle: 'cosy:mask cosy:mask-triangle',
    'triangle-2': 'cosy:mask cosy:mask-triangle-2',
    'triangle-3': 'cosy:mask cosy:mask-triangle-3',
    'triangle-4': 'cosy:mask cosy:mask-triangle-4',
} as const;

// 对象填充方式类名映射
export const objectFitClasses = {
    contain: 'cosy:object-contain',
    cover: 'cosy:object-cover',
    fill: 'cosy:object-fill',
    none: 'cosy:object-none',
    'scale-down': 'cosy:object-scale-down',
} as const;

// 阴影类名映射
export const shadowClasses = {
    none: '',
    sm: 'cosy:shadow-sm',
    md: 'cosy:shadow-md',
    lg: 'cosy:shadow-lg',
    xl: 'cosy:shadow-xl',
    '2xl': 'cosy:shadow-2xl',
} as const;

// 悬停效果类名映射
export const hoverClasses = {
    none: '',
    scale: 'cosy:hover:scale-110 cosy:transition-transform cosy:duration-300',
    brightness: 'cosy:hover:brightness-110 cosy:transition-all cosy:duration-300',
    blur: 'cosy:hover:blur-sm',
} as const;

// 过渡动画类名映射
export const transitionClasses = {
    none: '',
    fade: 'cosy:transition-opacity cosy:duration-300',
    slide: 'cosy:transition-transform cosy:duration-300',
    zoom: 'cosy:transition-all cosy:duration-300',
} as const;

// 类型定义
export type RoundedType = keyof typeof roundedClasses;
export type BorderType = keyof typeof borderClasses;
export type MaskType = keyof typeof maskClasses;
export type ObjectFitType = keyof typeof objectFitClasses;
export type ShadowType = keyof typeof shadowClasses;
export type HoverType = keyof typeof hoverClasses;
export type TransitionType = keyof typeof transitionClasses;
