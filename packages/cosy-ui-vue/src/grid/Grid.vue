<script setup lang="ts">
import { computed } from "vue";

/**
 * @component Grid
 *
 * @description
 * Grid 组件是一个灵活的网格布局组件，用于创建响应式的多列布局。
 * 它封装了 CSS Grid 的常用功能，提供简单易用的接口来控制网格的列数和间距。
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
 * @prop {BackgroundColor} [background] - 背景色类型，支持所有预设背景色和透明度变体
 * @prop {string} [class] - 自定义类名
 * @prop {any} [class:list] - 类名列表
 */

type BackgroundColor = string;
type BorderSize = "none" | "sm" | "md" | "lg" | "xl";

type GapSize = "none" | "xs" | "sm" | "md" | "lg" | "xl";
type ResponsiveValue<T> =
	T
	| {
			base?: T;
			sm?: T;
			md?: T;
			lg?: T;
			xl?: T;
			"2xl"?: T;
	  };

export interface IGridProps {
	background?: BackgroundColor;
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

// BEM 类名计算（与 Grid.astro 一致）
const gapMap = { none:'0', xs:'.5rem', sm:'1rem', md:'1.5rem', lg:'2rem', xl:'3rem' };

const getColsClasses = (cols: NonNullable<IGridProps["cols"]>) => {
  if (typeof cols === 'number') return `cosy-grid--cols-${cols}`;
  const r = [];
  if (cols.base) r.push(`cosy-grid--cols-${cols.base}`);
  if (cols.sm) r.push(`cosy-grid--cols-sm-${cols.sm}`);
  if (cols.md) r.push(`cosy-grid--cols-md-${cols.md}`);
  if (cols.lg) r.push(`cosy-grid--cols-lg-${cols.lg}`);
  if (cols.xl) r.push(`cosy-grid--cols-xl-${cols.xl}`);
  if (cols['2xl']) r.push(`cosy-grid--cols-2xl-${cols['2xl']}`);
  return r.join(' ');
};

const combinedClass = computed(() => {
  const gap = gapMap[props.gap] || gapMap.md;
  return [
    'cosy-grid',
    getColsClasses(props.cols),
    props.rowGap ? `cosy-grid--row-gap-${props.rowGap}` : '',
    props.colGap ? `cosy-grid--col-gap-${props.colGap}` : '',
    props.marginY ? `cosy-grid--my-${props.marginY}` : '',
    props.border !== 'none' ? 'cosy-grid--border' : '',
    props.class,
  ].filter(Boolean).join(' ');
});

const gridStyle = computed(() => {
  const gap = gapMap[props.gap] || gapMap.md;
  return { gap, rowGap: props.rowGap ? gapMap[props.rowGap] : undefined, columnGap: props.colGap ? gapMap[props.colGap] : undefined };
});
</script>

<template>
  <div :class="combinedClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<style>
  .cosy-grid { --cosy-base-300:#d7d7d7; display:grid; gap:1.5rem; }
  .cosy-grid--cols-1 { grid-template-columns:repeat(1,minmax(0,1fr)); }
  .cosy-grid--cols-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .cosy-grid--cols-3 { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .cosy-grid--cols-4 { grid-template-columns:repeat(4,minmax(0,1fr)); }
  .cosy-grid--cols-5 { grid-template-columns:repeat(5,minmax(0,1fr)); }
  .cosy-grid--cols-6 { grid-template-columns:repeat(6,minmax(0,1fr)); }
  .cosy-grid--cols-7 { grid-template-columns:repeat(7,minmax(0,1fr)); }
  .cosy-grid--cols-8 { grid-template-columns:repeat(8,minmax(0,1fr)); }
  .cosy-grid--cols-9 { grid-template-columns:repeat(9,minmax(0,1fr)); }
  .cosy-grid--cols-10 { grid-template-columns:repeat(10,minmax(0,1fr)); }
  .cosy-grid--cols-11 { grid-template-columns:repeat(11,minmax(0,1fr)); }
  .cosy-grid--cols-12 { grid-template-columns:repeat(12,minmax(0,1fr)); }
  @media (min-width:640px) {
    .cosy-grid--cols-sm-1{grid-template-columns:repeat(1,minmax(0,1fr));}
    .cosy-grid--cols-sm-2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .cosy-grid--cols-sm-3{grid-template-columns:repeat(3,minmax(0,1fr));}
    .cosy-grid--cols-sm-4{grid-template-columns:repeat(4,minmax(0,1fr));}
    .cosy-grid--cols-sm-5{grid-template-columns:repeat(5,minmax(0,1fr));}
    .cosy-grid--cols-sm-6{grid-template-columns:repeat(6,minmax(0,1fr));}
    .cosy-grid--cols-sm-7{grid-template-columns:repeat(7,minmax(0,1fr));}
    .cosy-grid--cols-sm-8{grid-template-columns:repeat(8,minmax(0,1fr));}
    .cosy-grid--cols-sm-9{grid-template-columns:repeat(9,minmax(0,1fr));}
    .cosy-grid--cols-sm-10{grid-template-columns:repeat(10,minmax(0,1fr));}
    .cosy-grid--cols-sm-11{grid-template-columns:repeat(11,minmax(0,1fr));}
    .cosy-grid--cols-sm-12{grid-template-columns:repeat(12,minmax(0,1fr));}
  }
  @media (min-width:768px) {
    .cosy-grid--cols-md-1{grid-template-columns:repeat(1,minmax(0,1fr));}
    .cosy-grid--cols-md-2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .cosy-grid--cols-md-3{grid-template-columns:repeat(3,minmax(0,1fr));}
    .cosy-grid--cols-md-4{grid-template-columns:repeat(4,minmax(0,1fr));}
    .cosy-grid--cols-md-5{grid-template-columns:repeat(5,minmax(0,1fr));}
    .cosy-grid--cols-md-6{grid-template-columns:repeat(6,minmax(0,1fr));}
    .cosy-grid--cols-md-7{grid-template-columns:repeat(7,minmax(0,1fr));}
    .cosy-grid--cols-md-8{grid-template-columns:repeat(8,minmax(0,1fr));}
    .cosy-grid--cols-md-9{grid-template-columns:repeat(9,minmax(0,1fr));}
    .cosy-grid--cols-md-10{grid-template-columns:repeat(10,minmax(0,1fr));}
    .cosy-grid--cols-md-11{grid-template-columns:repeat(11,minmax(0,1fr));}
    .cosy-grid--cols-md-12{grid-template-columns:repeat(12,minmax(0,1fr));}
  }
  @media (min-width:1024px) {
    .cosy-grid--cols-lg-1{grid-template-columns:repeat(1,minmax(0,1fr));}
    .cosy-grid--cols-lg-2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .cosy-grid--cols-lg-3{grid-template-columns:repeat(3,minmax(0,1fr));}
    .cosy-grid--cols-lg-4{grid-template-columns:repeat(4,minmax(0,1fr));}
    .cosy-grid--cols-lg-5{grid-template-columns:repeat(5,minmax(0,1fr));}
    .cosy-grid--cols-lg-6{grid-template-columns:repeat(6,minmax(0,1fr));}
    .cosy-grid--cols-lg-7{grid-template-columns:repeat(7,minmax(0,1fr));}
    .cosy-grid--cols-lg-8{grid-template-columns:repeat(8,minmax(0,1fr));}
    .cosy-grid--cols-lg-9{grid-template-columns:repeat(9,minmax(0,1fr));}
    .cosy-grid--cols-lg-10{grid-template-columns:repeat(10,minmax(0,1fr));}
    .cosy-grid--cols-lg-11{grid-template-columns:repeat(11,minmax(0,1fr));}
    .cosy-grid--cols-lg-12{grid-template-columns:repeat(12,minmax(0,1fr));}
  }
  @media (min-width:1280px) {
    .cosy-grid--cols-xl-1{grid-template-columns:repeat(1,minmax(0,1fr));}
    .cosy-grid--cols-xl-2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .cosy-grid--cols-xl-3{grid-template-columns:repeat(3,minmax(0,1fr));}
    .cosy-grid--cols-xl-4{grid-template-columns:repeat(4,minmax(0,1fr));}
    .cosy-grid--cols-xl-5{grid-template-columns:repeat(5,minmax(0,1fr));}
    .cosy-grid--cols-xl-6{grid-template-columns:repeat(6,minmax(0,1fr));}
    .cosy-grid--cols-xl-7{grid-template-columns:repeat(7,minmax(0,1fr));}
    .cosy-grid--cols-xl-8{grid-template-columns:repeat(8,minmax(0,1fr));}
    .cosy-grid--cols-xl-9{grid-template-columns:repeat(9,minmax(0,1fr));}
    .cosy-grid--cols-xl-10{grid-template-columns:repeat(10,minmax(0,1fr));}
    .cosy-grid--cols-xl-11{grid-template-columns:repeat(11,minmax(0,1fr));}
    .cosy-grid--cols-xl-12{grid-template-columns:repeat(12,minmax(0,1fr));}
  }
  @media (min-width:1536px) {
    .cosy-grid--cols-2xl-1{grid-template-columns:repeat(1,minmax(0,1fr));}
    .cosy-grid--cols-2xl-2{grid-template-columns:repeat(2,minmax(0,1fr));}
    .cosy-grid--cols-2xl-3{grid-template-columns:repeat(3,minmax(0,1fr));}
    .cosy-grid--cols-2xl-4{grid-template-columns:repeat(4,minmax(0,1fr));}
    .cosy-grid--cols-2xl-5{grid-template-columns:repeat(5,minmax(0,1fr));}
    .cosy-grid--cols-2xl-6{grid-template-columns:repeat(6,minmax(0,1fr));}
    .cosy-grid--cols-2xl-7{grid-template-columns:repeat(7,minmax(0,1fr));}
    .cosy-grid--cols-2xl-8{grid-template-columns:repeat(8,minmax(0,1fr));}
    .cosy-grid--cols-2xl-9{grid-template-columns:repeat(9,minmax(0,1fr));}
    .cosy-grid--cols-2xl-10{grid-template-columns:repeat(10,minmax(0,1fr));}
    .cosy-grid--cols-2xl-11{grid-template-columns:repeat(11,minmax(0,1fr));}
    .cosy-grid--cols-2xl-12{grid-template-columns:repeat(12,minmax(0,1fr));}
  }
  .cosy-grid--row-gap-xs{row-gap:.5rem;} .cosy-grid--row-gap-sm{row-gap:1rem;} .cosy-grid--row-gap-md{row-gap:1.5rem;} .cosy-grid--row-gap-lg{row-gap:2rem;} .cosy-grid--row-gap-xl{row-gap:3rem;}
  .cosy-grid--col-gap-xs{column-gap:.5rem;} .cosy-grid--col-gap-sm{column-gap:1rem;} .cosy-grid--col-gap-md{column-gap:1.5rem;} .cosy-grid--col-gap-lg{column-gap:2rem;} .cosy-grid--col-gap-xl{column-gap:3rem;}
  .cosy-grid--my-xs{margin-top:.5rem;margin-bottom:.5rem;} .cosy-grid--my-sm{margin-top:1rem;margin-bottom:1rem;} .cosy-grid--my-md{margin-top:1.5rem;margin-bottom:1.5rem;} .cosy-grid--my-lg{margin-top:2rem;margin-bottom:2rem;} .cosy-grid--my-xl{margin-top:3rem;margin-bottom:3rem;}
  .cosy-grid--border { border:1px solid var(--cosy-base-300); }
</style>
