import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const makeArticleCollection = (base: string) => {
    return defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base,
        }),
        schema: z.object({
            title: z.string().optional(),
            folder: z.boolean().optional(),
            order: z.number().optional(),
            description: z.string().optional(),
        }),
    });
};

export const makeBlogCollection = (base: string) => {
    return defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base,
        }),
        schema: z.object({
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
        }),
    });
};

export const makeCourseCollection = (base: string) => {
    return defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base,
        }),
        schema: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            folder: z.boolean().optional(),
            order: z.number().optional(),
            badge: z.string().optional(),
        }),
    });
};

export const makeExperimentCollection = (base: string) => {
    return defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base,
        }),
        schema: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
            pubDate: z.date().optional(),
        }),
    });
};

export const makeLessonCollection = (base: string) => {
    return defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base,
        }),
        schema: z.object({
            title: z.string().optional(),
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
    });
};

export const makeMetaCollection = (base: string) => {
    return defineCollection({
        loader: glob({
            pattern: '**/*.{md,mdx}',
            base,
        }),
        schema: z.object({
            title: z.string().optional(),
            description: z.string().optional(),
        }),
    });
};
