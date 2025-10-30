<script setup lang="ts">
import { MacWindow, PlaceHolder } from "@coffic/cosy-ui/vue";
</script>

<template>
    <MacWindow title="强调背景窗口" height="h-48" bgType="accent">
        <PlaceHolder width="full" height="lg" padding="md">
            <p>这是使用强调背景的 MacWindow 组件。</p>
        </PlaceHolder>
    </MacWindow>
</template>
