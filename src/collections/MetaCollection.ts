import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const MetaCollection = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './docs/meta',
	}),
});
