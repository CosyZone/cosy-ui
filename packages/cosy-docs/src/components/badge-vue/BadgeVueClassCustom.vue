<script setup lang="ts">
import { Badge } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Badge class="custom-badge">自定义类名</Badge>
</template>

<style>
.custom-badge {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    font-weight: bold;
}
</style>
