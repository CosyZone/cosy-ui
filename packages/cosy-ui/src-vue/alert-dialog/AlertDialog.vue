<!--
@component AlertDialog

@description
AlertDialog 组件用于显示简单的确认对话框，支持国际化，带有淡入淡出动画效果。

@usage
基本用法：
```vue
<AlertDialog v-model="showDialog" message="操作已完成" />
```

指定语言：
```vue
<AlertDialog v-model="showDialog" message="Operation completed" lang="en" />
```

组合使用：
```vue
<template>
  <button @click="showDialog = true">显示对话框</button>
  <AlertDialog v-model="showDialog" message="确认要继续吗？" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AlertDialog } from 'cosy-ui';

const showDialog = ref(false);
</script>
```

@props
@prop {boolean} modelValue - 控制对话框显示状态，支持v-model双向绑定
@prop {string} message - 对话框显示的消息内容
@prop {('zh-cn'|'en')} [lang='zh-cn'] - 语言设置，影响按钮文本

@emits
@emit {update:modelValue} - 当对话框关闭时触发，用于更新v-model绑定值
-->

<script lang="ts">
import '../../style';
import { defineComponent } from 'vue';

type MessageKey = 'confirm';

interface Messages {
  [key: string]: {
    [key in MessageKey]: string;
  };
}

export default defineComponent({
  name: 'AlertDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    lang: {
      type: String as () => 'zh-cn' | 'en',
      default: 'zh-cn',
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    // 多语言文本
    const t = (key: MessageKey) => {
      const messages: Messages = {
        'zh-cn': {
          confirm: '确定',
        },
        en: {
          confirm: 'OK',
        },
      };
      return messages[props.lang][key];
    };

    return {
      t,
    };
  },
});
</script>

<template>
  <Transition
    name="fade"
    class="cosy:transition-opacity cosy:duration-200 cosy:ease-in-out"
  >
    <div
      v-if="modelValue"
      class="cosy:fixed cosy:inset-0 cosy:z-50 cosy:flex cosy:items-center cosy:justify-center cosy:opacity-100 cosy:enter:opacity-0 cosy:leave:opacity-0"
    >
      <!-- 背景遮罩 -->
      <div
        class="cosy:absolute cosy:inset-0 cosy:bg-base-200/80 cosy:backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      />

      <!-- 对话框 -->
      <div
        class="cosy:relative cosy:bg-base-100 cosy:rounded-xl cosy:shadow-lg cosy:w-[400px] cosy:transform cosy:transition-all"
      >
        <!-- 内容区域 -->
        <div class="cosy:p-6">
          <p class="cosy:text-base-content">
            {{ message }}
          </p>
        </div>

        <!-- 按钮区域 -->
        <div class="cosy:flex cosy:border-t cosy:border-base-300">
          <button
            class="cosy:btn cosy:btn-ghost cosy:flex-1 cosy:rounded-none cosy:rounded-b-xl"
            @click="$emit('update:modelValue', false)"
          >
            {{ t('confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
