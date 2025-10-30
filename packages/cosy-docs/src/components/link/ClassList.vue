<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/default">默认样式</Link>
        <Link href="/custom" :class:list="['text-blue-500', 'font-semibold']">类名列表样式</Link>
    </div>
</template>
