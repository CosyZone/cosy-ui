<script setup lang="ts">
import { computed } from "vue";
import { SmartIcon } from "../smart-icon";

interface Props {
	courseName?: string;
	keywords?: string[];
	iconSizeClasses: string;
}

const props = withDefaults(defineProps<Props>(), {
	courseName: "",
	keywords: () => [],
	iconSizeClasses: "",
});

// 构建关键词字符串，包含默认关键词
const defaultKeywords = [
	"课程",
	"学习",
	"教程",
	"图书",
	"书",
	"电子书",
	"pdf",
	"kindle",
];

const allKeywords = computed(() => {
	return [props.courseName, ...props.keywords, ...defaultKeywords]
		.filter(Boolean)
		.join(",");
});
</script>

<template>
	<div
		:class="`cosy:absolute cosy:top-2 cosy:right-2 cosy:opacity-30 hover:cosy:opacity-50 cosy:transition-all cosy:duration-500 cosy:ease-out hover:cosy:scale-110 hover:cosy:rotate-12 ${props.iconSizeClasses} cosy:group-hover:cosy:animate-pulse`">
		<SmartIcon :keyword="allKeywords" class="cosy:w-full cosy:h-full" />
	</div>
</template>

