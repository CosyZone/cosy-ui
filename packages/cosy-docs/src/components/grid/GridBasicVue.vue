<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Grid :cols="3" gap="md">
    <div class="cosy:bg-primary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第一列
    </div>
    <div class="cosy:bg-secondary/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第二列
    </div>
    <div class="cosy:bg-accent/10 cosy:p-4 cosy:rounded-lg cosy:text-center">
      第三列
    </div>
  </Grid>
</template>

