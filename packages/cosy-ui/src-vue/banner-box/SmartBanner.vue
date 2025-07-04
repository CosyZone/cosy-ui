<!--
@component BannerBox.SmartBanner

@description
BannerBox 组件的智能横幅模式示例，展示如何通过 title、description 和 features 属性创建结构化内容。

@usage
```vue
<BannerBoxExamples.SmartBanner />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import BannerBox from './BannerBox.vue';

export default defineComponent({
  name: 'BannerBoxSmartBannerExample',
  components: {
    BannerBox,
  },
});
</script>

<template>
  <BannerBox
    title="我们的产品特性"
    description="探索产品提供的所有强大功能"
    :features="[
      {
        emoji: '⚡',
        title: '快速响应',
        link: '#speed',
      },
      {
        emoji: '🔒',
        title: '安全可靠',
        link: '#security',
      },
      {
        emoji: '🌐',
        title: '全球支持',
        link: '#global',
      },
    ]"
  />
</template>
