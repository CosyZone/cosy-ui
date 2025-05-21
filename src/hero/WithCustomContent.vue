<template>
    <SmartHero title="支持自定义内容" description="这个示例展示了如何使用插槽添加自定义内容" :links="links">
        <template #app>
            <div class="cosy:p-6 cosy:bg-base-200 cosy:rounded-xl cosy:max-w-lg cosy:mx-auto cosy:shadow-lg">
                <div class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-left">
                    <div class="cosy:font-mono cosy:text-sm cosy:mb-2 cosy:text-success">// 示例代码</div>
                    <div class="cosy:font-mono cosy:text-sm">
                        <div><span class="cosy:text-primary">&lt;SmartHero</span></div>
                        <div class="cosy:pl-4"><span class="cosy:text-info">title</span>=<span
                                class="cosy:text-warning">"支持自定义内容"</span></div>
                        <div class="cosy:pl-4"><span class="cosy:text-info">description</span>=<span
                                class="cosy:text-warning">"自定义内容示例"</span></div>
                        <div class="cosy:pl-4">...</div>
                        <div><span class="cosy:text-primary">&gt;</span></div>
                        <div class="cosy:pl-2"><span class="cosy:text-primary">&lt;template</span> <span
                                class="cosy:text-info">#app</span><span class="cosy:text-primary">&gt;</span></div>
                        <div class="cosy:pl-4">// 您的自定义内容</div>
                        <div class="cosy:pl-2"><span class="cosy:text-primary">&lt;/template&gt;</span></div>
                        <div><span class="cosy:text-primary">&lt;/SmartHero&gt;</span></div>
                    </div>
                </div>
            </div>
        </template>
    </SmartHero>
</template>

<script setup lang="ts">
import '../style';
import { ref } from 'vue';
import SmartHero from './SmartHero.vue';

const links = ref([
    { text: '了解插槽', href: '#slots' },
    { text: '查看文档', href: '#docs' }
]);
</script>