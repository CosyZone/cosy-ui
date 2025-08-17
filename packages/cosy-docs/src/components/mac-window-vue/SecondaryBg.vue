<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
import { PlaceHolder } from '@coffic/cosy-ui/vue';
</script>

<template>
    <MacWindow title="次要背景窗口" height="h-48" bgType="secondary">
        <PlaceHolder width="full" height="lg" padding="md">
            <p>这是使用次要背景的 MacWindow 组件。</p>
        </PlaceHolder>
    </MacWindow>
</template>
