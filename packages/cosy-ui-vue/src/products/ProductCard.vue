<script setup lang="ts">
import { computed } from "vue";
import AppStoreIcon from "../icons/AppStoreIcon.vue";
import LinkIcon from "../icons/LinkIcon.vue";
import Button from "../button/Button.vue";
import ImageDisplay from "../image-display/ImageDisplay.vue";
import SocialIcon from "../social-icon/SocialIcon.vue";
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
} as Record<string, string>;

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

type BackgroundColor = string;
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
	 * 语言设置，影响默认按钮文本
	 * - zh-cn: 中文默认（访问官网）
	 * - en: 英文默认（Visit Website）
	 */
	lang?: string;
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
	primaryButtonText: undefined,
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

const effectivePrimaryButtonText = computed(
	() =>
		props.primaryButtonText ??
		(props.lang === "en" ? "Visit Website" : "访问官网"),
);

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
		buttons: "cosy:text-xs",
		buttonSize: "xs",
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
		buttons: "cosy:text-sm",
		buttonSize: "sm",
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
		buttonSize: "md",
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
		buttons: "cosy:text-base",
		buttonSize: "lg",
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
		buttons: "cosy:text-lg",
		buttonSize: "lg",
		padding: "cosy:px-8 cosy:py-6",
		cardHeight: "cosy:h-[650px]",
		imageHeight: "cosy:h-[320px]",
		bodyHeight: "cosy:h-[330px]",
	},
} as const;

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
          :size="currentSize.buttonSize"
          :class="
            [buttonLayoutClass, currentSize.buttons].filter(Boolean).join(' ')
          ">
          <LinkIcon class="cosy:w-4 cosy:h-4" />
          <a :href="productUrl" target="_blank" rel="noopener noreferrer">
            {{ effectivePrimaryButtonText }}
          </a>
        </Button>

        <Button
          v-if="appStoreUrl"
          :size="currentSize.buttonSize"
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
          :size="currentSize.buttonSize"
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
