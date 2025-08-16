<script setup lang="ts">
import { computed } from 'vue';
import VueIcon from './VueIcon.vue';

interface Props {
    /**
     * 社交媒体平台名称
     * @default "github"
     */
    platform: string;
    /**
     * 图标的大小
     * @default "24px"
     */
    size?: string;
    /**
     * 图标的颜色
     * @default "currentColor"
     */
    color?: string;
    /**
     * 自定义类名
     */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    platform: 'github',
    size: '24px',
    color: 'currentColor',
    class: '',
});

// 根据平台名称选择对应的图标名称
const iconName = computed(() => {
    const platformLower = props.platform.toLowerCase();

    // 社交平台图标映射
    const platformIconMap: Record<string, string> = {
        github: 'github',
        twitter: 'twitter',
        linkedin: 'linkedin',
        facebook: 'facebook',
        // 可以在这里添加更多平台
    };

    // 如果找到对应的图标，使用它；否则使用默认的 github 图标
    return platformIconMap[platformLower] || 'github';
});

// 构建社交图标的类名
const socialIconClass = computed(() => {
    return `social-icon social-icon-${props.platform.toLowerCase()} ${props.class}`;
});
</script>

<template>
    <VueIcon :name="iconName" :size="size" :color="color" :class="socialIconClass" />
</template>
