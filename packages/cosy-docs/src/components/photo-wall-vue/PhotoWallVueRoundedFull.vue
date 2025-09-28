<script setup lang="ts">
import { PhotoWall } from "@coffic/cosy-ui/vue";
import { photoWallPhotos } from "./example-data";
</script>

<template>
    <PhotoWall :photos="photoWallPhotos" rounded="full" />
</template>
