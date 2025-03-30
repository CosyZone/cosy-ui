<template>
    <button class="btn" :class="[
        variantClass,
        sizeClass,
        {
            'btn-disabled': disabled,
            'btn-active': active,
            'btn-block': block,
            'btn-circle': circle,
            'btn-square': square,
            'loading': loading
        }
    ]" :disabled="disabled || loading" v-bind="$attrs">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { defineProps } from 'vue'
type ButtonVariant = '' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-info' |
    'btn-success' | 'btn-warning' | 'btn-error' | 'btn-ghost' | 'btn-link'
type ButtonSize = '' | 'btn-xs' | 'btn-sm' | 'btn-md' | 'btn-lg'

const props = defineProps({
    // 按钮变体
    variant: {
        type: String as () => ButtonVariant,
        default: '' as ButtonVariant,
        validator: (value: string): value is ButtonVariant => [
            '',
            'btn-primary',
            'btn-secondary',
            'btn-accent',
            'btn-info',
            'btn-success',
            'btn-warning',
            'btn-error',
            'btn-ghost',
            'btn-link'
        ].includes(value)
    },
    // 按钮大小
    size: {
        type: String as () => ButtonSize,
        default: '' as ButtonSize,
        validator: (value: string): value is ButtonSize => [
            '',
            'btn-xs',
            'btn-sm',
            'btn-md',
            'btn-lg'
        ].includes(value)
    },
    // 是否禁用
    disabled: {
        type: Boolean,
        default: false
    },
    // 是否激活状态
    active: {
        type: Boolean,
        default: false
    },
    // 是否块级按钮
    block: {
        type: Boolean,
        default: false
    },
    // 是否圆形按钮
    circle: {
        type: Boolean,
        default: false
    },
    // 是否方形按钮
    square: {
        type: Boolean,
        default: false
    },
    // 是否加载状态
    loading: {
        type: Boolean,
        default: false
    }
})

const variantClass = computed(() => props.variant || '')
const sizeClass = computed(() => props.size || '')
</script>