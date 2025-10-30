<script setup lang="ts">
import { ApplePhone } from '@coffic/cosy-ui/vue';
</script>
<template>
    <ApplePhone title="长文本示例(有边框)" :showFrame="true">
        <div class="cosy:p-4 cosy:text-left">
            <h2 class="cosy:text-xl cosy:font-bold cosy:mb-4">长文本内容展示</h2>
            <p class="cosy:mb-3">
                这是一个展示长文本内容的示例。在这个示例中，我们将展示大量文本内容在
                ApplePhone 组件中的渲染效果。
            </p>
            <p class="cosy:mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p class="cosy:mb-3">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
            </p>
        </div>
    </ApplePhone>
</template>
