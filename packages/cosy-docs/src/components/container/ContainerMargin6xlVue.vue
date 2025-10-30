<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>
<template>
  <div>
    <Heading :level="3" margin="none" background="info" padding="sm">
      上方内容区域
    </Heading>

    <Container margin="6xl" background="accent/40">
      <p class="cosy:text-center">6xl外边距的容器</p>
    </Container>

    <Heading :level="3" margin="none" background="info" padding="sm">
      下方内容区域
    </Heading>
  </div>
</template>
