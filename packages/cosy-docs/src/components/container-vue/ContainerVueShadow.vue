<template>
  <div class="cosy:flex cosy:gap-4 cosy:flex-wrap">
    <ContainerVueShadowNone />
    <ContainerVueShadowSm />
    <ContainerVueShadowMd />
    <ContainerVueShadowLg />
    <ContainerVueShadowXl />
    <ContainerVueShadow2xl />
  </div>
</template>

<script setup lang="ts">
import ContainerVueShadowNone from "./ContainerVueShadowNone.vue";
import ContainerVueShadowSm from "./ContainerVueShadowSm.vue";
import ContainerVueShadowMd from "./ContainerVueShadowMd.vue";
import ContainerVueShadowLg from "./ContainerVueShadowLg.vue";
import ContainerVueShadowXl from "./ContainerVueShadowXl.vue";
import ContainerVueShadow2xl from "./ContainerVueShadow2xl.vue";
</script>
