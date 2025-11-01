<script setup lang="ts">
import { Login } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Login
        title="欢迎回来"
        subtitle="请登录以继续"
        :show-forgot-password="true"
        forgot-password-text="找回密码"
    />
</template>

