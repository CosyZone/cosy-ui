<script setup lang="ts">
  import { computed } from 'vue';
  import type { IPlaceHolderProps } from './types';
  import { getBasePlaceholderClasses } from '../../src/components/placeholder/class-all';

  /**
   * @component PlaceHolder
   * @description 占位符组件，用于在布局中占用指定的空间，支持自定义宽度、高度、内边距和背景色
   * @usage
   * ```vue
   * <PlaceHolder width="md" height="lg" padding="md" background="base-200">
   *   <p>内容</p>
   * </PlaceHolder>
   * ```
   * @props
   * @prop {BackgroundColor} [background] - 背景色类型，支持所有预设背景色和透明度变体
   * @prop {boolean} [border=false] - 是否显示边框
   * @prop {string} [class] - 自定义 CSS 类名，用于添加额外的样式
   * @prop {string} [height='md'] - 高度尺寸，可选值：none、xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、full
   * @prop {boolean} [muted=false] - 是否使用柔和色背景
   * @prop {string} [padding='none'] - 内边距大小，可选值：none、xs、sm、md、lg、xl
   * @prop {string} [width='md'] - 宽度尺寸，可选值：none、xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、full
   * @slots
   * @slot default - 占位符内容
   */

  interface Props extends IPlaceHolderProps {}

  const props = withDefaults(defineProps<Props>(), {
    height: 'md',
    padding: 'none',
    width: 'md',
    border: false,
    muted: false,
  });

  // 使用新的类名计算方式
  const combinedClass = computed(() => {
    return getBasePlaceholderClasses({
      background: props.background,
      border: props.border,
      class: props.class,
      height: props.height,
      muted: props.muted,
      padding: props.padding,
      width: props.width,
    });
  });
</script>

<template>
  <div :class="combinedClass">
    <slot />
  </div>
</template>

<style scoped>
  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
  }
</style>
