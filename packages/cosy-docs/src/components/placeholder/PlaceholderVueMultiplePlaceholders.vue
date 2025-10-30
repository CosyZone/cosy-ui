<template>
  <div style="display: flex; gap: 1rem;">
    <PlaceHolder width="xs" height="xs" background="base-200" />
    <PlaceHolder width="sm" height="sm" background="base-300" />
    <PlaceHolder width="md" height="md" background="primary" />
    <PlaceHolder width="lg" height="lg" background="secondary" />
    <PlaceHolder width="xl" height="xl" background="accent" />
  </div>
</template>

<script setup lang="ts">
import { PlaceHolder } from "@coffic/cosy-ui/vue";
</script>