<script setup lang="ts">
import { computed } from "vue";
import {
	SocialIcon,
	ImageDisplay,
	Button,
	LinkIcon,
	AppStoreIcon,
} from "../../index";
import {
	getBackgroundClass,
	type BackgroundColor,
} from "../../src/common/backgrounds";
import "./product-card.css";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
	/**
	 * 产品名称
	 */
	name: string;
	/**
	 * 产品图片
	 */
	image: string;
	/**
	 * 产品描述
	 */
	description: string;
	/**
	 * App Store链接
	 */
	appStoreUrl?: string;
	/**
	 * 产品官网链接
	 */
	productUrl?: string;
	/**
	 * GitHub仓库链接
	 */
	githubUrl?: string;
	/**
	 * 卡片尺寸
	 * - xs: 超小尺寸，适合密集布局
	 * - sm: 小尺寸，适合列表
	 * - md: 中等尺寸，默认
	 * - lg: 大尺寸，适合突出显示
	 * - xl: 超大尺寸，适合特色产品
	 */
	size?: Size;
	/**
	 * 主按钮文本（产品官网按钮）
	 */
	primaryButtonText?: string;
	/**
	 * 次按钮文本（App Store按钮）
	 */
	secondaryButtonText?: string;
	/**
	 * GitHub按钮文本
	 */
	githubButtonText?: string;
	/**
	 * 按钮布局方向
	 * - row: 水平布局（默认）
	 * - column: 垂直布局
	 */
	buttonLayout?: "row" | "column";
	/**
	 * 是否启用等高卡片
	 * 当在grid或flex布局中使用时，设置为true可确保所有卡片高度一致
	 */
	equalHeight?: boolean;
	/**
	 * 描述文本的最大行数
	 * 用于控制描述文本的显示行数，超出部分会被截断
	 */
	descriptionLines?: number;
	/**
	 * 自定义类名
	 */
	class?: string;
	/**
	 * 卡片阴影样式
	 * - none: 无阴影
	 * - sm: 小阴影
	 * - md: 中等阴影（默认）
	 * - lg: 大阴影
	 * - xl: 超大阴影
	 */
	shadow?: "none" | "sm" | "md" | "lg" | "xl";
	/**
	 * 卡片背景色
	 * 支持基础颜色、透明度变体和渐变背景
	 */
	background?: BackgroundColor;
	/**
	 * 是否使用柔和色背景
	 */
	muted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	size: "md",
	primaryButtonText: "访问官网",
	secondaryButtonText: "App Store",
	githubButtonText: "GitHub",
	buttonLayout: "row",
	equalHeight: false,
	descriptionLines: undefined,
	class: "",
	shadow: "md",
	background: undefined,
	muted: false,
	appStoreUrl: undefined,
	productUrl: undefined,
	githubUrl: undefined,
});

// 尺寸样式映射
const sizeStyles = {
	xs: {
		card: "cosy:max-w-[200px]",
		figure: "cosy:p-2",
		image: {
			width: 150,
			height: 100,
		},
		title: "cosy:text-sm",
		description: "cosy:text-xs cosy:line-clamp-2",
		buttons: "cosy:text-xs cosy:btn-xs",
		padding: "cosy:px-3 cosy:py-2",
		cardHeight: "cosy:h-[280px]",
		imageHeight: "cosy:h-[100px]",
		bodyHeight: "cosy:h-[180px]",
	},
	sm: {
		card: "cosy:max-w-[250px]",
		figure: "cosy:p-3",
		image: {
			width: 200,
			height: 133,
		},
		title: "cosy:text-base",
		description: "cosy:text-sm cosy:line-clamp-3",
		buttons: "cosy:text-sm cosy:btn-sm",
		padding: "cosy:px-4 cosy:py-3",
		cardHeight: "cosy:h-[360px]",
		imageHeight: "cosy:h-[133px]",
		bodyHeight: "cosy:h-[227px]",
	},
	md: {
		card: "cosy:max-w-[320px]",
		figure: "cosy:p-4",
		image: {
			width: 300,
			height: 200,
		},
		title: "cosy:text-xl",
		description: "cosy:text-base",
		buttons: "",
		padding: "cosy:px-6 cosy:py-4",
		cardHeight: "cosy:h-[450px]",
		imageHeight: "cosy:h-[200px]",
		bodyHeight: "cosy:h-[250px]",
	},
	lg: {
		card: "cosy:max-w-[400px]",
		figure: "cosy:p-5",
		image: {
			width: 380,
			height: 253,
		},
		title: "cosy:text-2xl",
		description: "cosy:text-lg",
		buttons: "cosy:text-base cosy:btn-lg",
		padding: "cosy:px-7 cosy:py-5",
		cardHeight: "cosy:h-[550px]",
		imageHeight: "cosy:h-[253px]",
		bodyHeight: "cosy:h-[297px]",
	},
	xl: {
		card: "cosy:max-w-[500px]",
		figure: "cosy:p-6",
		image: {
			width: 480,
			height: 320,
		},
		title: "cosy:text-3xl",
		description: "cosy:text-xl",
		buttons: "cosy:text-lg cosy:btn-lg",
		padding: "cosy:px-8 cosy:py-6",
		cardHeight: "cosy:h-[650px]",
		imageHeight: "cosy:h-[320px]",
		bodyHeight: "cosy:h-[330px]",
	},
};

const currentSize = sizeStyles[props.size];

// 阴影样式映射
const shadowStyles = {
	none: "cosy:shadow-none",
	sm: "cosy:shadow-sm cosy:hover:shadow-md",
	md: "cosy:shadow-md cosy:hover:shadow-lg",
	lg: "cosy:shadow-lg cosy:hover:shadow-xl",
	xl: "cosy:shadow-xl cosy:hover:shadow-2xl",
};

// 描述文本的行数限制
const descriptionClass = computed(() => {
	if (props.descriptionLines) {
		return `cosy:line-clamp-${props.descriptionLines}`;
	}
	if (currentSize.description.includes("line-clamp")) {
		return currentSize.description;
	}
	return `${currentSize.description} cosy:line-clamp-3`;
});

// 计算按钮布局类名，根据按钮数量和布局方向调整
const getButtonLayoutClass = () => {
	let count = 0;
	if (props.productUrl) count++;
	if (props.appStoreUrl) count++;
	if (props.githubUrl) count++;

	// 垂直布局时所有按钮都是全宽
	if (props.buttonLayout === "column") {
		return "cosy:w-full";
	}

	// 水平布局时根据按钮数量选择合适的布局类
	switch (count) {
		case 1:
			return "cosy:w-full"; // 单个按钮占满一行
		case 2:
			return "cosy:flex-1"; // 两个按钮平分
		case 3:
			return "cosy:flex-1"; // 三个按钮平分
		default:
			return "";
	}
};

const buttonLayoutClass = getButtonLayoutClass();
const buttonsContainerClass = computed(() =>
	props.buttonLayout === "column"
		? "cosy:flex cosy:flex-col cosy:gap-2 cosy:mt-auto"
		: "cosy:flex cosy:flex-wrap cosy:gap-2 cosy:mt-auto",
);

// 计算属性
const className = computed(() => props.class || "");
const backgroundClass = computed(() =>
	props.background ? getBackgroundClass(props.background) : "",
);
const shadowClass = computed(() => shadowStyles[props.shadow || "md"]);
const equalHeightClass = computed(() =>
	props.equalHeight ? "cosy:h-full" : "",
);
const mutedClass = computed(() => (props.muted ? "product-card-muted" : ""));
const name = computed(() => props.name);
const image = computed(() => props.image);
const description = computed(() => props.description);
</script>

<template>
  <div
    :class="
      [
        'cosy:card cosy:w-full cosy:flex cosy:flex-col cosy:overflow-hidden',
        currentSize.card,
        shadowClass,
        backgroundClass,
        equalHeightClass,
        mutedClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')
    ">
    <figure :class="['cosy:m-0', currentSize.figure].filter(Boolean).join(' ')">
      <ImageDisplay
        :images="[image]"
        :size="size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : size"
        :max-display="1"
        :show-preview="false" />
    </figure>

    <div
      :class="
        [
          'cosy:card-body cosy:flex cosy:flex-col',
          currentSize.padding,
          currentSize.bodyHeight,
        ]
          .filter(Boolean)
          .join(' ')
      ">
      <h2
        :class="
          ['cosy:card-title cosy:m-0', currentSize.title]
            .filter(Boolean)
            .join(' ')
        ">
        {{ name }}
      </h2>

      <p :class="['cosy:my-2', descriptionClass].filter(Boolean).join(' ')">
        {{ description }}
      </p>

      <div :class="buttonsContainerClass">
        <Button
          v-if="productUrl"
          :class="
            [buttonLayoutClass, currentSize.buttons].filter(Boolean).join(' ')
          ">
          <LinkIcon class="cosy:w-4 cosy:h-4" />
          <a :href="productUrl" target="_blank" rel="noopener noreferrer">
            {{ primaryButtonText }}
          </a>
        </Button>

        <Button
          v-if="appStoreUrl"
          variant="secondary"
          :class="
            [buttonLayoutClass, currentSize.buttons].filter(Boolean).join(' ')
          ">
          <AppStoreIcon class="cosy:w-4 cosy:h-4" />
          <a :href="appStoreUrl" target="_blank" rel="noopener noreferrer">
            {{ secondaryButtonText }}
          </a>
        </Button>

        <Button
          v-if="githubUrl"
          variant="ghost"
          :class="
            [buttonLayoutClass, currentSize.buttons].filter(Boolean).join(' ')
          ">
          <SocialIcon platform="github" class="cosy:w-4 cosy:h-4" />
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer">
            {{ githubButtonText }}
          </a>
        </Button>
      </div>
    </div>
  </div>
</template>
