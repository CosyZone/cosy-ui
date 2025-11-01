<script setup lang="ts">
import { Login } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Login title="欢迎回来" subtitle="请登录以继续">
        <template #header>
            <div class="cosy:text-center">
                <div class="cosy:text-2xl cosy:font-bold cosy:mb-2">企业登录系统</div>
                <div class="cosy:text-sm cosy:text-base-content/60">安全可靠的登录体验</div>
            </div>
        </template>
    </Login>
</template>

