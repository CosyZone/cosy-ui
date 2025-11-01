<script setup lang="ts">
import { Login } from '@coffic/cosy-ui/vue';
</script>

<template>
    <Login
        title="欢迎回来"
        subtitle="请登录以继续"
        :social-logins="['github', 'google']">
        <template #socialButtons>
            <div class="cosy:mt-6 cosy:grid cosy:grid-cols-2 cosy:gap-3">
                <button
                    class="cosy:w-full cosy:py-2 cosy:px-4 cosy:rounded-md cosy:bg-blue-500 cosy:hover:bg-blue-600 cosy:text-white">
                    自定义按钮 1
                </button>
                <button
                    class="cosy:w-full cosy:py-2 cosy:px-4 cosy:rounded-md cosy:bg-green-500 cosy:hover:bg-green-600 cosy:text-white">
                    自定义按钮 2
                </button>
            </div>
        </template>
    </Login>
</template>

