<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <PlaceHolder width="md" height="md" padding="none">
      <p style="text-align: center;">none</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" padding="sm">
      <p style="text-align: center;">sm</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" padding="md">
      <p style="text-align: center;">md</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" padding="lg">
      <p style="text-align: center;">lg</p>
    </PlaceHolder>

    <PlaceHolder width="md" height="md" padding="xl">
      <p style="text-align: center;">xl</p>
    </PlaceHolder>
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>