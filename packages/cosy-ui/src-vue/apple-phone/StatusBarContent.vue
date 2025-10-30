<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import {
	IPhoneSignalIcon,
	IPhoneWifiIcon,
	IPhoneBatteryIcon,
} from "../icons/index";

/**
 * @component StatusBarContent
 * @description StatusBarContent 组件显示 iPhone 状态栏的内容，包括时间、信号、WiFi 和电池图标。
 * 组件会自动更新时间显示，并支持根据设备大小进行缩放。
 * @usage
 * 基本用法：
 * ```vue
 * <StatusBarContent />
 * ```
 *
 * 带缩放比例：
 * ```vue
 * <StatusBarContent :scaleRatio="1.5" />
 * ```
 * @props
 * @prop {Number} [scaleRatio=1] - 缩放比例，用于根据设备大小调整文字和图标大小
 * @slots
 * @emits
 */

// Props 定义
interface Props {
	scaleRatio?: number;
}

const props = withDefaults(defineProps<Props>(), {
	scaleRatio: 1,
});

// 响应式数据
const currentTime = ref("12:00");

// 更新时间的函数
const updateTime = () => {
	const now = new Date();
	const hours = now.getHours().toString().padStart(2, "0");
	const minutes = now.getMinutes().toString().padStart(2, "0");
	currentTime.value = `${hours}:${minutes}`;
};

// 计算缩放后的字体大小
const scaledFontSize = computed(() => {
	const baseFontSize = 14; // 基础字体大小
	return `${baseFontSize * props.scaleRatio}px`;
});

// 计算缩放后的图标尺寸
const scaledIconSize = computed(() => {
	const baseIconSize = 15; // 基础图标宽度
	return `${baseIconSize * props.scaleRatio}px`;
});

// 计算缩放后的图标高度
const scaledIconHeight = computed(() => {
	const baseIconSize = 15; // 基础图标高度
	return `${baseIconSize * props.scaleRatio}px`;
});

// 设置定时器更新时间
let timeInterval: number;
onMounted(() => {
	// 使用 requestAnimationFrame 确保在客户端渲染完成后再更新时间
	// 这样可以避免 SSR hydration mismatch 问题
	requestAnimationFrame(() => {
		updateTime();
		timeInterval = window.setInterval(updateTime, 60000); // 每分钟更新一次
	});
});

onUnmounted(() => {
	if (timeInterval) {
		clearInterval(timeInterval);
	}
});
</script>

<template>
  <div class="cosy:flex cosy:items-center cosy:h-full cosy:justify-between">
    <!-- 左侧时间 -->
    <span
      class="cosy:font-medium time-text"
      :style="{ fontSize: scaledFontSize }">
      {{ currentTime }}
    </span>

    <!-- 右侧状态图标 -->
    <div
      class="cosy:flex cosy:flex-row cosy:items-center cosy:space-x-1 cosy:h-full">
      <!-- 信号图标 -->
      <div
        class="cosy:flex cosy:items-center cosy:justify-center"
        :style="{
          width: scaledIconSize,
          height: scaledIconHeight,
          minWidth: 0,
          minHeight: 0,
        }">
        <IPhoneSignalIcon class="status-icon" />
      </div>

      <!-- WiFi图标 -->
      <div
        class="cosy:flex cosy:items-center cosy:justify-center"
        :style="{
          width: scaledIconSize,
          height: scaledIconHeight,
          minWidth: 0,
          minHeight: 0,
        }">
        <IPhoneWifiIcon class="status-icon" />
      </div>

      <!-- 电池图标 -->
      <div
        class="cosy:flex cosy:items-center cosy:justify-center"
        :style="{
          width: scaledIconSize,
          height: scaledIconHeight,
          minWidth: 0,
          minHeight: 0,
        }">
        <IPhoneBatteryIcon class="battery-icon" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 确保图标渲染更平滑 */
  svg {
    shape-rendering: geometricPrecision;
  }

  /* 时间文字基础样式 */
  .time-text {
    line-height: 1;
    transition: font-size 0.2s ease;
  }

  /* 状态图标通用样式 */
  .status-icon,
  .battery-icon {
    color: #000000;
    fill: currentColor;
  }

  .status-icon svg,
  .battery-icon svg {
    width: 100%;
    height: 100%;
  }
</style>
