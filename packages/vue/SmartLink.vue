<script setup lang="ts">
defineProps<{
  href: string;
  external?: boolean;
  externalClass?: string;
}>();
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="{
      'cosy:no-underline cosy:rounded-md cosy:p-1 cosy:transition-all cosy:duration-300 cosy:hover:text-primary/80': true,
      [externalClass]: external,
    }"
  >
    <slot />
  </a>
</template>
