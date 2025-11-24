import { z } from 'zod';

export const painterApplicationSchema = z.object({
  body: z.object({
    full_name: z.string().min(2),
    phone: z.string().min(10).max(15),
    email: z.string().email(),
    city: z.string().min(2),
    years_experience: z.number().int().min(0),
    skills: z.array(z.string()).min(1),
    preferred_zones: z.array(z.string()).optional(),
    expected_rate: z.string().optional(),
    terms_accepted: z.boolean(),
    notes: z.string().optional()
  })
});

export const painterStatusSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    status: z.enum(['pending', 'approved', 'rejected']),
    admin_notes: z.string().optional()
  })
});

export const listPaintersSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.string().optional()
  })
});
