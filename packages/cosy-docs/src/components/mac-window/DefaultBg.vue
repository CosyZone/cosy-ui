<script setup lang="ts">
import { MacWindow, PlaceHolder } from "@coffic/cosy-ui/vue";
</script>

<template>
    <MacWindow title="默认背景窗口" height="h-48" bgType="base-100">
        <PlaceHolder width="full" height="lg" padding="md">
            <p>这是使用默认背景的 MacWindow 组件。</p>
        </PlaceHolder>
    </MacWindow>
</template>
