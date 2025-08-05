<template>
    <Alert type="info" title="自定义样式" class="custom-alert">
        通过 class 属性可以自定义 Alert 的样式
    </Alert>
</template>

<script setup lang="ts">
import { Alert } from '@coffic/cosy-ui/vue';
</script>

<style scoped>
.custom-alert {
    border: 2px solid #3b82f6;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
