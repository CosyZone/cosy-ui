<template>
  <Review
    userName="张先生"
    :rating="5"
    comment="产品非常好用，质量很棒！推荐购买。"
    date="2024-01-15"
  />
</template>

<script setup lang="ts">
import { Review } from "@coffic/cosy-ui/vue";
</script>
