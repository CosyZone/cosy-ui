import CardCourseContainer from "./CardCourseContainer.astro";
import CardCourseIconSizesContainer from "./CardCourseIconSizesContainer.astro";
import CardCourseIconSlotContainer from "./CardCourseIconSlotContainer.astro";
import CardCourseKeywordsContainer from "./CardCourseKeywordsContainer.astro";
import CardCoursePaddingContainer from "./CardCoursePaddingContainer.astro";
import CardCourseScaleEffectContainer from "./CardCourseScaleEffectContainer.astro";
import CardCourseShadowEffectContainer from "./CardCourseShadowEffectContainer.astro";
import MultipleCourses from "./MultipleCourses.astro";
import SingleCourse from "./SingleCourse.astro";

export const CardCoursePackage = {
	SingleCourse,
	MultipleCourses,
	CardCourseContainers: {
		Course: CardCourseContainer,
		IconSizes: CardCourseIconSizesContainer,
		Padding: CardCoursePaddingContainer,
		Keywords: CardCourseKeywordsContainer,
		ScaleEffect: CardCourseScaleEffectContainer,
		ShadowEffect: CardCourseShadowEffectContainer,
		IconSlot: CardCourseIconSlotContainer,
	},
};
