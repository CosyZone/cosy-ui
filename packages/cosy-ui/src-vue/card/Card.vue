<script setup lang="ts">
  import { computed } from 'vue';
  import Container from '../container/Container.vue';
  import { getCardCombinedClassesVue, getCardPaddingClassVue } from './class';
  import type { ICardProps } from './props';

  /**
   * @component Card
   * @description Vue 版本的 Card 组件，用于在页面中展示相关内容的容器，通常包含标题、描述和可选的图片
   * @props {string} title - 卡片标题（必填）
   * @props {string} [subtitle] - 卡片副标题或描述
   * @props {string} [imageUrl] - 卡片顶部图片的URL
   * @props {string} [href] - 如果提供，卡片将变成可点击的链接
   * @props {boolean} [compact=false] - 是否使用紧凑模式
   * @props {boolean} [muted=false] - 是否使用柔和色样式（未激活状态）
   * @props {ShadowSize} [shadow=xl] - 阴影大小
   * @props {string} [class] - 自定义CSS类，可用于覆盖默认样式
   */

  defineOptions({
    name: 'Card',
  });

  const props = withDefaults(defineProps<ICardProps>(), {
    class: '',
    compact: false,
    muted: false,
    shadow: 'xl',
  });

  // 从props中分离Container相关的属性和Card自身的属性
  const containerProps = computed(() => {
    const {
      // Container属性
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
      // Card属性
      class: className,
      compact,
      href,
      imageUrl,
      subtitle,
      title,
      ...rest
    } = props;

    return {
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
      class: className,
      ...rest,
    };
  });

  // Card自身的属性
  const cardProps = computed(() => {
    const {
      // Container属性
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
      // Card属性
      class: className,
      compact,
      href,
      imageUrl,
      subtitle,
      title,
      ...rest
    } = props;

    return {
      class: className,
      compact,
      href,
      imageUrl,
      subtitle,
      title,
      ...rest,
    };
  });

  // 使用共用的工具函数计算组合类名（不包括Container的类名）
  const cardClasses = computed(() =>
    getCardCombinedClassesVue(cardProps.value)
  );

  // 内容区域的padding类
  const contentPadding = computed(() =>
    getCardPaddingClassVue(cardProps.value.compact)
  );

  // 链接的目标属性
  const linkTarget = computed(() =>
    cardProps.value.href ? '_self' : undefined
  );
</script>

<template>
  <Container v-bind="containerProps">
    <component
      :is="cardProps.href ? 'a' : 'article'"
      :href="cardProps.href"
      :target="linkTarget"
      :class="cardClasses">
      <template v-if="cardProps.imageUrl">
        <figure class="not-prose cosy:m-0 cosy:p-0">
          <img
            :src="cardProps.imageUrl"
            :alt="cardProps.title"
            class="cosy:w-full cosy:h-48 cosy:object-cover cosy:rounded-t-lg" />
        </figure>
      </template>
      <div :class="['cosy:card-body', contentPadding]">
        <h2
          v-if="cardProps.title"
          class="cosy:card-title cosy:text-xl cosy:font-bold">
          {{ cardProps.title }}
        </h2>
        <p
          v-if="cardProps.subtitle"
          class="cosy:text-base-content/70 cosy:text-sm cosy:leading-relaxed">
          {{ cardProps.subtitle }}
        </p>
        <div v-if="$slots.default" class="cosy:mt-4">
          <slot />
        </div>
      </div>
    </component>
  </Container>
</template>
