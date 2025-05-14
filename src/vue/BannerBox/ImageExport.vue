<!--
@component BannerBox.ImageExport

@description
BannerBox 组件的导出为图片示例，展示如何使用图片导出功能。

@usage
```vue
<BannerBoxExamples.ImageExport />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import BannerBox from './BannerBox.vue'

export default defineComponent({
    name: 'BannerBoxImageExportExample',
    components: {
        BannerBox
    }
})
</script>

<template>
    <div>
        <p class="cosy:mb-4">悬停在左上角显示下载按钮，点击可下载当前内容为图片。</p>
        <BannerBox :backgroundClassIndex="8">
            <div
                class="cosy:flex cosy:flex-col cosy:items-center cosy:justify-center cosy:min-h-[200px] cosy:p-8 cosy:text-center">
                <h2 class="cosy:text-3xl cosy:font-bold cosy:mb-4">可导出为图片的内容</h2>
                <p class="cosy:text-lg">适用于创建社交媒体分享图、营销材料等场景</p>
            </div>
        </BannerBox>
    </div>
</template>
