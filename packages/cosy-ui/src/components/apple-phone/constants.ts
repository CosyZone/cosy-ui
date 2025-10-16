/**
 * ApplePhone 组件的常量定义
 */

// iPhone边框图片尺寸
export const IPHONE_FRAME_WIDTH = 1339;
export const IPHONE_FRAME_HEIGHT = 2716;

// iPhone边框图片-状态栏离上边框的距离
export const IPHONE_FRAME_STATUS_BAR_TOP = 115;

// iPhone边框图片-状态栏高度
export const IPHONE_FRAME_STATUS_BAR_HEIGHT = 110;

// 比例计算
export const MAIN_CONTENT_WIDTH_ASPECT_RATIO = 1179 / IPHONE_FRAME_WIDTH;
export const MAIN_CONTENT_HEIGHT_ASPECT_RATIO = 2556 / IPHONE_FRAME_HEIGHT;
export const IPHONE_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO =
    IPHONE_FRAME_STATUS_BAR_HEIGHT / IPHONE_FRAME_HEIGHT;
export const IPHONE_FRAME_STATUS_BAR_TOP_ASPECT_RATIO =
    IPHONE_FRAME_STATUS_BAR_TOP / IPHONE_FRAME_HEIGHT;

// 预定义的高度选项
export const HEIGHT_CLASSES = {
    sm: 'cosy:h-64', // 256px
    md: 'cosy:h-80', // 320px
    lg: 'cosy:h-96', // 384px
    xl: 'cosy:h-[480px]', // 480px
    '2xl': 'cosy:h-[560px]', // 560px
    '3xl': 'cosy:h-[640px]', // 640px
    '4xl': 'cosy:h-[720px]', // 720px
    '5xl': 'cosy:h-[800px]', // 800px
} as const;

// 高度值映射
export const HEIGHT_VALUES = {
    sm: 256,
    md: 320,
    lg: 384,
    xl: 480,
    '2xl': 560,
    '3xl': 640,
    '4xl': 720,
    '5xl': 800,
} as const;

// 默认高度
export const DEFAULT_HEIGHT: keyof typeof HEIGHT_VALUES = 'lg';