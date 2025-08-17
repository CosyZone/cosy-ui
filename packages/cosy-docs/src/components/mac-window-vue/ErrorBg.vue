<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
import { PlaceHolder } from '@coffic/cosy-ui/vue';
</script>

<template>
    <MacWindow title="错误背景窗口" height="h-48" bgType="error">
        <PlaceHolder width="full" height="lg" padding="md">
            <p>这是使用错误背景的 MacWindow 组件。</p>
        </PlaceHolder>
    </MacWindow>
</template>
