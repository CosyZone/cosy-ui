<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/default">默认样式</Link>
        <Link href="/custom" class="text-red-500 font-bold">自定义样式</Link>
    </div>
</template>
