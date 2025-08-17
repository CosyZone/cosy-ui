<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/primary" :btn="true" color="primary">主要颜色</Link>
        <Link href="/secondary" :btn="true" color="secondary">次要颜色</Link>
        <Link href="/accent" :btn="true" color="accent">强调颜色</Link>
        <Link href="/success" :btn="true" color="success">成功颜色</Link>
        <Link href="/warning" :btn="true" color="warning">警告颜色</Link>
        <Link href="/error" :btn="true" color="error">错误颜色</Link>
    </div>
</template>
