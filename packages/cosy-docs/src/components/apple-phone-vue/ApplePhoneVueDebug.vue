<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>

<template>
    <div style="display: flex; justify-content: center; padding: 1rem;">
        <ApplePhone :debug="true">
            <div style="background-color: #fef3c7; padding: 1rem; text-align: center; height: 100%;">
                <h3 style="margin: 0 0 1rem 0; color: #92400e;">调试模式</h3>
                <p style="margin: 0; color: #a16207;">调试模式已启用，可以看到调试背景色。</p>
                <p style="margin: 0.5rem 0 0 0; color: #92400e; font-size: 0.875rem;">
                    黄色：容器背景<br>
                    红色：状态栏区域<br>
                    蓝色：内容区域<br>
                    绿色：内容容器
                </p>
            </div>
        </ApplePhone>
    </div>
</template>
