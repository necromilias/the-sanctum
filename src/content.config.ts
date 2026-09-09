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

export const collections = { work };
