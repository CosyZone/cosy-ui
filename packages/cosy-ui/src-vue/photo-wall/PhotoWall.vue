<script setup lang="ts">
import '../../style';
import { computed, ref, onMounted, nextTick } from 'vue';
import PhotoCard from './PhotoCard.vue';
import Container from '../container/Container.vue';
import type { IPhotoWallProps, PhotoCardData } from './types';

/**
 * @component PhotoWall
 *
 * @description
 * PhotoWall 组件用于展示照片墙，采用不规则布局设计，支持多种尺寸的照片卡片。
 * 组件会自动排列照片，创建视觉层次丰富的展示效果。
 *
 * @design
 * 设计理念：
 * 1. 不规则布局 - 通过不同尺寸的卡片创建动态的视觉层次
 * 2. 响应式设计 - 自适应不同屏幕尺寸
 * 3. 灵活配置 - 支持多种样式和交互选项
 * 4. 性能优化 - 高效的布局计算和渲染
 *
 * @usage
 * 基本用法：
 * ```vue
 * <PhotoWall :photos="photos" />
 * ```
 *
 * 自定义样式：
 * ```vue
 * <PhotoWall 
 *   :photos="photos" 
 *   :hover="true" 
 *   :clickable="true" 
 *   gap="md" 
 *   padding="lg"
 *   rounded="lg" 
 * />
 * ```
 */

const props = withDefaults(defineProps<IPhotoWallProps>(), {
    padding: 'md',
    rounded: 'md',
    gap: 'md',
    hover: true,
    clickable: true,
    width: 'full',
    background: undefined,
    border: false,
    centered: true,
    class: '',
});

// 容器引用
const containerRef = ref<HTMLElement>();

// 获取间距类名
const getGapClasses = (gap: string) => {
    const gapMap = {
        none: '',
        xs: 'cosy:gap-1',
        sm: 'cosy:gap-2',
        md: 'cosy:gap-4',
        lg: 'cosy:gap-6',
        xl: 'cosy:gap-8',
    };
    return gapMap[gap as keyof typeof gapMap] || gapMap.md;
};

// 计算照片墙样式类名
const photoWallClasses = computed(() => {
    const baseClasses = [
        'cosy:grid',
        'cosy:grid-cols-12',
        'cosy:auto-rows-min',
        getGapClasses(props.gap),
        props.class,
    ];

    return baseClasses.join(' ');
});

// 获取卡片网格区域
const getCardGridArea = (index: number, card: PhotoCardData) => {
    // 根据卡片尺寸和位置计算网格区域
    const size = card.size || 'md';
    const row = Math.floor(index / 6) + 1;
    const col = (index % 6) + 1;

    // 根据尺寸确定跨度和位置
    if (size === 'lg') {
        return `${row} / ${col} / ${row + 2} / ${col + 4}`;
    } else if (size === 'md') {
        return `${row} / ${col} / ${row + 1} / ${col + 3}`;
    } else {
        return `${row} / ${col} / ${row + 1} / ${col + 2}`;
    }
};

// 组件挂载后重新计算布局
onMounted(async () => {
    await nextTick();
    // 可以在这里添加更复杂的布局计算逻辑
});
</script>

<template>
    <Container :width="width" :background="background" :border="border" :centered="centered" :padding="padding"
        :rounded="rounded" :style="props.style">
        <div ref="containerRef" :class="photoWallClasses">
            <PhotoCard v-for="(photo, index) in photos" :key="photo.id" :card="photo" :hover="hover"
                :clickable="clickable" :rounded="rounded"
                :class="`cosy:col-span-${photo.size === 'lg' ? '4' : photo.size === 'md' ? '3' : '2'} cosy:row-span-${photo.size === 'lg' ? '2' : '1'}`"
                :style="{ gridArea: getCardGridArea(index, photo) }" />
        </div>
    </Container>
</template>
