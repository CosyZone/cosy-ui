<template>
  <div class="relative w-full rounded-2xl max-w-7xl mx-auto">
    <!-- Add size indicator -->
    <div
      v-if="isLoadedFromStorage"
      class="absolute top-4 right-4 bg-yellow-500/30 backdrop-blur-sm px-3 py-1 rounded-lg text-sm text-white"
    >
      {{ selectedSize.name }}
    </div>

    <!-- Download button with dropdown menu -->
    <div
      v-if="showDownloadButton"
      class="absolute top-4 left-4 opacity-0 hover:opacity-100 transition-opacity"
    >
      <div class="relative">
        <button
          class="bg-yellow-500/30 backdrop-blur-sm p-2 rounded-lg hover:bg-yellow-500/40"
          @click="toggleDropdown"
        >
          <RiDownloadLine class="w-6 h-6 text-white" />
        </button>
        <!-- Size selection dropdown -->
        <div
          v-if="isDropdownOpen"
          class="absolute left-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50"
        >
          <!-- Component size presets -->
          <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="preset in sizePresets"
                :key="preset.name"
                :class="[
                  'p-2 text-left rounded text-sm',
                  selectedSize.name === preset.name
                    ? 'bg-yellow-500/30 text-yellow-900 dark:text-yellow-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
                @click="selectedSize = preset"
              >
                <div class="flex flex-col">
                  <span class="font-medium">{{ preset.name }}</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ preset.width.replace('w-[', '').replace(']', '') }}
                  </span>
                </div>
              </button>
              <!-- Clear size button -->
              <button
                class="p-2 text-left rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                @click="clearStoredSize"
              >
                <div class="flex flex-col">
                  <span class="font-medium text-red-600 dark:text-red-400">清除记住的尺寸</span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">重置为默认尺寸</span>
                </div>
              </button>
            </div>
          </div>
          <!-- Background settings -->
          <div class="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div class="mt-2">
              <div class="grid grid-cols-8 gap-2">
                <button
                  v-for="(_, index) in bgClasses"
                  :key="index"
                  :class="[
                    bgClasses[index],
                    'w-8 h-8 rounded-lg border-2',
                    selectedBgIndex === index ? 'border-yellow-500' : 'border-transparent'
                  ]"
                  @click="selectedBgIndex = index"
                />
              </div>
            </div>
          </div>
          <!-- Size options -->
          <div class="p-4">
            <button
              class="w-full p-2 text-center rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              @click="downloadAsImage()"
            >
              <div class="flex items-center justify-center gap-2">
                <RiDownloadLine class="w-4 h-4" />
                <span class="font-medium">下载图片</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      ref="componentRef"
      class="flex p-8 rounded-2xl shadow"
      :class="[
        getBackgroundClass(),
        selectedSize.width,
        selectedSize.height
      ]"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { RiDownloadLine } from '@remixicon/vue';
import { toPng } from 'html-to-image';

const props = defineProps({
    showDownloadButton: {
        type: Boolean,
        default: true
    },
    backgroundClassIndex: {
        type: Number,
        default: 0
    }
})

const componentRef = ref<HTMLElement | null>(null);

const isDropdownOpen = ref(false);

const sizePresets = [
    { name: 'Default', width: 'w-full', height: 'h-full' },
    { name: 'Square', width: 'w-[600px]', height: 'h-[600px]' },
    { name: 'Landscape', width: 'w-[800px]', height: 'h-[450px]' },
    { name: 'Portrait', width: 'w-[450px]', height: 'h-[800px]' },
    { name: 'Wide', width: 'w-[1200px]', height: 'h-[675px]' },
    { name: 'Banner', width: 'w-[1200px]', height: 'h-[300px]' },
    { name: '1280 × 800', width: 'w-[1280px]', height: 'h-[800px]' },
    { name: '1440 × 900', width: 'w-[1440px]', height: 'h-[900px]' },
    { name: '2560 × 1600', width: 'w-[2560px]', height: 'h-[1600px]' },
    { name: '2880 × 1800', width: 'w-[2880px]', height: 'h-[1800px]' },
];

const selectedSize = ref(sizePresets[0]);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// Add new ref for tracking if size was loaded from storage
const isLoadedFromStorage = ref(false);

// 监听尺寸变化并保存到 localStorage
watch(selectedSize, (newSize) => {
    localStorage.setItem('bannerBoxSize', JSON.stringify(newSize));
    // 当尺寸改变时，发出事件通知其他组件
    window.dispatchEvent(new CustomEvent('bannerBoxSizeChange', {
        detail: newSize
    }));
    // 设置为已加载状态，显示尺寸标签
    isLoadedFromStorage.value = true;
});

// 创建自定义事件处理函数
const handleSizeClear = () => {
    selectedSize.value = sizePresets[0];
    isLoadedFromStorage.value = false;
};

// 处理尺寸变化的事件
const handleSizeChange = (event: Event) => {
    const customEvent = event as CustomEvent;
    selectedSize.value = customEvent.detail;
    isLoadedFromStorage.value = true;
};

onMounted(() => {
    const savedSize = localStorage.getItem('bannerBoxSize');
    if (savedSize) {
        const parsed = JSON.parse(savedSize);
        const found = sizePresets.find(preset => preset.name === parsed.name);
        if (found) {
            selectedSize.value = found;
            isLoadedFromStorage.value = true;
        }
    }

    // 添加事件监听
    window.addEventListener('bannerBoxClear', handleSizeClear);
    window.addEventListener('bannerBoxSizeChange', handleSizeChange);

    document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.relative')) {
            isDropdownOpen.value = false;
        }
    });
});

// Update downloadAsImage function to accept scale parameter
const downloadAsImage = async () => {
    try {
        const element = componentRef.value;
        if (!element) {
            console.error('Component reference is null');
            return;
        }

        const dataUrl = await toPng(element, {
            backgroundColor: undefined,
            style: {
                transform: 'scale(1)',
                transformOrigin: 'top left'
            }
        });

        const link = document.createElement('a');
        const fileName = `feature-${element.offsetWidth}x${element.offsetHeight}.png`;
        link.download = fileName;
        link.href = dataUrl;
        link.click();
        isDropdownOpen.value = false;
    } catch (error) {
        console.error('Failed to download image:', error);
    }
};

const bgClasses = [
    'bg-gradient-to-b from-blue-100/50 to-blue-200/50 dark:from-blue-500/10 dark:to-blue-200/10',
    'bg-gradient-to-b from-blue-200/50  to-purple-200/50 dark:from-blue-500/10 dark:to-purple-200/10',
    'bg-gradient-to-b from-yellow-200/50  to-green-200/50 dark:from-yellow-500/10 dark:to-green-200/10',
    'bg-gradient-to-b from-teal-200/50  to-blue-200/50 dark:from-teal-500/10 dark:to-blue-200/10',
    'bg-gradient-to-b from-pink-200/50  to-indigo-200/20 dark:from-pink-500/10 dark:to-indigo-200/10',
    'bg-gradient-to-b from-red-200/50  to-orange-200/50 dark:from-red-500/10 dark:to-orange-200/10',
    'bg-gradient-to-b from-orange-200/50  to-yellow-200/50 dark:from-orange-500/10 dark:to-yellow-200/10',
    'bg-gradient-to-b from-green-200/50  to-teal-200/50 dark:from-green-500/10 dark:to-teal-200/10',

    // 不透明的背景
    'bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-500 dark:to-blue-200',
    'bg-gradient-to-b from-blue-200  to-purple-200 dark:from-blue-500 dark:to-purple-200',
    'bg-gradient-to-b from-yellow-200  to-green-200 dark:from-yellow-500 dark:to-green-200',
    'bg-gradient-to-b from-teal-200  to-blue-200 dark:from-teal-500 dark:to-blue-200',
    'bg-gradient-to-b from-pink-200  to-red-200 dark:from-pink-500 dark:to-red-200',
    'bg-gradient-to-b from-red-200  to-orange-200 dark:from-red-500 dark:to-orange-200',
    'bg-gradient-to-b from-orange-200  to-yellow-200 dark:from-orange-500 dark:to-yellow-200',
    'bg-gradient-to-b from-green-200  to-teal-200 dark:from-green-500 dark:to-teal-200',

    // 不透明的深色背景
    'bg-gradient-to-b from-blue-900 to-blue-200 dark:from-blue-900 dark:to-blue-200',
    'bg-gradient-to-b from-blue-900 to-purple-200 dark:from-blue-900 dark:to-purple-200',
    'bg-gradient-to-b from-yellow-900 to-green-200 dark:from-yellow-900 dark:to-green-200',
    'bg-gradient-to-b from-teal-900 to-blue-200 dark:from-teal-900 dark:to-blue-200',
    'bg-gradient-to-b from-pink-900 to-red-200 dark:from-pink-900 dark:to-red-200',
    'bg-gradient-to-b from-red-900 to-orange-200 dark:from-red-900 dark:to-orange-200',
    'bg-gradient-to-b from-orange-900 to-yellow-200 dark:from-orange-900 dark:to-yellow-200',
    'bg-gradient-to-b from-green-900 to-teal-900 dark:from-green-900 dark:to-teal-900',
    // 不透明的渐变背景
    'bg-gradient-to-br from-emerald-400 to-cyan-400 dark:from-emerald-600 dark:to-cyan-600',
    'bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:from-violet-600 dark:to-fuchsia-600',
    'bg-gradient-to-br from-amber-400 to-orange-400 dark:from-amber-600 dark:to-orange-600',
    'bg-gradient-to-br from-rose-400 to-pink-400 dark:from-rose-600 dark:to-pink-600',
    'bg-gradient-to-br from-sky-400 to-indigo-400 dark:from-sky-600 dark:to-indigo-600',
    'bg-gradient-to-br from-lime-400 to-emerald-400 dark:from-lime-600 dark:to-emerald-600',
    'bg-gradient-to-br from-purple-400 to-indigo-400 dark:from-purple-600 dark:to-indigo-600',
    'bg-gradient-to-br from-blue-400 to-violet-400 dark:from-blue-600 dark:to-violet-600',

    // 纯色背景
    'bg-emerald-400 dark:bg-emerald-600',
    'bg-violet-400 dark:bg-violet-600',
    'bg-amber-400 dark:bg-amber-600',
    'bg-rose-400 dark:bg-rose-600',
    'bg-sky-400 dark:bg-sky-600',
    'bg-lime-400 dark:bg-lime-600',
    'bg-purple-400 dark:bg-purple-600',
    'bg-blue-400 dark:bg-blue-600'

]

const selectedBgIndex = ref(props.backgroundClassIndex);

const getBackgroundClass = (): string => {
    return bgClasses[selectedBgIndex.value % bgClasses.length];
}

const clearStoredSize = () => {
    localStorage.removeItem('bannerBoxSize');
    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('bannerBoxClear'));
    isDropdownOpen.value = false;
};

// 清理事件监听
onUnmounted(() => {
    window.removeEventListener('bannerBoxClear', handleSizeClear);
    window.removeEventListener('bannerBoxSizeChange', handleSizeChange);
});
</script>