// Astro 示例组件
import BasicUsage from "./BasicUsage.astro";
import VerifiedUser from "./VerifiedUser.astro";
import WithAvatar from "./WithAvatar.astro";
import CustomStyle from "./CustomStyle.astro";

// Vue 示例组件
import BasicUsageVue from "./BasicUsageVue.vue";
import VerifiedUserVue from "./VerifiedUserVue.vue";
import WithAvatarVue from "./WithAvatarVue.vue";
import CustomStyleVue from "./CustomStyleVue.vue";

// Props 容器组件
import AvatarContainer from "./AvatarContainer.astro";
import ClassContainer from "./ClassContainer.astro";
import CommentContainer from "./CommentContainer.astro";
import DateContainer from "./DateContainer.astro";
import RatingContainer from "./RatingContainer.astro";
import UserNameContainer from "./UserNameContainer.astro";
import VerifiedContainer from "./VerifiedContainer.astro";
import ReviewMutedContainer from "./ReviewMutedContainer.astro";
import ReviewMutedTestContainer from "./ReviewMutedTestContainer.astro";

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
