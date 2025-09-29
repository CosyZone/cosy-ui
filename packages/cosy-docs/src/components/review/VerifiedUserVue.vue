<template>
  <Review
    userName="李女士"
    :rating="4"
    comment="整体不错，服务态度很好，推荐购买。"
    date="2024-01-10"
    :verified="true"
  />
</template>

<script setup lang="ts">
import { Review } from "@coffic/cosy-ui";
</script>
