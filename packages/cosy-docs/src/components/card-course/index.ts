import CardCourseContainer from "./CardCourseContainer.astro";
import CardCourseIconSizesContainer from "./CardCourseIconSizesContainer.astro";
import CardCourseKeywordsContainer from "./CardCourseKeywordsContainer.astro";
import CardCoursePaddingContainer from "./CardCoursePaddingContainer.astro";
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
	},
};
