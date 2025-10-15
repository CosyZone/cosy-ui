<template>
  <ListItemRing
    v-if="animationType === 'ring'"
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemRing>

  <ListItemIconLeft
    v-else-if="animationType === 'icon-left'"
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemIconLeft>

  <ListItemIconRight
    v-else-if="animationType === 'icon-right'"
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemIconRight>

  <ListItemBreath
    v-else-if="animationType === 'breath'"
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemBreath>

  <ListItemPulse
    v-else-if="animationType === 'pulse'"
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemPulse>

  <ListItemGlow
    v-else-if="animationType === 'glow'"
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemGlow>

  <!-- 默认使用 ring 动画 -->
  <ListItemRing
    v-else
    :loading="loading"
    :duration="duration"
    @click="$emit('click')"
  >
    <slot />
  </ListItemRing>
</template>

<script setup lang="ts">
import ListItemRing from "./ListItemRing.vue";
import ListItemIconLeft from "./ListItemIconLeft.vue";
import ListItemIconRight from "./ListItemIconRight.vue";
import ListItemBreath from "./ListItemBreath.vue";
import ListItemPulse from "./ListItemPulse.vue";
import ListItemGlow from "./ListItemGlow.vue";

withDefaults(
	defineProps<{
		loading?: boolean;
		duration?: number;
		animationType?:
			| "ring"
			| "icon-left"
			| "icon-right"
			| "breath"
			| "pulse"
			| "glow";
	}>(),
	{
		loading: false,
		duration: undefined,
		animationType: "ring",
	},
);

defineEmits(["click"]);
</script>
