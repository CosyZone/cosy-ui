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

export interface ButtonProps {
    // 按钮变体
    variant?: '' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-info' |
    'btn-success' | 'btn-warning' | 'btn-error' | 'btn-ghost' | 'btn-link'
    // 按钮大小
    size?: '' | 'btn-xs' | 'btn-sm' | 'btn-md' | 'btn-lg'
    // 是否禁用
    disabled?: boolean
    // 是否激活状态
    active?: boolean
    // 是否块级按钮
    block?: boolean
    // 是否圆形按钮
    circle?: boolean
    // 是否方形按钮
    square?: boolean
    // 是否加载状态
    loading?: boolean
}

const props = defineProps<ButtonProps>()

const variantClass = computed(() => props.variant || '')
const sizeClass = computed(() => props.size || '')
</script>