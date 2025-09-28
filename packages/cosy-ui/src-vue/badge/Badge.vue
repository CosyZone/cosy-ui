<!--
@component Badge
@description 一个用于高亮信息的小组件。
@usage
```vue
<Badge>默认</Badge>
<Badge variant="primary">Primary</Badge>
```
@props
@prop {('primary'|'secondary'|'accent'|'ghost'|'info'|'success'|'warning'|'error')} [variant] - 徽章的颜色变体。
@prop {('xs'|'sm'|'md'|'lg')} [size] - 徽章的尺寸。
@prop {boolean} [outline=false] - 徽章是否为描边样式。
@prop {string} [class] - 自定义 CSS 类。
@slots
@slot default - 徽章内容。
-->
<script setup lang="ts">
import "../../style";
import { computed } from "vue";

const props = defineProps({
	variant: {
		type: String,
		default: undefined,
		validator: (v: string) =>
			[
				"primary",
				"secondary",
				"accent",
				"ghost",
				"info",
				"success",
				"warning",
				"error",
			].includes(v),
	},
	size: {
		type: String,
		default: undefined,
		validator: (v: string) => ["xs", "sm", "md", "lg"].includes(v),
	},
	outline: Boolean,
	class: String,
});

const variantClass = computed(() => {
	if (props.variant === "primary") return "cosy:badge-primary";
	if (props.variant === "secondary") return "cosy:badge-secondary";
	if (props.variant === "accent") return "cosy:badge-accent";
	if (props.variant === "ghost") return "cosy:badge-ghost";
	if (props.variant === "info") return "cosy:badge-info";
	if (props.variant === "success") return "cosy:badge-success";
	if (props.variant === "warning") return "cosy:badge-warning";
	if (props.variant === "error") return "cosy:badge-error";
	return "";
});
const sizeClass = computed(() => {
	if (props.size === "xs") return "cosy:badge-xs";
	if (props.size === "sm") return "cosy:badge-sm";
	if (props.size === "md") return "cosy:badge-md";
	if (props.size === "lg") return "cosy:badge-lg";
	return "";
});
</script>

<template>
    <span :class="[
        'cosy:badge',
        variantClass,
        sizeClass,
        props.outline ? 'cosy:badge-outline' : '',
        props.class
    ]">
        <slot />
    </span>
</template>
