/**
 * @fileoverview StatsDisplay 组件类型定义
 * Type definitions for StatsDisplay component
 */

/** 预设颜色类型 / Preset color types */
export type PresetColor =
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "error"
	| "info"
	| "blue"
	| "green"
	| "yellow"
	| "red"
	| "purple"
	| "pink"
	| "indigo"
	| "gray";

/** 字体大小类型 / Font size types */
export type FontSize =
	| "xs"
	| "sm"
	| "base"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl";

/** 字重类型 / Font weight types */
export type FontWeight =
	| "thin"
	| "light"
	| "normal"
	| "medium"
	| "semibold"
	| "bold";

/** 间距类型 / Spacing types */
export type Spacing = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/** 对齐方式类型 / Alignment types */
export type Alignment = "left" | "center" | "right";

/** 统计项接口 / Stat item interface */
export interface StatItem {
	/** 数值 / Numeric value */
	value: string;
	/** 标签 / Description label */
	label: string;
	/** 自定义颜色（可选）/ Custom color (optional) */
	color?: string | PresetColor;
}

/** StatsDisplay 组件属性接口 / StatsDisplay component props interface */
export interface StatsDisplayProps {
	/** 统计数据数组 / Statistical data array */
	stats: StatItem[];
	/** 自定义CSS类 / Custom CSS class */
	class?: string;
	/** 是否使用紧凑模式 / Whether to use compact mode */
	compact?: boolean;
	/** 列数（响应式）/ Number of columns (responsive) */
	columns?: number;
	/** 数值字体大小 / Font size for values */
	valueSize?: FontSize;
	/** 数值颜色 / Color for values */
	valueColor?: string | PresetColor;
	/** 标签颜色 / Color for labels */
	labelColor?: string | PresetColor;
	/** 数值字重 / Font weight for values */
	valueWeight?: FontWeight;
	/** 标签字重 / Font weight for labels */
	labelWeight?: FontWeight;
	/** 项目间距 / Spacing between items */
	gap?: Spacing;
	/** 对齐方式 / Alignment option */
	align?: Alignment;
}
