<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: 'Feature Button',
  },
  size: {
    type: String,
    default: 'w-64',
    validator: (value: string) =>
      ['w-64', 'w-32', 'w-16', 'w-12', 'w-8'].includes(value),
  },
  lang: {
    type: String,
    default: 'en',
    validator: (value: string) => ['en', 'zh'].includes(value),
  },
  showTips: {
    type: Boolean,
    default: false,
  },
});

const isPopupVisible = ref(false);

const showPopup = () => {
  if (props.showTips) {
    isPopupVisible.value = true;
    setTimeout(hidePopup, 2000); // Auto-hide after 2 seconds
  }
};

const hidePopup = () => {
  isPopupVisible.value = false;
};
</script>
<template>
  <div>
    <!-- Button with hover effects -->
    <button
      :class="[
        'cosy:bg-cyan-500/20 cosy:text-cyan-500 cosy:border-cyan-500 cosy:border-2 cosy:hover:bg-cyan-500/30 cosy:hover:text-white cosy:hover:border-cyan-500/30 cosy:hover:scale-105 cosy:transition-all cosy:duration-300 cosy:rounded-2xl cosy:text-center cosy:backdrop-blur-lg cosy:text-2xl',
        props.size,
      ]"
      @click="showPopup"
    >
      <slot />
      {{ props.title }}
    </button>

    <!-- Popup message -->
    <Transition name="fade">
      <div
        v-if="isPopupVisible"
        class="cosy:fixed cosy:inset-0 cosy:flex cosy:items-center cosy:justify-center cosy:z-50"
        @click="hidePopup"
      >
        <div
          class="cosy:bg-black/80 cosy:backdrop-blur-sm cosy:p-6 cosy:rounded-xl cosy:text-white cosy:animate-popup"
        >
          {{
            lang === 'zh'
              ? '这是展示图，不支持操作'
              : 'This is a preview image, no operation is supported'
          }}
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-popup {
  animation: popup 0.3s ease-out;
}

@keyframes popup {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
