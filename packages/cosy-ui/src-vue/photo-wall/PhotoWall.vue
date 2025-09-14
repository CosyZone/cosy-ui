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
        'cosy:auto-rows-[minmax(0,1fr)]', // 使用 minmax 确保行高可以收缩
        getGapClasses(props.gap), // 使用动态间距
        'cosy:justify-items-stretch', // 让卡片填满网格区域
        'cosy:items-stretch',
        props.class,
    ];

    return baseClasses.join(' ');
});

// 简单的不重叠布局算法 - 强制所有卡片为正方形
const getCardLayout = (index: number, card: PhotoCardData) => {
    // 强制所有卡片使用相同的正方形尺寸
    const colSpan = 3; // 每个卡片占用3列
    const rowSpan = 3; // 每个卡片占用3行，确保正方形

    // 使用简单的网格布局，确保不重叠
    // 每行最多4个卡片，每个卡片占用3列空间
    const itemsPerRow = 4;
    const currentRow = Math.floor(index / itemsPerRow);
    const currentCol = index % itemsPerRow;

    // 计算起始位置 - 每个卡片占用3列空间，行间距为3
    const colStart = currentCol * 3 + 1;
    const rowStart = currentRow * 3 + 1;

    // 确保不超出网格边界
    const finalColStart = Math.min(colStart, 13 - colSpan);

    return {
        gridArea: `${rowStart} / ${finalColStart} / ${rowStart + rowSpan} / ${finalColStart + colSpan}`,
        colSpan,
        rowSpan
    };
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
                :clickable="clickable" :rounded="rounded" :style="{ gridArea: getCardLayout(index, photo).gridArea }" />
        </div>
    </Container>
</template>
