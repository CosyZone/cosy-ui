<script setup lang="ts">
defineOptions({
    name: 'CardCourse',
});

const props = defineProps({
    title: { type: String, required: true },
    link: { type: String, required: true },
});
</script>

<template>
    <div>
        <a :href="props.link" class="cosy:justify-center cosy:flex cosy:no-underline cosy:text-base-content">
            <div class="cosy:w-56 cosy:h-80">
                <div
                    class="cosy:bg-gradient-to-br cosy:w-full cosy:h-full cosy:from-accent/50 cosy:to-primary/30 cosy:rounded-3xl cosy:shadow-lg cosy:backdrop-blur-sm">
                    <div
                        class="cosy:bg-base-100/60 cosy:w-full cosy:h-full cosy:rounded-3xl cosy:border cosy:border-base-content/30 hover:cosy:scale-105 hover:cosy:shadow-2xl cosy:transform cosy:duration-200 cosy:backdrop-filter cosy:backdrop-blur-sm">
                        <div class="card-body cosy:p-1 cosy:h-full">
                            <div
                                class="cosy:h-3/5 cosy:w-full cosy:flex cosy:items-center cosy:justify-center cosy:text-6xl cosy:text-primary">
                                📚
                            </div>
                            <div>
                                <h2 class="cosy:text-lg cosy:text-center cosy:font-medium">{{ props.title }}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>
