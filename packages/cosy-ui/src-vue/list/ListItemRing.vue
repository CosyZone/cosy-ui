<template>
  <li
    :class="[
      'cosy:mb-2 cosy:rounded-md cosy:bg-base-300 cosy:p-2 cosy:flex cosy:items-center cosy:gap-3 cosy:hover:bg-accent/10 cosy:relative cosy:overflow-hidden',
      loading && !duration
        ? 'cosy:ring-2 cosy:ring-accent ring-pulse-anim'
        : '',
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
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    loading?: boolean;
    duration?: number;
  }>(),
  {
    loading: false,
    duration: undefined,
  }
);

defineEmits(['click']);
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
