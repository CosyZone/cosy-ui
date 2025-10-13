<script setup lang="ts">
import { computed } from "vue";
import Text from "../text/Text.vue";
import Badge from "../badge/Badge.vue";
import SmartIcon from "../smart-icon/SmartIcon.vue";
import Card from "../card/Card.vue";
import Avatar from "../avatar/Avatar.vue";
import type { IReviewProps } from "./props";

interface Props extends /* @vue-ignore */ IReviewProps {
	class?: string;
	"class:list"?: any;
}

const props = withDefaults(defineProps<Props>(), {
	verified: false,
	class: "",
});

// 从props中分离Card相关的属性和Review自身的属性
const {
	userName,
	rating,
	comment,
	date,
	verified,
	avatar,
	class: className,
	"class:list": classList,
	// Card属性
	aspectRatio,
	centered,
	contentCentered,
	flex,
	fit,
	gap,
	height,
	items,
	justify,
	margin,
	muted,
	padding,
	py,
	pt,
	pb,
	px,
	pl,
	pr,
	width,
	rounded,
	background,
	border,
	borderColor,
	shadow,
} = props;

// 生成星级评分
const starArray = computed(() => {
	return Array.from({ length: 5 }, (_, i) => ({
		filled: i < Math.floor(props.rating),
		half: i === Math.floor(props.rating) && props.rating % 1 !== 0,
	}));
});

// 格式化日期
const formattedDate = computed(() => {
	if (!props.date) return "";
	try {
		return new Date(props.date).toLocaleDateString("zh-CN", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
	} catch {
		return props.date;
	}
});
</script>

<template>
  <Card
    v-bind="{
      aspectRatio,
      centered,
      contentCentered,
      flex,
      fit,
      gap,
      height,
      items,
      justify,
      margin,
      muted,
      padding,
      py,
      pt,
      pb,
      px,
      pl,
      pr,
      width,
      rounded,
      background,
      border,
      borderColor,
      shadow,
    }"
    :class="className"
    :class:list="classList">
    <div class="cosy:flex cosy:items-start cosy:gap-4">
      <Avatar
        v-if="avatar"
        :src="avatar"
        :alt="userName"
        size="md"
        class="cosy:flex-shrink-0" />
      <div class="cosy:flex-1">
        <div class="cosy:flex cosy:items-center cosy:justify-between">
          <Text variant="h3" class="cosy:text-lg cosy:font-semibold">
            {{ userName }}
          </Text>
          <Badge v-if="verified" variant="success" size="sm">
            <SmartIcon name="check-circle" class="cosy:w-4 cosy:h-4" />
            已认证
          </Badge>
        </div>
        <div class="cosy:flex cosy:items-center cosy:mt-1">
          <div class="cosy:flex cosy:space-x-1">
            <SmartIcon
              v-for="(star, index) in starArray"
              :key="index"
              :name="
                star.filled ? 'star-filled' : star.half ? 'star-half' : 'star'
              "
              class="cosy:w-5 cosy:h-5 cosy:text-yellow-400" />
          </div>
          <Text variant="small" class="cosy:ml-2 cosy:text-gray-500">
            {{ formattedDate }}
          </Text>
        </div>
        <Text variant="p" class="cosy:mt-3">
          {{ comment }}
        </Text>
      </div>
    </div>
  </Card>
</template>
