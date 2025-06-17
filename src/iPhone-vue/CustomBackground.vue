<!--
@component iPhoneWindow.CustomBackground

@description
自定义背景色的 iPhone 窗口示例，展示如何设置不同的背景色。

@usage
```vue
<iPhoneWindowExamples.CustomBackground />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import iPhoneWindow from './iPhoneWindow.vue'

export default defineComponent({
    name: 'iPhoneWindowCustomBackgroundExample',
    components: {
        iPhoneWindow
    }
})
</script>

<template>
    <iPhoneWindow backgroundColor="cosy:bg-blue-50">
        <div class="cosy:p-4 cosy:text-center">
            <h2 class="cosy:text-xl cosy:font-bold cosy:mb-2 cosy:text-blue-800">蓝色主题</h2>
            <p class="cosy:text-blue-600">自定义背景色的应用界面</p>
        </div>
    </iPhoneWindow>
</template>
