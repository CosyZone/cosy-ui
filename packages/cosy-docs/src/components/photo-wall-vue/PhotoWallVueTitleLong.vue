<template>
    <PhotoWall :photos="photoWallPhotos" title="2024年旅行回忆相册" />
</template>

<script setup lang="ts">
import { PhotoWall } from "@coffic/cosy-ui/vue";
import { photoWallPhotos } from "./example-data";
</script>
