import CardCourseContainer from "./CardCourseContainer.astro";
import CardCourseIconSizesContainer from "./CardCourseIconSizesContainer.astro";
import CardCoursePaddingContainer from "./CardCoursePaddingContainer.astro";
import CardCourseKeywordsContainer from "./CardCourseKeywordsContainer.astro";
import SingleCourse from "./SingleCourse.astro";
import MultipleCourses from "./MultipleCourses.astro";

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
