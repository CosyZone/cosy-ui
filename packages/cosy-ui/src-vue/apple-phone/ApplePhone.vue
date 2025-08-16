<!--
@component ApplePhone

@description
ApplePhone 组件模拟 iPhone 设备的外观，包含状态栏、时间显示和设备边框。
适用于创建移动应用界面原型或展示移动端设计效果。

@props
@prop {'sm'|'md'|'lg'|'xl'|'2xl'|'3xl'|'4xl'|'5xl'} [height='lg'] - 窗口高度选项
- sm: 256px (h-64)
- md: 320px (h-80) 
- lg: 384px (h-96) - 默认值
- xl: 480px
- 2xl: 560px
- 3xl: 640px
- 4xl: 720px
- 5xl: 800px
@prop {String} [title=''] - 窗口标题
@prop {Array} [statusBarButtons=[]] - 状态栏按钮数组
@prop {Boolean} [withShadow=true] - 是否显示阴影效果
@prop {Boolean} [showFrame=true] - 是否显示 iPhone 边框
@prop {BackgroundColor} [backgroundColor=''] - 内容区域背景色，等同于为其内部的 Container 设置背景色

@slots
@slot default - 主要内容区域

@emits
-->
<script lang="ts">
import '../../style';
import { AlertDialog, Container } from '../../index-vue';
import { ref, defineComponent } from 'vue';
import type { BackgroundColor } from '../container/backgrounds';
import iphoneFrame from './assets/iPhone 14 Pro - Deep Purple - Portrait.png';
import StatusBarContent from './StatusBarContent.vue';

// iPhone边框图片-宽度
const iphoneFrameWidth = 1339;
// iPhone边框图片-高度
const iphoneFrameHeight = 2716;
// iPhone边框图片-状态栏离上边框的距离
const iphoneFrameStatusBarTop = 115;
// iPhone边框图片-状态栏高度
const iphoneFrameStatusBarHeight = 110;

// 比例-总宽度
const mainContentWidthAspectRatio = 1179 / iphoneFrameWidth;
// 比例-总高度
const mainContentHeightAspectRatio = 2556 / iphoneFrameHeight;
// 比例-状态栏高度
const iphoneFrameStatusBarHeightAspectRatio =
    iphoneFrameStatusBarHeight / iphoneFrameHeight;
// 比例-状态栏离上边框的距离
const iphoneFrameStatusBarTopAspectRatio =
    iphoneFrameStatusBarTop / iphoneFrameHeight;

// 预定义的高度选项
type HeightOption = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

const heightClasses: Record<HeightOption, string> = {
    sm: 'cosy:h-64', // 256px
    md: 'cosy:h-80', // 320px
    lg: 'cosy:h-96', // 384px
    xl: 'cosy:h-[480px]', // 480px
    '2xl': 'cosy:h-[560px]', // 560px
    '3xl': 'cosy:h-[640px]', // 640px
    '4xl': 'cosy:h-[720px]', // 720px
    '5xl': 'cosy:h-[800px]', // 800px
};

export default defineComponent({
    name: 'ApplePhone',
    components: {
        AlertDialog,
        StatusBarContent,
        Container,
    },
    props: {
        height: {
            type: String as () => HeightOption,
            default: 'lg',
            validator: (value: string) => {
                return Object.keys(heightClasses).includes(value);
            },
        },
        title: {
            type: String,
            default: '',
        },
        statusBarButtons: {
            type: Array,
            default: () => [],
        },
        withShadow: {
            type: Boolean,
            default: true,
        },
        showFrame: {
            type: Boolean,
            default: true,
        },
        backgroundColor: {
            type: String as () => BackgroundColor,
            default: '',
        },
    },
    setup(props) {
        const showAlertDialog = ref(false);
        const alertMessage = ref('');

        // 计算当前高度的缩放比例
        const getScaleRatio = () => {
            const heightValues = {
                sm: 256,
                md: 320,
                lg: 384,
                xl: 480,
                '2xl': 560,
                '3xl': 640,
                '4xl': 720,
                '5xl': 800,
            };
            const currentHeight = heightValues[props.height];
            // 基于特定高度计算缩放比例
            return currentHeight / 500;
        };

        return {
            showAlertDialog,
            alertMessage,
            iphoneFrame: (iphoneFrame as any).src || iphoneFrame,
            heightClasses,
            mainContentWidthAspectRatio,
            mainContentHeightAspectRatio,
            iphoneFrameWidth,
            iphoneFrameHeight,
            iphoneFrameStatusBarTop,
            iphoneFrameStatusBarHeight,
            iphoneFrameStatusBarHeightAspectRatio,
            iphoneFrameStatusBarTopAspectRatio,
            getScaleRatio,
        };
    },
});
</script>

<template>
    <div :class="['cosy:relative not-prose', heightClasses[height]]" :style="{
        aspectRatio: `${iphoneFrameWidth}/${iphoneFrameHeight}`,
    }">
        <!-- iPhone 边框 -->
        <img v-if="showFrame" style="max-width: 100%; max-height: 100%" :src="iphoneFrame" alt="iPhone frame" />

        <!-- 顶部状态栏 -->
        <div :style="{
            position: 'absolute',
            top: iphoneFrameStatusBarTopAspectRatio * 100 + '%',
            height: iphoneFrameStatusBarHeightAspectRatio * 100 + '%',
            width: mainContentWidthAspectRatio * 100 + '%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            paddingLeft: '5%',
            paddingRight: '5%',
            zIndex: 10,
        }">
            <StatusBarContent :scaleRatio="getScaleRatio()" />
        </div>

        <!-- 内容区域 -->
        <div class="cosy:inset-0 cosy:h-full" :style="{
            width: mainContentWidthAspectRatio * 100 + '%',
            height: mainContentHeightAspectRatio * 100 + '%',
            // 水平居中
            left: '50%',
            // 垂直居中
            top: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            zIndex: 10,
        }">
            <div class="cosy:h-full cosy:w-full cosy:overflow-hidden">
                <Container border style="height: 100%;" :background="backgroundColor || 'accent/90'">
                    <slot />
                </Container>
            </div>
        </div>
    </div>

    <AlertDialog v-model="showAlertDialog" :message="alertMessage" />
</template>
