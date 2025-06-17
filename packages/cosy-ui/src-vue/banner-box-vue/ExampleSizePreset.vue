<!--
@component BannerBox.SizePreset

@description
BannerBox 组件的尺寸预设示例，展示如何使用尺寸选择功能。

@usage
```vue
<BannerBoxExamples.SizePreset />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import BannerBox from './BannerBox.vue';

export default defineComponent({
  name: 'BannerBoxSizePresetExample',
  components: {
    BannerBox,
  },
});
</script>

<template>
  <div>
    <p class="cosy:mb-4">
      悬停在左上角显示下载按钮，点击可切换尺寸。尺寸会保存在浏览器中。
    </p>
    <BannerBox>
      <div
        class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[200px]"
      >
        <h2 class="cosy:text-3xl cosy:font-bold">点击左上角按钮切换尺寸</h2>
      </div>
    </BannerBox>
  </div>
</template>
