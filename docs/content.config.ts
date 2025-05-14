import {
	makeArticleCollection,
	makeBlogCollection,
	makeCourseCollection,
	makeExperimentCollection,
	makeLessonCollection,
	makeMetaCollection,
} from '@/index_collection';

export const collections = {
	articles: makeArticleCollection('./docs/articles'),
	courses: makeCourseCollection('./docs/courses'),
	blogs: makeBlogCollection('./docs/blogs'),
	experiments: makeExperimentCollection('./docs/experiments'),
	lessons: makeLessonCollection('./docs/lessons'),
	meta: makeMetaCollection('./docs/metas'),
};
