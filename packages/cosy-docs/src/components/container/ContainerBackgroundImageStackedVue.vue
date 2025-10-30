<script setup lang="ts">
import { Container, PlaceHolder } from '@coffic/cosy-ui/vue';
</script>
<template>
  <div class="cosy:space-y-md">
    <Container backgroundImage="/assets/factory.png" padding="md" rounded="md" width="full">
      <PlaceHolder
        width="full"
        height="2xl"
        padding="md"
        background="accent/60"
      >
        第一个容器
      </PlaceHolder>
    </Container>

    <Container
      backgroundImage="/assets/hero.png"
      padding="md"
      rounded="md"
      width="full"
      height="4xl"
    >
      <PlaceHolder
        width="sm"
        height="xl"
        padding="md"
        background="primary/60"
      >
        第二个容器
      </PlaceHolder>
    </Container>
  </div>
</template>
