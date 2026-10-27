import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    /** Slug of the post on the old Wix site, for redirects. */
    wixSlug: z.string().optional(),
    category: z.enum(['advies', 'vacature']).default('advies'),
    draft: z.boolean().default(false),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: ({ image }) => z.object({
    /** <title>, keep under ~60 characters. */
    seoTitle: z.string(),
    description: z.string().max(170),
    h1: z.string(),
    intro: z.string(),
    symptoms: z.array(z.string()).default([]),
    steps: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    image: image().optional(),
    imageAlt: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, services };
