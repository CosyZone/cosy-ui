<!--
@component BannerBox.Basic

@description
BannerBox 组件的基础示例，展示最基本的横幅容器用法。

@usage
```vue
<BannerBoxExamples.Basic />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import BannerBox from './BannerBox.vue';

export default defineComponent({
  name: 'BannerBoxBasicExample',
  components: {
    BannerBox,
  },
});
</script>

<template>
  <BannerBox>
    <div
      class="cosy:flex cosy:items-center cosy:justify-center cosy:min-h-[200px]"
    >
      <h2 class="cosy:text-3xl cosy:font-bold">欢迎使用 BannerBox</h2>
    </div>
  </BannerBox>
</template>
