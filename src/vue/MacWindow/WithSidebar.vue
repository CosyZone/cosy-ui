<script setup>
import { MacWindow } from './index';
</script>

<template>
    <MacWindow title="文件浏览器">
        <template #sidebar>
            <div class="cosy:w-48 cosy:border-r cosy:border-base-300 cosy:p-2">
                <div class="cosy:font-medium cosy:mb-2">文件夹</div>
                <ul>
                    <li class="cosy:py-1 cosy:px-2 hover:cosy:bg-base-200 cosy:rounded cosy:cursor-pointer">文档</li>
                    <li class="cosy:py-1 cosy:px-2 hover:cosy:bg-base-200 cosy:rounded cosy:cursor-pointer">下载</li>
                    <li class="cosy:py-1 cosy:px-2 hover:cosy:bg-base-200 cosy:rounded cosy:cursor-pointer">图片</li>
                </ul>
            </div>
        </template>
        <div class="cosy:p-4">
            主内容区域
        </div>
    </MacWindow>
</template>
