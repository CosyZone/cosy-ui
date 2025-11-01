<!--
@component Error403

@description
403禁止访问错误页面组件，用于显示用户无权限访问页面的提示信息。
提供清晰的权限说明和相关的操作建议。

@usage
基本用法：
```vue
<Error403 />
```

带调试信息：
```vue
<Error403 
  :debug-k-vs="{
    requiredRole: 'admin',
    currentRole: 'user',
    resource: '/admin/dashboard'
  }"
  login-url="/login"
  contact-url="/contact"
/>
```

@props
@prop {Record<string, string>} [debugKVs={}] - 调试信息键值对，用于开发和调试
@prop {string} [loginUrl] - 登录页面URL，如果提供将显示登录按钮
@prop {string} [contactUrl] - 联系我们页面URL，如果提供将显示联系按钮
-->

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { cn } from '../../src/class/classBuilder';
import { ErrorPageFacade } from '../../src/components/errors';
import { LinkUtil } from '../utils/link';
import type { IError403VueProps } from './props';

interface Props extends IError403VueProps {}

const props = withDefaults(defineProps<Props>(), {
    debugKVs: () => ({}),
    loginUrl: '',
    contactUrl: '',
});

const { debugKVs, loginUrl, contactUrl } = props;

const baseUrl = LinkUtil.getBaseUrl();
const path = ref('/');

onMounted(() => {
    if (typeof window !== 'undefined') {
        path.value = window.location.pathname;
    }
});

// 使用共用代码获取类名
const classes = computed(() =>
    ErrorPageFacade.getError403Classes({
        debugKVs: props.debugKVs,
        loginUrl: props.loginUrl,
        contactUrl: props.contactUrl,
    }),
);

const errorCodeTitleClassWithNoUnderline = computed(() =>
    cn().add(classes.value.errorCodeTitle).add('cosy:no-underline').build(),
);
</script>

<template>
    <div :class="classes.container">
        <div :class="classes.content">
            <!-- 错误代码 -->
            <div :class="classes.errorCodeContainer">
                <h1 :class="errorCodeTitleClassWithNoUnderline">403</h1>
                <div :class="classes.errorCodeLine"></div>
            </div>

            <!-- 错误信息 -->
            <div :class="classes.errorMessageContainer">
                <h2 :class="classes.errorMessageTitle">禁止访问</h2>
                <p :class="classes.errorMessageText">
                    抱歉，您没有权限访问此页面。
                </p>
            </div>

            <!-- 路径信息 -->
            <div :class="classes.pathInfo">
                <p>
                    <span :class="cn().weight('medium').build()">路径：</span>
                    <code :class="cn().color('warning').build()">{{ path }}</code>
                </p>
            </div>

            <!-- 调试信息 -->
            <details
                v-if="Object.keys(debugKVs).length > 0"
                :class="classes.debugInfo">
                <summary :class="classes.debugInfoSummary">权限信息</summary>
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
                <a
                    v-if="loginUrl"
                    :href="loginUrl"
                    :class="cn().add('cosy:btn cosy:btn-primary').w('full').build()">
                    登录账户
                </a>

                <a
                    :href="baseUrl"
                    :class="cn().add('cosy:btn cosy:btn-outline cosy:no-underline').w('full').build()">
                    返回首页
                </a>

                <a
                    v-if="contactUrl"
                    :href="contactUrl"
                    :class="cn().add('cosy:btn cosy:btn-ghost').w('full').build()">
                    联系管理员
                </a>
            </div>

            <!-- 帮助提示 -->
            <div :class="classes.helpText">
                <p>如需访问权限，请联系系统管理员</p>
            </div>
        </div>
    </div>
</template>

