<script setup lang="ts">
import { Login } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Login title="欢迎回来" subtitle="请登录以继续">
        <template #footer>
            <div class="cosy:text-center cosy:mt-4 cosy:text-sm cosy:text-base-content/60">
                还没有账号？
                <a href="#" class="cosy:text-primary cosy:hover:text-primary-focus">立即注册</a>
            </div>
        </template>
    </Login>
</template>

