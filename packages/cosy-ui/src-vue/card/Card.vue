<script setup lang="ts">
import { computed } from 'vue';

/**
 * @component Card
 * @description Vue 版本的 Card 组件，用于在页面中展示相关内容的容器，通常包含标题、描述和可选的图片
 * @props {string} title - 卡片标题（必填）
 * @props {string} [subtitle] - 卡片副标题或描述
 * @props {string} [imageUrl] - 卡片顶部图片的URL
 * @props {string} [href] - 如果提供，卡片将变成可点击的链接
 * @props {boolean} [compact=false] - 是否使用紧凑模式
 * @props {string} [class] - 自定义CSS类，可用于覆盖默认样式
 */

defineOptions({
    name: 'Card',
});

const props = defineProps({
    class: String,
    compact: Boolean,
    href: String,
    imageUrl: String,
    subtitle: String,
    title: { type: String, required: true },
});

const cardClasses = computed(() => [
    'cosy:card',
    'cosy:w-full',
    'cosy:bg-base-100',
    'cosy:shadow-xl',
    'cosy:hover:shadow-2xl',
    'cosy:transition-all',
    'cosy:duration-300',
    'cosy:ease-in-out',
    props.compact ? 'cosy:card-compact' : '',
    props.href ? 'cosy:cursor-pointer cosy:hover:scale-105 cosy:transform cosy:no-underline' : '',
    props.class,
].filter(Boolean).join(' '));

const contentPadding = computed(() => props.compact ? 'cosy:p-4' : 'cosy:p-6');
</script>

<template>
    <component :is="props.href ? 'a' : 'article'" :href="props.href" :class="cardClasses">
        <template v-if="props.imageUrl">
            <figure class="not-prose cosy:m-0 cosy:p-0">
                <img :src="props.imageUrl" :alt="props.title"
                    class="cosy:w-full cosy:h-48 cosy:object-cover cosy:rounded-t-lg" />
            </figure>
        </template>
        <div :class="['cosy:card-body', contentPadding]">
            <h2 class="cosy:card-title cosy:text-xl cosy:font-bold">{{ props.title }}</h2>
            <p v-if="props.subtitle" class="cosy:text-base-content/70 cosy:text-sm cosy:leading-relaxed">{{
                props.subtitle }}
            </p>
            <div v-if="$slots.default" class="cosy:mt-4">
                <slot />
            </div>
        </div>
    </component>
</template>
