<template>
  <li
    :class="[
      'cosy-list-item',
      loading && !duration ? 'cosy-list-item--ring-anim' : '',
    ]"
    @click="$emit('click')"
  >
    <div v-if="loading && duration" class="cosy-list-item__loading-bar" :style="{ animationDuration: duration + 'ms' }"></div>
    <div class="cosy-list-item__content">
      <slot />
    </div>
  </li>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		loading?: boolean;
		duration?: number;
	}>(),
	{
		loading: false,
		duration: undefined,
	},
);

defineEmits(["click"]);
</script>

<style>
  .cosy-list-item { --cosy-accent:#67baa3; --cosy-base-300:#d7d7d7; margin-bottom:.5rem; border-radius:.375rem; background:var(--cosy-base-300); padding:.5rem; display:flex; align-items:center; gap:.75rem; position:relative; overflow:hidden; transition:background .2s; }
  .cosy-list-item:hover { background:rgba(103,186,163,.12); }
  .cosy-list-item__loading-bar { position:absolute; left:0; top:0; height:100%; width:0%; background:rgba(103,186,163,.4); z-index:0; animation:cosy-list-loading-bar linear forwards; }
  .cosy-list-item__content { position:relative; z-index:10; width:100%; display:flex; align-items:center; gap:.75rem; }
  .cosy-list-item--ring-anim { box-shadow:0 0 0 2px var(--cosy-accent); animation:cosy-list-ring-pulse 1.5s ease-in-out infinite; }
  @keyframes cosy-list-ring-pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.02);} }
  @keyframes cosy-list-loading-bar { 0%{width:0%;} 100%{width:100%;} }
</style>