import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const lessonSchema = z.object({
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
});

export const makeLessonCollection = (base: string) => {
	return defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base,
		}),
		schema: lessonSchema,
	});
};
