<!--
@component LinkButton

@description
LinkButton 组件是一个现代化的链接按钮，支持外部链接和路由跳转，带有动画效果。

@usage
基本用法：
```vue
<LinkButton text="了解更多" href="#" />
```

多个按钮：
```vue
<div class="cosy:flex cosy:gap-4">
  <LinkButton text="了解更多" href="#" />
  <LinkButton text="立即开始" href="#get-started" />
</div>
```

@props
@prop {string} text - 按钮文本
@prop {string} href - 链接地址
@prop {boolean} [openInNewTab=true] - 是否在新标签页打开链接
-->

<script setup lang="ts">
import '../../style';

defineProps({
    /**
     * 按钮文本
     */
    text: {
        type: String,
        required: true
    },
    /**
     * 链接地址
     */
    href: {
        type: String,
        required: true
    },
    /**
     * 是否在新标签页打开链接
     * @default true
     */
    openInNewTab: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <a :href="href" :target="openInNewTab ? '_blank' : ''" class="cosy:px-6 cosy:py-3 cosy:rounded-lg cosy:bg-blue-600 cosy:text-white cosy:font-medium
               cosy:transition-all cosy:duration-300 cosy:ease-in-out
               cosy:hover:bg-blue-700 cosy:hover:shadow-lg cosy:hover:-translate-y-0.5
               cosy:focus:outline-none cosy:focus:ring-2 cosy:focus:ring-blue-500 cosy:focus:ring-offset-2
               cosy:active:bg-blue-800 cosy:active:translate-y-0">
        {{ text }}
    </a>
</template>
