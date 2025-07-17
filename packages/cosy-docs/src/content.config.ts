import {
    courseRepo,
    lessonRepo,
} from '@coffic/cosy-ui/collection';

export const collections = {
    courses: courseRepo.makeCourseCollection('./content/courses'),
    lessons: lessonRepo.makeLessonCollection('./content/lessons'),
};
