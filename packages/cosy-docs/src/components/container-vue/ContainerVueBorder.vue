<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Container border>
            <div style="padding: 1rem; text-align: center;">
                <h3 style="margin: 0 0 0.5rem 0; color: #374151;">带边框的容器</h3>
                <p style="margin: 0; color: #6b7280;">这个容器启用了 border 属性，会显示边框和圆角。</p>
            </div>
        </Container>
    </div>
</template>
