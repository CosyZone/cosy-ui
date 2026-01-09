<script setup lang="ts">
import { MathFormula } from "@coffic/cosy-ui/vue";
</script>

<template>
  <MathFormula
    title="自定义样式"
    number="8"
    variant="glass"
    class="cosy:border-primary cosy:ring-1 cosy:ring-primary/40"
  >
    $$\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$$
    <div slot="desc">为组件添加自定义的边框与描边效果。</div>
  </MathFormula>
</template>

