/**
 * ApplePad 组件的常量定义
 *
 * 基于 iPad Air 11" M2 竖屏模式
 * 边框图片: 1900 × 2620 px
 * 设备屏幕: 1640 × 2360 点
 */

// iPad 边框图片尺寸
export const IPAD_FRAME_WIDTH = 1900;
export const IPAD_FRAME_HEIGHT = 2620;

// iPad 边框图片 - 状态栏离上边框的距离
export const IPAD_FRAME_STATUS_BAR_TOP = 155;

// iPad 边框图片 - 状态栏高度
export const IPAD_FRAME_STATUS_BAR_HEIGHT = 70;

// 比例计算
export const MAIN_CONTENT_WIDTH_ASPECT_RATIO = 1640 / IPAD_FRAME_WIDTH;
export const MAIN_CONTENT_HEIGHT_ASPECT_RATIO = 2360 / IPAD_FRAME_HEIGHT;
export const IPAD_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO =
	IPAD_FRAME_STATUS_BAR_HEIGHT / IPAD_FRAME_HEIGHT;
export const IPAD_FRAME_STATUS_BAR_TOP_ASPECT_RATIO =
	IPAD_FRAME_STATUS_BAR_TOP / IPAD_FRAME_HEIGHT;

// 预定义的高度选项（iPad 比 iPhone 大，默认值也更大）
export const HEIGHT_CLASSES = {
	sm: "cosy:h-[400px]", // 400px
	md: "cosy:h-[500px]", // 500px
	lg: "cosy:h-[600px]", // 600px
	xl: "cosy:h-[700px]", // 700px
	"2xl": "cosy:h-[800px]", // 800px
	"3xl": "cosy:h-[900px]", // 900px
	"4xl": "cosy:h-[1000px]", // 1000px
	"5xl": "cosy:h-[1100px]", // 1100px
} as const;

// 高度值映射
export const HEIGHT_VALUES = {
	sm: 400,
	md: 500,
	lg: 600,
	xl: 700,
	"2xl": 800,
	"3xl": 900,
	"4xl": 1000,
	"5xl": 1100,
} as const;

// 默认高度
export const DEFAULT_HEIGHT: keyof typeof HEIGHT_VALUES = "lg";
