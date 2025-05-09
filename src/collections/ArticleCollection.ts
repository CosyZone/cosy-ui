import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const makeArticleCollection = (base: string) => {
	return defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base,
		}),
		schema: articleSchema,
	});
};

export const articleSchema = z.object({
	title: z.string(),
	folder: z.boolean(),
	order: z.number(),
	description: z.string().optional(),
});
