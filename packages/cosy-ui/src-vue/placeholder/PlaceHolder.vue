<script setup lang="ts">
import { computed } from 'vue';
import type { IPlaceHolderProps } from './types';

/**
 * @component PlaceHolder
 * @description 占位符组件，用于在布局中占用指定的空间，支持自定义宽度、高度、内边距和背景色
 * @usage
 * ```vue
 * <PlaceHolder width="md" height="lg" padding="md" background="base-200">
 *   <p>内容</p>
 * </PlaceHolder>
 * ```
 * @props
 * @prop {string} [background] - 背景色类名，可选值：base-100、base-200、base-300、primary、secondary、accent、info、success、warning、error
 * @prop {string} [class] - 自定义 CSS 类名，用于添加额外的样式
 * @prop {string} [height='md'] - 高度尺寸，可选值：none、xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、full
 * @prop {string} [padding='none'] - 内边距大小，可选值：none、xs、sm、md、lg、xl
 * @prop {string} [width='md'] - 宽度尺寸，可选值：none、xs、sm、md、lg、xl、2xl、3xl、4xl、5xl、6xl、full
 * @slots
 * @slot default - 占位符内容
 */

interface Props extends IPlaceHolderProps { }

const props = withDefaults(defineProps<Props>(), {
    height: 'md',
    padding: 'none',
    width: 'md',
});

// 宽度样式映射
const widthClassMap = {
    none: '',
    xs: 'cosy:w-8',
    sm: 'cosy:w-16',
    md: 'cosy:w-24',
    lg: 'cosy:w-32',
    xl: 'cosy:w-40',
    '2xl': 'cosy:w-48',
    '3xl': 'cosy:w-56',
    '4xl': 'cosy:w-64',
    '5xl': 'cosy:w-72',
    '6xl': 'cosy:w-80',
    full: 'cosy:w-full',
} as const;

// 高度样式映射
const heightClassMap = {
    none: '',
    xs: 'cosy:h-8',
    sm: 'cosy:h-16',
    md: 'cosy:h-24',
    lg: 'cosy:h-32',
    xl: 'cosy:h-40',
    '2xl': 'cosy:h-48',
    '3xl': 'cosy:h-56',
    '4xl': 'cosy:h-64',
    '5xl': 'cosy:h-72',
    '6xl': 'cosy:h-80',
    full: 'cosy:h-full',
} as const;

// 内边距样式映射
const paddingClassMap = {
    none: '',
    xs: 'cosy:p-1',
    sm: 'cosy:p-2',
    md: 'cosy:p-4',
    lg: 'cosy:p-6',
    xl: 'cosy:p-8',
} as const;

// 背景色样式映射
const backgroundClassMap = {
    'base-100': 'cosy:bg-base-100',
    'base-200': 'cosy:bg-base-200',
    'base-300': 'cosy:bg-base-300',
    primary: 'cosy:bg-primary',
    secondary: 'cosy:bg-secondary',
    accent: 'cosy:bg-accent',
    info: 'cosy:bg-info',
    success: 'cosy:bg-success',
    warning: 'cosy:bg-warning',
    error: 'cosy:bg-error',
} as const;

const widthClass = widthClassMap[props.width as keyof typeof widthClassMap] || '';
const heightClass = heightClassMap[props.height as keyof typeof heightClassMap] || '';
const paddingClass = paddingClassMap[props.padding as keyof typeof paddingClassMap] || '';
const backgroundClass = props.background
    ? backgroundClassMap[props.background as keyof typeof backgroundClassMap] || ''
    : '';

const combinedClass = computed(() => {
    return `placeholder ${widthClass} ${heightClass} ${paddingClass} ${backgroundClass} ${props.class || ''}`.trim();
});
</script>

<template>
    <div :class="combinedClass">
        <slot />
    </div>
</template>

<style scoped>
.placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
}
</style>
