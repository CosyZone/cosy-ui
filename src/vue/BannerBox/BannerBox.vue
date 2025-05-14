<!--
@component BannerBox

@description
BannerBox 组件是一个可定制的横幅容器，支持自定义背景、尺寸调整和导出为图片功能。
可以直接用作容器，也可以通过传入标题、描述和特性列表来显示内容。
适用于创建营销横幅、特性展示、社交媒体卡片等内容。

@usage
基本用法：
```vue
<BannerBox>
  <div>横幅内容</div>
</BannerBox>
```

使用标题和描述：
```vue
<BannerBox
  title="我的横幅标题"
  description="这是一段描述文字"
  :features="[
    { emoji: '🚀', title: '高性能' },
    { emoji: '⚡', title: '快速响应' },
    { emoji: '🔒', title: '安全可靠' }
  ]"
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
@prop {String} [title=''] - 横幅标题
@prop {String} [description=''] - 横幅描述
@prop {Array} [features=[]] - 特性列表，每项包含{emoji, title, link}
@prop {Object} [customComponent=null] - 自定义组件
@prop {Object} [customComponentProps={}] - 自定义组件的属性

@slots
@slot default - 横幅内容，当不使用title/description/features属性时显示
-->

<script lang="ts">
import { ref, onMounted, watch, onUnmounted, computed, defineComponent } from 'vue';
import { RiDownloadLine } from '@remixicon/vue';
import { toPng } from 'html-to-image';
import FeatureCard from './FeatureCard.vue';
import DownloadButton from './DownloadButton.vue';
import { bgClasses } from './bgStyles';
import '../../style'

interface Feature {
    emoji: string;
    title: string;
    link?: string;
}

export default defineComponent({
    name: 'BannerBox',
    components: {
        RiDownloadLine,
        FeatureCard,
        DownloadButton
    },
    props: {
        displayMode: {
            type: String,
            default: 'hover',
            validator: (value: string) => ['always', 'hover', 'never'].includes(value)
        },
        backgroundClassIndex: {
            type: Number,
            default: 0
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        features: {
            type: Array as () => Feature[],
            default: () => []
        },
        // 自定义组件
        customComponent: {
            type: Object,
            default: null
        },
        // 自定义组件的属性
        customComponentProps: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const componentRef = ref<HTMLElement | null>(null);
        const isDropdownOpen = ref(false);
        const isLoadedFromStorage = ref(false);
        const selectedBgIndex = ref(props.backgroundClassIndex);

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
            console.log("Toggle Dropdown")
            isDropdownOpen.value = !isDropdownOpen.value;
        };

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

            // 恢复到简单的点击监听方式，但使用正确的选择器
            document.addEventListener('click', (event) => {
                if (!isDropdownOpen.value) return; // 如果下拉菜单已经关闭，就不需要处理

                const target = event.target as HTMLElement;
                // 检查点击的元素是否是下拉菜单中的元素
                const isClickedOnDropdown = !!target.closest('[data-dropdown]');

                if (!isClickedOnDropdown) {
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

        const getBackgroundClass = (): string => {
            return bgClasses[selectedBgIndex.value % bgClasses.length];
        }

        const clearStoredSize = () => {
            localStorage.removeItem('bannerBoxSize');
            // 触发自定义事件
            window.dispatchEvent(new CustomEvent('bannerBoxClear'));
            isDropdownOpen.value = false;
        };

        // 确保在组件卸载时清理事件监听器
        onUnmounted(() => {
            window.removeEventListener('bannerBoxClear', handleSizeClear);
            window.removeEventListener('bannerBoxSizeChange', handleSizeChange);
        });

        // 是否显示Banner内容
        const showBannerContent = computed(() => props.title !== '' || props.description !== '' || props.features.length > 0 || props.customComponent !== null);

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
                        classes: 'cosy:opacity-0 cosy:hover:opacity-100 cosy:transition-opacity'
                    };
                case 'never':
                    return {
                        show: false,
                        classes: ''
                    };
                default:
                    return {
                        show: true,
                        classes: 'cosy:opacity-0 cosy:hover:opacity-100 cosy:transition-opacity'
                    };
            }
        });

        return {
            componentRef,
            isDropdownOpen,
            isLoadedFromStorage,
            selectedSize,
            sizePresets,
            selectedBgIndex,
            toggleDropdown,
            downloadAsImage,
            getBackgroundClass,
            clearStoredSize,
            showBannerContent,
            downloadButtonStyles,
            bgClasses
        };
    }
});
</script>

<template>
    <div class="cosy:relative cosy:w-full cosy:rounded-2xl cosy:max-w-7xl cosy:mx-auto">
        <!-- Add size indicator -->
        <div v-if="isLoadedFromStorage"
            class="cosy:absolute cosy:top-4 cosy:right-4 cosy:bg-yellow-500/30 cosy:backdrop-blur-sm cosy:px-3 cosy:py-1 cosy:rounded-lg cosy:text-sm cosy:text-white">
            {{ selectedSize.name }}
        </div>

        <!-- Download button with dropdown menu -->
        <DownloadButton :displayMode="displayMode" :isLoadedFromStorage="isLoadedFromStorage"
            :selectedSize="selectedSize" :selectedBgIndex="selectedBgIndex" :sizePresets="sizePresets"
            @update:selectedSize="selectedSize = $event" @update:selectedBgIndex="selectedBgIndex = $event"
            @clear-stored-size="clearStoredSize" @download-image="downloadAsImage" />

        <div ref="componentRef" class="cosy:flex cosy:p-8 cosy:rounded-2xl cosy:shadow" :class="[
            getBackgroundClass(),
            selectedSize.width,
            selectedSize.height
        ]">
            <!-- Smart Banner Content (when banner prop is provided) -->
            <div v-if="showBannerContent" class="cosy:py-16 cosy:px-8 cosy:text-center cosy:w-full cosy:rounded-2xl"
                data-type="smart-banner">
                <h2 class="cosy:text-4xl cosy:mb-4">
                    {{ title }}
                </h2>

                <p v-if="description.length > 0" class="cosy:text-lg cosy:text-center cosy:max-w-2xl cosy:mx-auto">
                    {{ description }}
                </p>

                <div class="cosy:flex cosy:flex-row cosy:justify-center cosy:gap-8 cosy:mx-auto cosy:w-full cosy:mt-24">
                    <FeatureCard v-for="feature in features" :key="feature.title" :emoji="feature.emoji"
                        :title="feature.title" :link="feature.link" />
                </div>

                <div class="cosy:mt-12">
                    <component :is="customComponent" v-if="customComponent" v-bind="customComponentProps" />
                </div>
            </div>

            <!-- Default slot for custom content (when banner prop is not provided) -->
            <slot v-if="!showBannerContent" />
        </div>
    </div>
</template>
