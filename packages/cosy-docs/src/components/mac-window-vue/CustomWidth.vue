<template>
  <div class="cosy:space-y-4">
    <!-- 小宽度 -->
    <div>
      <h4 class="cosy:text-sm cosy:font-medium cosy:mb-2">小宽度 (sm)</h4>
      <MacWindow title="小窗口" width="sm" height="h-48">
        <PlaceHolder width="full" height="lg" padding="md">
          小宽度窗口内容
        </PlaceHolder>
      </MacWindow>
    </div>

    <!-- 中等宽度 -->
    <div>
      <h4 class="cosy:text-sm cosy:font-medium cosy:mb-2">
        中等宽度 (md) - 默认
      </h4>
      <MacWindow title="中等窗口" width="md" height="h-48">
        <PlaceHolder width="full" height="lg" padding="md">
          中等宽度窗口内容
        </PlaceHolder>
      </MacWindow>
    </div>

    <!-- 大宽度 -->
    <div>
      <h4 class="cosy:text-sm cosy:font-medium cosy:mb-2">大宽度 (lg)</h4>
      <MacWindow title="大窗口" width="lg" height="h-48">
        <PlaceHolder width="full" height="lg" padding="md">
          大宽度窗口内容
        </PlaceHolder>
      </MacWindow>
    </div>

    <!-- 全宽 -->
    <div>
      <h4 class="cosy:text-sm cosy:font-medium cosy:mb-2">全宽 (full)</h4>
      <MacWindow title="全宽窗口" width="full" height="h-48">
        <PlaceHolder width="full" height="lg" padding="md">
          全宽窗口内容
        </PlaceHolder>
      </MacWindow>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MacWindow, PlaceHolder } from '@coffic/cosy-ui/vue';
</script>
