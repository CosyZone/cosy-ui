<script setup lang="ts">
import { Alert } from "@coffic/cosy-ui/vue";

/**
 * @component AlertVueClosableTrue
 * @description 展示 AlertVue 组件的可关闭功能。
 */

const handleClose = () => {
	alert("关闭了");
};
</script>

<template>
    <Alert type="info" closable @close="handleClose">
        这是可关闭的提示信息
    </Alert>
</template>
