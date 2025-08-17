<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/block" :block="true">块级链接</Link>
    </div>
</template>
