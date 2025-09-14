<script setup lang="ts">
import { PhotoWall } from '@coffic/cosy-ui/vue';
import { photoWallPhotos } from './example-data';
</script>

<template>
    <PhotoWall :photos="photoWallPhotos" title="新爱好歌，自动找上你。" subtitle="发现你的音乐世界" gap="sm" rounded="lg" />
</template>
