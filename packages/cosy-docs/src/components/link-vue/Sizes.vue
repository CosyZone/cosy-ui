<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
        <Link href="/small" size="sm">小型链接</Link>
        <Link href="/medium" size="md">中型链接</Link>
        <Link href="/large" size="lg">大型链接</Link>
    </div>
</template>
