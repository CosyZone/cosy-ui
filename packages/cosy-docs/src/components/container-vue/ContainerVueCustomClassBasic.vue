<template>
  <Container width="md" class="custom-basic">
    <p>基础容器，使用 class="custom-basic"</p>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>

<style>
  .custom-basic {
    background-color: #3b82f6;
    color: white;
    border: 2px dashed #3b82f6;
  }
</style>