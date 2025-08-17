<script setup lang="ts">
import { Container } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <Container class="cosy:bg-gradient-to-r cosy:from-blue-500 cosy:to-purple-600 cosy:text-white">
            <div style="padding: 1rem; text-align: center;">
                <h3 style="margin: 0 0 0.5rem 0;">自定义样式容器</h3>
                <p style="margin: 0; opacity: 0.9;">使用 class 属性添加了渐变背景和白色文字。</p>
            </div>
        </Container>
    </div>
</template>
