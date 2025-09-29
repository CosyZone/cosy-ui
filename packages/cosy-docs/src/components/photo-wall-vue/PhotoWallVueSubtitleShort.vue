<template>
    <PhotoWall :photos="photoWallPhotos" title="相册" subtitle="精选" />
</template>

<script setup lang="ts">
import { PhotoWall } from "@coffic/cosy-ui/vue";
import { photoWallPhotos } from "./example-data";
</script>
