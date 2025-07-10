<!--
ToolBar 组件

一个基于 DaisyUI navbar 的顶部工具栏组件，采用现代化设计。
支持左中右三段式布局，可以放置按钮、输入框、图标和文字等元素。

使用示例：
```vue
<ToolBar>
  <template #left>
    <button class="btn btn-ghost btn-sm">
      <i class="i-carbon-menu"></i>
    </button>
  </template>
  <template #center>
    <div class="w-full max-w-2xl">
      <input type="text" class="input input-sm w-full bg-base-300" placeholder="输入URL地址" />
    </div>
  </template>
  <template #right>
    <button class="btn btn-ghost btn-sm" @click="handleRefresh">
      <i class="i-carbon-refresh"></i>
    </button>
  </template>
</ToolBar>
```

属性说明：
- variant: 工具栏变体
  - 可选值: 'default' | 'compact'
  - 默认值: 'default'
- bordered: 是否显示下边框
  - 类型: boolean
  - 默认值: true

插槽：
- left: 左侧内容区域
- center: 中间内容区域
- right: 右侧内容区域
-->

<script setup lang="ts">
import { computed } from 'vue';
import '../../style';

interface Props {
    // 工具栏变体
    variant?: 'default' | 'compact'
    // 是否显示下边框
    bordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    bordered: true
})

// 计算工具栏类名
const toolBarClass = computed(() => {
    return [
        'cosy:navbar',
        'cosy:bg-base-200',
        'cosy:text-base-content/70',
        'cosy:text-sm',
        'no-drag-region',
        'cosy:transition-all',
        'cosy:duration-200',
        'cosy:rounded-box',
        {
            'cosy:min-h-12': props.variant === 'default',
            'cosy:min-h-10': props.variant === 'compact',
            'cosy:border-b cosy:border-base-300': props.bordered
        }
    ]
})
</script>

<template>
    <div :class="toolBarClass">
        <!-- 左侧内容区域 -->
        <div class="cosy:navbar-start">
            <slot name="left"></slot>
        </div>

        <!-- 中间内容区域 -->
        <div class="cosy:navbar-center">
            <slot name="center"></slot>
        </div>

        <!-- 右侧内容区域 -->
        <div class="cosy:navbar-end">
            <slot name="right"></slot>
        </div>
    </div>
</template>