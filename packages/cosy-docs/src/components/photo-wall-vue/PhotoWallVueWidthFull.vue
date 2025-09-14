<template>
    <PhotoWall :photos="photoWallPhotos" width="full" />
</template>

<script setup lang="ts">
import { PhotoWall } from '@coffic/cosy-ui/vue';
import { photoWallPhotos } from './example-data';
</script>
