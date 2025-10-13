<script setup lang="ts">
import "../../style";
import Alert from "../alert/Alert.vue";

interface Props {
	messages: string[];
}

defineProps<Props>();
</script>

<template>
  <section class="cosy:w-full cosy:mx-auto" aria-label="container-error">
    <Alert type="warning" :closable="false">
      <ul class="cosy:list-disc cosy:pl-5 cosy:space-y-1">
        <li v-for="(message, index) in messages" :key="index" class="cosy:text-sm">
          {{ message }}
        </li>
      </ul>
    </Alert>
  </section>
</template>