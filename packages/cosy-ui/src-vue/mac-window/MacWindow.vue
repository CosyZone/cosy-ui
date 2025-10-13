<script setup lang="ts">
import "../../style";
import AlertDialog from "../alert-dialog/AlertDialog.vue";
import Container from "../container/Container.vue";
import { ref, computed } from "vue";
import type { IMacWindowProps } from "./props";

const props = withDefaults(defineProps<IMacWindowProps>(), {
	height: "h-96",
	width: "md",
	title: "",
	withShadow: true,
	tabs: () => [],
	defaultTab: "",
	id: "",
	bgType: "base-100",
	onCloseWindow: undefined,
	onMinimizeWindow: undefined,
	onMaximizeWindow: undefined,
	onTabClick: undefined,
});

const showAlertDialog = ref(false);
const alertMessage = ref("");
const activeTab = ref(props.defaultTab);

// 如果没有设置默认标签或默认标签不在tabs中，则选择第一个标签
if (
	(!activeTab.value || !props.tabs.includes(activeTab.value)) &&
	props.tabs.length > 0
) {
	activeTab.value = props.tabs[0];
}

// 计算窗口样式类
const windowClasses = computed(() =>
	[
		"cosy:flex cosy:relative cosy:rounded-2xl cosy:overflow-hidden",
		props.height,
		props.withShadow ? "cosy:shadow-lg" : "",
	]
		.filter(Boolean)
		.join(" "),
);

// 计算标题栏样式类
const headerClasses = computed(() => [
	"cosy:absolute cosy:top-0 cosy:left-0 cosy:right-0 cosy:flex cosy:items-center cosy:h-12 cosy:px-4 cosy:border-b cosy:border-base-300",
	props.bgType === "base-100" ||
	props.bgType === "base-200" ||
	props.bgType === "base-300"
		? "cosy:bg-base-200"
		: "cosy:bg-base-100/80",
]);

// 计算状态栏样式类
const statusBarClasses = computed(() => [
	"cosy:h-6 cosy:border-t cosy:border-base-300 cosy:flex cosy:items-center cosy:justify-end cosy:px-4 cosy:text-sm",
	props.bgType === "base-100" ||
	props.bgType === "base-200" ||
	props.bgType === "base-300"
		? "cosy:bg-base-200"
		: "cosy:bg-base-100/80",
]);

const handleCloseWindow = () => {
	alertMessage.value = "关闭APP窗口（这是演示，不会真实操作）";
	showAlertDialog.value = true;
	if (props.onCloseWindow) {
		props.onCloseWindow();
	}
};

const handleMinimizeWindow = () => {
	alertMessage.value = "最小化窗口（这是演示，不会真实操作）";
	showAlertDialog.value = true;
	if (props.onMinimizeWindow) {
		props.onMinimizeWindow();
	}
};

const handleMaximizeWindow = () => {
	alertMessage.value = "最大化窗口（这是演示，不会真实操作）";
	showAlertDialog.value = true;
	if (props.onMaximizeWindow) {
		props.onMaximizeWindow();
	}
};

const handleTabClick = (tab: string) => {
	activeTab.value = tab;
	if (props.onTabClick) {
		props.onTabClick(tab);
	}
};
</script>

<template>
  <Container
    :background="bgType"
    padding="none"
    :width="width"
    :class="windowClasses"
    aria-label="MacWindow">
    <!-- 窗口控制按钮 -->
    <div :class="headerClasses">
      <div class="cosy:flex cosy:items-center cosy:space-x-2">
        <div
          class="cosy:w-3 cosy:h-3 cosy:rounded-full cosy:bg-error cosy:cursor-pointer hover:cosy:opacity-80 cosy:transition-opacity"
          @click="handleCloseWindow" />
        <div
          class="cosy:w-3 cosy:h-3 cosy:rounded-full cosy:bg-warning cosy:cursor-pointer hover:cosy:opacity-80 cosy:transition-opacity"
          @click="handleMinimizeWindow" />
        <div
          class="cosy:w-3 cosy:h-3 cosy:rounded-full cosy:bg-success cosy:cursor-pointer hover:cosy:opacity-80 cosy:transition-opacity"
          @click="handleMaximizeWindow" />
      </div>
      <div
        class="cosy:ml-6 cosy:text-sm cosy:font-medium cosy:text-base-content">
        {{ title }}
      </div>

      <!-- 标签选择器 -->
      <div
        v-if="tabs?.length"
        class="cosy:flex-1 cosy:flex cosy:justify-center">
        <div class="cosy:inline-flex cosy:rounded-lg cosy:bg-base-300 cosy:p-1">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="[
              'cosy:px-3 cosy:py-1 cosy:text-sm cosy:rounded-md cosy:transition-colors',
              activeTab === tab
                ? 'cosy:bg-base-100 cosy:text-base-content cosy:shadow'
                : 'cosy:text-base-content/70 hover:cosy:text-base-content',
            ]"
            @click="handleTabClick(tab)">
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- 工具栏插槽 -->
      <div class="cosy:ml-auto cosy:flex cosy:items-center cosy:space-x-2">
        <slot name="toolbar" />
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="cosy:flex-1 cosy:flex cosy:flex-col cosy:pt-12 cosy:h-full">
      <div class="cosy:flex cosy:flex-1 cosy:h-full cosy:overflow-hidden">
        <!-- 左侧栏插槽 -->
        <slot name="sidebar" />

        <!-- 主内容插槽 -->
        <slot />
      </div>

      <!-- 底部状态栏 -->
      <div v-if="$slots.status" :class="statusBarClasses">
        <div class="cosy:flex cosy:items-center cosy:space-x-2">
          <slot name="status" />
        </div>
      </div>
    </div>
  </Container>

  <!-- AlertDialog 组件 -->
  <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>
