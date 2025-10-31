<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <div class="cosy:bg-base-200 cosy:p-4 cosy:rounded-lg">
    <p class="cosy:mb-4">上方内容</p>
    <Grid :cols="2" gap="md" marginY="lg">
      <div class="cosy:bg-primary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
        有垂直外边距
      </div>
      <div class="cosy:bg-secondary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
        第二列
      </div>
    </Grid>
    <p class="cosy:mt-4">下方内容</p>
  </div>
</template>

