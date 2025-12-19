<script setup lang="ts">
import { computed } from "vue";
import { SmartIcon } from "../smart-icon";

// 图标颜色映射
const iconColorMap: { [key: string]: string } = {
	primary: 'cosy:text-blue-600 cosy:dark:text-blue-400',
	success: 'cosy:text-green-600 cosy:dark:text-green-400',
	danger: 'cosy:text-red-600 cosy:dark:text-red-400',
	warning: 'cosy:text-yellow-600 cosy:dark:text-yellow-400',
	info: 'cosy:text-cyan-600 cosy:dark:text-cyan-400',
	neutral: 'cosy:text-gray-600 cosy:dark:text-gray-400',
	forest: 'cosy:text-green-700 cosy:dark:text-green-300',
	ocean: 'cosy:text-blue-700 cosy:dark:text-blue-300',
	sky: 'cosy:text-sky-600 cosy:dark:text-sky-400',
	lemon: 'cosy:text-lime-600 cosy:dark:text-lime-400',
	orange: 'cosy:text-orange-600 cosy:dark:text-orange-400',
	cherry: 'cosy:text-rose-600 cosy:dark:text-rose-400',
	grape: 'cosy:text-purple-600 cosy:dark:text-purple-400',
	banana: 'cosy:text-yellow-600 cosy:dark:text-yellow-400',
	watermelon: 'cosy:text-pink-600 cosy:dark:text-pink-400',
	peach: 'cosy:text-orange-500 cosy:dark:text-orange-300',
	avocado: 'cosy:text-lime-700 cosy:dark:text-lime-300',
	coconut: 'cosy:text-stone-600 cosy:dark:text-stone-400',
	blueberry: 'cosy:text-indigo-600 cosy:dark:text-indigo-400',
	kiwi: 'cosy:text-green-600 cosy:dark:text-green-400',
	mint: 'cosy:text-teal-600 cosy:dark:text-teal-400',
	sand: 'cosy:text-yellow-500 cosy:dark:text-yellow-300',
	sunset: 'cosy:text-pink-600 cosy:dark:text-pink-400',
	lavender: 'cosy:text-purple-500 cosy:dark:text-purple-300',
	snow: 'cosy:text-gray-700 cosy:dark:text-gray-300',
};

// 哈希函数，将字符串映射为数字
const hashString = (str: string): number => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0; // 转为32位整数
	}
	return Math.abs(hash);
};

// 关键词到颜色key的映射
const mapKeywordToIconColor = (keyword: string): string => {
	const keys = Object.keys(iconColorMap);
	if (!keyword) return 'neutral';
	const hash = hashString(keyword.toLowerCase());
	const idx = hash % keys.length;
	return keys[idx];
};

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

// 根据关键词确定图标颜色
const iconColorKey = computed(() => mapKeywordToIconColor(props.courseName || allKeywords.value));
const iconColorClass = computed(() => iconColorMap[iconColorKey.value] || iconColorMap.neutral);
</script>

<template>
	<div
		:class="`cosy:opacity-80 hover:cosy:opacity-100 cosy:transition-all cosy:duration-300 cosy:ease-out hover:cosy:scale-105 cosy:animate-fade-in-scale ${props.iconSizeClasses}`">
		<SmartIcon :keyword="allKeywords" :class="`cosy:w-full cosy:h-full ${iconColorClass}`" />
	</div>
</template>

<style scoped>
@keyframes fade-in-scale {
	0% {
		opacity: 0;
		transform: scale(0.8) rotate(12deg);
	}

	100% {
		opacity: 1;
		transform: scale(1) rotate(0deg);
	}
}

.animate-fade-in-scale {
	animation: fade-in-scale 0.6s ease-out forwards;
}
</style>

