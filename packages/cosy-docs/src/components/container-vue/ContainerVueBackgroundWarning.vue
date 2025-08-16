<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Container background="warning" padding="md">
        <Heading :level="3">Warning 背景色</Heading>
        <p>这是使用 warning 背景色的容器，适合警告状态的展示。</p>
    </Container>
</template>
