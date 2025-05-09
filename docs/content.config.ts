import {
	makeArticleCollection,
	makeBlogCollection,
	makeCourseCollection,
	makeExperimentCollection,
	makeLessonCollection,
} from '@/collection';

export const collections = {
	articles: makeArticleCollection('./docs/articles'),
	courses: makeCourseCollection('./docs/courses'),
	blogs: makeBlogCollection('./docs/blogs'),
	experiments: makeExperimentCollection('./docs/experiments'),
	lessons: makeLessonCollection('./docs/lessons'),
	metas: makeLessonCollection('./docs/metas'),
};
