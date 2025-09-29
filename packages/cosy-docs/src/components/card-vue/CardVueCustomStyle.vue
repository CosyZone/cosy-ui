<script setup lang="ts">
import { Card } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Card title="自定义样式" subtitle="使用 class 属性自定义样式"
            class="cosy:bg-gradient-to-r cosy:from-blue-500 cosy:to-purple-600 cosy:text-white">
            自定义样式的卡片
        </Card>
    </div>
</template>
