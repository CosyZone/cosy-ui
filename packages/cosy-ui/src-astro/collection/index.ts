import type { CollectionEntry } from 'astro:content';

export * from './repos/BaseDB';
export * from './repos/BlogRepo';
export * from './repos/ExperimentRepo';
export * from './repos/LessonRepo';
export * from './repos/MetaRepo';
export * from './repos/CourseRepo';

export * from './entities/BlogDoc';
export * from './entities/ExperimentDoc';
export * from './entities/LessonDoc';
export * from './entities/MetaDoc';

export const COLLECTION_BLOG = 'blogs' as const;
export type BlogEntry = CollectionEntry<typeof COLLECTION_BLOG>;
