import { z } from 'zod';

export const colourFiltersSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    family: z.string().optional(),
    theme: z.string().optional(),
    mood: z.string().optional(),
    finish: z.string().optional(),
    sort: z.string().optional()
  })
});

export const createColourSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    hex: z.string().regex(/^#([0-9a-fA-F]{6})$/),
    rgb: z.string().regex(/^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/),
    family: z.string(),
    description: z.string().optional(),
    themes: z.array(z.string()).default([]),
    mood_tags: z.array(z.string()).default([]),
    finish: z.string().optional(),
    popularity: z.number().optional(),
    palette_id: z.string().optional(),
    sample_images: z.array(z.string()).default([]),
    contrast_info: z.record(z.any()).optional()
  })
});

export const updateColourSchema = createColourSchema.extend({
  params: z.object({ id: z.string().min(1) })
});
