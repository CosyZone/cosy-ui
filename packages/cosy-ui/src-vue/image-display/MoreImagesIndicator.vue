<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component MoreImagesIndicator
 * @description 更多图片提示组件，显示超出最大显示数量的图片数量
 */

interface IMoreImagesIndicatorProps {
  totalCount: number;
  maxDisplay: number;
  size: 'sm' | 'md' | 'lg';
}

const props = defineProps<IMoreImagesIndicatorProps>();

// 获取尺寸类名
const getSizeClasses = () => {
  const sizeMap = {
    sm: 'cosy:w-12 cosy:h-12',
    md: 'cosy:w-16 cosy:h-16',
    lg: 'cosy:w-24 cosy:h-24',
  };
  return sizeMap[props.size];
};

// 计算超出数量
const overflowCount = computed(() => props.totalCount - props.maxDisplay);
</script>

<template>
  <div
    :class="`${getSizeClasses()} cosy:bg-base-100 cosy:rounded cosy:border cosy:border-base-300 cosy:flex cosy:items-center cosy:justify-center`"
  >
    <div class="cosy:text-center">
      <div class="cosy:text-base-content/60 cosy:text-xs">
        +{{ overflowCount }}
      </div>
      <div class="cosy:text-base-content/40 cosy:text-xs">更多</div>
    </div>
  </div>
</template>
