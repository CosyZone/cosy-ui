<script setup lang="ts">
import { computed } from 'vue';
import type { FooterProps } from './types';

defineProps<{
    config: FooterProps['config']
}>();

const currentYear = computed(() => new Date().getFullYear());

const renderIcon = (icon: FooterProps['config']['socialLinks'][number]['icon']) => {
    switch (icon.type) {
        case 'svg':
            return icon.content;
        case 'image':
            return `<img src="${icon.content}" alt="" class="w-5 h-5" />`;
        case 'component':
            return icon.content;
        default:
            return '';
    }
};
</script>

<template>
    <footer class="bg-base-200/50 dark:bg-base-300/50 z-50 backdrop-blur-md [&_a]:no-underline">
        <div class="footer sm:footer-horizontal p-10 text-base-content">
            <aside class="flex flex-col items-center sm:items-start gap-2 place-self-center">
                <a :href="config.homeLink" class="flex items-center gap-2">
                    <span class="text-xl font-bold">{{ config.siteName }}</span>
                </a>
                <p class="text-sm opacity-70">{{ config.slogan }}</p>

                <div class="flex gap-4 mt-4 sm:mt-0">
                    <a v-for="link in config.socialLinks" :key="link.url" :href="link.url" target="_blank"
                        rel="noopener noreferrer" class="btn btn-ghost btn-sm p-1 hover:text-primary"
                        :title="link.name">
                        <span v-html="renderIcon(link.icon)" />
                        <span class="sr-only">{{ link.name }}</span>
                    </a>
                </div>
            </aside>

            <nav v-for="group in config.navGroups" :key="group.titleKey"
                class="place-self-center text-center flex flex-col items-center">
                <h6 class="footer-title">{{ group.titleKey }}</h6>
                <a v-for="link in group.links" :key="link.href" :href="link.href"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined" class="hover:opacity-80">
                    {{ link.text }}
                </a>
            </nav>
        </div>

        <div class="divider mt-8"></div>

        <div class="flex flex-col sm:flex-col justify-center items-center p-4 text-sm opacity-70">
            <p class="text-center mb-4">{{ config.inspirationalSlogan }}</p>
            <div class="flex items-center gap-2">
                <p>© {{ currentYear }} {{ config.company }} - {{ config.copyright }}</p>
            </div>
            <div v-if="config.icp" class="text-center py-4">
                <p>{{ config.icp }}</p>
            </div>
        </div>
    </footer>
</template>

<style>
@import '../../styles/shared-ui.css';
</style>