import {
    makeCourseCollection,
    makeLessonCollection,
} from '@coffic/cosy-ui/collection';

export const collections = {
    courses: makeCourseCollection('./content/courses'),
    lessons: makeLessonCollection('./content/lessons')
};
