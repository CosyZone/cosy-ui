<script setup lang="ts">
import VueButton from './Button.vue';
</script>

<template>
  <div class="cosy:flex cosy:flex-wrap cosy:gap-2">
    <VueButton variant="info">信息按钮</VueButton>
    <VueButton variant="success">成功按钮</VueButton>
    <VueButton variant="warning">警告按钮</VueButton>
    <VueButton variant="error">错误按钮</VueButton>
    <VueButton variant="ghost">幽灵按钮</VueButton>
    <VueButton variant="link">链接按钮</VueButton>
    <VueButton variant="outline">描边按钮</VueButton>
    <VueButton variant="neutral">中性按钮</VueButton>
  </div>
</template>
