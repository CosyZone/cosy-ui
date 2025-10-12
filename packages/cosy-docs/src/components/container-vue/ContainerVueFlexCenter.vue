<template>
  <Container
    flex="row"
    items="center"
    justify="center"
    gap="md"
    class="cosy:h-24 cosy:bg-base-200"
    border="sm"
    rounded="md"
    background="accent/30">
    <div class="cosy:bg-primary cosy:p-2">居中项目</div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>