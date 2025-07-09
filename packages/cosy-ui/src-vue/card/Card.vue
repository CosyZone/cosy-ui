<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
    name: 'Card',
});

const props = defineProps({
    title: { type: String, required: true },
    subtitle: String,
    imageUrl: String,
    href: String,
    compact: Boolean,
    class: String,
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
