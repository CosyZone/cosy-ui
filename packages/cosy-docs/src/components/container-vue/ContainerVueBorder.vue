<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Container border>
        <Heading :level="3">带边框的容器</Heading>
        <p>这个容器启用了 border 属性，会显示边框和圆角。</p>
    </Container>
</template>
