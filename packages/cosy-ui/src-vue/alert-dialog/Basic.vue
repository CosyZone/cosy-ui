<!--
@component AlertDialog.Basic

@description
AlertDialog 组件的基础示例，展示最基本的对话框用法。

@usage
```vue
<AlertDialogExamples.Basic />
```
-->

<script lang="ts">
import "../../app.css";
import { defineComponent, ref } from "vue";
import AlertDialog from "./AlertDialog.vue";

export default defineComponent({
	name: "AlertDialogBasicExample",
	components: {
		AlertDialog,
	},
	setup() {
		const isShow = ref(false);

		return {
			isShow,
		};
	},
});
</script>

<template>
  <button @click="isShow = true" class="cosy:btn cosy:btn-primary">
    显示对话框
  </button>
  <AlertDialog v-model="isShow" message="这是一条重要信息" />
</template>
