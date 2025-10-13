<script setup lang="ts">
import { computed } from "vue";

/**
 * @component Grid
 *
 * @description
 * Grid 组件是一个灵活的网格布局组件，用于创建响应式的多列布局。
 * 它封装了 CSS Grid 的常用功能，提供简单易用的接口来控制网格的列数和间距。
 *
 * @design
 * 设计理念：
 * 1. 简单易用 - 通过简洁的 API 控制复杂的 Grid 布局
 * 2. 响应式优先 - 内置响应式断点，轻松创建适应不同屏幕尺寸的布局
 * 3. 灵活可配置 - 支持自定义列数和间距
 * 4. 语义化属性 - 使用直观的属性名称，降低学习成本
 *
 * @usage
 * 基本用法：
 * ```vue
 * <Grid :cols="3" gap="md">
 *   <div>第一列</div>
 *   <div>第二列</div>
 *   <div>第三列</div>
 * </Grid>
 * ```
 *
 * @props
 * @prop {number | Object} [cols=1] - 网格列数，可以是固定值或响应式对象
 * @prop {string} [gap="md"] - 网格间距，可选值：none, xs, sm, md, lg, xl
 * @prop {string} [rowGap] - 行间距，默认与 gap 相同
 * @prop {string} [colGap] - 列间距，默认与 gap 相同
 * @prop {string} [marginY] - 垂直外边距，可选值：none, xs, sm, md, lg, xl
 * @prop {string} [border="none"] - 边框尺寸，可选值：none, sm, md, lg, xl
 * @prop {string} [class] - 自定义类名
 * @prop {any} [class:list] - 类名列表
 */

import type { BorderSize } from "../../src/common/border";

type GapSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type ResponsiveValue<T> =
	| T
	| {
			base?: T;
			sm?: T;
			md?: T;
			lg?: T;
			xl?: T;
			"2xl"?: T;
	  };

export interface IGridProps {
	cols?: number | ResponsiveValue<number>;
	gap?: GapSize;
	rowGap?: GapSize;
	colGap?: GapSize;
	marginY?: GapSize;
	border?: BorderSize;
	class?: string;
	"class:list"?: any;
}

const props = withDefaults(defineProps<IGridProps>(), {
	cols: 1,
	gap: "md",
	border: "none",
	class: "",
});

// 处理响应式列数
const getColsClasses = (cols: ResponsiveValue<number>) => {
	// 单一数字
	if (typeof cols === "number") {
		switch (cols) {
			case 1:
				return "cosy:grid-cols-1";
			case 2:
				return "cosy:grid-cols-2";
			case 3:
				return "cosy:grid-cols-3";
			case 4:
				return "cosy:grid-cols-4";
			case 5:
				return "cosy:grid-cols-5";
			case 6:
				return "cosy:grid-cols-6";
			case 7:
				return "cosy:grid-cols-7";
			case 8:
				return "cosy:grid-cols-8";
			case 9:
				return "cosy:grid-cols-9";
			case 10:
				return "cosy:grid-cols-10";
			case 11:
				return "cosy:grid-cols-11";
			case 12:
				return "cosy:grid-cols-12";
			default:
				return "";
		}
	}
	// 响应式对象
	const result: string[] = [];
	const responsive = cols as any;
	if (responsive.base) {
		switch (responsive.base) {
			case 1:
				result.push("cosy:grid-cols-1");
				break;
			case 2:
				result.push("cosy:grid-cols-2");
				break;
			case 3:
				result.push("cosy:grid-cols-3");
				break;
			case 4:
				result.push("cosy:grid-cols-4");
				break;
			case 5:
				result.push("cosy:grid-cols-5");
				break;
			case 6:
				result.push("cosy:grid-cols-6");
				break;
			case 7:
				result.push("cosy:grid-cols-7");
				break;
			case 8:
				result.push("cosy:grid-cols-8");
				break;
			case 9:
				result.push("cosy:grid-cols-9");
				break;
			case 10:
				result.push("cosy:grid-cols-10");
				break;
			case 11:
				result.push("cosy:grid-cols-11");
				break;
			case 12:
				result.push("cosy:grid-cols-12");
				break;
		}
	}
	if (responsive.sm) {
		switch (responsive.sm) {
			case 1:
				result.push("cosy:sm:grid-cols-1");
				break;
			case 2:
				result.push("cosy:sm:grid-cols-2");
				break;
			case 3:
				result.push("cosy:sm:grid-cols-3");
				break;
			case 4:
				result.push("cosy:sm:grid-cols-4");
				break;
			case 5:
				result.push("cosy:sm:grid-cols-5");
				break;
			case 6:
				result.push("cosy:sm:grid-cols-6");
				break;
			case 7:
				result.push("cosy:sm:grid-cols-7");
				break;
			case 8:
				result.push("cosy:sm:grid-cols-8");
				break;
			case 9:
				result.push("cosy:sm:grid-cols-9");
				break;
			case 10:
				result.push("cosy:sm:grid-cols-10");
				break;
			case 11:
				result.push("cosy:sm:grid-cols-11");
				break;
			case 12:
				result.push("cosy:sm:grid-cols-12");
				break;
		}
	}
	if (responsive.md) {
		switch (responsive.md) {
			case 1:
				result.push("cosy:md:grid-cols-1");
				break;
			case 2:
				result.push("cosy:md:grid-cols-2");
				break;
			case 3:
				result.push("cosy:md:grid-cols-3");
				break;
			case 4:
				result.push("cosy:md:grid-cols-4");
				break;
			case 5:
				result.push("cosy:md:grid-cols-5");
				break;
			case 6:
				result.push("cosy:md:grid-cols-6");
				break;
			case 7:
				result.push("cosy:md:grid-cols-7");
				break;
			case 8:
				result.push("cosy:md:grid-cols-8");
				break;
			case 9:
				result.push("cosy:md:grid-cols-9");
				break;
			case 10:
				result.push("cosy:md:grid-cols-10");
				break;
			case 11:
				result.push("cosy:md:grid-cols-11");
				break;
			case 12:
				result.push("cosy:md:grid-cols-12");
				break;
		}
	}
	if (responsive.lg) {
		switch (responsive.lg) {
			case 1:
				result.push("cosy:lg:grid-cols-1");
				break;
			case 2:
				result.push("cosy:lg:grid-cols-2");
				break;
			case 3:
				result.push("cosy:lg:grid-cols-3");
				break;
			case 4:
				result.push("cosy:lg:grid-cols-4");
				break;
			case 5:
				result.push("cosy:lg:grid-cols-5");
				break;
			case 6:
				result.push("cosy:lg:grid-cols-6");
				break;
			case 7:
				result.push("cosy:lg:grid-cols-7");
				break;
			case 8:
				result.push("cosy:lg:grid-cols-8");
				break;
			case 9:
				result.push("cosy:lg:grid-cols-9");
				break;
			case 10:
				result.push("cosy:lg:grid-cols-10");
				break;
			case 11:
				result.push("cosy:lg:grid-cols-11");
				break;
			case 12:
				result.push("cosy:lg:grid-cols-12");
				break;
		}
	}
	if (responsive.xl) {
		switch (responsive.xl) {
			case 1:
				result.push("cosy:xl:grid-cols-1");
				break;
			case 2:
				result.push("cosy:xl:grid-cols-2");
				break;
			case 3:
				result.push("cosy:xl:grid-cols-3");
				break;
			case 4:
				result.push("cosy:xl:grid-cols-4");
				break;
			case 5:
				result.push("cosy:xl:grid-cols-5");
				break;
			case 6:
				result.push("cosy:xl:grid-cols-6");
				break;
			case 7:
				result.push("cosy:xl:grid-cols-7");
				break;
			case 8:
				result.push("cosy:xl:grid-cols-8");
				break;
			case 9:
				result.push("cosy:xl:grid-cols-9");
				break;
			case 10:
				result.push("cosy:xl:grid-cols-10");
				break;
			case 11:
				result.push("cosy:xl:grid-cols-11");
				break;
			case 12:
				result.push("cosy:xl:grid-cols-12");
				break;
		}
	}
	if (responsive["2xl"]) {
		switch (responsive["2xl"]) {
			case 1:
				result.push("cosy:2xl:grid-cols-1");
				break;
			case 2:
				result.push("cosy:2xl:grid-cols-2");
				break;
			case 3:
				result.push("cosy:2xl:grid-cols-3");
				break;
			case 4:
				result.push("cosy:2xl:grid-cols-4");
				break;
			case 5:
				result.push("cosy:2xl:grid-cols-5");
				break;
			case 6:
				result.push("cosy:2xl:grid-cols-6");
				break;
			case 7:
				result.push("cosy:2xl:grid-cols-7");
				break;
			case 8:
				result.push("cosy:2xl:grid-cols-8");
				break;
			case 9:
				result.push("cosy:2xl:grid-cols-9");
				break;
			case 10:
				result.push("cosy:2xl:grid-cols-10");
				break;
			case 11:
				result.push("cosy:2xl:grid-cols-11");
				break;
			case 12:
				result.push("cosy:2xl:grid-cols-12");
				break;
		}
	}
	return result.join(" ");
};

// 获取间距类名
const getGapClass = (gap: GapSize) => {
	const gapMap = {
		none: "",
		xs: "cosy:gap-1",
		sm: "cosy:gap-2",
		md: "cosy:gap-4",
		lg: "cosy:gap-6",
		xl: "cosy:gap-8",
	};
	return gapMap[gap] || "";
};

// 获取行间距类名
const getRowGapClass = (rowGap?: GapSize) => {
	const rowGapMap = {
		none: "cosy:row-gap-0",
		xs: "cosy:row-gap-1",
		sm: "cosy:row-gap-2",
		md: "cosy:row-gap-4",
		lg: "cosy:row-gap-6",
		xl: "cosy:row-gap-8",
	};
	return rowGap ? rowGapMap[rowGap] || "" : "";
};

// 获取列间距类名
const getColGapClass = (colGap?: GapSize) => {
	const colGapMap = {
		none: "cosy:col-gap-0",
		xs: "cosy:col-gap-1",
		sm: "cosy:col-gap-2",
		md: "cosy:col-gap-4",
		lg: "cosy:col-gap-6",
		xl: "cosy:col-gap-8",
	};
	return colGap ? colGapMap[colGap] || "" : "";
};

// 获取垂直外边距类名
const getMarginYClass = (marginY?: GapSize) => {
	const marginYMap = {
		none: "cosy:my-0",
		xs: "cosy:my-1",
		sm: "cosy:my-2",
		md: "cosy:my-4",
		lg: "cosy:my-6",
		xl: "cosy:my-8",
	};
	return marginY ? marginYMap[marginY] || "" : "";
};

// 获取边框类名
const getBorderClass = (border: BorderSize) => {
	const borderMap = {
		none: "",
		sm: "cosy:border cosy:border-base-300",
		md: "cosy:border-2 cosy:border-base-300",
		lg: "cosy:border-4 cosy:border-base-300",
		xl: "cosy:border-8 cosy:border-base-300",
	};
	return borderMap[border] || "";
};

// 计算组合类名
const combinedClass = computed(() => {
	const classes = [
		"cosy:grid",
		getColsClasses(props.cols),
		getGapClass(props.gap),
		getRowGapClass(props.rowGap),
		getColGapClass(props.colGap),
		getMarginYClass(props.marginY),
		getBorderClass(props.border),
		props.class,
	].filter(Boolean);

	return classes.join(" ");
});
</script>

<template>
  <div :class="combinedClass" v-bind="$attrs">
    <slot />
  </div>
</template>
