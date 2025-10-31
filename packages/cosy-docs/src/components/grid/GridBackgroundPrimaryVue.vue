<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Grid :cols="3" gap="md" background="primary">
    <div class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-center">
      主色调背景
    </div>
    <div class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第二列
    </div>
    <div class="cosy:bg-base-100 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第三列
    </div>
  </Grid>
</template>

