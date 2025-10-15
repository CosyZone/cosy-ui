<script setup lang="ts">
import { AlertDialog } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const showDialog = ref(false);
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button @click="showDialog = true" class="cosy:btn cosy:btn-primary">
            Show English Dialog
        </button>
        <AlertDialog v-model="showDialog" message="This is an English confirmation dialog example" lang="en" />
    </div>
</template>
