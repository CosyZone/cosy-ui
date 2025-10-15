<template>
  <Container 
    :aspect-ratio="16 / 9"
    width="lg"
    height="lg"
    background="error/10"
    rounded="md">
    <div class="cosy:p-4">
      <h3 class="cosy:text-lg cosy:font-bold">Conflict Example</h3>
      <p>This will show an error because aspectRatio, width, and height are set simultaneously.</p>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>