<script setup lang="ts">
import { AlertDialog } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const showDialog = ref(false);
</script>

<template>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button @click="showDialog = true" class="cosy:btn cosy:btn-primary">
            显示对话框
        </button>
        <AlertDialog v-model="showDialog" message="这是一条重要信息" />
    </div>
</template>
