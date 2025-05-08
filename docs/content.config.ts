import { articleLoader, articleSchema } from '@/collections/ArticleCollection';
import { defineCollection } from 'astro:content';

export const collections = {
	articles: defineCollection({
		loader: articleLoader,
		schema: articleSchema,
	}),
};
