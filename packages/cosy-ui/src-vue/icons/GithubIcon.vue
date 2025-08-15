<script setup lang="ts">
import Icon from './VueIcon.vue';

interface Props {
    /**
     * 图标的大小
     * @default "24px"
     */
    size?: string;
    /**
     * 自定义类名
     */
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: '24px',
    class: '',
});
</script>

<template>
    <Icon name="github" :size="size" :class="props.class" />
</template>
