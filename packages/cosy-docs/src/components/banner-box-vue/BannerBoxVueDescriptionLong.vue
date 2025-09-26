<template>
  <BannerBox
    description="这是一个非常长的描述文字，用来测试长描述的显示效果。描述文字会自动换行，并且有合适的行间距，确保良好的阅读体验。"
  >
    <div style="text-align: center">
      <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem">
        长描述示例
      </h3>
    </div>
  </BannerBox>
</template>

<script setup lang="ts">
import { BannerBox } from '@coffic/cosy-ui/vue';
</script>
