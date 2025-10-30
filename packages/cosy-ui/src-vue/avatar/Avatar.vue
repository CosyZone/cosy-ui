<script setup lang="ts">
  import { computed } from 'vue';
  import type { IAvatarPropsBase } from '../../src/components/avatar/avatarPropsBase';
  import {
    avatarSizeClasses,
    getAvatarColor,
    getAvatarInitial,
  } from '../../src/components/avatar/avatarUtils';

  /**
   * @component Avatar
   *
   * @description
   * Avatar 组件用于显示用户头像，支持真实头像和默认头像生成。
   * 当没有提供头像URL或头像加载失败时，自动生成带用户首字母的彩色圆形头像。
   *
   * @usage
   * 基本用法：
   * ```vue
   * <Avatar userName="张先生" />
   * ```
   *
   * 带真实头像：
   * ```vue
   * <Avatar userName="李女士" avatar="https://example.com/avatar.jpg" />
   * ```
   *
   * 不同尺寸：
   * ```vue
   * <Avatar userName="王先生" size="lg" />
   * ```
   *
   * @props
   * @prop {string} [userName] - 用户名称
   * @prop {string} [avatar] - 用户头像URL
   * @prop {'sm'|'md'|'lg'|'xl'} [size='md'] - 头像尺寸
   * @prop {string} [class] - 自定义类名
   * @prop {any} [class:list] - 类名列表
   */

  export interface IAvatarProps extends IAvatarPropsBase {
    class?: string;
    'class:list'?: any;
  }

  const props = withDefaults(defineProps<IAvatarProps>(), {
    size: 'md',
    class: '',
  });

  const sizeClass = computed(() => avatarSizeClasses[props.size || 'md']);
  const avatarColor = computed(() => getAvatarColor(props.userName));
</script>

<template>
  <div
    :class="[
      'cosy:avatar',
      'cosy:rounded-full',
      'cosy:overflow-hidden',
      'cosy:shrink-0',
      'cosy:bg-base-200',
      'cosy:flex',
      'cosy:items-center',
      'cosy:justify-center',
      sizeClass,
      props.class,
      props['class:list'],
    ]"
    v-bind="$attrs">
    <img
      v-if="avatar"
      :src="avatar"
      :alt="userName"
      class="cosy:w-full cosy:h-full cosy:object-cover"
      @error="handleImageError" />
    <!-- 默认头像 -->
    <div
      :class="[
        'cosy:w-full cosy:h-full',
        avatarColor,
        'cosy:text-white cosy:flex cosy:items-center cosy:justify-center cosy:font-semibold',
      ]"
      :style="avatar ? 'display: none;' : 'display: flex;'">
      {{ getAvatarInitial(userName) }}
    </div>
  </div>
</template>

<script lang="ts">
  // 处理图片加载错误
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement;
    const nextElement = img.nextElementSibling as HTMLElement;
    if (img) img.style.display = 'none';
    if (nextElement) nextElement.style.display = 'flex';
  };
</script>
