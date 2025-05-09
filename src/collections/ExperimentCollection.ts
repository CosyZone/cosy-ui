import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const experimentSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	pubDate: z.date().optional(),
});

export const makeExperimentCollection = (base: string) => {
	return defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base,
		}),
		schema: experimentSchema,
	});
};
