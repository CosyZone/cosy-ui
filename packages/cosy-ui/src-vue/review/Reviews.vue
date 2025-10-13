<script setup lang="ts">
/**
 * @component Reviews
 *
 * @description
 * Reviews 组件用于展示多个用户评价，支持网格布局、评分统计和筛选功能。
 * 适用于产品评价页面、服务评价展示等场景。
 *
 * @design
 * 设计理念：
 * 1. 批量展示 - 高效展示多个评价，支持分页和筛选
 * 2. 统计信息 - 显示总体评分和评价分布
 * 3. 灵活布局 - 支持网格和列表两种布局模式
 * 4. 用户友好 - 提供排序和筛选功能
 *
 * @usage
 * 基本用法：
 * ```vue
 * <Reviews
 *   :reviews="reviewsData"
 *   title="用户评价"
 *   :showStats="true"
 * />
 * ```
 *
 * 网格布局：
 * ```vue
 * <Reviews
 *   :reviews="reviewsData"
 *   layout="grid"
 *   :columns="{ base: 1, md: 2, lg: 3 }
 * />
 * ```
 *
 * 自定义样式：
 * ```vue
 * <Reviews
 *   :reviews="reviewsData"
 *   class="cosy:bg-base-200 cosy:p-6"
 * />
 * ```
 *
 * @props
 * @prop {ReviewData[]} reviews - 评价数据数组
 * @prop {string} [title] - 标题
 * @prop {boolean} [showStats] - 是否显示统计信息
 * @prop {'grid' | 'list'} [layout] - 布局模式
 * @prop {Object} [columns] - 网格列数配置
 * @prop {number} [maxReviews] - 最大显示评价数
 * @prop {string} [class] - 自定义类名
 * @prop {any} [class:list] - 类名列表
 */

import { computed } from "vue";
import Text from "../text/Text.vue";
import Heading from "../heading/Heading.vue";
import Grid from "../grid/Grid.vue";
import SmartIcon from "../smart-icon/SmartIcon.vue";
import type { IReviewsProps, IReviewData } from "./props";
import Review from "./Review.vue";

// 定义与 Grid 组件相同的响应式值类型
type ResponsiveValue<T> =
	| T
	| {
			base?: T;
			sm?: T;
			md?: T;
			lg?: T;
			xl?: T;
			"2xl"?: T;
	  };

interface Props extends IReviewsProps {
	class?: string;
	"class:list"?: any;
}

const props = withDefaults(defineProps<Props>(), {
	showStats: false,
	layout: "grid",
	columns: () => ({ base: 1, md: 2, lg: 3 }),
	class: "",
});

const { class: className, "class:list": classList } = props;

// 计算统计信息
const stats = computed(() => {
	if (!props.showStats) return null;
	return {
		averageRating:
			props.reviews.reduce((sum, review) => sum + review.rating, 0) /
			props.reviews.length,
		totalReviews: props.reviews.length,
		ratingDistribution: Array.from(
			{ length: 5 },
			(_, i) =>
				props.reviews.filter((review) => Math.floor(review.rating) === i + 1)
					.length,
		),
	};
});

// 限制显示的评价数量
const displayReviews = computed(() => {
	return props.maxReviews
		? props.reviews.slice(0, props.maxReviews)
		: props.reviews;
});

// 生成平均评分的星级
const averageStarArray = computed(() => {
	if (!stats.value) return [];
	return Array.from({ length: 5 }, (_, i) => ({
		filled: i < Math.floor(stats.value!.averageRating),
		half:
			i === Math.floor(stats.value!.averageRating) &&
			stats.value!.averageRating % 1 !== 0,
	}));
});

// 为 Grid 组件计算列数，确保类型匹配
const gridColumns = computed(() => {
	const cols: ResponsiveValue<number> = {
		base: props.columns?.base,
		sm: props.columns?.sm,
		md: props.columns?.md,
		lg: props.columns?.lg,
		xl: props.columns?.xl,
		"2xl": props.columns?.["2xl"],
	};
	return cols;
});
</script>
