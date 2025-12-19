<!--
@component CardCourse
@description 课程卡片组件，用于展示课程信息，具有统一的设计风格。支持动态图标和渐变背景。
@badge Vue
@tags Vue

@usage
  <CardCourse
    courseName="React 基础教程"
    lang="zh"
    href="/courses/react-basics"
  />
  <CardCourse
    courseName="Vue 进阶"
    lang="zh"
    href="/courses/vue"
    contentPadding="md"
  />
  <CardCourse
    courseName="AI 编程"
    lang="zh"
    href="/courses/ai"
    :keywords="['人工智能', '机器学习', 'Python']"
  />

- 禁用缩放和阴影效果
  <CardCourse
    courseName="Static Course"
    lang="zh"
    href="/courses/static"
    :scale-effect="false"
    shadow-effect="none"
  />

- 自定义阴影效果
  <CardCourse
    courseName="Shadow Course"
    lang="zh"
    href="/courses/shadow"
    shadow-effect="2xl"
  />

- 自定义图标
  <CardCourse courseName="Custom Course" lang="zh" href="/courses/custom">
    <template #icon>
      <img src="/custom-icon.svg" alt="Custom Icon" class="w-16 h-16" />
    </template>
  </CardCourse>
-->
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
	/** 悬停缩放效果比例（100表示无缩放），默认为 105 */
	scaleEffect?: 95 | 100 | 105 | 110 | 115;
	/** 阴影效果配置，默认为 "lg" */
	shadowEffect?: boolean | "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";
}

const props = withDefaults(defineProps<Props>(), {
	contentPadding: "lg",
	description: "",
	iconSize: "md",
	keywords: () => [],
	lang: "zh",
	scaleEffect: 105,
	shadowEffect: "lg",
});

// 获取阴影效果class
const getShadowClasses = (shadowEffect: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'): string => {
	if (shadowEffect === false || shadowEffect === 'none') {
		return '';
	}

	const shadowMap = {
		sm: 'cosy:shadow-sm cosy:hover:shadow-md',
		md: 'cosy:shadow-md cosy:hover:shadow-lg',
		lg: 'cosy:shadow-lg cosy:hover:shadow-2xl',
		xl: 'cosy:shadow-xl cosy:hover:shadow-2xl',
		'2xl': 'cosy:shadow-2xl cosy:hover:shadow-2xl',
		inner: 'cosy:shadow-inner',
	};

	return shadowMap[shadowEffect as keyof typeof shadowMap] || shadowMap.lg;
};

// 获取缩放效果class
const getScaleClasses = (scaleEffect: 95 | 100 | 105 | 110 | 115): string => {
	if (scaleEffect === 100) {
		return '';
	}

	const scaleMap = {
		95: 'cosy:hover:scale-95',
		105: 'cosy:hover:scale-105',
		110: 'cosy:hover:scale-110',
		115: 'cosy:hover:scale-115',
	};

	return scaleMap[scaleEffect] || 'cosy:hover:scale-105';
};

const displayName = computed(() => formatDisplayName(props.courseName));
const iconSizeClasses = computed(() => getIconSizeClasses(props.iconSize));
const contentPaddingClasses = computed(() =>
	getContentPaddingClasses(props.contentPadding),
);
const shadowClasses = computed(() => getShadowClasses(props.shadowEffect));
const scaleClasses = computed(() => getScaleClasses(props.scaleEffect));
</script>

<template>
	<div
		ignore-heading
		:class="`cosy:card ${shadowClasses} ${scaleClasses} cosy:overflow-hidden cosy:relative cosy:group cosy:cursor-pointer cosy:transform cosy:ease-in-out cosy:transition-all cosy:duration-300 cosy:border cosy:border-base-content/30 cosy:backdrop-blur-sm`">
		<!-- 背景 -->
		<SmartBg
			:keyword="props.courseName"
			class="cosy:relative cosy:z-10"
			:enable-gradient="true">
			<!-- 网格背景 -->
			<div
				class="cosy:absolute cosy:inset-0 cosy:opacity-15"
				style="background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px); background-size: 20px 20px;">
			</div>

			<div
				:class="`cosy:card-body ${contentPaddingClasses} cosy:bg-base-100/30 cosy:relative cosy:z-10 cosy:h-full cosy:flex cosy:flex-row cosy:flex-nowrap cosy:items-center cosy:gap-6`">
				<!-- 左侧：图标 -->
				<div class="cosy:shrink-0">
					<slot name="icon">
						<CardCourseIcon
							:course-name="props.courseName"
							:keywords="props.keywords"
							:icon-size-classes="iconSizeClasses" />
					</slot>
				</div>

				<!-- 右侧：内容和按钮 -->
				<div
					class="cosy:flex-1 cosy:flex cosy:flex-col cosy:justify-center cosy:gap-4">
					<!-- 内容区域 -->
					<CardCourseContent
						:display-name="displayName"
						:description="props.description" />

					<!-- 按钮区域 -->
					<div class="cosy:card-actions cosy:justify-end cosy:mt-2">
						<CardCourseButton :href="props.href" :lang="props.lang" :courseName="props.courseName" />
					</div>
				</div>
			</div>
		</SmartBg>
	</div>
</template>

