<script setup lang="ts">
import { computed } from "vue";
import "../../style";
import type { IButtonProps } from "./props";
import { getButtonCombinedClassesVue } from "./class";

/**
 * @component Button
 * @description Vue 版本的 Button 组件，用于触发一个即时操作，如表单提交、打开对话框等
 * @props {string} [variant='primary'] - 按钮样式变体，支持 primary、secondary、accent、info、success、warning、error、ghost、link、outline、neutral、gradient-sky、gradient-watermelon 等渐变变体
 * @props {string} [size='md'] - 按钮尺寸，支持 lg、md、sm、xs
 * @props {string} [shape] - 按钮形状，支持 circle、square
 * @props {boolean} [wide=false] - 是否为宽按钮
 * @props {boolean} [block=false] - 是否为块级显示
 * @props {boolean} [loading=false] - 是否显示加载状态
 * @props {boolean} [disabled=false] - 是否禁用按钮
 * @props {string} [type='button'] - 按钮类型，支持 button、submit、reset
 * @props {string} [href] - 链接地址，设置后按钮变为链接形式
 * @props {string} [target] - 链接目标，支持 _self、_blank、_parent、_top
 * @props {Function} [onClick] - 点击事件处理函数
 */

const props = withDefaults(defineProps<IButtonProps>(), {
	variant: "primary",
	size: "md",
	wide: false,
	block: false,
	loading: false,
	disabled: false,
	type: "button",
});

// 使用共用的工具函数计算组合类名
const buttonClasses = computed(() => getButtonCombinedClassesVue(props));

// 处理点击事件
const handleClick = (event: Event) => {
	// 如果提供了 onClick 属性，则执行相应的函数
	if (props.onClick && typeof props.onClick === "function") {
		props.onClick();
	}
};
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    :class="buttonClasses"
    :type="props.href ? undefined : props.type"
    :disabled="props.disabled"
    :href="props.href"
    :target="props.target"
    @click="handleClick">
    <span class="cosy:flex cosy:items-center cosy:gap-2">
      <slot name="icon-left" />
      <slot />
      <slot name="icon-right" />
    </span>
  </component>
</template>
