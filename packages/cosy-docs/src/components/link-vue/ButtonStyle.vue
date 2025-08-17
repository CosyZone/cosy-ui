<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/normal">普通链接</Link>
        <Link href="/button" :btn="true">按钮风格链接</Link>
        <Link href="/primary" :btn="true" variant="primary">主要按钮链接</Link>
    </div>
</template>
