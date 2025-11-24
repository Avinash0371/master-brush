import { z } from 'zod';

const leadBase = {
  name: z.string().min(2),
  phone: z.string().min(10).max(15),
  email: z.string().email(),
  pincode: z.string().min(4).max(10),
  address: z.string().min(5),
  service_type: z.string().min(2),
  area_estimate: z.string().optional(),
  preferred_date: z.string().optional(),
  color_pref: z.array(z.string()).optional().nullable(),
  notes: z.string().optional()
};

export const createLeadSchema = z.object({
  body: z.object({
    ...leadBase,
    status: z.enum(['new', 'contacted', 'scheduled', 'completed']).optional()
  })
});

export const updateLeadStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    status: z.enum(['new', 'contacted', 'scheduled', 'completed']),
    notes: z.string().optional()
  })
});

export const listLeadsSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    status: z.string().optional(),
    pincode: z.string().optional()
  })
});
