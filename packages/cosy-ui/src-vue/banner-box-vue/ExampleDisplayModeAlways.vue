<!--
@component BannerBox.DisplayModeAlways

@description
BannerBox 组件的"总是显示下载按钮"模式示例。

@usage
```vue
<BannerBoxExamples.DisplayModeAlways />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import BannerBox from './BannerBox.vue';

export default defineComponent({
  name: 'BannerBoxDisplayModeAlwaysExample',
  components: {
    BannerBox,
  },
});
</script>

<template>
  <div>
    <BannerBox displayMode="always" :backgroundClassIndex="1">
      <div
        class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[150px]"
      >
        <p>下载按钮始终可见</p>
      </div>
    </BannerBox>
  </div>
</template>
