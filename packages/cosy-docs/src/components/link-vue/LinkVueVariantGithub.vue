<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="https://github.com" variant="github">
        <template #icon-github>
            <span>🐙</span>
        </template>
        GitHub
        </Link>
    </div>
</template>
