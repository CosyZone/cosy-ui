<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/normal">正常链接</Link>
        <Link href="/debug" :debug="true">调试模式链接</Link>
    </div>
</template>
