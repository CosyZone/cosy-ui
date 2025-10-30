import AvatarContainer from "./AvatarContainer.astro";
import BasicUsage from "./BasicUsage.astro";
import ClassContainer from "./ClassContainer.astro";
import CommentContainer from "./CommentContainer.astro";
import CustomStyle from "./CustomStyle.astro";
import DateContainer from "./DateContainer.astro";
import RatingContainer from "./RatingContainer.astro";
import ReviewMutedContainer from "./ReviewMutedContainer.astro";
import UserNameContainer from "./UserNameContainer.astro";
import VerifiedContainer from "./VerifiedContainer.astro";
import VerifiedUser from "./VerifiedUser.astro";
import WithAvatar from "./WithAvatar.astro";

// 导出组件
export { BasicUsage, VerifiedUser, WithAvatar, CustomStyle };
export {
	AvatarContainer,
	ClassContainer,
	CommentContainer,
	DateContainer,
	RatingContainer,
	UserNameContainer,
	VerifiedContainer,
	ReviewMutedContainer,
};

// 组件包结构
export const ComponentPackage = {
	ComponentContainers: {
		BasicUsage,
		VerifiedUser,
		WithAvatar,
		CustomStyle,
		AvatarContainer,
		ClassContainer,
		CommentContainer,
		DateContainer,
		RatingContainer,
		UserNameContainer,
		VerifiedContainer,
		MutedContainer: ReviewMutedContainer,
	},
};
