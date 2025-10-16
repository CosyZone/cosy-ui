<script setup lang="ts">
/**
 * @component Reviews
 *
 * @description
 * Reviews 组件用于展示多个用户评价，支持网格布局、评分统计和筛选功能。
 * 适用于产品评价页面、服务评价展示等场景。
 *
 * @design
 * 设计理念：
 * 1. 批量展示 - 高效展示多个评价，支持分页和筛选
 * 2. 统计信息 - 显示总体评分和评价分布
 * 3. 灵活布局 - 支持网格和列表两种布局模式
 * 4. 用户友好 - 提供排序和筛选功能
 *
 * @usage
 * 基本用法：
 * ```vue
 * <Reviews
 *   :reviews="reviewsData"
 *   title="用户评价"
 *   :showStats="true"
 * />
 * ```
 *
 * 网格布局：
 * ```vue
 * <Reviews
 *   :reviews="reviewsData"
 *   layout="grid"
 *   :columns="{ base: 1, md: 2, lg: 3 }
 * />
 * ```
 *
 * 自定义样式：
 * ```vue
 * <Reviews
 *   :reviews="reviewsData"
 *   class="cosy:bg-base-200 cosy:p-6"
 * />
 * ```
 *
 * @props
 * @prop {ReviewData[]} reviews - 评价数据数组
 * @prop {string} [title] - 标题
 * @prop {boolean} [showStats] - 是否显示统计信息
 * @prop {'grid' | 'list'} [layout] - 布局模式
 * @prop {Object} [columns] - 网格列数配置
 * @prop {number} [maxReviews] - 最大显示评价数
 * @prop {string} [class] - 自定义类名
 * @prop {any} [class:list] - 类名列表
 */

import { computed } from "vue";
import Text from "../text/Text.vue";
import Heading from "../heading/Heading.vue";
import Grid from "../grid/Grid.vue";
import SmartIcon from "../smart-icon/SmartIcon.vue";
import type { IReviewsProps, IReviewData } from "./props";
import Review from "./Review.vue";

// 定义与 Grid 组件相同的响应式值类型
type ResponsiveValue<T> =
	| T
	| {
			base?: T;
			sm?: T;
			md?: T;
			lg?: T;
			xl?: T;
			"2xl"?: T;
	  };

interface Props extends IReviewsProps {
	class?: string;
	"class:list"?: any;
}

const props = withDefaults(defineProps<Props>(), {
	showStats: false,
	layout: "grid",
	columns: () => ({ base: 1, md: 2, lg: 3 }),
	class: "",
});

const { class: className, "class:list": classList } = props;

// 计算统计信息
const stats = computed(() => {
	if (!props.showStats) return null;
	return {
		averageRating:
			props.reviews.reduce((sum, review) => sum + review.rating, 0) /
			props.reviews.length,
		totalReviews: props.reviews.length,
		ratingDistribution: Array.from(
			{ length: 5 },
			(_, i) =>
				props.reviews.filter((review) => Math.floor(review.rating) === i + 1)
					.length,
		),
	};
});

// 限制显示的评价数量
const displayReviews = computed(() => {
	return props.maxReviews
		? props.reviews.slice(0, props.maxReviews)
		: props.reviews;
});

// 生成平均评分的星级
const averageStarArray = computed(() => {
	if (!stats.value) return [];
	return Array.from({ length: 5 }, (_, i) => ({
		filled: i < Math.floor(stats.value!.averageRating),
		half:
			i === Math.floor(stats.value!.averageRating) &&
			stats.value!.averageRating % 1 !== 0,
	}));
});

// 为 Grid 组件计算列数，确保类型匹配
const gridColumns = computed(() => {
	const cols: ResponsiveValue<number> = {
		base: props.columns?.base,
		sm: props.columns?.sm,
		md: props.columns?.md,
		lg: props.columns?.lg,
		xl: props.columns?.xl,
		"2xl": props.columns?.["2xl"],
	};
	return cols;
});
</script>

<template>
  <div :class="['cosy:w-full', className]" :class:list="classList">
    <!-- 标题 -->
    <Heading v-if="title" level="h2" class="cosy:mb-6">
      {{ title }}
    </Heading>

    <!-- 统计信息 -->
    <div
      v-if="stats"
      class="cosy:flex cosy:flex-col md:cosy:flex-row md:cosy:items-center md:cosy:justify-between cosy:gap-6 cosy:mb-8">
      <div class="cosy:flex cosy:items-center cosy:gap-4">
        <Text variant="h1" class="cosy:text-5xl cosy:font-bold">
          {{ stats.averageRating.toFixed(1) }}
        </Text>
        <div>
          <div class="cosy:flex cosy:items-center cosy:gap-1">
            <SmartIcon
              v-for="(star, index) in averageStarArray"
              :key="index"
              :name="
                star.filled ? 'star-filled' : star.half ? 'star-half' : 'star'
              "
              class="cosy:w-5 cosy:h-5 cosy:text-yellow-400" />
          </div>
          <Text variant="small" class="cosy:text-gray-500">
            {{ stats.totalReviews }} 条评价
          </Text>
        </div>
      </div>

      <!-- 评分分布 -->
      <div class="cosy:space-y-1">
        <div
          v-for="(count, index) in stats.ratingDistribution"
          :key="index"
          class="cosy:flex cosy:items-center cosy:gap-2">
          <Text variant="small" class="cosy:w-8">{{ 5 - index }}星</Text>
          <div class="cosy:flex-1 cosy:h-2 cosy:bg-gray-200 cosy:rounded-full">
            <div
              class="cosy:h-full cosy:bg-yellow-400 cosy:rounded-full"
              :style="{
                width:
                  stats.totalReviews > 0
                    ? (count / stats.totalReviews) * 100 + '%'
                    : '0%',
              }"></div>
          </div>
          <Text variant="small" class="cosy:w-8">{{ count }}</Text>
        </div>
      </div>
    </div>

    <!-- 评价列表 -->
    <Grid v-if="layout === 'grid'" v-bind="gridColumns" class="cosy:gap-6">
      <Review
        v-for="(review, index) in displayReviews"
        :key="index"
        v-bind="review" />
    </Grid>
    <div v-else class="cosy:space-y-6">
      <Review
        v-for="(review, index) in displayReviews"
        :key="index"
        v-bind="review" />
    </div>
  </div>
</template>
