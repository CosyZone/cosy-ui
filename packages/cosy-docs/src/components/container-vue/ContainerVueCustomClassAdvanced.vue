<template>
  <Container width="md" class="custom-advanced">
    <p>高级容器，使用 class="custom-advanced"</p>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<style>
  .custom-advanced {
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    color: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
</style>