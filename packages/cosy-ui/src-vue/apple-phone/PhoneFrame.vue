<script setup lang="ts">
import iphoneFrame from "../../src/components/apple-phone/assets/iPhone14ProDeepPurplePortrait.png";

const iphoneFrameSrc = (iphoneFrame as any).src || iphoneFrame;
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
    <img :src="iphoneFrameSrc" alt="iPhone frame" />
  </div>
</template>