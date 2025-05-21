<template>
    <SmartHero title="智能英雄组件" description="一个现代化的页面英雄区域组件，适合用作页面顶部的展示区域" :links="links" />
</template>

<script setup lang="ts">
import '../style';
import { ref } from 'vue';
import SmartHero from './SmartHero.vue';

const links = ref([
    { text: '了解更多', href: '#' },
    { text: '查看文档', href: '#docs' }
]);
</script>
