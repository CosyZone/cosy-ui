<script setup>
import { ref } from 'vue';
import { MacWindow } from './index';

const activeTab = ref('信息');

const handleTabClick = (tab) => {
    activeTab.value = tab;
    console.log('切换到标签:', tab);
};

const handleClose = () => {
    alert('关闭窗口');
};

const handleMinimize = () => {
    alert('最小化窗口');
};

const handleMaximize = () => {
    alert('最大化窗口');
};
</script>

<template>
    <MacWindow title="应用窗口" :tabs="['信息', '设置', '帮助']" :onTabClick="handleTabClick" :onCloseWindow="handleClose"
        :onMinimizeWindow="handleMinimize" :onMaximizeWindow="handleMaximize">
        <div class="cosy:p-4">
            <div v-if="activeTab === '信息'">信息内容</div>
            <div v-if="activeTab === '设置'">设置内容</div>
            <div v-if="activeTab === '帮助'">帮助内容</div>
        </div>
    </MacWindow>
</template>
