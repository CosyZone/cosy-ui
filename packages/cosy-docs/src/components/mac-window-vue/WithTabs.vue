<script setup lang="ts">
import { MacWindow } from '@coffic/cosy-ui/vue';
import { ref } from 'vue';

const activeTab = ref('外观');
</script>

<template>
    <MacWindow title="设置" :tabs="['通用', '外观', '高级']" defaultTab="外观" bgType="accent" :onTabClick="(tab) => {
        activeTab = tab;
        console.log('切换到标签:', tab);
    }">
        <div v-if="activeTab === '通用'" style="padding: 1rem;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">通用设置</h3>
            <p>这里是一些通用的设置选项。</p>
        </div>
        <div v-if="activeTab === '外观'" style="padding: 1rem;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">外观设置</h3>
            <p>这里是一些外观相关的设置选项。</p>
        </div>
        <div v-if="activeTab === '高级'" style="padding: 1rem;">
            <h3 style="margin-bottom: 1rem; font-weight: 600;">高级设置</h3>
            <p>这里是一些高级设置选项。</p>
        </div>
    </MacWindow>
</template>
