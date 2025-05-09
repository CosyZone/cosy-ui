import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const blogSchema = z.object({
	title: z.string(),
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
});

export const makeBlogCollection = (base: string) => {
	return defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base,
		}),
		schema: blogSchema,
	});
};
