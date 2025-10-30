<template>
  <Container
    width="md"
    height="xl"
    flex="row"
    justify="between"
    border="sm"
    rounded="md"
    background="accent/40">
    <div class="cosy:bg-primary cosy:p-2">两端对齐</div>
    <div class="cosy:bg-secondary cosy:p-2">两端对齐</div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>