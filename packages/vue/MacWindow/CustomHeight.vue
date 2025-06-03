<script setup>
import { MacWindow } from './index';
</script>

<template>
    <MacWindow title="终端" height="cosy:h-64">
        <div class="cosy:p-4 cosy:bg-gray-900 cosy:text-green-400 cosy:font-mono">
            $ echo "Hello, World!"<br />
            Hello, World!<br />
            $ _
        </div>
    </MacWindow>
</template>
