<script setup lang="ts">
import iphoneFrame from "../../src/components/apple-phone/assets/iPhone 14 Pro - Deep Purple - Portrait.png";

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
      z-index: 100;
    ">
    <img :src="iphoneFrameSrc" alt="iPhone frame" />
  </div>
</template>
