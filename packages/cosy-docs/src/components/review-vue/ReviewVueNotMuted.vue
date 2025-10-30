<template>
  <Review
    userName="张三"
    :rating="4"
    comment="这个产品非常好用，质量很棒！"
    date="2024-01-15"
    :verified="true"
    title="用户评价" />
</template>

<script setup lang="ts">
  import { Review } from '@coffic/cosy-ui/vue';
</script>
