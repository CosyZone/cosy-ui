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
import { Icon } from 'cosy-ui';
</script>
```

@props
@prop {string} name - 图标名称，必须在iconData中存在
@prop {string} [size='24px'] - 图标大小
@prop {string} [color='currentColor'] - 图标颜色
@prop {string} [class=''] - 自定义类名
-->

<script setup lang="ts">
import '../../style.ts'
import { computed } from 'vue'
import { iconData } from '../../assets/iconData'

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
    class: ''
})

const icon = computed(() => {
    return iconData[props.name] || null
})

const viewBox = computed(() => {
    return icon.value?.viewBox || '0 0 24 24'
})
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" :viewBox="viewBox" fill="none" :stroke="color"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="props.class">
        <path v-if="icon" :d="icon.path" />
    </svg>
</template>
