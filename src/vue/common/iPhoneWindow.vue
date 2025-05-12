<template>
  <div class="relative w-full">
    <div class="relative aspect-[9/19.5]">
      <!-- iPhone 边框 (放在最底层) -->
      <img
        v-if="showFrame"
        src="/assets/iPhone 14 Pro/iPhone 14 Pro - Deep Purple - Portrait.imageset/iPhone 14 Pro - Deep Purple - Portrait.png"
        alt="iPhone frame"
        class="absolute inset-0 w-full h-full object-contain"
      >

      <!-- 内容区域 -->
      <div
        :class="[
          'absolute inset-0',
          showFrame ? 'px-[6%] pt-[13%] pb-[13%]' : '',
        ]"
      >
        <div
          :class="[
            'w-full h-full flex flex-col overflow-hidden',
            showFrame ? 'rounded-t-[2.5em] rounded-b-[2.5rem]' : 'rounded-lg shadow',
            backgroundColor || 'bg-transparent'
          ]"
        >
          <!-- 顶部状态栏 (z-index 设为负数，确保在边框下方) -->
          <div class="flex-none h-12 px-4 z-0 relative">
            <div class="flex items-center h-full justify-between">
              <!-- 左侧时间 -->
              <div class="flex items-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ currentTime
                }}</span>
              </div>
              <!-- 右侧状态图标 -->
              <div class="flex items-center space-x-1.5">
                <!-- 信号图标 -->
                <svg
                  class="w-5 h-3.5 text-gray-700 dark:text-gray-200"
                  viewBox="0 0 20 12"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M1 11h2V6H1v5zm4 0h2V4H5v7zm4 0h2V2H9v9zm4 0h2V0h-2v11z"
                    fill="currentColor"
                  />
                  <path
                    d="M17 11h2V0h-2v11z"
                    fill="currentColor"
                    opacity="0.4"
                  />
                </svg>
                <!-- Wi-Fi图标 -->
                <svg
                  class="w-5 h-4 text-gray-700 dark:text-gray-200"
                  viewBox="0 0 16 12"
                  fill="currentColor"
                >
                  <path
                    d="M8 10.5a1 1 0 100-2 1 1 0 000 2zM4.25 7.25a5 5 0 017.5 0l-1.06 1.06a3.5 3.5 0 00-5.38 0L4.25 7.25z"
                  />
                  <path d="M1.75 4.75a8.5 8.5 0 0112.5 0l-1.06 1.06a7 7 0 00-10.38 0L1.75 4.75z" />
                </svg>
                <!-- 电池图标 -->
                <div class="flex items-center space-x-0.5">
                  <svg
                    class="w-6 h-3.5 text-gray-700 dark:text-gray-200"
                    viewBox="0 0 25 12"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="21"
                      height="11"
                      rx="2.5"
                      stroke-width="1"
                    />
                    <rect
                      x="2"
                      y="2"
                      width="18"
                      height="8"
                      rx="1"
                      fill="currentColor"
                    />
                    <path
                      d="M23 4h1a1 1 0 011 1v2a1 1 0 01-1 1h-1V4z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 主要内容区域 -->
          <div class="flex-1 flex flex-col overflow-hidden relative">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 添加 AlertDialog 组件 -->
  <AlertDialog 
    v-model="showAlertDialog" 
    :message="alertMessage" 
  />
</template>

<script setup>
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
let timeInterval
onMounted(() => {
    updateTime()
    timeInterval = setInterval(updateTime, 60000) // 每分钟更新一次
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