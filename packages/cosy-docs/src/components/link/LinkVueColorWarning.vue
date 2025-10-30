<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/warning" :btn="true" color="warning">警告颜色</Link>
    </div>
</template>
