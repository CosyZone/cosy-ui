<template>
  <li
    :class="[
      'cosy:mb-2 cosy:rounded-md cosy:bg-base-300 cosy:p-2 cosy:flex cosy:items-center cosy:gap-3 cosy:hover:bg-accent/10 cosy:relative cosy:overflow-hidden',
      loading && !duration ? 'glow-anim' : '',
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
/* 发光边框动画 */
@keyframes glow {
  0%,
  100% {
    border: 1px solid rgb(139 92 246 / 0.3);
    box-shadow: 0 0 5px rgb(139 92 246 / 0.3);
  }
  50% {
    border: 1px solid rgb(139 92 246 / 0.8);
    box-shadow:
      0 0 20px rgb(139 92 246 / 0.6),
      0 0 30px rgb(139 92 246 / 0.4),
      inset 0 0 10px rgb(139 92 246 / 0.2);
  }
}
.glow-anim {
  animation: glow 2s ease-in-out infinite;
  border: 1px solid rgb(139 92 246 / 0.3); /* 确保有初始边框 */
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
