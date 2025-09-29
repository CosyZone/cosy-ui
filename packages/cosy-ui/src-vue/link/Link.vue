<script setup lang="ts">
import { computed } from "vue";
import "../../style";

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
 * @props {string} [icon] - 图标名称，支持所有可用的图标组件
 * @props {string} [navigationType] - 导航类型（需配合 navigation 变体使用）：previous、next
 * @props {boolean} [noUnderline=true] - 是否移除下划线
 * @props {boolean} [rounded=false] - 是否添加圆角
 * @props {string} [size='md'] - 尺寸大小：sm、md、lg
 * @props {string} [variant='default'] - 样式变体：default、primary、secondary、text、cta、ghost、light、navigation、github
 */

interface Props {
	active?: boolean;
	align?: "left" | "center" | "right";
	animation?: "none" | "hover-lift" | "hover-glow" | "hover-scale";
	block?: boolean;
	btn?: boolean;
	circle?: boolean;
	class?: string;
	"class:list"?: any;
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	debug?: boolean;
	external?: boolean;
	fullWidth?: boolean;
	ghost?: boolean;
	href: string;
	icon?: string;
	navigationType?: "previous" | "next";
	noUnderline?: boolean;
	rounded?: boolean;
	size?: "sm" | "md" | "lg";
	variant?:
		| "default"
		| "primary"
		| "secondary"
		| "text"
		| "cta"
		| "ghost"
		| "light"
		| "navigation"
		| "github";
}

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
	rounded: false,
	size: "md",
	variant: "default",
});

const linkClasses = computed(() => {
	const classes = [
		// 基础链接样式
		"cosy:items-center cosy:cursor-pointer cosy:transition-all cosy:duration-200",

		// 显示方式
		props.block ? "cosy:flex cosy:w-full" : "cosy:inline-flex",

		// 图标和文字间距（当有图标时添加间距）
		props.icon && "cosy:gap-2",

		// 变体样式
		props.variant === "primary" &&
			"cosy:text-primary cosy:hover:text-primary-focus",
		props.variant === "secondary" &&
			"cosy:text-secondary cosy:hover:text-secondary-focus",
		props.variant === "text",
		props.variant === "cta" &&
			"cosy:text-accent cosy:hover:text-accent-focus cosy:font-medium",
		props.variant === "ghost" &&
			"cosy:text-base-content cosy:hover:text-base-content/80",
		props.variant === "default" &&
			"cosy:text-base-content cosy:hover:text-base-content/90",
		props.variant === "light" &&
			"cosy:text-white cosy:hover:text-white/90 cosy:font-medium",
		props.variant === "navigation" &&
			"cosy:flex cosy:items-center cosy:gap-3 cosy:p-4 cosy:bg-base-100 cosy:border cosy:border-base-300 cosy:rounded-lg cosy:shadow-sm cosy:hover:shadow-md cosy:hover:border-base-400 cosy:transition-all cosy:duration-300 cosy:ease-in-out cosy:no-underline cosy:hover:no-underline cosy:font-medium cosy:text-base-content cosy:hover:text-base-content cosy:hover:-translate-y-1 cosy:hover:scale-[1.01] cosy:backdrop-blur-sm cosy:hover:backdrop-blur-md",
		props.variant === "github" &&
			"cosy:flex cosy:items-center cosy:gap-2 cosy:text-base-content cosy:hover:text-base-content/80 cosy:transition-colors cosy:duration-200 cosy:no-underline cosy:hover:no-underline cosy:font-medium",

		// 尺寸样式
		props.size === "sm" && "cosy:text-sm",
		props.size === "md" && "cosy:text-base",
		props.size === "lg" && "cosy:text-lg",

		// 动画效果
		props.animation === "hover-lift" &&
			"cosy:hover:-translate-y-0.5 cosy:transition-transform",
		props.animation === "hover-glow" &&
			"cosy:hover:brightness-125 cosy:transition-[filter]",
		props.animation === "hover-scale" &&
			"cosy:hover:scale-105 cosy:transition-transform",

		// Active state
		props.active && "cosy:active",

		// 按钮风格
		props.btn && "cosy:btn",
		props.btn && props.size === "sm" && "cosy:btn-sm",
		props.btn && props.size === "lg" && "cosy:btn-lg",
		props.btn && props.ghost && "cosy:btn-ghost",
		props.btn && props.color && `cosy:btn-${props.color}`,
		props.btn && props.fullWidth && "cosy:btn-block",
		props.btn && props.circle && "cosy:btn-circle",
		props.btn && props.rounded && "cosy:rounded-full",

		// 非按钮风格下的圆角
		!props.btn && props.rounded && "cosy:rounded",

		// 非按钮风格下的无下划线
		!props.btn &&
			props.noUnderline &&
			"cosy:no-underline cosy:hover:no-underline",

		// 宽度100%
		props.fullWidth && !props.btn && "cosy:w-full",

		// 对齐
		props.align === "center" && "cosy:justify-center cosy:text-center",
		props.align === "right" && "cosy:justify-end cosy:text-right",
		props.align === "left" && "cosy:justify-start cosy:text-left",

		// 自定义类名
		props.class,
	];

	// 调试样式
	if (props.debug) {
		classes.push("cosy:border cosy:border-dashed cosy:border-red-500");
	}

	return classes;
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
    <a v-bind="{ ...linkAttributes, ...$attrs }" :class="[linkClasses, $attrs.class]">
        <slot name="icon-left" />
        <slot name="icon-previous" v-if="navigationType === 'previous'" />
        <slot name="icon-github" v-if="variant === 'github'" />
        <slot name="icon" v-if="icon" />
        <slot />
        <slot name="icon-next" v-if="navigationType === 'next'" />
        <slot name="icon-right" />
    </a>
</template>
