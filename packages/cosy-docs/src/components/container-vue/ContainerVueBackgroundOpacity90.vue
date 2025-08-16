<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Container background="warning/90" padding="md">
        <Heading :level="3">Warning 背景色 - 90% 透明度</Heading>
        <p>这是使用 warning/90 背景色的容器。</p>
    </Container>
</template>
