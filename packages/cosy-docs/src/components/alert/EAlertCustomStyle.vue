<template>
  <Alert
    type="info"
    title="自定义样式"
    class="cosy:border-2 cosy:border-blue-500 cosy:shadow-lg"
  >
    通过 class 属性可以自定义 Alert 的样式
  </Alert>
</template>

<script setup lang="ts">
import { Alert } from '@coffic/cosy-ui/vue';
</script>
