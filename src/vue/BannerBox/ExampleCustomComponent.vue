<!--
@component BannerBox.CustomComponent

@description
BannerBox 组件的自定义组件集成示例，展示如何在横幅中插入其他UI组件。

@usage
```vue
<BannerBoxExamples.CustomComponent />
```
-->

<script lang="ts">
import '../../app.css'
import { defineComponent } from 'vue'
import BannerBox from './BannerBox.vue'

export default defineComponent({
    name: 'BannerBoxCustomComponentExample',
    components: {
        BannerBox
    },
    setup() {
        // 模拟按钮组件
        const Button = {
            props: ['text', 'variant', 'size'],
            template: `
                <button 
                    class="cosy:btn"
                    :class="[
                        variant ? 'cosy:btn-' + variant : '',
                        size ? 'cosy:btn-' + size : ''
                    ]"
                    @click="$emit('click')"
                >
                    {{ text }}
                </button>
            `
        };

        return {
            Button
        };
    }
})
</script>

<template>
    <BannerBox title="带自定义组件的横幅" description="在横幅中集成其他UI组件" :features="[
        {
            emoji: '🎨',
            title: '可定制UI',
            link: '#customize'
        }
    ]" :customComponent="Button" :customComponentProps="{
        text: '立即注册',
        variant: 'primary',
        size: 'lg'
    }" />
</template>
