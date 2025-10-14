<script setup lang="ts">
import { Button } from "@coffic/cosy-ui/vue";
import { ref } from "vue";

const count = ref(0);
const handleClick = () => {
	count.value++;
	console.log("Button clicked!", count.value);
};
</script>

<template>
    <div class="cosy:flex cosy:flex-col cosy:gap-4">
        <Button @click="handleClick">点击我 ({{ count }})</Button>
        <p>点击次数: {{ count }}</p>
    </div>
</template>