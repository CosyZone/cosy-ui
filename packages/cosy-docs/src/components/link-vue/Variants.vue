<script setup lang="ts">
import { Link } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/default" variant="default">默认样式</Link>
        <Link href="/primary" variant="primary">主要样式</Link>
        <Link href="/secondary" variant="secondary">次要样式</Link>
        <Link href="/text" variant="text">文本样式</Link>
        <Link href="/cta" variant="cta">行动号召</Link>
        <Link href="/ghost" variant="ghost">幽灵样式</Link>
        <Link href="/light" variant="light">浅色样式</Link>
        <Link href="/navigation" variant="navigation">导航样式</Link>
        <Link href="/github" variant="github">GitHub样式</Link>
    </div>
</template>
