<script setup lang="ts">
import { Login } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Login
        title="欢迎回来"
        subtitle="请登录以继续"
        :show-remember-me="true"
        remember-me-text="30天内自动登录"
    />
</template>

