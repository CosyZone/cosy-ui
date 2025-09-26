<template>
  <div class="cosy:space-y-6">
    <BannerBox title="只有标题的横幅">
      <div class="cosy:text-center">
        <p class="cosy:text-lg cosy:text-gray-600">这是横幅的内容区域</p>
      </div>
    </BannerBox>

    <BannerBox title="带长标题的横幅，这个标题比较长，用来测试长标题的显示效果">
      <div class="cosy:text-center">
        <p class="cosy:text-lg cosy:text-gray-600">长标题会自动换行显示</p>
      </div>
    </BannerBox>
  </div>
</template>

<script setup lang="ts">
import { BannerBox } from '@coffic/cosy-ui/vue';
</script>
