<template>
  <li
    class="cosy:mb-2 cosy:rounded-md cosy:bg-base-300 cosy:p-2 cosy:flex cosy:items-center cosy:gap-3 cosy:hover:bg-accent/10 cosy:relative cosy:overflow-hidden"
    @click="$emit('click')"
  >
    <div
      v-if="loading"
      class="cosy:absolute cosy:left-0 cosy:top-0 cosy:h-full cosy:bg-accent/40 cosy:z-0 loading-bar"
      :style="{ animationDuration: duration + 'ms' }"
    ></div>
    <div
      class="cosy:relative cosy:z-10 cosy:w-full cosy:flex cosy:items-center cosy:gap-3"
    >
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue';

withDefaults(
  defineProps<{
    loading?: boolean;
    duration?: number; // 进度条动画时长，毫秒
  }>(),
  {
    loading: false,
    duration: 1500,
  }
);

defineEmits(['click']);
</script>

<style scoped>
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
