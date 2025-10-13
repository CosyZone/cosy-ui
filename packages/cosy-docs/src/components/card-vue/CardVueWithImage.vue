<script setup lang="ts">
import { Card } from "@coffic/cosy-ui/vue";
</script>

<template>
  <div style="display: flex; justify-content: center; padding: 1rem">
    <Card
      title="带图片的卡片"
      subtitle="使用 imageUrl 属性添加顶部图片"
      imageUrl="/sample-1.png">
      包含图片的卡片内容
    </Card>
  </div>
</template>
