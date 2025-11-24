import { z } from 'zod';

export const upsertContentSchema = z.object({
  body: z.object({
    key: z.string().min(2),
    value: z.union([z.string(), z.record(z.any()), z.array(z.any())]),
    type: z.enum(['text', 'richtext', 'json', 'media'])
  })
});

export const getContentSchema = z.object({
  params: z.object({ key: z.string().min(2) })
});
