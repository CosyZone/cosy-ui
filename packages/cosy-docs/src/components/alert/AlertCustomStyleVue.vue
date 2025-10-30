<script setup lang="ts">
  import { Alert } from '@coffic/cosy-ui/vue';
</script>

<template>
  <Alert type="info" class="custom-alert"> 这是一个自定义样式的提示框 </Alert>
</template>

<style scoped>
  .custom-alert {
    background-color: #f3e8ff;
    color: #581c87;
    border: 1px solid #c084fc;
  }
</style>
