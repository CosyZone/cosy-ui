<!--
@component Error503

@description
503服务不可用错误页面组件，用于显示服务临时不可用的提示信息。
通常用于系统维护、升级或服务器过载等情况。

@usage
基本用法：
```vue
<Error503 />
```

带维护信息：
```vue
<Error503
  :maintenance-mode="true"
  estimated-recovery="2024-12-25 10:00"
  :debug-k-vs="{
    reason: '系统升级',
    startTime: '2024-12-25 08:00'
  }"
  status-page-url="/status"
  notification-url="/notifications"
/>
```

@props
@prop {Record<string, string>} [debugKVs={}] - 调试信息键值对
@prop {boolean} [maintenanceMode=false] - 是否为维护模式
@prop {string} [estimatedRecovery] - 预期恢复时间
@prop {string} [statusPageUrl] - 系统状态页面URL
@prop {string} [notificationUrl] - 通知订阅页面URL
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { cn } from '../../src/class/classBuilder';
import { ErrorPageFacade } from '../../src/components/errors';
import Button from '../button/Button.vue';
import { LinkUtil } from '../utils/link';
import type { IError503VueProps } from './props';

interface Props extends IError503VueProps {}

const props = withDefaults(defineProps<Props>(), {
    debugKVs: () => ({}),
    maintenanceMode: false,
    estimatedRecovery: '',
    statusPageUrl: '',
    notificationUrl: '',
});

const { debugKVs, maintenanceMode, estimatedRecovery, statusPageUrl, notificationUrl } = props;

const baseUrl = LinkUtil.getBaseUrl();
const path = ref('/');

onMounted(() => {
    if (typeof window !== 'undefined') {
        path.value = window.location.pathname;
    }
});

// 使用共用代码获取类名
const classes = computed(() =>
    ErrorPageFacade.getError503Classes({
        debugKVs: props.debugKVs,
        maintenanceMode: props.maintenanceMode,
        estimatedRecovery: props.estimatedRecovery,
        statusPageUrl: props.statusPageUrl,
        notificationUrl: props.notificationUrl,
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
                <h1 :class="classes.errorCodeTitle">503</h1>
                <div :class="classes.errorCodeLine"></div>
            </div>

            <!-- 错误信息 -->
            <div :class="classes.errorMessageContainer">
                <h2 :class="classes.errorMessageTitle">
                    {{ maintenanceMode ? '系统维护中' : '服务不可用' }}
                </h2>
                <p :class="classes.errorMessageText">
                    {{
                        maintenanceMode
                            ? '我们正在进行系统维护和升级，服务将很快恢复。'
                            : '服务器当前无法处理您的请求，请稍后重试。'
                    }}
                </p>
            </div>

            <!-- 恢复时间 -->
            <div v-if="estimatedRecovery" :class="classes.recoveryTime">
                <h3 :class="classes.recoveryTimeTitle">预期恢复时间</h3>
                <p :class="classes.recoveryTimeText">{{ estimatedRecovery }}</p>
            </div>

            <!-- 路径信息 -->
            <div :class="classes.pathInfo">
                <p>
                    <span :class="cn().weight('medium').build()">路径：</span>
                    <code :class="cn().color('info').build()">{{ path }}</code>
                </p>
            </div>

            <!-- 调试信息 -->
            <details
                v-if="Object.keys(debugKVs).length > 0"
                :class="classes.debugInfo">
                <summary :class="classes.debugInfoSummary">维护信息</summary>
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
                <h3 :class="classes.suggestionTitle">在等待期间：</h3>
                <ul :class="classes.suggestionList">
                    <li>• 请耐心等待服务恢复</li>
                    <li>• 可以刷新页面查看最新状态</li>
                    <li>• 关注我们的状态页面获取更新</li>
                    <li v-if="notificationUrl">• 订阅通知获得恢复提醒</li>
                </ul>
            </div>

            <!-- 操作按钮 -->
            <div :class="classes.actions">
                <Button @click="handleReload" variant="primary" block>
                    刷新页面
                </Button>

                <Button
                    v-if="statusPageUrl"
                    :href="statusPageUrl"
                    variant="info"
                    block>
                    查看系统状态
                </Button>

                <Button
                    v-if="notificationUrl"
                    :href="notificationUrl"
                    variant="outline"
                    block>
                    订阅恢复通知
                </Button>

                <Button :href="baseUrl" variant="ghost" block>
                    返回首页
                </Button>
            </div>

            <!-- 帮助提示 -->
            <div :class="classes.helpText">
                <p>感谢您的耐心等待，我们正在努力恢复服务</p>
            </div>
        </div>
    </div>
</template>

