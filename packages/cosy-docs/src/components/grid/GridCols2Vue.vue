<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Grid :cols="2" gap="md">
    <div class="cosy:bg-primary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      2列布局
    </div>
    <div class="cosy:bg-secondary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第二列
    </div>
  </Grid>
</template>

