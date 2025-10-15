<!--
@component ConfirmDialog.CustomButtons

@description
展示如何自定义 ConfirmDialog 组件的按钮文本。

@usage
```vue
<ConfirmDialogExamples.CustomButtons />
```
-->

<script lang="ts">
import "../../app.css";
import { ref, defineComponent } from "vue";
import ConfirmDialog from "./ConfirmDialog.vue";

export default defineComponent({
	name: "ConfirmDialogCustomButtonsExample",
	components: {
		ConfirmDialog,
	},
	setup() {
		const isShowDelete = ref(false);
		const isShowSave = ref(false);
		const result = ref("");

		const handleConfirm = (action: string) => {
			result.value = `用户已${action}`;

			// 3秒后清除结果
			setTimeout(() => {
				result.value = "";
			}, 3000);
		};

		return {
			isShowDelete,
			isShowSave,
			result,
			handleConfirm,
		};
	},
});
</script>

<template>
  <div class="cosy:flex cosy:flex-col cosy:gap-4">
    <div class="cosy:flex cosy:gap-4">
      <button @click="isShowDelete = true" class="cosy:btn cosy:btn-error">
        删除文件
      </button>

      <button @click="isShowSave = true" class="cosy:btn cosy:btn-success">
        保存更改
      </button>
    </div>

    <div v-if="result" class="cosy:alert cosy:alert-info cosy:shadow-lg">
      <span>{{ result }}</span>
    </div>
  </div>

  <ConfirmDialog
    v-model="isShowDelete"
    title="警告"
    message="您确定要删除这个文件吗？此操作无法撤销。"
    cancel-text="取消"
    confirm-text="删除"
    @confirm="handleConfirm('删除了文件')"
  />

  <ConfirmDialog
    v-model="isShowSave"
    title="保存更改"
    message="您的更改尚未保存，确定要保存吗？"
    cancel-text="稍后再说"
    confirm-text="保存"
    @confirm="handleConfirm('保存了更改')"
  />
</template>
