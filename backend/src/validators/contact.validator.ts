import { z } from 'zod';

export const contactSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10).max(15).optional(),
    message: z.string().min(10)
  })
});
