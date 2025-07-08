<template>
  <li
    :class="[
      'cosy:mb-2 cosy:rounded-md cosy:bg-base-300 cosy:p-2 cosy:flex cosy:items-center cosy:gap-3 cosy:hover:bg-accent/10 cosy:relative cosy:overflow-hidden',
      getAnimationClasses(),
    ]"
    @click="$emit('click')"
  >
    <div v-if="loading">
      <template v-if="duration">
        <div
          class="cosy:absolute cosy:left-0 cosy:top-0 cosy:h-full cosy:bg-accent/40 cosy:z-0 loading-bar"
          :style="{ animationDuration: duration + 'ms' }"
        ></div>
      </template>
    </div>
    <div
      class="cosy:relative cosy:z-10 cosy:w-full cosy:flex cosy:items-center cosy:gap-3"
    >
      <!-- 前置 loading 图标 -->
      <div
        v-if="loading && !duration && animationType === 'icon-left'"
        class="cosy:flex-shrink-0 cosy:transform-none"
        style="transform: none !important"
      >
        <div
          class="cosy:loading cosy:loading-spinner cosy:loading-sm cosy:text-accent"
        ></div>
      </div>

      <slot />

      <!-- 后置 loading 图标 -->
      <div
        v-if="loading && !duration && animationType === 'icon-right'"
        class="cosy:flex-shrink-0 cosy:ml-auto cosy:transform-none"
        style="transform: none !important"
      >
        <div
          class="cosy:loading cosy:loading-dots cosy:loading-sm cosy:text-accent"
        ></div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading?: boolean;
    duration?: number; // 进度条动画时长，毫秒
    animationType?:
      | 'ring'
      | 'icon-left'
      | 'icon-right'
      | 'breath'
      | 'pulse'
      | 'glow'; // 无限动画类型
  }>(),
  {
    loading: false,
    duration: undefined,
    animationType: 'ring',
  }
);

defineEmits(['click']);

// 根据动画类型生成对应的 CSS 类
const getAnimationClasses = () => {
  if (!props.loading || props.duration) return '';

  switch (props.animationType) {
    case 'ring':
      return 'cosy:ring-2 cosy:ring-accent ring-pulse-anim';
    case 'breath':
      return 'breath-anim';
    case 'pulse':
      return 'pulse-anim';
    case 'glow':
      return 'glow-anim';
    default:
      return 'cosy:ring-2 cosy:ring-accent ring-pulse-anim';
  }
};
</script>

<style scoped>
/* Ring 外环脉冲动画 */
@keyframes ring-pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
.ring-pulse-anim {
  animation: ring-pulse 1.5s ease-in-out infinite;
}

/* 背景色呼吸动画 */
@keyframes breath {
  0%,
  100% {
    background-color: hsl(var(--b3));
  }
  50% {
    background-color: hsl(var(--ac) / 0.1);
  }
}
.breath-anim {
  animation: breath 2s ease-in-out infinite;
}

/* 整体脉冲动画 */
@keyframes pulse-scale {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.01);
    opacity: 0.9;
  }
}
.pulse-anim {
  animation: pulse-scale 1.5s ease-in-out infinite;
}

/* 发光边框动画 */
@keyframes glow {
  0%,
  100% {
    box-shadow: 0 0 5px hsl(var(--ac) / 0.3);
  }
  50% {
    box-shadow:
      0 0 20px hsl(var(--ac) / 0.6),
      0 0 30px hsl(var(--ac) / 0.3);
  }
}
.glow-anim {
  animation: glow 2s ease-in-out infinite;
}

/* 进度条动画 */
.loading-bar {
  width: 0%;
  height: 100%;
  animation: loading-bar-anim linear forwards;
}
@keyframes loading-bar-anim {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
