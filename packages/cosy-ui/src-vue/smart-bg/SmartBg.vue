<script setup lang="ts">
import { computed } from "vue";
import { bgColorMap, bgGradientMap, mapKeywordToBgKey } from "../../src-astro/smart-bg/bg-util";

interface Props {
	/**
	 * 关键词，用于匹配背景色
	 * @default ""
	 */
	keyword?: string;
	/**
	 * 是否启用渐变色
	 * @default false
	 */
	enableGradient?: boolean;
	/**
	 * 自定义 CSS 类名
	 */
	class?: string;
	/**
	 * 自定义样式
	 */
	style?: string;
}

const props = withDefaults(defineProps<Props>(), {
	keyword: "",
	enableGradient: false,
	class: "",
	style: "",
});

const bgKey = computed(() => mapKeywordToBgKey(props.keyword));
const bgClass = computed(() => {
	return props.enableGradient
		? bgGradientMap[bgKey.value] || bgGradientMap["neutral"]
		: bgColorMap[bgKey.value] || bgColorMap["neutral"];
});

const containerClass = computed(() => {
	return `${bgClass.value} ${props.class} cosy:h-full`;
});
</script>

<template>
	<div :class="containerClass" :style="props.style">
		<slot />
	</div>
</template>

