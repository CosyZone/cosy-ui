<script setup lang="ts">
import { Container, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <Container flex="row-reverse" gap="md">
        <div
            style="background-color: #3b82f6; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center; flex: 1;">
            第一项
        </div>
        <div
            style="background-color: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center; flex: 1;">
            第二项
        </div>
        <div
            style="background-color: #f59e0b; color: white; padding: 1rem; border-radius: 0.5rem; text-align: center; flex: 1;">
            第三项
        </div>
    </Container>
</template>
