<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/next" navigation-type="next">
        <template #icon-next>
            <span>→</span>
        </template>
        下一页
        </Link>
    </div>
</template>
