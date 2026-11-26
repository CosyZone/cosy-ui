<script lang="ts">
  /**
   * @component Avatar
   *
   * @description
   * Avatar 组件用于显示用户头像，支持真实头像和默认头像生成。
   * 当没有提供头像URL或头像加载失败时，自动生成带用户首字母的彩色圆形头像。
   *
   * @props
   * @prop {string} [userName] - 用户名称
   * @prop {string} [avatar] - 用户头像URL
   * @prop {'sm'|'md'|'lg'|'xl'} [size='md'] - 头像尺寸
   * @prop {string} [class] - 自定义类名
   */
  export interface IAvatarProps {
    userName?: string;
    avatar?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    class?: string;
    'class:list'?: any;
  }

  // 处理图片加载错误
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const nextElement = img.nextElementSibling as HTMLElement;
    if (img) img.style.display = 'none';
    if (nextElement) nextElement.style.display = 'flex';
  };
</script>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = withDefaults(defineProps<IAvatarProps>(), {
    size: 'md',
    class: '',
  });

  /** 头像背景色（daisyui corporate 主题色索引，与 Astro 端一致） */
  const avatarColorClasses = [
    'cosy-avatar__fallback--c0',
    'cosy-avatar__fallback--c1',
    'cosy-avatar__fallback--c2',
    'cosy-avatar__fallback--c3',
    'cosy-avatar__fallback--c4',
    'cosy-avatar__fallback--c5',
    'cosy-avatar__fallback--c6',
  ];

  const sizeClassMap: Record<string, string> = {
    sm: 'cosy-avatar--sm',
    md: 'cosy-avatar--md',
    lg: 'cosy-avatar--lg',
    xl: 'cosy-avatar--xl',
  };

  const sizeClass = computed(() => sizeClassMap[props.size || 'md']);

  const fallbackColorClass = computed(() => {
    if (!props.userName) return avatarColorClasses[0];
    const index = props.userName.charCodeAt(0) % avatarColorClasses.length;
    return avatarColorClasses[index];
  });

  const avatarInitial = computed(() =>
    props.userName ? props.userName.charAt(0).toUpperCase() : '?',
  );

  const containerClass = computed(() =>
    ['cosy-avatar', sizeClass.value, props.class]
      .filter(Boolean)
      .join(' '),
  );
</script>

<template>
  <div :class="containerClass" v-bind="$attrs">
    <img
      v-if="avatar"
      :src="avatar"
      :alt="userName"
      class="cosy-avatar__image"
      @error="handleImageError" />
    <!-- 默认头像（首字母） -->
    <div
      :class="['cosy-avatar__fallback', fallbackColorClass]"
      :style="avatar ? 'display: none;' : 'display: flex;'">
      {{ avatarInitial }}
    </div>
  </div>
</template>

<style>
  /* Avatar - 原生 CSS 实现（与 Avatar.astro 一致，daisyui corporate 主题色） */
  .cosy-avatar {
    --cosy-avatar-primary: var(--color-primary, #4b6bfb);
    --cosy-avatar-secondary: var(--color-secondary, #7b92b2);
    --cosy-avatar-accent: var(--color-accent, #67baa3);
    --cosy-avatar-info: var(--color-info, #2563eb);
    --cosy-avatar-success: var(--color-success, #16a34a);
    --cosy-avatar-warning: var(--color-warning, #d97706);
    --cosy-avatar-error: var(--color-error, #dc2626);
    --cosy-avatar-base-200: var(--color-base-200, #e9e9e9);

    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    border-radius: 9999px;
    background: var(--cosy-avatar-base-200);
    font-weight: 600;
  }

  .cosy-avatar--sm { width: 2rem; height: 2rem; font-size: 0.875rem; }
  .cosy-avatar--md { width: 3rem; height: 3rem; font-size: 1.125rem; }
  .cosy-avatar--lg { width: 4rem; height: 4rem; font-size: 1.25rem; }
  .cosy-avatar--xl { width: 5rem; height: 5rem; font-size: 1.5rem; }

  .cosy-avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cosy-avatar__fallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .cosy-avatar__fallback--c0 { background: var(--cosy-avatar-primary); }
  .cosy-avatar__fallback--c1 { background: var(--cosy-avatar-secondary); }
  .cosy-avatar__fallback--c2 { background: var(--cosy-avatar-accent); }
  .cosy-avatar__fallback--c3 { background: var(--cosy-avatar-info); }
  .cosy-avatar__fallback--c4 { background: var(--cosy-avatar-success); }
  .cosy-avatar__fallback--c5 { background: var(--cosy-avatar-warning); }
  .cosy-avatar__fallback--c6 { background: var(--cosy-avatar-error); }
</style>
