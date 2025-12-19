<script setup lang="ts">
import { CardCourse } from '@coffic/cosy-ui/vue';
import { RiBookOpenLine } from '@remixicon/vue';
</script>

<template>
  <CardCourse courseName="自定义图标示例" lang="zh" href="/courses/custom-icon">
    <template #icon>
      <RiBookOpenLine class="w-64 h-64 text-blue-600" size="64px" color="#3b82f6" />
    </template>
  </CardCourse>
</template>
