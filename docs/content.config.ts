import { makeArticleCollection } from '@/collections/ArticleCollection';
import { makeBlogCollection } from '@/collections/BlogCollection';
import { makeCourseCollection } from '@/collections/CourseCollection';
import { makeExperimentCollection } from '@/collections/ExperimentCollection';
import { makeLessonCollection } from '@/collections/LessonCollection';
import { makeMetaCollection } from '@/collections/MetaCollection';

export const collections = {
	articles: makeArticleCollection('./docs/articles'),
	blogs: makeBlogCollection('./docs/blogs'),
	courses: makeCourseCollection('./docs/courses'),
	experiments: makeExperimentCollection('./docs/experiments'),
	lessons: makeLessonCollection('./docs/lessons'),
	meta: makeMetaCollection('./docs/meta'),
};
