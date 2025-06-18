<!--
@component BannerBox.DisplayModeHover

@description
BannerBox 组件的"悬停时显示下载按钮"模式示例，这是默认行为。

@usage
```vue
<BannerBoxExamples.DisplayModeHover />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import BannerBox from './BannerBox.vue';

export default defineComponent({
  name: 'BannerBoxDisplayModeHoverExample',
  components: {
    BannerBox,
  },
});
</script>

<template>
  <div>
    <BannerBox displayMode="hover" :backgroundClassIndex="2">
      <div
        class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[150px]"
      >
        <p>鼠标悬停时显示下载按钮</p>
      </div>
    </BannerBox>
  </div>
</template>
