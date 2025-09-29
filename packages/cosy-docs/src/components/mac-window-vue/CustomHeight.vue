<script setup lang="ts">
import { MacWindow } from "@coffic/cosy-ui/vue";
</script>

<template>
    <MacWindow title="自定义高度窗口" height="h-32" bgType="accent">
        <div style="padding: 1rem;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">自定义高度示例</h3>
            <p>这个窗口使用了自定义高度 `h-32`，比默认的 `h-96` 要矮一些。</p>
            <p>你可以通过 `height` 属性来调整窗口的高度。</p>
        </div>
    </MacWindow>
</template>
