import {
    makeCourseCollection,
    makeLessonCollection
} from '@coffic/cosy-content/schema';

export const collections = {
    courses: makeCourseCollection('./content/courses'),
    lessons: makeLessonCollection('./content/lessons'),
};
