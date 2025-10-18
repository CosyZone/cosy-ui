<script setup lang="ts">
import "../../style";
import { AlertDialog, Container } from "../../index-vue";
import { ref } from "vue";
import StatusBarContent from "./StatusBarContent.vue";
import PhoneFrame from "./PhoneFrame.vue";

/**
 * @component ApplePhone
 * @description ApplePhone 组件模拟 iPhone 设备的外观，包含状态栏、时间显示和设备边框。
 * 适用于创建移动应用界面原型或展示移动端设计效果。
 * @props
 * @prop {'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} [height='lg'] - 窗口高度选项
 * - sm: 256px (h-64)
 * - md: 320px (h-80)
 * - lg: 384px (h-96) - 默认值
 * - xl: 480px
 * - 2xl: 560px
 * - 3xl: 640px
 * - 4xl: 720px
 * - 5xl: 800px
 * @prop {String} [title=''] - 窗口标题
 * @prop {Boolean} [withShadow=true] - 是否显示阴影效果
 * @prop {Boolean} [showFrame=true] - 是否显示 iPhone 边框
 * @prop {BackgroundColor} [backgroundColor=''] - 内容区域背景色，等同于为其内部的 Container 设置背景色
 * @slots
 * @slot default - 主要内容区域
 * @emits
 */

import type { IApplePhoneProps } from "./props";

interface Props extends IApplePhoneProps {}

// Props 定义
const props = withDefaults(defineProps<Props>(), {
	height: "lg",
	title: "",
	withShadow: true,
	showFrame: true,
	backgroundColor: undefined,
});

import {
	IPHONE_FRAME_WIDTH,
	IPHONE_FRAME_HEIGHT,
	MAIN_CONTENT_WIDTH_ASPECT_RATIO,
	MAIN_CONTENT_HEIGHT_ASPECT_RATIO,
	IPHONE_FRAME_STATUS_BAR_HEIGHT_ASPECT_RATIO,
	IPHONE_FRAME_STATUS_BAR_TOP_ASPECT_RATIO,
	HEIGHT_CLASSES,
	HEIGHT_VALUES,
} from "../../src/components/apple-phone/constants";

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
        zIndex: 20,
      }">
      <Container
        rounded="lg"
        height="full"
        :background="backgroundColor || 'accent/90'">
        <div class="cosy:h-full cosy:overflow-y-auto cosy:overscroll-y-contain">
          <slot />
        </div>
      </Container>
    </div>
    
    <!-- iPhone 边框 -->
    <PhoneFrame v-if="showFrame" />
  </div>

  <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>
