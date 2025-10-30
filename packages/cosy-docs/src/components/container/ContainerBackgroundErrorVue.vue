<script setup lang="ts">
import { Container, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <Container background="error" padding="md">
        <Heading :level="3">Error 背景色</Heading>
        <p>这是使用 error 背景色的容器，适合错误状态的展示。</p>
    </Container>
</template>
