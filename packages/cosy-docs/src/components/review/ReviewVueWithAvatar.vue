<template>
  <Review
    userName="王先生"
    :rating="5"
    comment="非常满意，超出预期！"
    date="2024-01-08"
    :verified="true"
    avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
</template>

<script setup lang="ts">
  import { Review } from '@coffic/cosy-ui/vue';
</script>
