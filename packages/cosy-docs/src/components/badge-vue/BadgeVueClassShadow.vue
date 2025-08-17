<script setup lang="ts">
import { Badge } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Badge class="shadow-lg">阴影效果</Badge>
</template>

<style>
.shadow-lg {
    box-shadow:
        0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
