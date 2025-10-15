<script setup lang="ts">
import { MacWindow } from "@coffic/cosy-ui/vue";
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>

<template>
    <MacWindow title="警告背景窗口" height="h-48" bgType="warning">
        <PlaceHolder width="full" height="lg" padding="md">
            <p>这是使用警告背景的 MacWindow 组件。</p>
        </PlaceHolder>
    </MacWindow>
</template>
