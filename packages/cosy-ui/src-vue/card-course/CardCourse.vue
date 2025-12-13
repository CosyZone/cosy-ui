<script setup lang="ts">
import { computed } from "vue";
import {
	formatDisplayName,
	getContentPaddingClasses,
	getIconSizeClasses,
} from "../../src-astro/card-course/config";
import type { PaddingSize } from "../../src-astro/card-course/types";
import { SmartBg } from "../smart-bg";
import CardCourseButton from "./CardCourseButton.vue";
import CardCourseContent from "./CardCourseContent.vue";
import CardCourseIcon from "./CardCourseIcon.vue";

interface Props {
	/** 内容区域内边距，默认为 "lg" */
	contentPadding?: PaddingSize;
	/** 课程标题 */
	courseName: string;
	/** 课程描述 */
	description?: string;
	/** 课程链接 */
	href: string;
	/** 图标尺寸，默认为 "md" */
	iconSize?: "sm" | "md" | "lg" | "xl";
	/** 图标关键词数组，用于图标匹配 */
	keywords?: string[];
	/** 语言（"en" 或 "zh"） */
	lang: string;
}

const props = withDefaults(defineProps<Props>(), {
	contentPadding: "lg",
	description: "",
	iconSize: "md",
	keywords: () => [],
	lang: "zh",
});

const displayName = computed(() => formatDisplayName(props.courseName));
const iconSizeClasses = computed(() => getIconSizeClasses(props.iconSize));
const contentPaddingClasses = computed(() =>
	getContentPaddingClasses(props.contentPadding),
);
</script>

<template>
	<div
		ignore-heading
		class="cosy:card cosy:shadow-lg cosy:hover:shadow-2xl cosy:hover:scale-105 cosy:overflow-hidden cosy:relative cosy:group cosy:cursor-pointer cosy:transform cosy:ease-in-out cosy:transition-all cosy:duration-300 cosy:border cosy:border-base-content/30 cosy:backdrop-blur-sm">
		<!-- 背景 -->
		<SmartBg
			:keyword="props.courseName"
			class="cosy:relative cosy:z-10"
			:enable-gradient="true">
			<!-- 背景图标 -->
			<CardCourseIcon
				:course-name="props.courseName"
				:keywords="props.keywords"
				:icon-size-classes="iconSizeClasses" />

			<div
				:class="`cosy:card-body ${contentPaddingClasses} cosy:bg-base-100/30 cosy:relative cosy:z-10 cosy:h-full`">
				<!-- 内容区域 -->
				<CardCourseContent
					:display-name="displayName"
					:description="props.description" />

				<!-- 按钮区域 -->
				<div class="cosy:card-actions cosy:justify-start cosy:mt-4">
					<CardCourseButton :href="props.href" :lang="props.lang" :courseName="props.courseName" />
				</div>
			</div>
		</SmartBg>
	</div>
</template>

