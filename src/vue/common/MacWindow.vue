<template>
  <div
    class="flex max-w-5xl mx-auto bg-base-100 relative rounded-2xl overflow-hidden shadow"
    :class="[
      props.height,
      props.withShadow ? 'shadow-lg' : ''
    ]"
  >
    <!-- 窗口控制按钮 -->
    <div class="absolute top-0 left-0 right-0 flex items-center h-12 px-4 bg-base-200 border-b border-base-300">
      <div class="flex items-center space-x-2">
        <div
          class="w-3 h-3 rounded-full bg-error cursor-pointer hover:opacity-80 transition-opacity"
          @click="handleCloseWindow"
        />
        <div
          class="w-3 h-3 rounded-full bg-warning cursor-pointer hover:opacity-80 transition-opacity"
          @click="handleMinimizeWindow"
        />
        <div
          class="w-3 h-3 rounded-full bg-success cursor-pointer hover:opacity-80 transition-opacity"
          @click="handleMaximizeWindow"
        />
      </div>
      <div class="ml-6 text-sm font-medium text-base-content">
        {{ props.title }}
      </div>

      <!-- 标签选择器 -->
      <div
        v-if="props.tabs?.length"
        class="flex-1 flex justify-center"
      >
        <div class="inline-flex rounded-lg bg-base-300 p-1">
          <button
            v-for="(tab, index) in props.tabs"
            :key="index"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-colors',
              modelValue === tab.value
                ? 'bg-base-100 text-base-content shadow'
                : 'text-base-content/70 hover:text-base-content'
            ]"
            @click="handleTabClick(tab.value)"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="ml-auto flex items-center space-x-2">
        <template
          v-for="(button, index) in props.toolbarButtons"
          :key="index"
        >
          <button
            class="p-1.5 text-base-content/70 hover:bg-base-300 rounded transition-colors"
            @click="button.onClick"
          >
            <component
              :is="button.icon"
              class="w-4 h-4"
            />
          </button>
        </template>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="flex-1 flex flex-col pt-12 h-full">
      <div class="flex flex-1 h-full overflow-hidden">
        <!-- 左侧栏插槽 -->
        <slot name="sidebar" />

        <!-- 主内容插槽 -->
        <slot />
      </div>

      <!-- 底部状态栏 -->
      <div
        v-if="statusBarButtons?.length"
        class="h-6 bg-base-200/95 border-t border-base-300 flex items-center justify-end px-4 text-sm"
      >
        <div class="flex items-center space-x-0">
          <template
            v-for="(button, index) in statusBarButtons"
            :key="index"
          >
            <button
              class="hover:text-primary p-2 text-base-content/70 transition-colors"
              @click="button.onClick"
            >
              <component
                :is="button.icon"
                class="w-4 h-4"
              />
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- AlertDialog 组件 -->
  <AlertDialog
    v-model="showAlertDialog"
    :message="alertMessage"
  />
</template>

<script setup lang="ts">
import AlertDialog from './AlertDialog.vue'
import { ref } from 'vue'

const props = defineProps({
    height: {
        type: String,
        default: 'h-96'
    },
    title: {
        type: String,
        default: ''
    },
    toolbarButtons: {
        type: Array,
        default: () => []
    },
    statusBarButtons: {
        type: Array,
        default: () => []
    },
    withShadow: {
        type: Boolean,
        default: true
    },
    tabs: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['close', 'minimize', 'maximize', 'update:modelValue'])

const showAlertDialog = ref(false)
const alertMessage = ref('')

const handleCloseWindow = () => {
    alertMessage.value = '关闭APP窗口（这是演示，不会真实操作）'
    showAlertDialog.value = true
    emit('close')
}

const handleMinimizeWindow = () => {
    alertMessage.value = '最小化窗口（这是演示，不会真实操作）'
    showAlertDialog.value = true
    emit('minimize')
}

const handleMaximizeWindow = () => {
    alertMessage.value = '最大化窗口（这是演示，不会真实操作）'
    showAlertDialog.value = true
    emit('maximize')
}

const handleTabClick = (value: string) => {
    emit('update:modelValue', value)
}
</script>