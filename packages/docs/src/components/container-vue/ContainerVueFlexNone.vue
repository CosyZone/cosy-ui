<script setup lang="ts">
import { Container, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <Container>
        <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; text-align: center;">
            <p style="margin: 0; color: #6b7280;">不设置 flex 属性，使用默认的块级布局</p>
        </div>
        <div
            style="background-color: #e5e7eb; padding: 1rem; border-radius: 0.5rem; text-align: center; margin-top: 1rem;">
            <p style="margin: 0; color: #6b7280;">每个元素独占一行</p>
        </div>
    </Container>
</template>
