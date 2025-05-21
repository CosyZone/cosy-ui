<template>
    <SmartHero title="带图片的英雄组件" description="这是一个包含图片的英雄组件示例，展示了如何在顶部添加图片" :image="image" :links="links" />
</template>

<script setup lang="ts">
import '../../style';
import { ref } from 'vue';
import SmartHero from './Hero.vue';

const image = ref({
    src: 'https://via.placeholder.com/600x300/4F46E5/FFFFFF?text=Smart+Hero',
    alt: '英雄图片示例'
});

const links = ref([
    { text: '了解更多', href: '#' },
    { text: '立即开始', href: '#get-started' }
]);
</script>
