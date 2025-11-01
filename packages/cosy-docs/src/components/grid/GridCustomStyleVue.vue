<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Grid
    :cols="3"
    gap="md"
    class="cosy:bg-gradient-to-r cosy:from-primary/20 cosy:to-secondary/20 cosy:p-6 cosy:rounded-xl"
  >
    <div
      class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-center cosy:shadow-lg"
    >
      自定义样式
    </div>
    <div
      class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-center cosy:shadow-lg"
    >
      第二列
    </div>
    <div
      class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-center cosy:shadow-lg"
    >
      第三列
    </div>
  </Grid>
</template>

