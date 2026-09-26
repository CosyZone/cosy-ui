<!--
@component BannerBox

@description
BannerBox 组件是一个可定制的横幅容器，支持自定义背景样式。
可以直接用作容器，也可以通过传入标题、描述和特性列表来显示内容。
适用于创建营销横幅、特性展示、社交媒体卡片等内容。

@usage
基本用法：
```vue
<BannerBox>
  <div>横幅内容</div>
</BannerBox>
```

使用标题和描述：
```vue
<BannerBox
  title="我的横幅标题"
  description="这是一段描述文字"
  :features="[
    { emoji: '🚀', title: '高性能' },
    { emoji: '⚡', title: '快速响应' },
    { emoji: '🔒', title: '安全可靠' }
  ]"
/>
```

自定义背景：
```vue
<BannerBox background="gradient-sky">
  <div>自定义背景的横幅</div>
</BannerBox>
```


@props
@prop {String} [background='primary'] - 背景样式，支持所有 common 中定义的背景色类型
@prop {String} [title=''] - 横幅标题
@prop {String} [description=''] - 横幅描述
@prop {Array} [features=[]] - 特性列表，每项包含{emoji, title, link}

@slots
@slot default - 横幅内容
-->

<script lang="ts">
import { defineComponent, ref } from "vue";

type BackgroundColor = string;

/**
 * 通用背景色配置
 * 包含基础背景色和透明度变体，使用 Tailwind v4 语法
 * 适用于所有需要背景色功能的组件
 */

// 基础背景色类名映射
const baseBackgroundClasses = {
	primary: "cosy:bg-primary",
	secondary: "cosy:bg-secondary",
	accent: "cosy:bg-accent",
	neutral: "cosy:bg-neutral",
	"base-100": "cosy:bg-base-100",
	"base-200": "cosy:bg-base-200",
	"base-300": "cosy:bg-base-300",
	success: "cosy:bg-success",
	warning: "cosy:bg-warning",
	error: "cosy:bg-error",
	info: "cosy:bg-info",
	transparent: "cosy:bg-transparent",
	none: "",
} as const;

// 透明度值
const opacityValues = [
	"10",
	"20",
	"30",
	"40",
	"50",
	"60",
	"70",
	"80",
	"90",
] as const;

// 背景色和透明度的完整类名映射
const backgroundWithOpacityClasses = {
	// primary 背景色 + 透明度
	"primary/10": "cosy:bg-primary/10",
	"primary/20": "cosy:bg-primary/20",
	"primary/30": "cosy:bg-primary/30",
	"primary/40": "cosy:bg-primary/40",
	"primary/50": "cosy:bg-primary/50",
	"primary/60": "cosy:bg-primary/60",
	"primary/70": "cosy:bg-primary/70",
	"primary/80": "cosy:bg-primary/80",
	"primary/90": "cosy:bg-primary/90",
	// secondary 背景色 + 透明度
	"secondary/10": "cosy:bg-secondary/10",
	"secondary/20": "cosy:bg-secondary/20",
	"secondary/30": "cosy:bg-secondary/30",
	"secondary/40": "cosy:bg-secondary/40",
	"secondary/50": "cosy:bg-secondary/50",
	"secondary/60": "cosy:bg-secondary/60",
	"secondary/70": "cosy:bg-secondary/70",
	"secondary/80": "cosy:bg-secondary/80",
	"secondary/90": "cosy:bg-secondary/90",
	// accent 背景色 + 透明度
	"accent/10": "cosy:bg-accent/10",
	"accent/20": "cosy:bg-accent/20",
	"accent/30": "cosy:bg-accent/30",
	"accent/40": "cosy:bg-accent/40",
	"accent/50": "cosy:bg-accent/50",
	"accent/60": "cosy:bg-accent/60",
	"accent/70": "cosy:bg-accent/70",
	"accent/80": "cosy:bg-accent/80",
	"accent/90": "cosy:bg-accent/90",
	// neutral 背景色 + 透明度
	"neutral/10": "cosy:bg-neutral/10",
	"neutral/20": "cosy:bg-neutral/20",
	"neutral/30": "cosy:bg-neutral/30",
	"neutral/40": "cosy:bg-neutral/40",
	"neutral/50": "cosy:bg-neutral/50",
	"neutral/60": "cosy:bg-neutral/60",
	"neutral/70": "cosy:bg-neutral/70",
	"neutral/80": "cosy:bg-neutral/80",
	"neutral/90": "cosy:bg-neutral/90",
	// base-100 背景色 + 透明度
	"base-100/10": "cosy:bg-base-100/10",
	"base-100/20": "cosy:bg-base-100/20",
	"base-100/30": "cosy:bg-base-100/30",
	"base-100/40": "cosy:bg-base-100/40",
	"base-100/50": "cosy:bg-base-100/50",
	"base-100/60": "cosy:bg-base-100/60",
	"base-100/70": "cosy:bg-base-100/70",
	"base-100/80": "cosy:bg-base-100/80",
	"base-100/90": "cosy:bg-base-100/90",
	// base-200 背景色 + 透明度
	"base-200/10": "cosy:bg-base-200/10",
	"base-200/20": "cosy:bg-base-200/20",
	"base-200/30": "cosy:bg-base-200/30",
	"base-200/40": "cosy:bg-base-200/40",
	"base-200/50": "cosy:bg-base-200/50",
	"base-200/60": "cosy:bg-base-200/60",
	"base-200/70": "cosy:bg-base-200/70",
	"base-200/80": "cosy:bg-base-200/80",
	"base-200/90": "cosy:bg-base-200/90",
	// base-300 背景色 + 透明度
	"base-300/10": "cosy:bg-base-300/10",
	"base-300/20": "cosy:bg-base-300/20",
	"base-300/30": "cosy:bg-base-300/30",
	"base-300/40": "cosy:bg-base-300/40",
	"base-300/50": "cosy:bg-base-300/50",
	"base-300/60": "cosy:bg-base-300/60",
	"base-300/70": "cosy:bg-base-300/70",
	"base-300/80": "cosy:bg-base-300/80",
	"base-300/90": "cosy:bg-base-300/90",
	// success 背景色 + 透明度
	"success/10": "cosy:bg-success/10",
	"success/20": "cosy:bg-success/20",
	"success/30": "cosy:bg-success/30",
	"success/40": "cosy:bg-success/40",
	"success/50": "cosy:bg-success/50",
	"success/60": "cosy:bg-success/60",
	"success/70": "cosy:bg-success/70",
	"success/80": "cosy:bg-success/80",
	"success/90": "cosy:bg-success/90",
	// warning 背景色 + 透明度
	"warning/10": "cosy:bg-warning/10",
	"warning/20": "cosy:bg-warning/20",
	"warning/30": "cosy:bg-warning/30",
	"warning/40": "cosy:bg-warning/40",
	"warning/50": "cosy:bg-warning/50",
	"warning/60": "cosy:bg-warning/60",
	"warning/70": "cosy:bg-warning/70",
	"warning/80": "cosy:bg-warning/80",
	"warning/90": "cosy:bg-warning/90",
	// error 背景色 + 透明度
	"error/10": "cosy:bg-error/10",
	"error/20": "cosy:bg-error/20",
	"error/30": "cosy:bg-error/30",
	"error/40": "cosy:bg-error/40",
	"error/50": "cosy:bg-error/50",
	"error/60": "cosy:bg-error/60",
	"error/70": "cosy:bg-error/70",
	"error/80": "cosy:bg-error/80",
	"error/90": "cosy:bg-error/90",
	// info 背景色 + 透明度
	"info/10": "cosy:bg-info/10",
	"info/20": "cosy:bg-info/20",
	"info/30": "cosy:bg-info/30",
	"info/40": "cosy:bg-info/40",
	"info/50": "cosy:bg-info/50",
	"info/60": "cosy:bg-info/60",
	"info/70": "cosy:bg-info/70",
	"info/80": "cosy:bg-info/80",
	"info/90": "cosy:bg-info/90",
} as const;

// 渐变色背景类名映射
const gradientBackgroundClasses = {
	gradient: "cosy:bg-gradient-to-br cosy:from-primary/10 cosy:to-secondary/20",
	"gradient-primary":
		"cosy:bg-gradient-to-br cosy:from-primary/40 cosy:to-primary/70",
	"gradient-secondary":
		"cosy:bg-gradient-to-br cosy:from-secondary/40 cosy:to-secondary/70",
	"gradient-accent":
		"cosy:bg-gradient-to-br cosy:from-accent/40 cosy:to-accent/70",
	"gradient-success":
		"cosy:bg-gradient-to-br cosy:from-success/40 cosy:to-success/70",
	"gradient-warning":
		"cosy:bg-gradient-to-br cosy:from-warning/40 cosy:to-warning/70",
	"gradient-info": "cosy:bg-gradient-to-br cosy:from-info/40 cosy:to-info/70",
	"gradient-sky": "cosy:bg-gradient-to-br cosy:from-sky-400 cosy:to-indigo-500",
	"gradient-sunset":
		"cosy:bg-gradient-to-br cosy:from-orange-400 cosy:via-pink-500 cosy:to-red-500",
	"gradient-forest":
		"cosy:bg-gradient-to-br cosy:from-green-700 cosy:to-lime-300",
	"gradient-ocean":
		"cosy:bg-gradient-to-br cosy:from-cyan-400 cosy:to-blue-700",
	"gradient-mountain":
		"cosy:bg-gradient-to-br cosy:from-gray-400 cosy:to-blue-900",
	"gradient-flower":
		"cosy:bg-gradient-to-br cosy:from-pink-300 cosy:via-purple-400 cosy:to-fuchsia-500",
	"gradient-watermelon":
		"cosy:bg-gradient-to-br cosy:from-green-300 cosy:via-pink-400 cosy:to-red-500",
	"gradient-lemon":
		"cosy:bg-gradient-to-br cosy:from-yellow-200 cosy:via-yellow-400 cosy:to-yellow-600",
	"gradient-grape":
		"cosy:bg-gradient-to-br cosy:from-purple-400 cosy:via-indigo-500 cosy:to-purple-700",
	"gradient-blueberry":
		"cosy:bg-gradient-to-br cosy:from-blue-400 cosy:via-blue-600 cosy:to-indigo-700",
	"gradient-mango":
		"cosy:bg-gradient-to-br cosy:from-yellow-300 cosy:via-orange-400 cosy:to-orange-600",
	"gradient-kiwi":
		"cosy:bg-gradient-to-br cosy:from-lime-200 cosy:via-green-400 cosy:to-green-700",
	"gradient-pitaya":
		"cosy:bg-gradient-to-br cosy:from-pink-200 cosy:via-fuchsia-400 cosy:to-lime-300",
	"gradient-banana":
		"cosy:bg-gradient-to-br cosy:from-yellow-100 cosy:via-yellow-300 cosy:to-yellow-500",
} as const;

// 图案背景类名映射（Pattern backgrounds）
const patternBackgroundClasses = {
	"dot-grid": "cosy:bg-dot-grid",
	stripes: "cosy:bg-stripes",
	"gradient-glow": "cosy:bg-gradient-glow",
	glassmorphism: "cosy:bg-glassmorphism",
	"glassmorphism-strong": "cosy:bg-glassmorphism-strong",
	"glassmorphism-soft": "cosy:bg-glassmorphism-soft",
	"mesh-gradient": "cosy:bg-mesh-gradient",
	noise: "cosy:bg-noise",
	"noise-strong": "cosy:bg-noise-strong",
	"noise-soft": "cosy:bg-noise-soft",
	"animated-gradient": "cosy:bg-animated-gradient",
	"animated-gradient-fast": "cosy:bg-animated-gradient-fast",
	"animated-gradient-slow": "cosy:bg-animated-gradient-slow",
} as const;

// 合并所有背景色类名
const allBackgroundClasses = {
	...baseBackgroundClasses,
	...backgroundWithOpacityClasses,
	...gradientBackgroundClasses,
	...patternBackgroundClasses,
} as const;

// 背景色类型

/**
 * 获取背景色类名
 * @param background 背景色类型
 * @returns 背景色CSS类名
 */
function getBackgroundClass(background?: BackgroundColor): string {
	if (!background) return "";
	return allBackgroundClasses[background] || "";
}
import FeatureCard from "./FeatureCard.vue";

export interface IFeature {
	emoji: string;
	title: string;
	link?: string;
}

export default defineComponent({
	name: "BannerBox",
	components: {
		FeatureCard,
	},
	props: {
		background: {
			type: String as () => BackgroundColor,
			default: "primary",
		},
		title: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			default: "",
		},
		features: {
			type: Array as () => IFeature[],
			default: () => [],
		},
	},
	setup(props) {
		const componentRef = ref<HTMLElement | null>(null);

		const getBackgroundClass = (): string => {
			return (
				allBackgroundClasses[props.background] || allBackgroundClasses.primary
			);
		};

		return {
			componentRef,
			getBackgroundClass,
		};
	},
});

</script>

<template>
  <div
    class="cosy:relative cosy:w-full cosy:rounded-2xl cosy:max-w-7xl cosy:mx-auto"
  >
    <div
      ref="componentRef"
      class="cosy:flex cosy:p-8 cosy:rounded-2xl cosy:shadow"
      :class="getBackgroundClass()"
    >
      <div
        class="cosy:py-16 cosy:px-8 cosy:text-center cosy:w-full cosy:rounded-2xl"
        data-type="smart-banner"
      >
        <h2 v-if="title.length > 0" class="cosy:text-4xl cosy:mb-4">
          {{ title }}
        </h2>

        <p
          v-if="description.length > 0"
          class="cosy:text-lg cosy:text-center cosy:max-w-2xl cosy:mx-auto"
        >
          {{ description }}
        </p>

        <div
          v-if="features.length > 0"
          class="cosy:flex cosy:flex-row cosy:justify-center cosy:gap-8 cosy:mx-auto cosy:w-full cosy:mt-24"
        >
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :emoji="feature.emoji"
            :title="feature.title"
            :link="feature.link"
          />
        </div>

        <div
          :class="{
            'cosy:mt-12':
              title.length > 0 || description.length > 0 || features.length > 0,
          }"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
