<template>
  <div class="cosy:space-y-6">
    <BannerBox description="这是一个简单的描述文字，用于说明横幅的内容和用途。">
      <div class="cosy:text-center">
        <p class="cosy:text-lg cosy:text-gray-600">横幅内容区域</p>
      </div>
    </BannerBox>

    <BannerBox
      description="这是一个较长的描述文字，用来测试长描述的显示效果。描述文字会自动换行，并且有合适的行间距，确保良好的阅读体验。"
    >
      <div class="cosy:text-center">
        <p class="cosy:text-lg cosy:text-gray-600">长描述会自动换行显示</p>
      </div>
    </BannerBox>
  </div>
</template>

<script setup lang="ts">
import { BannerBox } from "@coffic/cosy-ui/vue";
</script>
