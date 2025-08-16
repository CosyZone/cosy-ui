<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Container flex="row" gap="md" items="center">
        <div
            style="background-color: #f59e0b; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
            短项目
        </div>
        <div
            style="background-color: #8b5cf6; color: white; padding: 1.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
            长项目<br>多行内容
        </div>
    </Container>
</template>
