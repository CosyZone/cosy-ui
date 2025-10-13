<template>
  <Container
    width="md"
    flex="row"
    gap="none"
    border="sm"
    rounded="md"
    background="accent/30">
    <div class="cosy:bg-primary">项目 1</div>
    <div class="cosy:bg-secondary">项目 2</div>
    <div class="cosy:bg-accent">项目 3</div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>