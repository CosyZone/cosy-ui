<!--
@component BannerBox.CustomBg

@description
BannerBox 组件的自定义背景示例，展示如何通过 backgroundClassIndex 属性设置背景样式。

@usage
```vue
<BannerBoxExamples.CustomBg />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import BannerBox from './BannerBox.vue'

export default defineComponent({
    name: 'BannerBoxCustomBgExample',
    components: {
        BannerBox
    }
})
</script>

<template>
    <BannerBox :backgroundClassIndex="5">
        <div class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[200px]">
            <h2 class="cosy:text-3xl cosy:font-bold">自定义背景颜色</h2>
        </div>
    </BannerBox>
</template>
