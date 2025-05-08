import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const BlogCollection = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './docs/blogs',
	}),
	schema: z.object({
		title: z.string().optional(),
		description: z.string().optional(),
		tags: z.array(z.string()).optional(),
		date: z.date().optional(),
		authors: z
			.array(
				z.object({
					name: z.string(),
					picture: z.string().optional(),
					url: z.string().optional(),
				})
			)
			.optional(),
	}),
});
