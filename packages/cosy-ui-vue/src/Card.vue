<script setup lang="ts">
  import { computed } from 'vue';
  import Container from './Container.vue';
  import type { ICardProps } from '../internal/components/card/props';

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

  // 从 props 中分离 Container 相关的属性和 Card 自身的属性
  const containerProps = computed(() => {
    const {
      // Container 属性
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
      // Card 属性
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

  // Card 根元素（内部 article/a）的 BEM 类名（与 Card.astro 一致）
  const cardClasses = computed(() =>
    [
      'cosy-card',
      props.compact ? 'cosy-card--compact' : '',
      props.href ? 'cosy-card--clickable' : '',
    ]
      .filter(Boolean)
      .join(' ')
  );

  // 链接的目标属性
  const linkTarget = computed(() =>
    props.href ? '_self' : undefined
  );
</script>

<template>
  <Container v-bind="containerProps">
    <component
      :is="props.href ? 'a' : 'article'"
      :href="props.href"
      :target="linkTarget"
      :class="cardClasses">
      <template v-if="props.imageUrl">
        <figure class="cosy-card__media">
          <img
            :src="props.imageUrl"
            :alt="props.title || ''"
            class="cosy-card__img" />
        </figure>
      </template>
      <div class="cosy-card__body">
        <h2
          v-if="props.title"
          class="cosy-card__title">
          {{ props.title }}
        </h2>
        <p
          v-if="props.subtitle"
          class="cosy-card__subtitle">
          {{ props.subtitle }}
        </p>
        <div v-if="$slots.default" class="cosy-card__content">
          <slot />
        </div>
      </div>
    </component>
  </Container>
</template>

<style>
  /* Card - 原生 CSS 实现（与 Card.astro 一致，daisyui corporate 主题色） */
  .cosy-card {
    --cosy-card-base-content: #1d1d1d;

    box-sizing: border-box;
    display: block;
    width: 100%;
    transition: all 300ms ease-in-out;
    color: var(--cosy-card-base-content);
  }

  .cosy-card--clickable {
    cursor: pointer;
    text-decoration: none;
  }
  .cosy-card--clickable:hover {
    transform: scale(1.05);
  }

  .cosy-card__media {
    margin: 0;
    padding: 0;
  }
  .cosy-card__img {
    display: block;
    width: 100%;
    height: 12rem;
    object-fit: cover;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .cosy-card__body {
    padding: 1.5rem;
  }
  .cosy-card--compact .cosy-card__body {
    padding: 1rem;
  }

  .cosy-card__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--cosy-card-base-content);
  }

  .cosy-card__subtitle {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    line-height: 1.625;
    color: color-mix(in srgb, var(--cosy-card-base-content) 70%, transparent);
  }

  .cosy-card__content {
    margin-top: 1rem;
  }
</style>
