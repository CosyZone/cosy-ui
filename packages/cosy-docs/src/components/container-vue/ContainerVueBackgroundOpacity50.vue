<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Container background="success/50" padding="md">
        <Heading :level="3">Success 背景色 - 50% 透明度</Heading>
        <p>这是使用 success/50 背景色的容器。</p>
    </Container>
</template>
