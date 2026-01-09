<script setup lang="ts">
import { MathFormula } from "@coffic/cosy-ui/vue";
</script>

<template>
  <MathFormula title="符号展开" :symbols-collapsed="false">
    $$x + y = z$$
    <div slot="symbols">符号说明默认展开，便于查看。</div>
  </MathFormula>
</template>

