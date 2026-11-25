<!--
@component ErrorPage

@description
通用错误页面组件，根据错误码自动选择合适的错误页面。
简化错误处理，提供统一的错误页面入口。

@usage
基本用法：
```vue
<ErrorPage :error-code="404" />
```

带完整配置：
```vue
<ErrorPage
  :error-code="503"
  :maintenance-mode="true"
  estimated-recovery="2024-12-25 10:00"
  :debug-k-vs="{ reason: '系统升级' }"
/>
```

@props
@prop {number} errorCode - HTTP错误状态码 (404, 403, 500, 503 等)
@prop {Record<string, string>} [debugKVs={}] - 调试信息键值对
@prop {string} [loginUrl] - 登录页面URL (用于403错误)
@prop {string} [contactUrl] - 联系页面URL
@prop {string} [supportUrl] - 技术支持页面URL (用于500错误)
@prop {string} [statusPageUrl] - 系统状态页面URL (用于503错误)
@prop {string} [notificationUrl] - 通知订阅页面URL (用于503错误)
@prop {boolean} [maintenanceMode=false] - 是否为维护模式 (用于503错误)
@prop {string} [estimatedRecovery] - 预期恢复时间 (用于503错误)
-->

<script setup lang="ts">
import { computed } from 'vue';
import Error403 from './Error403.vue';
import Error404 from './Error404.vue';
import Error500 from './Error500.vue';
import Error503 from './Error503.vue';
import type { IErrorPageVueProps } from './props';

interface Props extends IErrorPageVueProps {}

const props = withDefaults(defineProps<Props>(), {
    errorCode: 404,
    debugKVs: () => ({}),
    loginUrl: '',
    contactUrl: '',
    supportUrl: '',
    statusPageUrl: '',
    notificationUrl: '',
    maintenanceMode: false,
    estimatedRecovery: '',
});

// 根据错误码选择对应的组件
function getErrorComponent(code: number) {
    switch (code) {
        case 403:
            return Error403;
        case 404:
            return Error404;
        case 500:
            return Error500;
        case 503:
            return Error503;
        default:
            return Error404; // 默认使用404页面
    }
}

const ErrorComponent = computed(() => getErrorComponent(props.errorCode));

// 根据错误码准备对应的props
const errorProps = computed(() => {
    const baseProps = { debugKVs: props.debugKVs };

    switch (props.errorCode) {
        case 403:
            return { ...baseProps, loginUrl: props.loginUrl, contactUrl: props.contactUrl };
        case 404:
            return baseProps;
        case 500:
            return { ...baseProps, supportUrl: props.supportUrl, statusPageUrl: props.statusPageUrl };
        case 503:
            return {
                ...baseProps,
                maintenanceMode: props.maintenanceMode,
                estimatedRecovery: props.estimatedRecovery,
                statusPageUrl: props.statusPageUrl,
                notificationUrl: props.notificationUrl,
            };
        default:
            return baseProps;
    }
});
</script>

<template>
    <component :is="ErrorComponent" v-bind="errorProps" />
</template>

