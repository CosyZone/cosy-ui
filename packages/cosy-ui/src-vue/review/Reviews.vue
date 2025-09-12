<template>
  <div
    :class="['cosy:reviews-container', className, classList]"
    v-bind="$attrs"
  >
    <!-- 标题和统计信息 -->
    <div v-if="title || showStats" class="cosy:mb-6">
      <Heading v-if="title" :level="2" class="cosy:mb-4 cosy:font-semibold">
        {{ title }}
      </Heading>

      <div
        v-if="showStats && stats"
        class="cosy:flex cosy:items-center cosy:gap-6 cosy:mb-4"
      >
        <!-- 总体评分 -->
        <div class="cosy:flex cosy:items-center cosy:gap-2">
          <Text size="3xl" class="cosy:font-bold cosy:text-primary">
            {{ stats.averageRating.toFixed(1) }}
          </Text>
          <div class="cosy:flex cosy:items-center cosy:gap-1">
            <SmartIcon
              v-for="(star, index) in averageStarArray"
              :key="index"
              keyword="star"
              size="20px"
              :class="
                star.filled || star.half
                  ? 'cosy:text-warning'
                  : 'cosy:text-base-300'
              "
            />
          </div>
          <Text class="cosy:text-base-content/60">
            ({{ stats.totalReviews }} 评价)
          </Text>
        </div>
      </div>
    </div>

    <!-- 评价列表 -->
    <Grid v-if="layout === 'grid'" :cols="columns" gap="lg">
      <Review
        v-for="review in displayReviews"
        :key="`${review.userName}-${review.date}`"
        :userName="review.userName"
        :rating="review.rating"
        :comment="review.comment"
        :date="review.date"
        :verified="review.verified"
        :avatar="review.avatar"
      />
    </Grid>
    <div v-else class="cosy:space-y-4">
      <Review
        v-for="review in displayReviews"
        :key="`${review.userName}-${review.date}`"
        :userName="review.userName"
        :rating="review.rating"
        :comment="review.comment"
        :date="review.date"
        :verified="review.verified"
        :avatar="review.avatar"
      />
    </div>
  </div>
</template>

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
 *   :columns="{ base: 1, md: 2, lg: 3 }"
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

import { computed } from 'vue';
import Text from '../text/Text.vue';
import Heading from '../heading/Heading.vue';
import Grid from '../grid/Grid.vue';
import SmartIcon from '../smart-icon/SmartIcon.vue';
import type { ReviewsProps, ReviewData } from './types';
import Review from './Review.vue';

interface Props extends ReviewsProps {
  class?: string;
  'class:list'?: any;
}

const props = withDefaults(defineProps<Props>(), {
  showStats: false,
  layout: 'grid',
  columns: () => ({ base: 1, md: 2, lg: 3 }),
  class: '',
});

const { class: className, 'class:list': classList } = props;

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
          .length
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
</script>
