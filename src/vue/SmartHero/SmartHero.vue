<!--
@component SmartHero

@description
SmartHero 组件是一个响应式的英雄区域组件，用于展示标题、描述、图片和操作链接。
支持自定义内容插槽，适合用作页面顶部的展示区域。

@usage
基本用法：
```vue
<SmartHero
  title="智能英雄组件"
  description="一个现代化的页面英雄区域组件"
  :links="[{text: '了解更多', href: '#'}]"
/>
```

带图片：
```vue
<SmartHero
  title="智能英雄组件"
  description="一个现代化的页面英雄区域组件"
  :image="{src: '/images/hero.png', alt: '英雄图片'}"
  :links="[{text: '了解更多', href: '#'}, {text: '查看文档', href: '#docs'}]"
/>
```

使用插槽：
```vue
<SmartHero
  title="智能英雄组件"
  description="一个现代化的页面英雄区域组件"
  :links="[{text: '了解更多', href: '#'}]"
>
  <template #app>
    <div class="demo-app">自定义内容</div>
  </template>
</SmartHero>
```

@props
@prop {string} title - 标题文本
@prop {string} description - 描述文本
@prop {object} [image] - 图片配置对象，包含src和alt属性
@prop {array} links - 链接数组，每个链接包含text和href属性

@slots
@slot app - 用于插入自定义应用或组件展示
-->

<script setup lang="ts">
import '../../style';
import type { PropType } from 'vue';
import {VueBtnLink} from '../../button/index_vue';

interface Link {
    text: string;
    href: string;
}

interface ImageProps {
    src: string;
    alt: string;
}

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object as PropType<ImageProps>,
        required: false,
        default: () => ({
            src: '',
            alt: ''
        })
    },
    links: {
        type: Array as PropType<Link[]>,
        required: true,
        default: () => []
    }
});
</script>

<template>
    <div class="cosy:py-16 cosy:px-8 cosy:text-center cosy:w-full cosy:min-h-screen cosy:relative cosy:overflow-hidden">
        <div class="cosy:relative cosy:z-10 cosy:rounded-lg cosy:w-full cosy:h-full">
            <template v-if="image.src">
                <img :src="image.src" :alt="image.alt" class="cosy:h-1/2 cosy:mx-auto cosy:mb-8 cosy:drop-shadow-xl">
            </template>

            <h2 class="cosy:text-4xl cosy:mb-4 cosy:animate-fade-up">
                {{ title }}
            </h2>
            <p class="cosy:text-lg cosy:mb-12 cosy:text-center cosy:max-w-2xl cosy:mx-auto">
                {{ description }}
            </p>

            <div class="cosy:my-12 cosy:w-full">
                <slot name="app" />
            </div>

            <div class="cosy:flex cosy:flex-row cosy:justify-center cosy:gap-8 cosy:mx-auto cosy:w-full">
                <VueBtnLink v-for="link in links" :key="link.text" :text="link.text" :href="link.href" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-up {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.cosy\:animate-fade-up {
    animation: fade-up 0.8s ease-out forwards;
}
</style>
