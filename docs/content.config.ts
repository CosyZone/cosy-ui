import { makeArticleCollection } from '@/index';
import { makeBlogCollection } from '@/index';
import { makeCourseCollection } from '@/index';
import { makeExperimentCollection } from '@/index';
import { makeLessonCollection } from '@/index';
import { makeMetaCollection } from '@/index';

export const collections = {
	articles: makeArticleCollection('./docs/articles'),
	blogs: makeBlogCollection('./docs/blogs'),
	courses: makeCourseCollection('./docs/courses'),
	experiments: makeExperimentCollection('./docs/experiments'),
	lessons: makeLessonCollection('./docs/lessons'),
	meta: makeMetaCollection('./docs/meta'),
};
