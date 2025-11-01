<!--
@component Error404

@description
404错误页面组件，用于显示页面未找到的提示信息。
提供友好的错误提示、调试信息和导航选项，帮助用户快速找到所需内容。

@usage
基本用法：
```vue
<Error404 />
```

带调试信息：
```vue
<Error404 :debug-k-vs="{
  reason: '页面不存在',
  suggestedAction: '请检查URL拼写',
  timestamp: new Date().toISOString()
}" />
```

@props
@prop {Record<string, string>} [debugKVs={}] - 调试信息键值对，用于开发和调试

@slots
无插槽，所有内容都通过props传递
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { cn } from '../../src/class/classBuilder';
import { ErrorPageFacade } from '../../src/components/errors';
import Button from '../button/Button.vue';
import { LinkUtil } from '../utils/link';
import type { IError404VueProps } from './props';

interface Props extends IError404VueProps {}

const props = withDefaults(defineProps<Props>(), {
    debugKVs: () => ({}),
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
    ErrorPageFacade.getError404Classes({
        debugKVs: props.debugKVs,
    }),
);

const handleBack = () => {
    if (typeof window !== 'undefined') {
        window.history.back();
    }
};
</script>

<template>
    <div :class="classes.container">
        <div :class="classes.content">
            <!-- 错误代码 -->
            <div :class="classes.errorCodeContainer">
                <h1 :class="classes.errorCodeTitle">404</h1>
                <div :class="classes.errorCodeLine"></div>
            </div>

            <!-- 错误信息 -->
            <div :class="classes.errorMessageContainer">
                <h2 :class="classes.errorMessageTitle">页面未找到</h2>
                <p :class="classes.errorMessageText">
                    抱歉，您要找的页面不存在或已被移动。
                </p>
            </div>

            <!-- 路径信息 -->
            <div :class="classes.pathInfo">
                <p>
                    <span :class="cn().weight('medium').build()">路径：</span>
                    <code :class="cn().color('primary').build()">{{ path }}</code>
                </p>
            </div>

            <!-- 调试信息 -->
            <details
                v-if="Object.keys(debugKVs).length > 0"
                :class="classes.debugInfo">
                <summary :class="classes.debugInfoSummary">调试信息</summary>
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

            <!-- 操作按钮 -->
            <div :class="classes.actions">
                <Button :href="baseUrl" variant="primary" block> 返回首页 </Button>
                <Button @click="handleBack" variant="outline" block>
                    返回上一页
                </Button>
            </div>

            <!-- 帮助提示 -->
            <div :class="classes.helpText">
                <p>如果您认为这是一个错误，请联系网站管理员</p>
            </div>
        </div>
    </div>
</template>

