<script setup lang="ts">
import { computed } from "vue";
import { Button } from "../button";

interface Props {
	href: string;
	lang: string;
	courseName?: string;
	ariaLabel?: string;
}

const props = defineProps<Props>();

// 如果没有提供 ariaLabel，则根据 lang 和 courseName 生成默认值
const buttonAriaLabel = computed(() => {
	if (props.ariaLabel) {
		return props.ariaLabel;
	}
	
	if (props.courseName) {
		return props.lang === 'en' 
			? `Start learning ${props.courseName}`
			: `开始学习 ${props.courseName} 课程`;
	}
	
	return props.lang === 'en' ? 'Start learning' : '开始学习';
});
</script>

<template>
	<Button :href="props.href" variant="primary" size="md" :aria-label="buttonAriaLabel">
		{{ props.lang === "en" ? "Start Learning" : "开始学习" }}
	</Button>
</template>

