<template>
  <Container 
    :aspect-ratio="16 / 9" 
    background="primary/10"
    rounded="md">
    <div class="cosy:p-4">
      <h3 class="cosy:text-lg cosy:font-bold">Aspect Ratio Example</h3>
      <p>Container with 16:9 aspect ratio</p>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Container } from "@coffic/cosy-ui/vue";
</script>