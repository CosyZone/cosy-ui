<!--
@component AlertDialog.Multilang

@description
AlertDialog 组件的多语言示例，展示如何使用不同语言的对话框。

@usage
```vue
<AlertDialogExamples.Multilang />
```
-->

<script lang="ts">
import '../../app.css'
import { ref, defineComponent } from 'vue'
import AlertDialog from './AlertDialog.vue'

export default defineComponent({
    name: 'AlertDialogMultilangExample',
    components: {
        AlertDialog
    },
    setup() {
        const isShowEn = ref(false)
        const isShowJa = ref(false)

        return {
            isShowEn,
            isShowJa
        }
    }
})
</script>

<template>
    <div class="flex gap-2">
        <button @click="isShowEn = true" class="cosy:btn cosy:btn-primary">
            English
        </button>
        <button @click="isShowJa = true" class="cosy:btn cosy:btn-primary">
            日本語
        </button>
    </div>

    <AlertDialog v-model="isShowEn" message="Important information" ok-text="OK" cancel-text="Cancel" />

    <AlertDialog v-model="isShowJa" message="重要なお知らせ" ok-text="確認" cancel-text="キャンセル" />
</template>
