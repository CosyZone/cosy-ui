<!--
@component iPhoneWindow.Basic

@description
iPhoneWindow 组件的基础示例，展示最基本的 iPhone 窗口外观。

@usage
```vue
<iPhoneWindowExamples.Basic />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import iPhoneWindow from './iPhoneWindow.vue'

export default defineComponent({
    name: 'iPhoneWindowBasicExample',
    components: {
        iPhoneWindow
    }
})
</script>

<template>
    <iPhoneWindow>
        <div class="cosy:p-4 cosy:text-center">
            <h2 class="cosy:text-xl cosy:font-bold cosy:mb-2">我的应用</h2>
            <p>这是一个 iPhone 风格的应用界面</p>
        </div>
    </iPhoneWindow>
</template>
