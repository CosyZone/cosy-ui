<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/previous" navigation-type="previous">
        <template #icon-previous>
            <span>←</span>
        </template>
        上一页
        </Link>
    </div>
</template>
