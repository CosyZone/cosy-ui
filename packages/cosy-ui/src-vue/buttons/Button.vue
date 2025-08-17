<script setup lang="ts">
import { computed } from 'vue';
import '../../style';

/**
 * @component Button
 * @description Vue 版本的 Button 组件，用于触发一个即时操作，如表单提交、打开对话框等
 * @props {string} [variant='primary'] - 按钮样式变体，支持 primary、secondary、accent、info、success、warning、error、ghost、link、outline、neutral
 * @props {string} [size='md'] - 按钮尺寸，支持 lg、md、sm、xs
 * @props {string} [shape] - 按钮形状，支持 circle、square
 * @props {boolean} [wide=false] - 是否为宽按钮
 * @props {boolean} [block=false] - 是否为块级显示
 * @props {boolean} [loading=false] - 是否显示加载状态
 * @props {boolean} [disabled=false] - 是否禁用按钮
 * @props {string} [type='button'] - 按钮类型，支持 button、submit、reset
 * @props {string} [href] - 链接地址，设置后按钮变为链接形式
 * @props {string} [target] - 链接目标，支持 _self、_blank、_parent、_top
 */

interface Props {
    block?: boolean;
    disabled?: boolean;
    href?: string;
    loading?: boolean;
    shape?: 'circle' | 'square';
    size?: 'lg' | 'md' | 'sm' | 'xs';
    target?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'
    | 'outline'
    | 'neutral';
    wide?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    wide: false,
    block: false,
    loading: false,
    disabled: false,
    type: 'button',
});

const buttonClasses = computed(() => {
    const classes = ['cosy:btn'];

    // Variant classes
    const variantClasses = {
        primary: 'cosy:btn-primary',
        secondary: 'cosy:btn-secondary',
        accent: 'cosy:btn-accent',
        info: 'cosy:btn-info',
        success: 'cosy:btn-success',
        warning: 'cosy:btn-warning',
        error: 'cosy:btn-error',
        ghost: 'cosy:btn-ghost',
        link: 'cosy:btn-link',
        outline: 'cosy:btn-outline',
        neutral: 'cosy:btn-neutral',
    };

    // Size classes
    const sizeClasses = {
        lg: 'cosy:btn-lg',
        md: 'cosy:btn-md',
        sm: 'cosy:btn-sm',
        xs: 'cosy:btn-xs',
    };

    // Shape classes
    const shapeClasses = {
        circle: 'cosy:btn-circle',
        square: 'cosy:btn-square',
    };

    if (variantClasses[props.variant]) {
        classes.push(variantClasses[props.variant]);
    }

    if (sizeClasses[props.size]) {
        classes.push(sizeClasses[props.size]);
    }

    if (props.shape && shapeClasses[props.shape]) {
        classes.push(shapeClasses[props.shape]);
    }

    if (props.wide) classes.push('cosy:btn-wide');
    if (props.block) classes.push('cosy:btn-block');
    if (props.loading) classes.push('cosy:loading');

    return classes;
});
</script>

<template>
    <component :is="props.href ? 'a' : 'button'" :class="buttonClasses" :type="props.href ? undefined : props.type"
        :disabled="props.disabled" :href="props.href" :target="props.target">
        <span class="cosy:flex cosy:items-center cosy:gap-2">
            <slot name="icon-left" />
            <slot />
            <slot name="icon-right" />
        </span>
    </component>
</template>
