<template>
  <div>
    <!-- Button with hover effects -->
    <button
      :class="[
        'bg-cyan-500/20 p-4 rounded-2xl text-center backdrop-blur-lg text-2xl transition-all duration-300 hover:scale-105 hover:bg-cyan-500/30',
        props.size
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
        class="fixed inset-0 flex items-center justify-center z-50"
        @click="hidePopup"
      >
        <div class="bg-black/80 backdrop-blur-sm p-6 rounded-xl text-white animate-popup">
          {{ lang === 'zh' ? '这是展示图，不支持操作' : 'This is a preview image, no operation is supported' }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Feature Button'
    },
    size: {
        type: String,
        default: 'w-64',
        validator: (value: string) => ['w-64', 'w-32', 'w-16', 'w-12', 'w-8'].includes(value)
    },
    lang: {
        type: String,
        default: 'en',
        validator: (value: string) => ['en', 'zh'].includes(value)
    },
    showTips: {
        type: Boolean,
        default: false
    }
})

const isPopupVisible = ref(false)

const showPopup = () => {
    if (props.showTips) {
        isPopupVisible.value = true
        setTimeout(hidePopup, 2000) // Auto-hide after 2 seconds
    }
}

const hidePopup = () => {
    isPopupVisible.value = false
}
</script>

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