import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const articleLoader = glob({
	pattern: '**/*.{md,mdx}',
	base: './docs/content',
});

export const articleSchema = z.object({
	title: z.string(),
	folder: z.boolean(),
	order: z.number(),
	description: z.string().optional(),
});

export const ArticleCollection = defineCollection({
	loader: articleLoader,
	schema: articleSchema,
});
