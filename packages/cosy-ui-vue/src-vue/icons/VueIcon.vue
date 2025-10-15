<!--
@component Icon

@description
Icon 组件是一个可重用的SVG图标组件，用于显示各种图标。
使用共享的图标数据，便于维护和一致性。

@usage
```vue
<template>
  <Icon name="alertTriangle" />
  
  <Icon name="settings" size="32px" color="red" />
  
  <Icon name="check" class="cosy:w-6 cosy:h-6 cosy:text-success" />
</template>

<script setup>
import { Icon } from "cosy-ui";
</script>
```

@props
@prop {string} name - 图标名称，必须在iconData中存在
@prop {string} [size='24px'] - 图标大小
@prop {string} [color='currentColor'] - 图标颜色
@prop {string} [class=''] - 自定义类名
-->

<script setup lang="ts">
import '../../style.js';
import { computed } from 'vue';
import { iconData } from '../../src/assets/iconData';

interface Props {
    /**
     * 图标名称，必须在iconData中存在
     */
    name: string;
    /**
     * 图标大小
     * @default "24px"
     */
    size?: string;
    /**
     * 图标颜色
     * @default "currentColor"
     */
    color?: string;
    /**
     * 自定义类名
     */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: '24px',
    color: 'currentColor',
    class: '',
});

// 颜色映射，将语义化颜色转换为具体的颜色值
const strokeColor = computed(() => {
    const colorMap: Record<string, string> = {
        primary: '#3b82f6',
        secondary: '#6b7280',
        accent: '#f59e0b',
        neutral: '#9ca3af',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
        muted: '#6b7280',
        default: 'currentColor',
    };

    return colorMap[props.color] || props.color;
});

const icon = computed(() => {
    return iconData[props.name] || null;
});

const viewBox = computed(() => {
    return icon.value?.viewBox || '0 0 24 24';
});

const iconType = computed(() => {
    return icon.value?.type || 'stroke';
});

const isMultiPath = computed(() => {
    return icon.value?.multiPath || false;
});
</script>

<template>
    <!-- Fill类型图标（实心图标） -->
    <svg v-if="iconType === 'fill'" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :viewBox="viewBox"
        :fill="strokeColor" :class="props.class">
        <path v-if="icon && !isMultiPath" :d="icon.path" />
        <g v-else-if="icon && isMultiPath">
            <path v-for="(path, index) in icon.path.split(/(?=M)/).filter(p => p.trim().length > 0)" :key="index"
                :d="path.trim()" />
        </g>
    </svg>

    <!-- Stroke类型图标（线条图标） -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :viewBox="viewBox" fill="none"
        :stroke="strokeColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="props.class">
        <path v-if="icon" :d="icon.path" />
    </svg>
</template>
