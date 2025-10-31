<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Grid :cols="2" gap="md">
    <div class="cosy:bg-primary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      默认行间距
    </div>
    <div class="cosy:bg-secondary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第二列
    </div>
    <div class="cosy:bg-accent/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第三行第一列
    </div>
    <div class="cosy:bg-info/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第三行第二列
    </div>
  </Grid>
</template>

