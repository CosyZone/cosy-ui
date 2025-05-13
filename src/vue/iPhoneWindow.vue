<!--
@component iPhoneWindow

@description
iPhoneWindow 组件模拟 iPhone 设备的外观，包含状态栏、时间显示和设备边框。
适用于创建移动应用界面原型或展示移动端设计效果。

@usage
基本用法：
```vue
<iPhoneWindow>
  <div>应用内容</div>
</iPhoneWindow>
```

不显示边框：
```vue
<iPhoneWindow :showFrame="false">
  <div>应用内容</div>
</iPhoneWindow>
```

自定义背景色：
```vue
<iPhoneWindow backgroundColor="bg-blue-50">
  <div>应用内容</div>
</iPhoneWindow>
```

@props
@prop {String} [height='h-96'] - 窗口高度
@prop {String} [title=''] - 窗口标题
@prop {Array} [statusBarButtons=[]] - 状态栏按钮数组
@prop {Boolean} [withShadow=true] - 是否显示阴影效果
@prop {Boolean} [showFrame=true] - 是否显示 iPhone 边框
@prop {String} [backgroundColor=''] - 内容区域背景色

@slots
@slot default - 主要内容区域

@emits
-->

<template>
    <div class="cosy:relative cosy:w-full">
        <div class="cosy:relative cosy:aspect-[9/19.5]">
            <!-- iPhone 边框 (放在最底层) -->
            <img v-if="showFrame"
                src="/assets/iPhone 14 Pro/iPhone 14 Pro - Deep Purple - Portrait.imageset/iPhone 14 Pro - Deep Purple - Portrait.png"
                alt="iPhone frame" class="cosy:absolute cosy:inset-0 cosy:w-full cosy:h-full cosy:object-contain">

            <!-- 内容区域 -->
            <div :class="[
                'cosy:absolute cosy:inset-0',
                showFrame ? 'cosy:px-[6%] cosy:pt-[13%] cosy:pb-[13%]' : '',
            ]">
                <div :class="[
                    'cosy:w-full cosy:h-full cosy:flex cosy:flex-col cosy:overflow-hidden',
                    showFrame ? 'cosy:rounded-t-[2.5em] cosy:rounded-b-[2.5rem]' : 'cosy:rounded-lg cosy:shadow',
                    backgroundColor || 'cosy:bg-transparent'
                ]">
                    <!-- 顶部状态栏 (z-index 设为负数，确保在边框下方) -->
                    <div class="cosy:flex-none cosy:h-12 cosy:px-4 cosy:z-0 cosy:relative">
                        <div class="cosy:flex cosy:items-center cosy:h-full cosy:justify-between">
                            <!-- 左侧时间 -->
                            <div class="cosy:flex cosy:items-center">
                                <span
                                    class="cosy:text-sm cosy:font-medium cosy:text-gray-700 cosy:dark:text-gray-200">{{
                                        currentTime
                                    }}</span>
                            </div>
                            <!-- 右侧状态图标 -->
                            <div class="cosy:flex cosy:items-center cosy:space-x-1.5">
                                <!-- 信号图标 -->
                                <svg class="cosy:w-5 cosy:h-3.5 cosy:text-gray-700 cosy:dark:text-gray-200"
                                    viewBox="0 0 20 12" fill="none" stroke="currentColor">
                                    <path d="M1 11h2V6H1v5zm4 0h2V4H5v7zm4 0h2V2H9v9zm4 0h2V0h-2v11z"
                                        fill="currentColor" />
                                    <path d="M17 11h2V0h-2v11z" fill="currentColor" opacity="0.4" />
                                </svg>
                                <!-- Wi-Fi图标 -->
                                <svg class="cosy:w-5 cosy:h-4 cosy:text-gray-700 cosy:dark:text-gray-200"
                                    viewBox="0 0 16 12" fill="currentColor">
                                    <path
                                        d="M8 10.5a1 1 0 100-2 1 1 0 000 2zM4.25 7.25a5 5 0 017.5 0l-1.06 1.06a3.5 3.5 0 00-5.38 0L4.25 7.25z" />
                                    <path d="M1.75 4.75a8.5 8.5 0 0112.5 0l-1.06 1.06a7 7 0 00-10.38 0L1.75 4.75z" />
                                </svg>
                                <!-- 电池图标 -->
                                <div class="cosy:flex cosy:items-center cosy:space-x-0.5">
                                    <svg class="cosy:w-6 cosy:h-3.5 cosy:text-gray-700 cosy:dark:text-gray-200"
                                        viewBox="0 0 25 12" fill="none" stroke="currentColor">
                                        <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke-width="1" />
                                        <rect x="2" y="2" width="18" height="8" rx="1" fill="currentColor" />
                                        <path d="M23 4h1a1 1 0 011 1v2a1 1 0 01-1 1h-1V4z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 主要内容区域 -->
                    <div class="cosy:flex-1 cosy:flex cosy:flex-col cosy:overflow-hidden cosy:relative">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 添加 AlertDialog 组件 -->
    <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>

<script setup lang="ts">
import '../app.css'
import AlertDialog from './AlertDialog.vue'
import { ref, onMounted, onUnmounted } from 'vue'

defineProps({
    height: {
        type: String,
        default: 'h-96'
    },
    title: {
        type: String,
        default: ''
    },
    statusBarButtons: {
        type: Array,
        default: () => []
    },
    withShadow: {
        type: Boolean,
        default: true
    },
    showFrame: {
        type: Boolean,
        default: true
    },
    backgroundColor: {
        type: String,
        default: ''
    }
})

const showAlertDialog = ref(false)
const alertMessage = ref('')

const currentTime = ref('12:00')

// 更新时间的函数
const updateTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    currentTime.value = `${hours}:${minutes}`
}

// 设置定时器更新时间
let timeInterval: number
onMounted(() => {
    updateTime()
    timeInterval = window.setInterval(updateTime, 60000) // 每分钟更新一次
})

onUnmounted(() => {
    if (timeInterval) {
        clearInterval(timeInterval)
    }
})
</script>

<style scoped>
/* 确保图标渲染更平滑 */
svg {
    shape-rendering: geometricPrecision;
}
</style>