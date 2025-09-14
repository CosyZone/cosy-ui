<script setup lang="ts">
import { PhotoWall } from '@coffic/cosy-ui/vue';
import { photoWallPhotos } from './example-data';
</script>

<template>
    <PhotoWall :photos="photoWallPhotos" background="info/10" title="精彩的回忆" subtitle="记录每一个美好瞬间" padding="2xl" />
</template>
