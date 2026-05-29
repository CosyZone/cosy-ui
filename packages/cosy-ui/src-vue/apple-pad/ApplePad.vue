<script setup lang="ts">
import { ref } from "vue";
import { AlertDialog, Container } from "../../index-vue";
import PadFrame from "./PadFrame.vue";
import StatusBarContent from "./StatusBarContent.vue";

/**
 * @component ApplePad
 * @description ApplePad 组件模拟 iPad 设备的外观，包含状态栏、时间显示和设备边框。
 * 适用于创建平板应用界面原型或展示平板端设计效果。
 * @props
 * @prop {'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} [height='lg'] - 窗口高度选项
 * - sm: 400px
 * - md: 500px
 * - lg: 600px - 默认值
 * - xl: 700px
 * - 2xl: 800px
 * - 3xl: 900px
 * - 4xl: 1000px
 * - 5xl: 1100px
 * @prop {String} [title=''] - 窗口标题
 * @prop {Boolean} [withShadow=true] - 是否显示阴影效果
 * @prop {Boolean} [showFrame=true] - 是否显示 iPad 边框
 * @prop {BackgroundColor} [backgroundColor=''] - 内容区域背景色
 * @slots
 * @slot default - 主要内容区域
 * @emits
 */

import type { IApplePadProps } from "./props";

interface Props extends IApplePadProps {}

// Props 定义
const props = withDefaults(defineProps<Props>(), {
	height: "lg",
	title: "",
	withShadow: true,
	showFrame: true,
	backgroundColor: undefined,
});

import {
	HEIGHT_CLASSES,
	HEIGHT_VALUES,
	IPAD_FRAME_HEIGHT,
	IPAD_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO,
	IPAD_FRAME_STATUS_BAR_TOP_ASPECT_RATIO,
	IPAD_FRAME_WIDTH,
	MAIN_CONTENT_HEIGHT_ASPECT_RATIO,
	MAIN_CONTENT_WIDTH_ASPECT_RATIO,
} from "../../src/components/apple-pad/constants";

// 响应式数据
const showAlertDialog = ref(false);
const alertMessage = ref("");

// 计算当前高度的缩放比例
const getScaleRatio = () => {
	const currentHeight = HEIGHT_VALUES[props.height];
	return currentHeight / 600;
};
</script>

<template>
  <div
    :class="['cosy:relative not-prose cosy:mx-auto', HEIGHT_CLASSES[height]]"
    :style="{
      aspectRatio: `${IPAD_FRAME_WIDTH}/${IPAD_FRAME_HEIGHT}`,
    }"
    apple-pad>
    <!-- iPad 边框 -->
    <PadFrame v-if="showFrame" />

    <!-- 顶部状态栏 -->
    <div
      :style="{
        position: 'absolute',
        top: IPAD_FRAME_STATUS_BAR_TOP_ASPECT_RATIO * 100 + '%',
        height: IPAD_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO * 100 + '%',
        width: MAIN_CONTENT_WIDTH_ASPECT_RATIO * 100 + '%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        paddingLeft: '5%',
        paddingRight: '5%',
        zIndex: 50,
      }">
      <StatusBarContent :scaleRatio="getScaleRatio()" />
    </div>

    <!-- 内容区域 -->
    <div
      class="cosy:inset-0 cosy:h-full cosy:flex cosy:flex-col"
      :style="{
        width: MAIN_CONTENT_WIDTH_ASPECT_RATIO * 100 + '%',
        height: MAIN_CONTENT_HEIGHT_ASPECT_RATIO * 100 + '%',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
      }">
      <Container
        rounded="lg"
        height="full"
        padding="none"
        class="cosy:h-full cosy:overflow-y-auto cosy:overscroll-y-contain"
        :background="backgroundColor || 'accent/90'">
        <slot />
      </Container>
    </div>

    <!-- iPad 边框（第二次渲染，盖住内容四角） -->
    <PadFrame v-if="showFrame" />
  </div>

  <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>
