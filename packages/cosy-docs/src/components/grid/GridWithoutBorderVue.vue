<script setup lang="ts">
import { Grid } from "@coffic/cosy-ui/vue";
</script>

<template>
  <Grid :cols="2" gap="md" border="none">
    <div class="cosy:bg-base-100 cosy:p-4 cosy:text-center">不带边框的网格</div>
    <div class="cosy:bg-base-100 cosy:p-4 cosy:text-center">第二列</div>
  </Grid>
</template>

