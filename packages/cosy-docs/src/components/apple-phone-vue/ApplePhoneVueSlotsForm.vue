<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="padding: 1rem;">
        <div style="display: flex; justify-content: center;">
            <ApplePhone>
                <div style="background-color: #f3f4f6; padding: 1rem; height: 100%;">
                    <h3 style="margin: 0 0 1rem 0; color: #374151;">表单示例</h3>
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
                </div>
            </ApplePhone>
        </div>
    </div>
</template>
