<!-- 简单的Vue计数器组件 -->
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
    count.value++;
};

const decrement = () => {
    count.value--;
};
</script>

<template>
    <div class="cosy:p-4 cosy:bg-base-200 cosy:rounded-lg cosy:shadow-md cosy:max-w-xs cosy:mx-auto">
        <h2 class="cosy:text-xl cosy:font-bold cosy:mb-4 cosy:text-center">Vue 计数器测试</h2>
        <div class="cosy:flex cosy:items-center cosy:justify-center cosy:gap-4">
            <button @click="decrement" class="cosy:btn cosy:btn-primary">
                -
            </button>
            <span class="cosy:text-2xl cosy:font-bold">{{ count }}</span>
            <button @click="increment" class="cosy:btn cosy:btn-primary">
                +
            </button>
        </div>
    </div>
</template>
