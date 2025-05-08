import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const CourseCollection = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './docs/courses',
	}),
});
