<script setup lang="ts">
import '../../style';
import { computed } from 'vue';
import type { IPhotoCardProps, PhotoCardData } from './types';
import { roundedClasses } from '../../src/common';

/**
 * @component PhotoCard
 *
 * @description
 * PhotoCard 组件用于展示单个照片卡片，支持多种尺寸、形状和样式。
 * 可以显示图片、渐变背景、文字内容等，并支持悬停和点击效果。
 *
 * @design
 * 设计理念：
 * 1. 灵活性 - 支持多种尺寸和形状，适应不同布局需求
 * 2. 视觉层次 - 通过不同的样式和尺寸建立视觉层次
 * 3. 交互性 - 提供丰富的悬停和点击效果
 * 4. 一致性 - 保持与整体设计系统的一致性
 *
 * @usage
 * 基本用法：
 * ```vue
 * <PhotoCard :card="cardData" />
 * ```
 *
 * 自定义样式：
 * ```vue
 * <PhotoCard 
 *   :card="cardData" 
 *   :hover="true" 
 *   :clickable="true" 
 *   rounded="lg" 
 * />
 * ```
 */

const props = withDefaults(defineProps<IPhotoCardProps>(), {
    hover: true,
    clickable: true,
    rounded: 'md',
});

// 获取尺寸类名
const getSizeClasses = (size: string = 'md') => {
    const sizeMap = {
        xs: 'cosy:w-16 cosy:h-16',
        sm: 'cosy:w-24 cosy:h-24',
        md: 'cosy:w-32 cosy:h-32',
        lg: 'cosy:w-40 cosy:h-40',
        xl: 'cosy:w-48 cosy:h-48',
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
};

// 获取形状类名
const getShapeClasses = (shape: string = 'square') => {
    const shapeMap = {
        square: '',
        rectangle: 'cosy:w-48 cosy:h-32',
        wide: 'cosy:w-64 cosy:h-32',
        tall: 'cosy:w-32 cosy:h-48',
    };
    return shapeMap[shape as keyof typeof shapeMap] || '';
};

// 获取样式类名
const getStyleClasses = (style: string = 'default') => {
    const styleMap = {
        default: 'cosy:bg-base-100',
        gradient: 'cosy:bg-gradient-to-br',
        image: 'cosy:bg-cover cosy:bg-center',
        text: 'cosy:bg-base-100 cosy:flex cosy:flex-col cosy:items-center cosy:justify-center',
    };
    return styleMap[style as keyof typeof styleMap] || styleMap.default;
};

// 计算卡片样式
const cardClasses = computed(() => {
    const baseClasses = [
        'cosy:relative',
        'cosy:overflow-hidden',
        'cosy:border',
        'cosy:border-base-300',
        'cosy:shadow-sm',
        getSizeClasses(props.card.size),
        getShapeClasses(props.card.shape),
        getStyleClasses(props.card.style),
        roundedClasses[props.rounded],
    ];

    if (props.hover) {
        baseClasses.push('cosy:transition-all cosy:duration-300 cosy:cursor-pointer');
    }

    if (props.clickable) {
        baseClasses.push('cosy:cursor-pointer');
    }

    return baseClasses.join(' ');
});

// 计算悬停效果类名
const hoverClasses = computed(() => {
    if (!props.hover) return '';
    return 'cosy:group-hover:scale-105 cosy:group-hover:shadow-lg';
});

// 计算背景样式
const backgroundStyle = computed(() => {
    if (props.card.style === 'gradient' && props.card.gradient) {
        return {
            background: props.card.gradient,
        };
    }
    if (props.card.style === 'image' && props.card.src) {
        return {
            backgroundImage: `url(${props.card.src})`,
        };
    }
    if (props.card.backgroundColor) {
        return {
            backgroundColor: props.card.backgroundColor,
        };
    }
    return {};
});

// 计算文字颜色样式
const textStyle = computed(() => {
    if (props.card.textColor) {
        return {
            color: props.card.textColor,
        };
    }
    return {};
});
</script>

<template>
    <div :class="[cardClasses, hoverClasses, props.class]"
        :style="[backgroundStyle, props.card.style === 'image' ? { backgroundImage: `url(${card.src})` } : {}]">
        <!-- 图片模式 -->
        <img v-if="card.style === 'default' && card.src" :src="card.src" :alt="card.alt || card.title || '照片'"
            class="cosy:w-full cosy:h-full cosy:object-cover" />

        <!-- 文字模式 -->
        <div v-else-if="card.style === 'text'" class="cosy:p-4 cosy:text-center" :style="textStyle">
            <h3 v-if="card.title" class="cosy:text-lg cosy:font-semibold cosy:mb-2">
                {{ card.title }}
            </h3>
            <p v-if="card.subtitle" class="cosy:text-sm cosy:opacity-80">
                {{ card.subtitle }}
            </p>
        </div>

        <!-- 渐变模式 -->
        <div v-else-if="card.style === 'gradient'"
            class="cosy:p-4 cosy:flex cosy:flex-col cosy:items-center cosy:justify-center cosy:text-white">
            <h3 v-if="card.title" class="cosy:text-lg cosy:font-semibold cosy:mb-2">
                {{ card.title }}
            </h3>
            <p v-if="card.subtitle" class="cosy:text-sm cosy:opacity-90">
                {{ card.subtitle }}
            </p>
        </div>

        <!-- 悬停遮罩 -->
        <div v-if="hover"
            class="cosy:absolute cosy:inset-0 cosy:bg-black/20 cosy:opacity-0 cosy:group-hover:opacity-100 cosy:transition-opacity cosy:duration-300 cosy:flex cosy:items-center cosy:justify-center">
            <span class="cosy:text-white cosy:text-sm cosy:font-medium">
                点击查看
            </span>
        </div>

        <!-- 链接包装 -->
        <a v-if="card.href" :href="card.href" :target="card.target || '_self'"
            class="cosy:absolute cosy:inset-0 cosy:z-10" />
    </div>
</template>
