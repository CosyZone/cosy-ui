// Astro 示例组件

// Props 容器组件
import AvatarContainer from "./AvatarContainer.astro";
import BasicUsage from "./BasicUsage.astro";
// Vue 示例组件
import BasicUsageVue from "./BasicUsageVue.vue";
import ClassContainer from "./ClassContainer.astro";
import CommentContainer from "./CommentContainer.astro";
import CustomStyle from "./CustomStyle.astro";
import CustomStyleVue from "./CustomStyleVue.vue";
import DateContainer from "./DateContainer.astro";
import RatingContainer from "./RatingContainer.astro";
import ReviewMutedContainer from "./ReviewMutedContainer.astro";
import ReviewMutedTestContainer from "./ReviewMutedTestContainer.astro";
import UserNameContainer from "./UserNameContainer.astro";
import VerifiedContainer from "./VerifiedContainer.astro";
import VerifiedUser from "./VerifiedUser.astro";
import VerifiedUserVue from "./VerifiedUserVue.vue";
import WithAvatar from "./WithAvatar.astro";
import WithAvatarVue from "./WithAvatarVue.vue";

// 导出组件
export { BasicUsage, VerifiedUser, WithAvatar, CustomStyle };
export { BasicUsageVue, VerifiedUserVue, WithAvatarVue, CustomStyleVue };
export {
	AvatarContainer,
	ClassContainer,
	CommentContainer,
	DateContainer,
	RatingContainer,
	UserNameContainer,
	VerifiedContainer,
	ReviewMutedContainer,
	ReviewMutedTestContainer,
};

// 组件包结构
export const ComponentPackage = {
	ComponentContainers: {
		BasicUsage,
		VerifiedUser,
		WithAvatar,
		CustomStyle,
		BasicUsageVue,
		VerifiedUserVue,
		WithAvatarVue,
		CustomStyleVue,
		AvatarContainer,
		ClassContainer,
		CommentContainer,
		DateContainer,
		RatingContainer,
		UserNameContainer,
		VerifiedContainer,
		MutedContainer: ReviewMutedContainer,
		MutedTestContainer: ReviewMutedTestContainer,
	},
};
