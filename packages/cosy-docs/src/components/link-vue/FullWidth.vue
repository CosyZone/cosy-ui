<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem; width: 300px;">
        <Link href="/normal">普通宽度链接</Link>
        <Link href="/full" :fullWidth="true">全宽链接</Link>
    </div>
</template>
