<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Container padding="lg" background="primary/10" rounded="lg">
    <h3 style="margin: 0 0 1rem 0; color: #1f2937; font-size: 1.25rem;">
      容器内容
    </h3>
    <p style="margin: 0 0 1rem 0; color: #6b7280;">
      这是通过默认 slot 插入的内容，可以包含任何 HTML 元素。
    </p>
    <button
      style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; border: none; cursor: pointer;">
      操作按钮
    </button>
  </Container>
</template>
