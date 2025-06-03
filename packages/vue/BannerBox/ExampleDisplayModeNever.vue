<!--
@component BannerBox.DisplayModeNever

@description
BannerBox 组件的"不显示下载按钮"模式示例。

@usage
```vue
<BannerBoxExamples.DisplayModeNever />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import BannerBox from './BannerBox.vue'

export default defineComponent({
    name: 'BannerBoxDisplayModeNeverExample',
    components: {
        BannerBox
    }
})
</script>

<template>
    <div>
        <BannerBox displayMode="never" :backgroundClassIndex="3">
            <div class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[150px]">
                <p>不显示下载按钮</p>
            </div>
        </BannerBox>
    </div>
</template>