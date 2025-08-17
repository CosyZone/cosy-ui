<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';

const handleClose = () => {
    console.log('窗口关闭事件被触发');
};

const handleMinimize = () => {
    console.log('窗口最小化事件被触发');
};

const handleMaximize = () => {
    console.log('窗口最大化事件被触发');
};
</script>

<template>
    <MacWindow title="文件浏览器" bgType="green" :onCloseWindow="() => handleClose()"
        :onMinimizeWindow="() => handleMinimize()" :onMaximizeWindow="() => handleMaximize()">
        <div style="padding: 1rem;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">事件处理示例</h3>
            <p style="margin-bottom: 0.5rem;">点击窗口控制按钮可以看到事件处理效果。</p>
            <p style="margin-bottom: 0.5rem;">关闭、最小化、最大化按钮都会触发相应的事件回调。</p>
            <p>这些事件可以用于集成到实际的应用程序中。</p>
        </div>
    </MacWindow>
</template>
