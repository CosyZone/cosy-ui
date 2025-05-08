import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const LessonCollection = defineCollection({
	loader: glob({
		pattern: '**/{zh-cn,en}/**/*.{md,mdx}',
		base: './docs/lessons',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		authors: z
			.array(
				z.object({
					name: z.string(),
					picture: z.string().optional(),
				})
			)
			.optional(),
	}),
});
