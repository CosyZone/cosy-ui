<script setup lang="ts">
import { ref } from "vue";
import { AlertDialog } from "../alert-dialog";
import { Container } from "../container";
import PhoneFrame from "./PhoneFrame.vue";
import StatusBarContent from "./StatusBarContent.vue";

/**
 * @component ApplePhone
 * @description ApplePhone 组件模拟 iPhone 设备的外观，包含状态栏、时间显示和设备边框。
 * 适用于创建移动应用界面原型或展示移动端设计效果。
 * @prop {'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} [height='lg'] - 窗口高度选项
 * @prop {String} [title=''] - 窗口标题
 * @prop {Boolean} [withShadow=true] - 是否显示阴影效果
 * @prop {Boolean} [showFrame=true] - 是否显示 iPhone 边框
 * @prop {BackgroundColor} [backgroundColor=''] - 内容区域背景色
 * @slots
 * @slot default - 主要内容区域
 */

import type { IApplePhoneProps } from "./props";

interface Props extends IApplePhoneProps {}

const props = withDefaults(defineProps<Props>(), {
	height: "lg",
	title: "",
	withShadow: true,
	showFrame: true,
	backgroundColor: undefined,
});

/**
 * ApplePhone 组件的常量定义
 */

// iPhone边框图片尺寸
const IPHONE_FRAME_WIDTH = 1339;
const IPHONE_FRAME_HEIGHT = 2716;

// iPhone边框图片-状态栏离上边框的距离
const IPHONE_FRAME_STATUS_BAR_TOP = 115;

// iPhone边框图片-状态栏高度
const IPHONE_FRAME_STATUS_BAR_HEIGHT = 110;

// 比例计算
const MAIN_CONTENT_WIDTH_ASPECT_RATIO = 1179 / IPHONE_FRAME_WIDTH;
const MAIN_CONTENT_HEIGHT_ASPECT_RATIO = 2556 / IPHONE_FRAME_HEIGHT;
const IPHONE_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO =
	IPHONE_FRAME_STATUS_BAR_HEIGHT / IPHONE_FRAME_HEIGHT;
const IPHONE_FRAME_STATUS_BAR_TOP_ASPECT_RATIO =
	IPHONE_FRAME_STATUS_BAR_TOP / IPHONE_FRAME_HEIGHT;

// 预定义的高度选项
const HEIGHT_CLASSES = {
	sm: "cosy:h-64", // 256px
	md: "cosy:h-80", // 320px
	lg: "cosy:h-96", // 384px
	xl: "cosy:h-[480px]", // 480px
	"2xl": "cosy:h-[560px]", // 560px
	"3xl": "cosy:h-[640px]", // 640px
	"4xl": "cosy:h-[720px]", // 720px
	"5xl": "cosy:h-[800px]", // 800px
} as const;

// 高度值映射
const HEIGHT_VALUES = {
	sm: 256,
	md: 320,
	lg: 384,
	xl: 480,
	"2xl": 560,
	"3xl": 640,
	"4xl": 720,
	"5xl": 800,
} as const;

// 默认高度
const DEFAULT_HEIGHT: keyof typeof HEIGHT_VALUES = "lg";

// 响应式数据
const showAlertDialog = ref(false);
const alertMessage = ref("");

// 计算当前高度的缩放比例
const getScaleRatio = () => {
	const currentHeight = HEIGHT_VALUES[props.height];
	// 基于特定高度计算缩放比例
	return currentHeight / 500;
};
</script>

<template>
  <div
    :class="['cosy:relative not-prose cosy:mx-auto', HEIGHT_CLASSES[height]]"
    :style="{
      aspectRatio: `${IPHONE_FRAME_WIDTH}/${IPHONE_FRAME_HEIGHT}`,
    }"
    apple-phone>
    <!-- iPhone 边框 -->
    <PhoneFrame v-if="showFrame" />

    <!-- 顶部状态栏 -->
    <div
      :style="{
        position: 'absolute',
        top: IPHONE_FRAME_STATUS_BAR_TOP_ASPECT_RATIO * 100 + '%',
        height: IPHONE_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO * 100 + '%',
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
        // 水平居中
        left: '50%',
        // 垂直居中
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

    <!-- iPhone 边框 -->
    <PhoneFrame v-if="showFrame" />
  </div>

  <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>
