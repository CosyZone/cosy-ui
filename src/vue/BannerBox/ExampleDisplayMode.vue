<!--
@component BannerBox.DisplayMode

@description
BannerBox 组件的显示模式示例，展示如何通过 displayMode 属性控制下载按钮的显示方式。

@usage
```vue
<BannerBoxExamples.DisplayMode />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import BannerBox from './BannerBox.vue'

export default defineComponent({
    name: 'BannerBoxDisplayModeExample',
    components: {
        BannerBox
    }
})
</script>

<template>
    <div class="cosy:space-y-4">
        <h3 class="cosy:text-lg cosy:font-medium">总是显示下载按钮</h3>
        <BannerBox displayMode="always">
            <div class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[100px]">
                <p>下载按钮始终可见</p>
            </div>
        </BannerBox>

        <h3 class="cosy:text-lg cosy:font-medium">悬停时显示下载按钮（默认）</h3>
        <BannerBox displayMode="hover">
            <div class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[100px]">
                <p>鼠标悬停时显示下载按钮</p>
            </div>
        </BannerBox>

        <h3 class="cosy:text-lg cosy:font-medium">隐藏下载按钮</h3>
        <BannerBox displayMode="never">
            <div class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[100px]">
                <p>不显示下载按钮</p>
            </div>
        </BannerBox>
    </div>
</template>
