<template>
  <div class="max-w-md">
    <Card
      title="Muted Card"
      subtitle="This is a muted card example"
      muted
    >
      <p>This card is in a muted state, with reduced opacity and disabled interactions.</p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card } from "@coffic/cosy-ui/vue";
</script>