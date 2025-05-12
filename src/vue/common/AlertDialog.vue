<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- 背景遮罩 -->
      <div
        class="absolute inset-0 bg-base-200/80 backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      />

      <!-- 对话框 -->
      <div class="relative bg-base-100 rounded-xl shadow-lg w-[400px] transform transition-all">
        <!-- 内容区域 -->
        <div class="p-6">
          <p class="text-base-content">
            {{ message }}
          </p>
        </div>

        <!-- 按钮区域 -->
        <div class="flex border-t border-base-300">
          <button
            class="btn btn-ghost flex-1 rounded-none rounded-b-xl"
            @click="$emit('update:modelValue', false)"
          >
            {{ t('confirm') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
    modelValue: boolean;
    message: string;
    lang?: 'zh-cn' | 'en';
}

const props = withDefaults(defineProps<Props>(), {
    lang: 'zh-cn'
});

// 多语言文本
const t = (key: string) => {
    const messages = {
        'zh-cn': {
            confirm: '确定'
        },
        'en': {
            confirm: 'OK'
        }
    };
    return messages[props.lang][key];
};

defineEmits(['update:modelValue']);
</script>

<style scoped>
@reference '@/app.css';

.fade-enter-active,
.fade-leave-active {
    @apply transition-opacity duration-200 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    @apply opacity-0;
}
</style>