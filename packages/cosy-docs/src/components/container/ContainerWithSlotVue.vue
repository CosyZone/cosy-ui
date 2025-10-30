<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>
<template>
  <Container padding="md" background="accent/20" rounded="md">
    <p>这是通过默认插槽传入的内容</p>
    <p>Container 组件支持任意内容作为子元素</p>
  </Container>
</template>
