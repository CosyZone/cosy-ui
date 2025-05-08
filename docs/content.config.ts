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
			folder: z.boolean(),
			order: z.number(),
			description: z.string().optional(),
		}),
	}),

	blogs: defineCollection({
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
	}),

	meta: defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base: './docs/meta',
		}),
	}),

	courses: defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base: './docs/courses',
		}),
	}),

	lessons: defineCollection({
		loader: glob({
			pattern: '**/{zh-cn,en}/**/*.{md,mdx}',
			base: './docs/lessons',
		}),
		schema: z.object({
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
		}),
	}),

	experiments: defineCollection({
		loader: glob({
			pattern: '**/*.{md,mdx}',
			base: './docs/experiments',
		}),
		schema: z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.date().optional(),
		}),
	}),
};
