<script setup lang="ts">
import { computed } from "vue";
import "../../style";
import type { ILinkProps } from "./props";
import { getLinkCombinedClassesVue } from "./class";

/**
 * @component Link
 * @description Vue 版本的 Link 组件，是一个增强的链接组件，提供了丰富的样式变体和动画效果
 * @props {boolean} [active=false] - 是否为激活状态
 * @props {string} [align] - 对齐方式：left、center、right
 * @props {string} [animation='none'] - 动画效果：none、hover-lift、hover-glow、hover-scale
 * @props {boolean} [block=false] - 是否为块级显示
 * @props {boolean} [btn=false] - 是否启用按钮风格
 * @props {boolean} [circle=false] - 是否为圆形按钮（需配合 btn 使用）
 * @props {string} [class] - 自定义 CSS 类名
 * @props {any} [class:list] - 类名列表
 * @props {string} [color] - 按钮颜色（需配合 btn 使用）：primary、secondary、accent、info、success、warning、error
 * @props {boolean} [debug=false] - 是否显示调试边框
 * @props {boolean} [external=false] - 是否为外部链接，自动新窗口打开
 * @props {boolean} [fullWidth=false] - 是否占满宽度
 * @props {boolean} [ghost=false] - 是否为幽灵按钮（需配合 btn 使用）
 * @props {string} href - 链接地址（必需）
 * @props {string} [hoverImage] - 悬停时显示的图片URL
 * @props {string} [hoverImageAlt] - 悬停图片的替代文本
 * @props {string} [icon] - 图标名称，支持所有可用的图标组件
 * @props {string} [navigationType] - 导航类型（需配合 navigation 变体使用）：previous、next
 * @props {boolean} [noUnderline=true] - 是否移除下划线
 * @props {string} [rounded='none'] - 圆角大小，可选值：none、sm、md、lg、xl、full
 * @props {string} [size='md'] - 尺寸大小：sm、md、lg
 * @props {string} [variant='default'] - 样式变体：default、primary、secondary、text、cta、ghost、light、navigation、github
 */

interface Props extends ILinkProps {}

const props = withDefaults(defineProps<Props>(), {
	active: false,
	animation: "none",
	block: false,
	btn: false,
	circle: false,
	debug: false,
	external: false,
	fullWidth: false,
	ghost: false,
	noUnderline: true,
	rounded: "none",
	size: "md",
	variant: "default",
});

const linkClasses = computed(() => {
	// 使用共用的工具函数计算组合类名
	return getLinkCombinedClassesVue(props);
});

const linkAttributes = computed(() => {
	const attrs: Record<string, any> = {
		href: props.href,
	};

	if (props.external) {
		attrs.target = "_blank";
		attrs.rel = "noopener noreferrer";
	}

	return attrs;
});
</script>

<template>
  <a
    v-bind="{ ...linkAttributes, ...$attrs }"
    :class="[linkClasses, $attrs.class]">
    <slot name="icon-left" />
    <slot name="icon-previous" v-if="navigationType === 'previous'" />
    <slot name="icon-github" v-if="variant === 'github'" />
    <slot name="icon" v-if="icon" />
    <slot />
    <slot name="icon-next" v-if="navigationType === 'next'" />
    <slot name="icon-right" />
  </a>
</template>
