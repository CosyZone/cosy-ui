<template>
  <div class="cosy:space-y-4">
    <div class="cosy:grid cosy:gap-4">
      <ListItem :loading="true" animation-type="ring">
        <span class="cosy:font-medium">Ring 外环脉冲</span>
        <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70">默认效果</span>
      </ListItem>

      <ListItem :loading="true" animation-type="icon-left">
        <span class="cosy:font-medium">前置图标</span>
        <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70"
          >Spinner 旋转</span
        >
      </ListItem>

      <ListItem :loading="true" animation-type="icon-right">
        <span class="cosy:font-medium">后置图标</span>
        <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70">Dots 跳动</span>
      </ListItem>

      <ListItem :loading="true" animation-type="breath">
        <span class="cosy:font-medium">背景呼吸</span>
        <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70"
          >背景色变化</span
        >
      </ListItem>

      <ListItem :loading="true" animation-type="pulse">
        <span class="cosy:font-medium">整体脉冲</span>
        <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70"
          >缩放 + 透明度</span
        >
      </ListItem>

      <ListItem :loading="true" animation-type="glow">
        <span class="cosy:font-medium">发光边框</span>
        <span class="cosy:ml-auto cosy:text-sm cosy:opacity-70">阴影发光</span>
      </ListItem>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @component ListItemAnimationTypesExample
 * @description 展示 ListItem 的所有动画效果类型
 */
import { ListItem } from '@coffic/cosy-ui/vue';
</script>
