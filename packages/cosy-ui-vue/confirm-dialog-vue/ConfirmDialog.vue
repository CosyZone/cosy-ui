<!--
@component ConfirmDialog

@description
ConfirmDialog 组件用于显示确认对话框，带有标题、消息内容和两个按钮（确认和取消），支持自定义按钮文本，并带有淡入淡出动画效果。

@usage
基本用法：
```vue
<ConfirmDialog v-model="showDialog" title="确认操作" message="您确定要执行此操作吗？" @confirm="handleConfirm" />
```

自定义按钮文本：
```vue
<ConfirmDialog 
  v-model="showDialog" 
  title="删除确认" 
  message="您确定要删除此项目吗？此操作无法撤销。" 
  cancel-text="取消" 
  confirm-text="删除" 
  @confirm="handleDelete" 
/>
```

组合使用：
```vue
<template>
  <button @click="showDialog = true">删除项目</button>
  <ConfirmDialog v-model="showDialog" title="删除确认" message="此操作无法撤销" @confirm="handleDelete" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ConfirmDialog } from 'cosy-ui';

const showDialog = ref(false);
const handleDelete = () => {
  // 处理确认删除逻辑
};
</script>
```

@props
@prop {boolean} modelValue - 控制对话框显示状态，支持v-model双向绑定
@prop {string} [title='Confirm'] - 对话框标题
@prop {string} [message='Are you sure you want to confirm this action?'] - 对话框显示的消息内容
@prop {string} [cancel-text='取消'] - 取消按钮的文本
@prop {string} [confirm-text='确认'] - 确认按钮的文本

@emits
@emit {update:modelValue} - 当对话框关闭时触发，用于更新v-model绑定值
@emit {confirm} - 当用户点击确认按钮时触发
-->

<template>
  <Transition
    name="fade"
    class="cosy:transition-opacity cosy:duration-200 cosy:ease-in-out"
  >
    <div
      v-if="modelValue"
      class="cosy:fixed cosy:inset-0 cosy:z-50 cosy:flex cosy:items-center cosy:justify-center"
    >
      <!-- 背景遮罩 -->
      <div
        class="cosy:absolute cosy:inset-0 cosy:bg-base-200/80 cosy:backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      />

      <!-- 对话框 -->
      <div
        class="cosy:relative cosy:bg-base-100 cosy:rounded-xl cosy:shadow-xl cosy:w-[400px] cosy:transform cosy:transition-all"
      >
        <!-- 内容区域 -->
        <div class="cosy:p-6">
          <h3
            class="cosy:text-lg cosy:font-medium cosy:text-base-content cosy:mb-2"
          >
            {{ title }}
          </h3>
          <p class="cosy:text-base-content/80">
            {{ message }}
          </p>
        </div>

        <!-- 按钮区域 -->
        <div class="cosy:flex cosy:border-t cosy:border-base-300">
          <button
            class="cosy:flex-1 cosy:btn cosy:btn-ghost cosy:rounded-none cosy:rounded-bl-xl"
            @click="$emit('update:modelValue', false)"
          >
            {{ cancelText }}
          </button>
          <button
            class="cosy:flex-1 cosy:btn cosy:btn-ghost cosy:text-primary cosy:rounded-none cosy:rounded-br-xl cosy:border-l cosy:border-base-300"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import '../../style';

defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: String,
    default: 'Are you sure you want to confirm this action?',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  confirmText: {
    type: String,
    default: '确认',
  },
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const handleConfirm = () => {
  emit('update:modelValue', false);
  emit('confirm');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
