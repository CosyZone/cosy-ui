<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>
<template>
  <Container
    :aspectRatio="1 / 2"
    width="xs"
    background="success/90"
    rounded="md"
    class="not-prose"
  >
    <p>
      <code>width="xs"</code> 和 <code>aspectRatio={1 / 2}</code> 共同作用。
    </p>
  </Container>
</template>
