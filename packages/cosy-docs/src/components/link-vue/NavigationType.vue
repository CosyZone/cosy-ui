<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/previous" variant="navigation" navigationType="previous">上一页</Link>
        <Link href="/next" variant="navigation" navigationType="next">下一页</Link>
    </div>
</template>
