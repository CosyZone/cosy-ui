<template>
  <BannerBox
    title="这是一个非常长的标题，用来测试长标题的显示效果和自动换行功能"
  >
    <div style="text-align: center">
      <p style="font-size: 1.125rem; color: #6b7280">长标题会自动换行显示</p>
    </div>
  </BannerBox>
</template>

<script setup lang="ts">
import { BannerBox } from '@coffic/cosy-ui/vue';
</script>
