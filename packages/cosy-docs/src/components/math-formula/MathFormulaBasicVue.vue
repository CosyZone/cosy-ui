<script setup lang="ts">
import { MathFormula } from "@coffic/cosy-ui/vue";
</script>

<template>
  <MathFormula title="换底公式" number="1" variant="gradient">
    $$\log_a c = \frac{\log_b c}{\log_b a}$$
    <div slot="desc">这是对数函数的重要性质之一。</div>
  </MathFormula>
</template>

