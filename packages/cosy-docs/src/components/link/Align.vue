<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="border: 1px solid #e5e7eb; padding: 1rem; width: 300px;">
            <Link href="/left" align="left">左对齐链接</Link>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 1rem; width: 300px;">
            <Link href="/center" align="center">居中对齐链接</Link>
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 1rem; width: 300px;">
            <Link href="/right" align="right">右对齐链接</Link>
        </div>
    </div>
</template>
