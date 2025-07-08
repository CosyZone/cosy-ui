<template>
  <li
    class="cosy:mb-2 cosy:rounded-md cosy:bg-base-300 cosy:p-2 cosy:flex cosy:items-center cosy:gap-3 cosy:hover:bg-accent/10 cosy:relative cosy:overflow-hidden"
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

      <!-- 后置 loading 图标 -->
      <div
        v-if="loading && !duration"
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
