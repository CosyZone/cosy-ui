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
      'no-underline rounded-md p-1 transition-all duration-300 hover:text-primary/80': true,
      [externalClass]: external
    }"
  >
    <slot />
  </a>
</template>
