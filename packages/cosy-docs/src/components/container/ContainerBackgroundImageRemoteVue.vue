<script setup lang="ts">
import { Container, Heading, PlaceHolder } from '@coffic/cosy-ui/vue';
</script>
<template>
  <Container
    backgroundImage="https://picsum.photos/1200/600"
    padding="md"
    rounded="md"
  >
    <PlaceHolder width="full" height="2xl" padding="md" background="accent/30">
      <Heading>远程图片背景</Heading>
    </PlaceHolder>
  </Container>
</template>
