import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const metaSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
});

export const makeMetaCollection = (base: string) => {
	return defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base,
		}),
		schema: metaSchema,
	});
};
