<template>
  <Container
    flex="row"
    gap="md"
    class="cosy:bg-base-200"
    border="sm"
    rounded="md"
    background="accent/30">
    <div class="cosy:bg-primary cosy:p-2">项目 1</div>
    <div class="cosy:bg-secondary cosy:p-2">项目 2</div>
    <div class="cosy:bg-accent cosy:p-2">项目 3</div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>