<script setup lang="ts">
import { computed } from "vue";
import type { IPlaceHolderProps } from "./types";
import {
	getBackgroundClass,
	type BackgroundColor,
} from "../../src/common/backgrounds";
import {
	placeholderWidthClasses,
	placeholderHeightClasses,
	placeholderPaddingClasses,
} from "../../src/components/placeholder/placeholderClasses";

/**
 * @component PlaceHolder
 * @description 占位符组件，用于在布局中占用指定的空间，支持自定义宽度、高度、内边距和背景色
 * @usage
 * ```vue
 * <PlaceHolder width="md" height="lg" padding="md" background="base-200">
 *   <p>内容</p>
 * </PlaceHolder>
 * ```
 * @props
 * @prop {BackgroundColor} [background] - 背景色类型，支持所有预设背景色和透明度变体
 * @prop {string} [class] - 自定义 CSS 类名，用于添加额外的样式
 * @prop {string} [height='md'] - 高度尺寸，可选值：none、xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、full
 * @prop {string} [padding='none'] - 内边距大小，可选值：none、xs、sm、md、lg、xl
 * @prop {string} [width='md'] - 宽度尺寸，可选值：none、xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、full
 * @slots
 * @slot default - 占位符内容
 */

interface Props extends IPlaceHolderProps {
	border?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	height: "md",
	padding: "none",
	width: "md",
	border: false,
});

// 使用通用类名映射
const widthClass =
	placeholderWidthClasses[
		props.width as keyof typeof placeholderWidthClasses
	] || "";
const heightClass =
	placeholderHeightClasses[
		props.height as keyof typeof placeholderHeightClasses
	] || "";
const paddingClass =
	placeholderPaddingClasses[
		props.padding as keyof typeof placeholderPaddingClasses
	] || "";
const backgroundClass = getBackgroundClass(props.background);

// 边框类名映射
const borderClass = props.border ? "cosy:border cosy:border-base-300" : "";

const combinedClass = computed(() => {
	return `placeholder ${widthClass} ${heightClass} ${paddingClass} ${backgroundClass} ${borderClass} ${props.class || ""}`.trim();
});
</script>

<template>
  <div :class="combinedClass">
    <slot />
  </div>
</template>

<style scoped>
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
}
</style>