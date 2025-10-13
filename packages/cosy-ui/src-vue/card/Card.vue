<script setup lang="ts">
  import { computed } from 'vue';
  import type { ICardProps } from './props';
  import { getCardCombinedClassesVue, getCardPaddingClassVue } from './class';

  /**
   * @component Card
   * @description Vue 版本的 Card 组件，用于在页面中展示相关内容的容器，通常包含标题、描述和可选的图片
   * @props {string} title - 卡片标题（必填）
   * @props {string} [subtitle] - 卡片副标题或描述
   * @props {string} [imageUrl] - 卡片顶部图片的URL
   * @props {string} [href] - 如果提供，卡片将变成可点击的链接
   * @props {boolean} [compact=false] - 是否使用紧凑模式
   * @props {string} [class] - 自定义CSS类，可用于覆盖默认样式
   */

  defineOptions({
    name: 'Card',
  });

  const props = withDefaults(defineProps<ICardProps>(), {
    class: '',
    compact: false,
  });

  // 使用共用的工具函数计算组合类名
  const cardClasses = computed(() => getCardCombinedClassesVue(props));

  // 内容区域的padding类
  const contentPadding = computed(() => getCardPaddingClassVue(props.compact));

  // 链接的目标属性
  const linkTarget = computed(() => (props.href ? '_self' : undefined));
</script>

<template>
  <component
    :is="props.href ? 'a' : 'article'"
    :href="props.href"
    :target="linkTarget"
    :class="cardClasses">
    <template v-if="props.imageUrl">
      <figure class="not-prose cosy:m-0 cosy:p-0">
        <img
          :src="props.imageUrl"
          :alt="props.title"
          class="cosy:w-full cosy:h-48 cosy:object-cover cosy:rounded-t-lg" />
      </figure>
    </template>
    <div :class="['cosy:card-body', contentPadding]">
      <h2 class="cosy:card-title cosy:text-xl cosy:font-bold">
        {{ props.title }}
      </h2>
      <p
        v-if="props.subtitle"
        class="cosy:text-base-content/70 cosy:text-sm cosy:leading-relaxed">
        {{ props.subtitle }}
      </p>
      <div v-if="$slots.default" class="cosy:mt-4">
        <slot />
      </div>
    </div>
  </component>
</template>
