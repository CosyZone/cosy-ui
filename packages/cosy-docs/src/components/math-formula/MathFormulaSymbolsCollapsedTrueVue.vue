<script setup lang="ts">
import { MathFormula } from "@coffic/cosy-ui/vue";
</script>

<template>
  <MathFormula title="符号折叠" symbols-collapsed>
    $$\alpha + \beta = \gamma$$
    <div slot="symbols">符号说明将在默认折叠状态下显示。</div>
  </MathFormula>
</template>

