import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
    articles: defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base: './docs/content',
        }),
        schema: z.object({
            title: z.string(),
            description: z.string().optional(),
        }),
    }),
};
