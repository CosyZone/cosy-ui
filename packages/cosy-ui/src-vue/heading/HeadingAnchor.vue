<template>
  <a
    v-if="show && id"
    :href="`#${id}`"
    class="cosy:ml-2 heading-anchor"
    :aria-label="`链接到 ${id} 部分`"
  >
    <LinkIcon size="16px" class="cosy:inline-block" />
  </a>
</template>

<script setup lang="ts">
import { LinkIcon } from '../icons';

/**
 * @component HeadingAnchor
 *
 * @description
 * HeadingAnchor 组件用于在标题中显示锚点链接图标。
 * 这是一个内部组件，专门为 Heading 组件设计。
 *
 * @props
 * @prop {string} id - 锚点的 ID
 * @prop {boolean} [show=false] - 是否显示锚点链接
 */

interface Props {
  id?: string;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});
</script>

<style scoped>
.heading-anchor {
  color: inherit;
  text-decoration: none;
  vertical-align: middle;
}
</style>
