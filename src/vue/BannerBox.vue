<!--
@component BannerBox

@description
BannerBox 组件是一个可定制的横幅容器，支持自定义背景、尺寸调整和导出为图片功能。
可以直接用作容器，也可以通过传入Banner实体对象来显示标题、描述和特性列表。
适用于创建营销横幅、特性展示、社交媒体卡片等内容。

@usage
基本用法：
```vue
<BannerBox>
  <div>横幅内容</div>
</BannerBox>
```

使用Banner实体：
```vue
<BannerBox
  :banner="banner"
  lang="zh-cn"
/>
```

自定义背景：
```vue
<BannerBox :backgroundClassIndex="5">
  <div>自定义背景的横幅</div>
</BannerBox>
```

设置下载按钮显示模式：
```vue
<BannerBox displayMode="always">
  <div>总是显示下载按钮</div>
</BannerBox>
```

@props
@prop {String} [displayMode='hover'] - 下载按钮显示模式：'always'(总是显示),'hover'(悬停显示),'never'(不显示)
@prop {Number} [backgroundClassIndex=0] - 背景样式索引，对应内置的背景样式列表
@prop {Object} [banner=null] - Banner实体对象，包含标题、描述和特性列表
@prop {String} [lang='en'] - 当前语言，支持'en'和'zh-cn'，仅当使用banner属性时有效

@slots
@slot default - 横幅内容，当不使用banner属性时显示
-->

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted, computed } from 'vue';
import { RiDownloadLine } from '@remixicon/vue';
import { toPng } from 'html-to-image';
import Banner from '../entities/Banner';
import FeatureCard from './FeatureCard.vue';
import '../app.css'

const props = defineProps({
    displayMode: {
        type: String,
        default: 'hover',
        validator: (value: string) => ['always', 'hover', 'never'].includes(value)
    },
    backgroundClassIndex: {
        type: Number,
        default: 0
    },
    banner: {
        type: Banner,
        default: null
    },
    lang: {
        type: String,
        default: 'en',
        validator: (value: string) => ['en', 'zh-cn'].includes(value)
    }
})

const componentRef = ref<HTMLElement | null>(null);

const isDropdownOpen = ref(false);

const sizePresets = [
    { name: 'Default', width: 'cosy:w-full', height: 'cosy:h-full' },
    { name: 'Square', width: 'cosy:w-[600px]', height: 'cosy:h-[600px]' },
    { name: 'Landscape', width: 'cosy:w-[800px]', height: 'cosy:h-[450px]' },
    { name: 'Portrait', width: 'cosy:w-[450px]', height: 'cosy:h-[800px]' },
    { name: 'Wide', width: 'cosy:w-[1200px]', height: 'cosy:h-[675px]' },
    { name: 'Banner', width: 'cosy:w-[1200px]', height: 'cosy:h-[300px]' },
    { name: '1280 × 800', width: 'cosy:w-[1280px]', height: 'cosy:h-[800px]' },
    { name: '1440 × 900', width: 'cosy:w-[1440px]', height: 'cosy:h-[900px]' },
    { name: '2560 × 1600', width: 'cosy:w-[2560px]', height: 'cosy:h-[1600px]' },
    { name: '2880 × 1800', width: 'cosy:w-[2880px]', height: 'cosy:h-[1800px]' },
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
    'cosy:bg-gradient-to-b cosy:from-blue-100/50 cosy:to-blue-200/50 dark:cosy:from-blue-500/10 dark:cosy:to-blue-200/10',
    'cosy:bg-gradient-to-b cosy:from-blue-200/50 cosy:to-purple-200/50 dark:cosy:from-blue-500/10 dark:cosy:to-purple-200/10',
    'cosy:bg-gradient-to-b cosy:from-yellow-200/50 cosy:to-green-200/50 dark:cosy:from-yellow-500/10 dark:cosy:to-green-200/10',
    'cosy:bg-gradient-to-b cosy:from-teal-200/50 cosy:to-blue-200/50 dark:cosy:from-teal-500/10 dark:cosy:to-blue-200/10',
    'cosy:bg-gradient-to-b cosy:from-pink-200/50 cosy:to-indigo-200/20 dark:cosy:from-pink-500/10 dark:cosy:to-indigo-200/10',
    'cosy:bg-gradient-to-b cosy:from-red-200/50 cosy:to-orange-200/50 dark:cosy:from-red-500/10 dark:cosy:to-orange-200/10',
    'cosy:bg-gradient-to-b cosy:from-orange-200/50 cosy:to-yellow-200/50 dark:cosy:from-orange-500/10 dark:cosy:to-yellow-200/10',
    'cosy:bg-gradient-to-b cosy:from-green-200/50 cosy:to-teal-200/50 dark:cosy:from-green-500/10 dark:cosy:to-teal-200/10',

    // 不透明的背景
    'cosy:bg-gradient-to-b cosy:from-blue-100 cosy:to-blue-200 dark:cosy:from-blue-500 dark:cosy:to-blue-200',
    'cosy:bg-gradient-to-b cosy:from-blue-200 cosy:to-purple-200 dark:cosy:from-blue-500 dark:cosy:to-purple-200',
    'cosy:bg-gradient-to-b cosy:from-yellow-200 cosy:to-green-200 dark:cosy:from-yellow-500 dark:cosy:to-green-200',
    'cosy:bg-gradient-to-b cosy:from-teal-200 cosy:to-blue-200 dark:cosy:from-teal-500 dark:cosy:to-blue-200',
    'cosy:bg-gradient-to-b cosy:from-pink-200 cosy:to-red-200 dark:cosy:from-pink-500 dark:cosy:to-red-200',
    'cosy:bg-gradient-to-b cosy:from-red-200 cosy:to-orange-200 dark:cosy:from-red-500 dark:cosy:to-orange-200',
    'cosy:bg-gradient-to-b cosy:from-orange-200 cosy:to-yellow-200 dark:cosy:from-orange-500 dark:cosy:to-yellow-200',
    'cosy:bg-gradient-to-b cosy:from-green-200 cosy:to-teal-200 dark:cosy:from-green-500 dark:cosy:to-teal-200',

    // 不透明的深色背景
    'cosy:bg-gradient-to-b cosy:from-blue-900 cosy:to-blue-200 dark:cosy:from-blue-900 dark:cosy:to-blue-200',
    'cosy:bg-gradient-to-b cosy:from-blue-900 cosy:to-purple-200 dark:cosy:from-blue-900 dark:cosy:to-purple-200',
    'cosy:bg-gradient-to-b cosy:from-yellow-900 cosy:to-green-200 dark:cosy:from-yellow-900 dark:cosy:to-green-200',
    'cosy:bg-gradient-to-b cosy:from-teal-900 cosy:to-blue-200 dark:cosy:from-teal-900 dark:cosy:to-blue-200',
    'cosy:bg-gradient-to-b cosy:from-pink-900 cosy:to-red-200 dark:cosy:from-pink-900 dark:cosy:to-red-200',
    'cosy:bg-gradient-to-b cosy:from-red-900 cosy:to-orange-200 dark:cosy:from-red-900 dark:cosy:to-orange-200',
    'cosy:bg-gradient-to-b cosy:from-orange-900 cosy:to-yellow-200 dark:cosy:from-orange-900 dark:cosy:to-yellow-200',
    'cosy:bg-gradient-to-b cosy:from-green-900 cosy:to-teal-900 dark:cosy:from-green-900 dark:cosy:to-teal-900',
    // 不透明的渐变背景
    'cosy:bg-gradient-to-br cosy:from-emerald-400 cosy:to-cyan-400 dark:cosy:from-emerald-600 dark:cosy:to-cyan-600',
    'cosy:bg-gradient-to-br cosy:from-violet-400 cosy:to-fuchsia-400 dark:cosy:from-violet-600 dark:cosy:to-fuchsia-600',
    'cosy:bg-gradient-to-br cosy:from-amber-400 cosy:to-orange-400 dark:cosy:from-amber-600 dark:cosy:to-orange-600',
    'cosy:bg-gradient-to-br cosy:from-rose-400 cosy:to-pink-400 dark:cosy:from-rose-600 dark:cosy:to-pink-600',
    'cosy:bg-gradient-to-br cosy:from-sky-400 cosy:to-indigo-400 dark:cosy:from-sky-600 dark:cosy:to-indigo-600',
    'cosy:bg-gradient-to-br cosy:from-lime-400 cosy:to-emerald-400 dark:cosy:from-lime-600 dark:cosy:to-emerald-600',
    'cosy:bg-gradient-to-br cosy:from-purple-400 cosy:to-indigo-400 dark:cosy:from-purple-600 dark:cosy:to-indigo-600',
    'cosy:bg-gradient-to-br cosy:from-blue-400 cosy:to-violet-400 dark:cosy:from-blue-600 dark:cosy:to-violet-600',

    // 纯色背景
    'cosy:bg-emerald-400 dark:cosy:bg-emerald-600',
    'cosy:bg-violet-400 dark:cosy:bg-violet-600',
    'cosy:bg-amber-400 dark:cosy:bg-amber-600',
    'cosy:bg-rose-400 dark:cosy:bg-rose-600',
    'cosy:bg-sky-400 dark:cosy:bg-sky-600',
    'cosy:bg-lime-400 dark:cosy:bg-lime-600',
    'cosy:bg-purple-400 dark:cosy:bg-purple-600',
    'cosy:bg-blue-400 dark:cosy:bg-blue-600'
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

// 是否显示Banner内容
const showBannerContent = computed(() => props.banner !== null);

// 计算下载按钮是否显示及其样式类
const downloadButtonStyles = computed(() => {
    switch (props.displayMode) {
        case 'always':
            return {
                show: true,
                classes: 'cosy:opacity-100'
            };
        case 'hover':
            return {
                show: true,
                classes: 'cosy:opacity-0 hover:cosy:opacity-100 cosy:transition-opacity'
            };
        case 'never':
            return {
                show: false,
                classes: ''
            };
        default:
            return {
                show: true,
                classes: 'cosy:opacity-0 hover:cosy:opacity-100 cosy:transition-opacity'
            };
    }
});
</script>

<script lang="ts">
export default {
    name: 'BannerBox'
}
</script>

<template>
    <div class="cosy:relative cosy:w-full cosy:rounded-2xl cosy:max-w-7xl cosy:mx-auto">
        <!-- Add size indicator -->
        <div v-if="isLoadedFromStorage"
            class="cosy:absolute cosy:top-4 cosy:right-4 cosy:bg-yellow-500/30 cosy:backdrop-blur-sm cosy:px-3 cosy:py-1 cosy:rounded-lg cosy:text-sm cosy:text-white">
            {{ selectedSize.name }}
        </div>

        <!-- Download button with dropdown menu -->
        <div v-if="downloadButtonStyles.show" class="cosy:absolute cosy:top-4 cosy:left-4"
            :class="downloadButtonStyles.classes">
            <div class="cosy:relative">
                <button
                    class="cosy:bg-yellow-500/30 cosy:backdrop-blur-sm cosy:p-2 cosy:rounded-lg hover:cosy:bg-yellow-500/40"
                    @click="toggleDropdown">
                    <RiDownloadLine class="cosy:w-6 cosy:h-6 cosy:text-white" />
                </button>
                <!-- Size selection dropdown -->
                <div v-if="isDropdownOpen"
                    class="cosy:absolute cosy:left-0 cosy:mt-2 cosy:w-96 cosy:bg-white dark:cosy:bg-gray-800 cosy:rounded-lg cosy:shadow-lg cosy:py-2 cosy:z-50">
                    <!-- Component size presets -->
                    <div class="cosy:px-4 cosy:py-2 cosy:border-b cosy:border-gray-200 dark:cosy:border-gray-700">
                        <div class="cosy:grid cosy:grid-cols-3 cosy:gap-2">
                            <button v-for="preset in sizePresets" :key="preset.name" :class="[
                                'cosy:p-2 cosy:text-left cosy:rounded cosy:text-sm',
                                selectedSize.name === preset.name
                                    ? 'cosy:bg-yellow-500/30 cosy:text-yellow-900 dark:cosy:text-yellow-100'
                                    : 'hover:cosy:bg-gray-100 dark:hover:cosy:bg-gray-700'
                            ]" @click="selectedSize = preset">
                                <div class="cosy:flex cosy:flex-col">
                                    <span class="cosy:font-medium">{{ preset.name }}</span>
                                    <span class="cosy:text-xs cosy:text-gray-500 dark:cosy:text-gray-400">
                                        {{ preset.width.replace('cosy:w-[', '').replace(']', '') }}
                                    </span>
                                </div>
                            </button>
                            <!-- Clear size button -->
                            <button
                                class="cosy:p-2 cosy:text-left cosy:rounded cosy:text-sm hover:cosy:bg-gray-100 dark:hover:cosy:bg-gray-700"
                                @click="clearStoredSize">
                                <div class="cosy:flex cosy:flex-col">
                                    <span
                                        class="cosy:font-medium cosy:text-red-600 dark:cosy:text-red-400">清除记住的尺寸</span>
                                    <span class="cosy:text-xs cosy:text-gray-500 dark:cosy:text-gray-400">重置为默认尺寸</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <!-- Background settings -->
                    <div class="cosy:px-4 cosy:py-2 cosy:border-b cosy:border-gray-200 dark:cosy:border-gray-700">
                        <div class="cosy:mt-2">
                            <div class="cosy:grid cosy:grid-cols-8 cosy:gap-2">
                                <button v-for="(_, index) in bgClasses" :key="index" :class="[
                                    bgClasses[index],
                                    'cosy:w-8 cosy:h-8 cosy:rounded-lg cosy:border-2',
                                    selectedBgIndex === index ? 'cosy:border-yellow-500' : 'cosy:border-transparent'
                                ]" @click="selectedBgIndex = index" />
                            </div>
                        </div>
                    </div>
                    <!-- Size options -->
                    <div class="cosy:p-4">
                        <button
                            class="cosy:w-full cosy:p-2 cosy:text-center cosy:rounded hover:cosy:bg-gray-100 dark:hover:cosy:bg-gray-700"
                            @click="downloadAsImage()">
                            <div class="cosy:flex cosy:items-center cosy:justify-center cosy:gap-2">
                                <RiDownloadLine class="cosy:w-4 cosy:h-4" />
                                <span class="cosy:font-medium">下载图片</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div ref="componentRef" class="cosy:flex cosy:p-8 cosy:rounded-2xl cosy:shadow" :class="[
            getBackgroundClass(),
            selectedSize.width,
            selectedSize.height
        ]">
            <!-- Smart Banner Content (when banner prop is provided) -->
            <div v-if="showBannerContent" class="cosy:py-16 cosy:px-8 cosy:text-center cosy:w-full cosy:rounded-2xl"
                data-type="smart-banner">
                <h2 class="cosy:text-4xl cosy:mb-4">
                    {{ banner.getTitle(lang) }}
                </h2>

                <p v-if="banner.getDescription(lang).length > 0"
                    class="cosy:text-lg cosy:text-center cosy:max-w-2xl cosy:mx-auto">
                    {{ banner.getDescription(lang) }}
                </p>

                <div class="cosy:flex cosy:flex-row cosy:justify-center cosy:gap-8 cosy:mx-auto cosy:w-full cosy:mt-24">
                    <FeatureCard v-for="feature in banner.getFeatures()" :key="feature.getTitle(lang)"
                        :emoji="feature.emoji" :title="feature.getTitle(lang)" :link="feature.link" />
                </div>

                <div class="cosy:mt-12">
                    <component :is="banner.getComponent()" v-if="banner.getComponent()"
                        v-bind="banner.getComponentProps()" />
                </div>
            </div>

            <!-- Default slot for custom content (when banner prop is not provided) -->
            <slot v-if="!showBannerContent" />
        </div>
    </div>
</template>
