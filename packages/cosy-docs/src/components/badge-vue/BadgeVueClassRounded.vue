<script setup lang="ts">
import { Badge } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Badge class="rounded-full px-3 py-1">圆角样式</Badge>
</template>

<style>
.rounded-full {
    border-radius: 9999px;
}

.px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}

.py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}
</style>
