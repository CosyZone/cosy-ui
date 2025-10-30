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
import type { BackgroundColor } from "../../src/common";
import { allBackgroundClasses } from "../../src/common";
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
