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
        title="企业登录"
        subtitle="安全登录到企业系统"
        :logo="logoUrl"
        :social-logins="['github', 'google', 'wechat']"
        :show-remember-me="true"
        :show-forgot-password="true"
        custom-class="cosy:bg-gradient-to-r cosy:from-blue-500 cosy:to-purple-500">
        <template #footer>
            <div class="cosy:text-center cosy:mt-4 cosy:text-sm cosy:text-base-content/60">
                还没有账号？
                <a href="#" class="cosy:text-primary cosy:hover:text-primary-focus">立即注册</a>
            </div>
        </template>
    </Login>
</template>

