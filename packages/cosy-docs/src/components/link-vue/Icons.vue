<script setup lang="ts">
import { Link } from "@coffic/cosy-ui/vue";
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Link href="/home" icon="HomeIcon">首页</Link>
        <Link href="/settings" icon="SettingsIcon">设置</Link>
        <Link href="/search" icon="SearchIcon">搜索</Link>
        <Link href="/user" icon="UserIcon">用户</Link>
    </div>
</template>
