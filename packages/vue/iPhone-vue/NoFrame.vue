<!--
@component iPhoneWindow.NoFrame

@description
不显示边框的 iPhone 窗口示例，只展示内容区域。

@usage
```vue
<iPhoneWindowExamples.NoFrame />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import iPhoneWindow from './iPhoneWindow.vue';

export default defineComponent({
  name: 'iPhoneWindowNoFrameExample',
  components: {
    iPhoneWindow,
  },
});
</script>

<template>
  <iPhoneWindow :showFrame="false">
    <div class="cosy:p-4 cosy:text-center">
      <h2 class="cosy:text-xl cosy:font-bold cosy:mb-2">纯界面模式</h2>
      <p>不显示 iPhone 边框，只展示内容</p>
    </div>
  </iPhoneWindow>
</template>
