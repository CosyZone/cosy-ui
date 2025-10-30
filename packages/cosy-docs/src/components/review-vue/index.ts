import ReviewVueBasicContainer from "./ReviewVueBasicContainer.astro";
import ReviewVueCustomStyleContainer from "./ReviewVueCustomStyleContainer.astro";
import ReviewVueMutedContainer from "./ReviewVueMutedContainer.astro";
import ReviewVueMutedTestContainer from "./ReviewVueMutedTestContainer.astro";
import ReviewVueVerifiedUserContainer from "./ReviewVueVerifiedUserContainer.astro";
import ReviewVueWithAvatarContainer from "./ReviewVueWithAvatarContainer.astro";

export const ReviewVuePackage = {
	Basic: ReviewVueBasicContainer,
	CustomStyle: ReviewVueCustomStyleContainer,
	Muted: ReviewVueMutedContainer,
	MutedTest: ReviewVueMutedTestContainer,
	VerifiedUser: ReviewVueVerifiedUserContainer,
	WithAvatar: ReviewVueWithAvatarContainer,
};
