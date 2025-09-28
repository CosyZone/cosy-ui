<script setup lang="ts">
import { Container, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <Container flex="row" gap="md" items="stretch">
        <div
            style="background-color: #3b82f6; color: white; padding: 0.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
            短项目
        </div>
        <div
            style="background-color: #10b981; color: white; padding: 1.5rem; border-radius: 0.375rem; text-align: center; flex: 1;">
            长项目<br>多行内容
        </div>
    </Container>
</template>
