<template>
  <Container
    width="md"
    height="xl"
    flex="row"
    items="center"
    background="accent/40"
    border="sm"
    rounded="md">
    <div class="cosy:bg-primary cosy:p-2">居中对齐</div>
    <div class="cosy:bg-secondary cosy:p-2">居中对齐</div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>