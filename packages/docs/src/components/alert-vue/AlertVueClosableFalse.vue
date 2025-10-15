<script setup lang="ts">
import { Alert } from "@coffic/cosy-ui/vue";

/**
 * @component AlertVueClosableFalse
 * @description 展示 AlertVue 组件的不可关闭功能。
 */
</script>

<template>
    <Alert type="warning" :closable="false">
        这是不可关闭的提示信息
    </Alert>
</template>
