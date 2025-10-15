<script setup lang="ts">
import "../../style";

/**
 * @component ConfirmDialog
 * @description Vue 版本的 ConfirmDialog 组件，用于显示确认对话框，带有标题、消息内容和两个按钮（确认和取消）
 * @props {boolean} modelValue - 控制对话框显示状态，支持 v-model 双向绑定
 * @props {string} [title='Confirm'] - 对话框标题
 * @props {string} [message='Are you sure you want to confirm this action?'] - 对话框显示的消息内容
 * @props {string} [cancelText='取消'] - 取消按钮的文本
 * @props {string} [confirmText='确认'] - 确认按钮的文本
 */

defineProps({
	cancelText: {
		type: String,
		default: "取消",
	},
	confirmText: {
		type: String,
		default: "确认",
	},
	message: {
		type: String,
		default: "Are you sure you want to confirm this action?",
	},
	modelValue: Boolean,
	title: {
		type: String,
		default: "Confirm",
	},
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const handleConfirm = () => {
	emit("update:modelValue", false);
	emit("confirm");
};
</script>

<template>
    <Transition name="fade" class="cosy:transition-opacity cosy:duration-200 cosy:ease-in-out">
        <div v-if="modelValue"
            class="cosy:fixed cosy:inset-0 cosy:z-50 cosy:flex cosy:items-center cosy:justify-center">
            <!-- 背景遮罩 -->
            <div class="cosy:absolute cosy:inset-0 cosy:bg-base-200/80 cosy:backdrop-blur-sm"
                @click="$emit('update:modelValue', false)" />

            <!-- 对话框 -->
            <div
                class="cosy:relative cosy:bg-base-100 cosy:rounded-xl cosy:shadow-xl cosy:w-[400px] cosy:transform cosy:transition-all">
                <!-- 内容区域 -->
                <div class="cosy:p-6">
                    <h3 class="cosy:text-lg cosy:font-medium cosy:text-base-content cosy:mb-2">
                        {{ title }}
                    </h3>
                    <p class="cosy:text-base-content/80">
                        {{ message }}
                    </p>
                </div>

                <!-- 按钮区域 -->
                <div class="cosy:flex cosy:border-t cosy:border-base-300">
                    <button class="cosy:flex-1 cosy:btn cosy:btn-ghost cosy:rounded-none cosy:rounded-bl-xl"
                        @click="$emit('update:modelValue', false)">
                        {{ cancelText }}
                    </button>
                    <button
                        class="cosy:flex-1 cosy:btn cosy:btn-ghost cosy:text-primary cosy:rounded-none cosy:rounded-br-xl cosy:border-l cosy:border-base-300"
                        @click="handleConfirm">
                        {{ confirmText }}
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

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
