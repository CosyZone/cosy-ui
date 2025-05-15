<!--
@component ConfirmDialog.Basic

@description
ConfirmDialog 组件的基础示例，展示最基本的确认对话框用法。

@usage
```vue
<ConfirmDialogExamples.Basic />
```
-->

<script lang="ts">
import '../../app.css'
import { ref, defineComponent } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'

export default defineComponent({
    name: 'ConfirmDialogBasicExample',
    components: {
        ConfirmDialog
    },
    setup() {
        const isShow = ref(false)
        const result = ref('')

        const handleConfirm = () => {
            result.value = '用户已确认操作'

            // 3秒后清除结果
            setTimeout(() => {
                result.value = ''
            }, 3000)
        }

        return {
            isShow,
            result,
            handleConfirm
        }
    }
})
</script>

<template>
    <div class="cosy:flex cosy:flex-col cosy:gap-4">
        <button @click="isShow = true" class="cosy:btn cosy:btn-primary">
            显示确认对话框
        </button>

        <div v-if="result" class="cosy:alert cosy:alert-success cosy:shadow-lg">
            <span>{{ result }}</span>
        </div>
    </div>

    <ConfirmDialog v-model="isShow" title="确认操作" message="您确定要执行此操作吗？此操作无法撤销。" @confirm="handleConfirm" />
</template>
