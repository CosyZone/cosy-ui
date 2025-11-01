<!--
@component Error500

@description
500服务器内部错误页面组件，用于显示服务器出现内部错误的提示信息。
提供友好的错误说明和帮助用户解决问题的操作建议。

@usage
基本用法：
```vue
<Error500 />
```

带错误信息：
```vue
<Error500 
  :debug-k-vs="{
    errorId: 'ERR_2024_001',
    timestamp: new Date().toISOString(),
    serverInfo: 'Server-01'
  }"
  support-url="/support"
  status-page-url="/status"
/>
```

@props
@prop {Record<string, string>} [debugKVs={}] - 调试信息键值对，用于开发和调试
@prop {string} [supportUrl] - 技术支持页面URL
@prop {string} [statusPageUrl] - 系统状态页面URL
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { cn } from '../../src/class/classBuilder';
import { ErrorPageFacade } from '../../src/components/errors';
import Button from '../button/Button.vue';
import { LinkUtil } from '../utils/link';
import type { IError500VueProps } from './props';

interface Props extends IError500VueProps {}

const props = withDefaults(defineProps<Props>(), {
    debugKVs: () => ({}),
    supportUrl: '',
    statusPageUrl: '',
});

const { debugKVs } = props;

const baseUrl = LinkUtil.getBaseUrl();
const path = ref('/');

onMounted(() => {
    if (typeof window !== 'undefined') {
        path.value = window.location.pathname;
    }
});

// 使用共用代码获取类名
const classes = computed(() =>
    ErrorPageFacade.getError500Classes({
        debugKVs: props.debugKVs,
        supportUrl: props.supportUrl,
        statusPageUrl: props.statusPageUrl,
    }),
);

const handleReload = () => {
    if (typeof window !== 'undefined') {
        window.location.reload();
    }
};
</script>

<template>
    <div :class="classes.container">
        <div :class="classes.content">
            <!-- 错误代码 -->
            <div :class="classes.errorCodeContainer">
                <h1 :class="classes.errorCodeTitle">500</h1>
                <div :class="classes.errorCodeLine"></div>
            </div>

            <!-- 错误信息 -->
            <div :class="classes.errorMessageContainer">
                <h2 :class="classes.errorMessageTitle">服务器内部错误</h2>
                <p :class="classes.errorMessageText">
                    服务器遇到了一个内部错误，无法完成您的请求。
                </p>
            </div>

            <!-- 路径信息 -->
            <div :class="classes.pathInfo">
                <p>
                    <span :class="cn().weight('medium').build()">路径：</span>
                    <code :class="cn().color('error').build()">{{ path }}</code>
                </p>
            </div>

            <!-- 调试信息 -->
            <details
                v-if="Object.keys(debugKVs).length > 0"
                :class="classes.debugInfo">
                <summary :class="classes.debugInfoSummary">错误信息</summary>
                <div :class="classes.debugInfoContent">
                    <div
                        v-for="(value, key) in debugKVs"
                        :key="key"
                        :class="classes.debugInfoItem">
                        <span :class="classes.debugInfoKey">{{ key }}:</span>
                        <span :class="classes.debugInfoValue">{{ value }}</span>
                    </div>
                </div>
            </details>

            <!-- 建议信息 -->
            <div :class="classes.suggestion">
                <h3 :class="classes.suggestionTitle">您可以尝试：</h3>
                <ul :class="classes.suggestionList">
                    <li>• 刷新页面</li>
                    <li>• 几分钟后重试</li>
                    <li>• 检查您的网络连接</li>
                    <li>• 联系技术支持</li>
                </ul>
            </div>

            <!-- 操作按钮 -->
            <div :class="classes.actions">
                <Button @click="handleReload" variant="primary" block>
                    刷新页面
                </Button>

                <Button :href="baseUrl" variant="outline" block>
                    返回首页
                </Button>

                <Button
                    v-if="statusPageUrl"
                    :href="statusPageUrl"
                    variant="ghost"
                    block>
                    查看系统状态
                </Button>

                <Button
                    v-if="supportUrl"
                    :href="supportUrl"
                    variant="ghost"
                    block>
                    联系技术支持
                </Button>
            </div>

            <!-- 帮助提示 -->
            <div :class="classes.helpText">
                <p>如果问题持续存在，请联系我们的技术支持团队</p>
            </div>
        </div>
    </div>
</template>

