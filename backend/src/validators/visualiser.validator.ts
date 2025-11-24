import { z } from 'zod';

export const saveVisualiserSchema = z.object({
  body: z.object({
    user_id: z.string().optional(),
    title: z.string().min(2),
    project_json: z.record(z.any()),
    thumbnail_url: z.string().url().optional()
  })
});

export const visualiserParamsSchema = z.object({
  params: z.object({ id: z.string().min(1) })
});
