<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/none" animation="none">无动画效果</Link>
        <Link href="/lift" animation="hover-lift">悬停上浮效果</Link>
        <Link href="/glow" animation="hover-glow">悬停发光效果</Link>
        <Link href="/scale" animation="hover-scale">悬停缩放效果</Link>
    </div>
</template>
