<template>
  <Card
    title=""
    :class="`cosy:review cosy:p-6 ${className} ${Array.isArray(classList) ? classList.join(' ') : classList || ''}`"
    v-bind="$attrs">
    <!-- 用户信息 -->
    <div class="cosy:flex cosy:items-center cosy:gap-3 cosy:mb-3">
      <!-- 用户头像 -->
      <Avatar :userName="userName" :avatar="avatar" size="md" />

      <!-- 用户名称和认证状态 -->
      <div class="cosy:flex-1">
        <div class="cosy:flex cosy:items-center cosy:gap-2 cosy:mb-1">
          <Text class="cosy:font-medium cosy:text-base-content">{{
            userName
          }}</Text>
          <Badge v-if="verified" variant="success" size="sm"> 已认证 </Badge>
        </div>
      </div>
    </div>

    <!-- 评分 -->
    <div class="cosy:flex cosy:items-center cosy:gap-1 cosy:mb-3">
      <SmartIcon
        v-for="(star, index) in starArray"
        :key="index"
        keyword="star"
        size="16px"
        :class="
          star.filled || star.half ? 'cosy:text-warning' : 'cosy:text-base-300'
        " />
    </div>

    <!-- 评论内容 -->
    <div class="cosy:mb-3">
      <Text class="cosy:text-base-content/80 cosy:leading-relaxed">
        {{ comment }}
      </Text>
    </div>

    <!-- 评价日期 -->
    <div v-if="date">
      <Text size="sm" class="cosy:text-base-content/50">
        {{ formattedDate }}
      </Text>
    </div>
  </Card>
</template>

<script setup lang="ts">
  /**
   * @component Review
   *
   * @description
   * Review 组件用于展示用户评价，支持评分、评论内容、用户信息和认证状态。
   * 适用于电商产品页面、服务评价、内容评论等场景。
   *
   * @design
   * 设计理念：
   * 1. 信息层次清晰 - 评分、用户信息、评论内容分层展示
   * 2. 信任感建立 - 通过认证标识和真实用户信息建立信任
   * 3. 视觉友好 - 合理的间距和排版，易于阅读
   * 4. 灵活配置 - 支持多种展示模式和自定义样式
   *
   * @usage
   * 基本用法：
   * ```vue
   * <Review
   *   userName="张先生"
   *   :rating="5"
   *   comment="产品非常好用，质量很棒！"
   *   date="2024-01-15"
   *   :verified="true"
   * />
   * ```
   *
   * 简化模式：
   * ```vue
   * <Review
   *   userName="李女士"
   *   :rating="4"
   *   comment="整体不错，推荐购买"
   * />
   * ```
   *
   * 自定义样式：
   * ```vue
   * <Review
   *   userName="王先生"
   *   :rating="5"
   *   comment="非常满意"
   *   class="cosy:border cosy:rounded-lg cosy:p-4"
   * />
   * ```
   *
   * @props
   * @prop {string} userName - 用户名称
   * @prop {number} rating - 评分（1-5）
   * @prop {string} comment - 评论内容
   * @prop {string} [date] - 评价日期
   * @prop {boolean} [verified] - 是否认证用户
   * @prop {string} [avatar] - 用户头像URL
   * @prop {string} [class] - 自定义类名
   * @prop {any} [class:list] - 类名列表
   */

  import { computed } from 'vue';
  import Text from '../text/Text.vue';
  import Badge from '../badge/Badge.vue';
  import SmartIcon from '../smart-icon/SmartIcon.vue';
  import Card from '../card/Card.vue';
  import Avatar from '../avatar/Avatar.vue';
  import type { IReviewProps } from './props';

  interface Props extends IReviewProps {
    class?: string;
    'class:list'?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    verified: false,
    class: '',
  });

  const { class: className, 'class:list': classList } = props;

  // 生成星级评分
  const starArray = computed(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      filled: i < Math.floor(props.rating),
      half: i === Math.floor(props.rating) && props.rating % 1 !== 0,
    }));
  });

  // 格式化日期
  const formattedDate = computed(() => {
    if (!props.date) return '';
    try {
      return new Date(props.date).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return props.date;
    }
  });
</script>
