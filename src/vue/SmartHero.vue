<template>
  <div
    class="py-16 px-8 text-center w-full min-h-screen relative overflow-hidden
               "
  >
    <div class="relative z-10  rounded-lg w-full h-full">
      <template v-if="image.src">
        <img
          :src="image.src"
          :alt="image.alt"
          class="h-1/2 mx-auto mb-8 drop-shadow-xl"
        >
      </template>

      <h2 class="text-4xl mb-4 animate-fade-up">
        {{ title }}
      </h2>
      <p class="text-lg mb-12 text-center max-w-2xl mx-auto">
        {{ description }}
      </p>

      <div class="my-12 w-full">
        <slot name="app" />
      </div>

      <div class="flex flex-row justify-center gap-8 mx-auto w-full">
        <a
          v-for="link in links"
          :key="link.text"
          :href="link.href"
          target="_blank"
          class="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium
                           transition-all duration-300 ease-in-out
                           hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                           active:bg-blue-800 active:translate-y-0"
        >
          {{ link.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface Link {
    text: string;
    href: string;
}

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: false,
        default: () => ({
            src: '',
            alt: ''
        })
    },
    links: {
        type: Array as PropType<Link[]>,
        required: true,
        default: () => []
    }
})
</script>

<style scoped>
@keyframes fade-up {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-up {
    animation: fade-up 0.8s ease-out forwards;
}
</style>
