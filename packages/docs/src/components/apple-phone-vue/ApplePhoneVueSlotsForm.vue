<script setup lang="ts">
import { ApplePhone, Heading } from "@coffic/cosy-ui/vue";
</script>

<template>
    <ApplePhone>
        <Heading :level="4">表单示例</Heading>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <input type="text" placeholder="用户名"
                style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
            <input type="password" placeholder="密码"
                style="padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 0.375rem;" />
            <button
                style="background-color: #3b82f6; color: white; padding: 0.5rem; border: none; border-radius: 0.375rem; cursor: pointer;">
                提交
            </button>
        </div>
    </ApplePhone>
</template>
