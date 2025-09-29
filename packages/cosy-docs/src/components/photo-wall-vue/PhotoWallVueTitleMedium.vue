<template>
    <PhotoWall :photos="photoWallPhotos" title="美好回忆" />
</template>

<script setup lang="ts">
import { PhotoWall } from "@coffic/cosy-ui/vue";
import { photoWallPhotos } from "./example-data";
</script>
