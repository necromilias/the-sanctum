import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    status: z.enum(['implemented', 'active', 'closed', 'maintained', 'parked', 'incomplete']),
    statusNote: z.string().min(1),
    type: z.string().min(1),
    lastVerified: z.coerce.date(),
    areas: z.array(z.string().min(1)).min(1),
    featured: z.boolean().default(false),
    order: z.number().int().nonnegative(),
    repository: z.url().optional(),
    evidence: z.array(z.object({
      label: z.string().min(1),
      url: z.url(),
    })).default([]),
    publicBoundary: z.string().min(1),
    role: z.string().min(1),
  }),
});

// YAML may parse an unquoted calendar date into a Date object.
const writingDate = z.preprocess(
  (value) => value instanceof Date ? value.toISOString().slice(0, 10) : value,
  z.iso.date(),
);

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    publishedDate: writingDate,
    updatedDate: writingDate.optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    draft: z.boolean().default(true),
  }).refine((data) => !data.updatedDate || data.updatedDate >= data.publishedDate, {
    message: 'updatedDate must not precede publishedDate',
    path: ['updatedDate'],
  }),
});

export const collections = { work, writing };
