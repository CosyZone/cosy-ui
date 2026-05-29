<script setup lang="ts">
import ipadFrame from "../../src/components/apple-pad/assets/iPadAir11-M2-Purple-Portrait.png";

const ipadFrameSrc = (ipadFrame as any).src || ipadFrame;
</script>

<template>
  <div
    style="
      max-width: 100%;
      max-height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      pointer-events: none;
    ">
    <img :src="ipadFrameSrc" alt="iPad frame" />
  </div>
</template>
