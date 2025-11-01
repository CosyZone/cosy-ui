<script setup lang="ts">
import { getAvatarImage, Login } from '@coffic/cosy-ui/vue';

const logoUrl = getAvatarImage({
    width: 100,
    height: 100,
    provider: 'robohash',
    tag: 'company-logo',
});
</script>

<template>
    <Login
        title="欢迎回来"
        subtitle="请登录以继续"
        :logo="logoUrl"
    />
</template>

