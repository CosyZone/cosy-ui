<script setup lang="ts">
  import { computed } from 'vue';
  import Avatar from '../avatar/Avatar.vue';
  import Badge from '../badge/Badge.vue';
  import Card from '../card/Card.vue';
  import SmartIcon from '../smart-icon/SmartIcon.vue';
  import Text from '../text/Text.vue';
  import type { IReviewProps } from './props';

  interface Props extends /* @vue-ignore */ IReviewProps {
    class?: string;
    'class:list'?: any;
  }

  const props = withDefaults(defineProps<Props>(), {
    verified: false,
    class: '',
  });

  // 从props中分离Card相关的属性和Review自身的属性
  const {
    userName,
    rating,
    comment,
    date,
    verified,
    avatar,
    class: className,
    'class:list': classList,
    // Card属性
    aspectRatio,
    centered,
    contentCentered,
    flex,
    fit,
    gap,
    height,
    items,
    justify,
    margin,
    muted,
    padding,
    py,
    pt,
    pb,
    px,
    pl,
    pr,
    shadow,
    width,
    rounded,
    background,
    border,
    borderColor,
  } = props;

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

<template>
  <Card
    v-bind="{
      aspectRatio,
      centered,
      contentCentered,
      flex,
      fit,
      gap,
      height,
      items,
      justify,
      margin,
      muted,
      padding,
      py,
      pt,
      pb,
      px,
      pl,
      pr,
      width,
      rounded,
      background,
      border,
      borderColor,
      shadow,
    }"
    :class="[className, 'cosy:review', 'cosy:p-6']"
    :class:list="classList">
    <!-- 用户信息 -->
    <div class="cosy:flex cosy:items-center cosy:gap-3 cosy:mb-3">
      <!-- 用户头像 -->
      <Avatar :userName="userName" :avatar="avatar" size="md" />

      <!-- 用户名称和认证状态 -->
      <div class="cosy:flex-1">
        <div class="cosy:flex cosy:items-center cosy:gap-2 cosy:mb-1">
          <Text class="cosy:font-medium cosy:text-base-content">
            {{ userName }}
          </Text>
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
