import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

export const makeCourseCollection = (base: string) => {
	return defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base,
		}),
	});
};
