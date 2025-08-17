<script setup lang="ts">
import { Container, Heading } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Container border>
        <div style="background-color: #f3f4f6; padding: 1rem; border-radius: 0.5rem; text-align: center;">
            <h3 style="margin: 0 0 0.5rem 0; color: #374151;">默认插槽内容</h3>
            <p style="margin: 0; color: #6b7280;">这是通过默认插槽放置的内容，可以包含任何 HTML 元素。</p>
        </div>
    </Container>
</template>
