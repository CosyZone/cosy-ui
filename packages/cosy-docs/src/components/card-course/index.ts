import CardCourseContainer from './CardCourseContainer.astro';
import CardCourseIconSizesContainer from './CardCourseIconSizesContainer.astro';
import CardCoursePaddingContainer from './CardCoursePaddingContainer.astro';
import CardCourseKeywordsContainer from './CardCourseKeywordsContainer.astro';

export const CardCoursePackage = {
    CardCourseContainers: {
        Course: CardCourseContainer,
        IconSizes: CardCourseIconSizesContainer,
        Padding: CardCoursePaddingContainer,
        Keywords: CardCourseKeywordsContainer,
    }
}; 
