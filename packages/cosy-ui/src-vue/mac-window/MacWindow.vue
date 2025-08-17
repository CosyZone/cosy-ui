<!--
@component MacWindow

@description
MacWindow 组件模拟 macOS 风格的应用窗口，包含标题栏、工具栏按钮、标签页和状态栏。
适用于创建模拟桌面应用界面或代码编辑器等场景。

@usage
基本用法：
```vue
<MacWindow title="代码编辑器">
  <div>窗口内容</div>
</MacWindow>
```

带背景色：
```vue
<MacWindow title="代码编辑器" bgType="blue">
  <div>窗口内容</div>
</MacWindow>
```

带标签页：
```vue
<template>
  <MacWindow
    title="设置"
    :tabs="['通用', '外观', '高级']"
    defaultTab="外观"
    bgType="purple"
    :onTabClick="(tab) => { 
      activeTab = tab;
      console.log('切换到标签:', tab);
    }"
  >
    <div v-if="activeTab === '通用'">通用设置内容</div>
    <div v-if="activeTab === '外观'">外观设置内容</div>
    <div v-if="activeTab === '高级'">高级设置内容</div>
  </MacWindow>
</template>

<script setup>
import { ref } from 'vue';
import { MacWindow } from 'cosy-ui';

const activeTab = ref('外观');
</script>

带自定义事件处理：
```vue
<MacWindow 
  title="文件浏览器"
  bgType="green"
  :onCloseWindow="() => handleClose()"
  :onTabClick="(tab) => handleTabChange(tab)"
>
  <div>窗口内容</div>
</MacWindow>
```

带工具栏和状态栏：
```vue
<MacWindow title="文件浏览器" bgType="orange">
<template #toolbar>
    <button class="cosy:btn cosy:btn-ghost cosy:btn-sm">
      <SearchIcon class="cosy:w-4 cosy:h-4" />
    </button>
    <button class="cosy:btn cosy:btn-ghost cosy:btn-sm">
      <SettingsIcon class="cosy:w-4 cosy:h-4" />
    </button>
  </template>

<div>窗口内容</div>

<template #status>
    <div class="cosy:text-xs">就绪</div>
    <button class="cosy:btn cosy:btn-ghost cosy:btn-xs">
      <InfoIcon class="cosy:w-4 cosy:h-4" />
    </button>
  </template>
</MacWindow>
```

@props
@prop {String} [height='h-96'] - 窗口高度
@prop {String} [title=''] - 窗口标题
@prop {Boolean} [withShadow=true] - 是否显示阴影效果
@prop {Array} [tabs=[]] - 标签页字符串数组，如 ['标签1', '标签2', '标签3']
@prop {String} [defaultTab=''] - 默认选中的标签页
@prop {String} [bgType='default'] - 背景色类型，可选值：default, light, dark, blue, green, purple, orange, red
@prop {Function} [onCloseWindow=null] - 关闭窗口时调用的函数
@prop {Function} [onMinimizeWindow=null] - 最小化窗口时调用的函数
@prop {Function} [onMaximizeWindow=null] - 最大化窗口时调用的函数
@prop {Function} [onTabClick=null] - 点击标签页时调用的函数，接收标签页值作为参数

@slots
@slot default - 窗口主要内容
@slot sidebar - 侧边栏内容
@slot toolbar - 工具栏内容，位于标题栏右侧
@slot status - 状态栏内容，位于窗口底部

@emits
@emit {update:modelValue} - 切换标签页时触发，用于v-model
-->

<script setup lang="ts">
import '../../style';
import AlertDialog from '../alert-dialog/AlertDialog.vue';
import Container from '../container/Container.vue';
import { ref, computed } from 'vue';
import type { BackgroundColor } from '../container/backgrounds';

/**
 * @component MacWindow
 * @description MacWindow 组件模拟 macOS 风格的应用窗口，包含标题栏、工具栏按钮、标签页和状态栏。
 * 适用于创建模拟桌面应用界面或代码编辑器等场景。
 */

interface Props {
    height?: string;
    title?: string;
    withShadow?: boolean;
    tabs?: string[];
    defaultTab?: string;
    bgType?: BackgroundColor;
    onCloseWindow?: () => void;
    onMinimizeWindow?: () => void;
    onMaximizeWindow?: () => void;
    onTabClick?: (tab: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
    height: 'h-96',
    title: '',
    withShadow: true,
    tabs: () => [],
    defaultTab: '',
    bgType: 'base-100',
    onCloseWindow: undefined,
    onMinimizeWindow: undefined,
    onMaximizeWindow: undefined,
    onTabClick: undefined,
});

const showAlertDialog = ref(false);
const alertMessage = ref('');
const activeTab = ref(props.defaultTab);

// 如果没有设置默认标签或默认标签不在tabs中，则选择第一个标签
if (
    (!activeTab.value || !props.tabs.includes(activeTab.value)) &&
    props.tabs.length > 0
) {
    activeTab.value = props.tabs[0];
}

// 计算窗口样式类
const windowClasses = computed(() => [
    'cosy:flex cosy:max-w-5xl cosy:mx-auto cosy:relative cosy:rounded-2xl cosy:overflow-hidden',
    props.height,
    props.withShadow ? 'cosy:shadow-lg' : '',
].filter(Boolean).join(' '));

// 计算标题栏样式类
const headerClasses = computed(() => [
    'cosy:absolute cosy:top-0 cosy:left-0 cosy:right-0 cosy:flex cosy:items-center cosy:h-12 cosy:px-4 cosy:border-b cosy:border-base-300',
    props.bgType === 'base-100' || props.bgType === 'base-200' || props.bgType === 'base-300'
        ? 'cosy:bg-base-200'
        : 'cosy:bg-base-100/80',
]);

// 计算状态栏样式类
const statusBarClasses = computed(() => [
    'cosy:h-6 cosy:border-t cosy:border-base-300 cosy:flex cosy:items-center cosy:justify-end cosy:px-4 cosy:text-sm',
    props.bgType === 'base-100' || props.bgType === 'base-200' || props.bgType === 'base-300'
        ? 'cosy:bg-base-200'
        : 'cosy:bg-base-100/80',
]);

const handleCloseWindow = () => {
    alertMessage.value = '关闭APP窗口（这是演示，不会真实操作）';
    showAlertDialog.value = true;
    if (props.onCloseWindow) {
        props.onCloseWindow();
    }
};

const handleMinimizeWindow = () => {
    alertMessage.value = '最小化窗口（这是演示，不会真实操作）';
    showAlertDialog.value = true;
    if (props.onMinimizeWindow) {
        props.onMinimizeWindow();
    }
};

const handleMaximizeWindow = () => {
    alertMessage.value = '最大化窗口（这是演示，不会真实操作）';
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
    <Container :background="bgType" :class="windowClasses">
        <!-- 窗口控制按钮 -->
        <div :class="headerClasses">
            <div class="cosy:flex cosy:items-center cosy:space-x-2">
                <div class="cosy:w-3 cosy:h-3 cosy:rounded-full cosy:bg-error cosy:cursor-pointer hover:cosy:opacity-80 cosy:transition-opacity"
                    @click="handleCloseWindow" />
                <div class="cosy:w-3 cosy:h-3 cosy:rounded-full cosy:bg-warning cosy:cursor-pointer hover:cosy:opacity-80 cosy:transition-opacity"
                    @click="handleMinimizeWindow" />
                <div class="cosy:w-3 cosy:h-3 cosy:rounded-full cosy:bg-success cosy:cursor-pointer hover:cosy:opacity-80 cosy:transition-opacity"
                    @click="handleMaximizeWindow" />
            </div>
            <div class="cosy:ml-6 cosy:text-sm cosy:font-medium cosy:text-base-content">
                {{ title }}
            </div>

            <!-- 标签选择器 -->
            <div v-if="tabs?.length" class="cosy:flex-1 cosy:flex cosy:justify-center">
                <div class="cosy:inline-flex cosy:rounded-lg cosy:bg-base-300 cosy:p-1">
                    <button v-for="(tab, index) in tabs" :key="index" :class="[
                        'cosy:px-3 cosy:py-1 cosy:text-sm cosy:rounded-md cosy:transition-colors',
                        activeTab === tab
                            ? 'cosy:bg-base-100 cosy:text-base-content cosy:shadow'
                            : 'cosy:text-base-content/70 hover:cosy:text-base-content',
                    ]" @click="handleTabClick(tab)">
                        {{ tab }}
                    </button>
                </div>
            </div>

            <!-- 工具栏插槽 -->
            <div class="cosy:ml-auto cosy:flex cosy:items-center cosy:space-x-2">
                <slot name="toolbar"></slot>
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
                    <slot name="status"></slot>
                </div>
            </div>
        </div>
    </Container>

    <!-- AlertDialog 组件 -->
    <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>
