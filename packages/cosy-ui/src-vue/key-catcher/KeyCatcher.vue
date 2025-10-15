<!--
@component KeyCatcher

@description
KeyCatcher 组件用于全局捕获键盘按键事件，并可通过自定义事件通知外部。支持可选的按键展示浮窗。

@usage
基本用法：
```vue
<KeyCatcher />
```

显示最近按下的按键：
```vue
<KeyCatcher :showKey="true" />
```

监听全局按键事件：
```vue
<KeyCatcher @globalKey="onGlobalKey" />
```

@props
@prop {boolean} [showKey=false] - 是否显示最近按下的按键浮窗

@events
@event globalKey - 当捕获到全局按键时触发，参数为按键字符串

@slots
无
-->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import "../../style";

const lastKey = ref<string | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;

const props = defineProps<{ showKey?: boolean }>();
const emit = defineEmits<(e: "globalKey", key: string) => void>();

const handleKeydown = (event: KeyboardEvent) => {
	if (
		event.key.length === 1 ||
		[
			"Enter",
			"Escape",
			"Backspace",
			"Tab",
			"Shift",
			"Control",
			"Alt",
			"Meta",
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"CapsLock",
			"Delete",
			"Home",
			"End",
			"PageUp",
			"PageDown",
		].includes(event.key)
	) {
		emit("globalKey", event.key);

		// 展示按键（如果允许）
		if (props.showKey) {
			let key = event.key;
			if (key === " ") key = "Space";
			lastKey.value = key;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				lastKey.value = null;
			}, 3000);
		}
	}
};

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown);
	if (timer) clearTimeout(timer);
});
</script>

<template>
  <Transition name="key-fade">
    <div
      v-if="props.showKey && lastKey"
      class="cosy:fixed cosy:bottom-4 cosy:right-4 cosy:bg-accent cosy:shadow-lg cosy:rounded cosy:px-6 cosy:py-3 cosy:z-50 cosy:text-xl cosy:font-bold cosy:text-gray-800 cosy:select-none cosy:pointer-events-none cosy:border cosy:border-gray-200 cosy:backdrop-blur-sm">
      <span class="cosy:text-blue-600">{{ lastKey }}</span>
    </div>
  </Transition>
</template>

<style scoped>
  .key-fade-enter-active,
  .key-fade-leave-active {
    transition:
      opacity 0.2s,
      transform 0.2s;
  }

  .key-fade-enter-from,
  .key-fade-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
</style>
