<template>
    <PhotoWall :photos="photoWallPhotos" width="none" />
</template>

<script setup lang="ts">
import { PhotoWall } from '@coffic/cosy-ui/vue';
import { photoWallPhotos } from './example-data';
</script>
