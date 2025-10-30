<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>
<template>
  <Container
    :aspectRatio="1 / 2"
    height="6xl"
    background="info/90"
    rounded="md"
    class="not-prose"
  >
    <p>
      <code>height="6xl"</code>
      <code>aspectRatio="1/2"</code>
    </p>
  </Container>
</template>
