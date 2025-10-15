<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <PlaceHolder width="xs" height="xs">
      <p style="text-align: center;">xs</p>
    </PlaceHolder>

    <PlaceHolder width="sm" height="sm">
      <p style="text-align: center;">sm</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md">
      <p style="text-align: center;">md</p>
    </PlaceHolder>

    <PlaceHolder width="lg" height="lg">
      <p style="text-align: center;">lg</p>
    </PlaceHolder>

    <PlaceHolder width="xl" height="xl">
      <p style="text-align: center;">xl</p>
    </PlaceHolder>
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>