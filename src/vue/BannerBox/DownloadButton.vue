<!--
@component DownloadButton

@description
DownloadButton 组件提供了一个下载按钮，带有可展开的下拉菜单，用于调整尺寸、背景和下载图片。

@usage
基本用法：
```vue
<DownloadButton 
  :displayMode="'hover'" 
  :isLoadedFromStorage="true"
  :selectedSize="selectedSize"
  :selectedBgIndex="selectedBgIndex"
  :sizePresets="sizePresets"
  :bgClasses="bgClasses"
  @update:selectedSize="selectedSize = $event"
  @update:selectedBgIndex="selectedBgIndex = $event"
  @clear-stored-size="clearStoredSize"
  @download-image="downloadAsImage"
/>
```

@props
@prop {String} [displayMode='hover'] - 下载按钮显示模式：'always'(总是显示),'hover'(悬停显示),'never'(不显示)
@prop {Boolean} [isLoadedFromStorage=false] - 是否已从存储中加载尺寸
@prop {Object} [selectedSize] - 当前选中的尺寸预设
@prop {Number} [selectedBgIndex=0] - 当前选中的背景样式索引
@prop {Array} [sizePresets] - 尺寸预设列表
@prop {Array} [bgClasses] - 背景样式类列表

@emits
@emit update:selectedSize - 当选择新的尺寸预设时触发
@emit update:selectedBgIndex - 当选择新的背景样式时触发
@emit clear-stored-size - 当清除存储的尺寸时触发
@emit download-image - 当请求下载图片时触发
-->

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import { RiDownloadLine } from '@remixicon/vue';
import { bgClasses } from './bgStyles';
import { sizePresets, type SizePreset } from './sizePresets';
import '../../style'

export default defineComponent({
    name: 'DownloadButton',
    components: {
        RiDownloadLine
    },
    props: {
        displayMode: {
            type: String,
            default: 'hover',
            validator: (value: string) => ['always', 'hover', 'never'].includes(value)
        },
        isLoadedFromStorage: {
            type: Boolean,
            default: false
        },
        selectedSize: {
            type: Object as () => SizePreset,
            required: true
        },
        selectedBgIndex: {
            type: Number,
            default: 0
        }
    },
    emits: ['update:selectedSize', 'update:selectedBgIndex', 'clear-stored-size', 'download-image'],
    setup(props, { emit }) {
        const isDropdownOpen = ref(false);

        const toggleDropdown = () => {
            isDropdownOpen.value = !isDropdownOpen.value;
        };

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

        const selectSize = (size: SizePreset) => {
            emit('update:selectedSize', size);
        };

        const selectBackground = (index: number) => {
            emit('update:selectedBgIndex', index);
        };

        const clearStoredSize = () => {
            emit('clear-stored-size');
            isDropdownOpen.value = false;
        };

        const downloadImage = () => {
            emit('download-image');
            isDropdownOpen.value = false;
        };

        return {
            isDropdownOpen,
            toggleDropdown,
            downloadButtonStyles,
            selectSize,
            selectBackground,
            clearStoredSize,
            downloadImage,
            bgClasses,
            sizePresets
        };
    }
});
</script>

<template>
    <div v-if="downloadButtonStyles.show" class="cosy:absolute cosy:top-4 cosy:left-4"
        :class="downloadButtonStyles.classes">
        <div class="cosy:relative" data-dropdown>
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
                        ]" @click="selectSize(preset)">
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
                                <span class="cosy:font-medium cosy:text-red-600 dark:cosy:text-red-400">清除记住的尺寸</span>
                                <span class="cosy:text-xs cosy:text-gray-500 dark:cosy:text-gray-400">重置为默认尺寸</span>
                            </div>
                        </button>
                    </div>
                </div>
                <!-- Background settings -->
                <div class="cosy:px-4 cosy:py-2 cosy:border-b cosy:border-gray-200 dark:cosy:border-gray-700">
                    <div class="cosy:mt-2">
                        <div class="cosy:grid cosy:grid-cols-8 cosy:gap-2">
                            <button v-for="(className, index) in bgClasses" :key="index" :class="[
                                className,
                                'cosy:w-8 cosy:h-8 cosy:rounded-lg cosy:border-2',
                                selectedBgIndex === index ? 'cosy:border-yellow-500' : 'cosy:border-transparent'
                            ]" @click="selectBackground(index)" />
                        </div>
                    </div>
                </div>
                <!-- Size options -->
                <div class="cosy:p-4">
                    <button
                        class="cosy:w-full cosy:p-2 cosy:text-center cosy:rounded hover:cosy:bg-gray-100 dark:hover:cosy:bg-gray-700"
                        @click="downloadImage">
                        <div class="cosy:flex cosy:items-center cosy:justify-center cosy:gap-2">
                            <RiDownloadLine class="cosy:w-4 cosy:h-4" />
                            <span class="cosy:font-medium">下载图片</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>