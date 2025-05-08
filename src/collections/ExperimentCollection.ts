import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const ExperimentCollection = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './docs/experiments',
	}),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.date().optional(),
	}),
});
