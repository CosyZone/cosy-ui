<script setup lang="ts">
import { computed, h } from "vue";
import FacebookIcon from "../icons/FacebookIcon.vue";
import GithubIcon from "../icons/GithubIcon.vue";
import LinkedinIcon from "../icons/LinkedinIcon.vue";
import TwitterIcon from "../icons/TwitterIcon.vue";

interface Props {
	/**
	 * 社交媒体平台名称
	 * @default "github"
	 */
	platform: string;
	/**
	 * 图标的大小
	 * @default "md"
	 */
	size?: "sm" | "md" | "lg" | "xl";
	/**
	 * 图标的颜色
	 * @default "currentColor"
	 */
	color?: string;
	/**
	 * 自定义类名
	 */
	class?: string;
}

const props = withDefaults(defineProps<Props>(), {
	platform: "github",
	size: "md",
	color: "currentColor",
	class: "",
});

// 根据平台名称选择对应的图标组件
const getIconComponent = computed(() => {
	const platformLower = props.platform.toLowerCase();

	switch (platformLower) {
		case "github":
			return GithubIcon;
		case "twitter":
			return TwitterIcon;
		case "linkedin":
			return LinkedinIcon;
		case "facebook":
			return FacebookIcon;
		default:
			return GithubIcon; // 默认使用 GitHub 图标
	}
});

// 构建社交图标的类名
const socialIconClass = computed(() => {
	return `social-icon social-icon-${props.platform.toLowerCase()} ${props.class}`;
});

// 将 size 转换为实际的像素值
const iconSize = computed(() => {
	const sizeMap: Record<string, string> = {
		sm: "16px",
		md: "24px",
		lg: "32px",
		xl: "48px",
	};
	return sizeMap[props.size] || "24px";
});
</script>

<template>
    <component :is="getIconComponent" :size="iconSize" :color="color" :class="socialIconClass" />
</template>
