<script setup lang="ts">
import '../app.css'

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

<template>
    <Transition name="fade" class="transition-opacity duration-200 ease-in-out">
        <div v-if="modelValue"
            class="fixed inset-0 z-50 flex items-center justify-center opacity-100 enter:opacity-0 leave:opacity-0">
            <!-- 背景遮罩 -->
            <div class="absolute inset-0 cosy:bg-base-200/80 backdrop-blur-sm"
                @click="$emit('update:modelValue', false)" />

            <!-- 对话框 -->
            <div class="relative bg-base-100 rounded-xl shadow-lg w-[400px] transform transition-all">
                <!-- 内容区域 -->
                <div class="cosy:p-6">
                    <p class="text-base-content">
                        {{ message }}
                    </p>
                </div>

                <!-- 按钮区域 -->
                <div class="cosy:flex cosy:border-t cosy:border-base-300">
                    <button class="btn btn-ghost flex-1 rounded-none rounded-b-xl"
                        @click="$emit('update:modelValue', false)">
                        {{ t('confirm') }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>
