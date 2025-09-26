<template>
  <div class="cosy:space-y-6">
    <BannerBox
      title="产品特性"
      description="了解我们产品的核心优势"
      :features="basicFeatures"
    />

    <BannerBox
      title="服务优势"
      description="我们提供全方位的服务支持"
      :features="serviceFeatures"
    />
  </div>
</template>

<script setup lang="ts">
import { BannerBox } from '@coffic/cosy-ui/vue';

const basicFeatures = [
  { emoji: '🚀', title: '高性能', link: '#' },
  { emoji: '⚡', title: '快速响应', link: '#' },
  { emoji: '🔒', title: '安全可靠', link: '#' },
];

const serviceFeatures = [
  { emoji: '💡', title: '智能分析', link: '#' },
  { emoji: '🛠️', title: '专业支持', link: '#' },
  { emoji: '📊', title: '数据洞察', link: '#' },
  { emoji: '🌐', title: '全球服务', link: '#' },
];
</script>
