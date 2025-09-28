<script setup lang="ts">
import { MacWindow } from "@coffic/cosy-ui/vue";
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>

<template>
    <MacWindow title="成功背景窗口" height="h-48" bgType="success">
        <PlaceHolder width="full" height="lg" padding="md">
            <p>这是使用成功背景的 MacWindow 组件。</p>
        </PlaceHolder>
    </MacWindow>
</template>
