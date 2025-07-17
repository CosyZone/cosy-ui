import type { CollectionEntry } from 'astro:content';

export * from './BaseDB';
export * from './BlogRepo';
export * from './ExperimentRepo';
export * from './LessonRepo';
export * from './MetaRepo';
export * from './CourseRepo';
export * from './entities/BlogDoc';
export * from './entities/ExperimentDoc';
export * from './entities/LessonDoc';
export * from './entities/MetaDoc';

export const COLLECTION_BLOG = 'blogs' as const;
export type BlogEntry = CollectionEntry<typeof COLLECTION_BLOG>;
