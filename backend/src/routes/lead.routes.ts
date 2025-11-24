import { Router } from 'express';

import { createLead, exportLeadsCsv, listLeads, updateLeadStatus } from '../controllers/lead.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createLeadSchema, listLeadsSchema, updateLeadStatusSchema } from '../validators/lead.validator';

export const leadRouter = Router();

// Public endpoint for customer quote submissions
leadRouter.post('/', validate(createLeadSchema), createLead);

// Admin-only endpoints
leadRouter.get('/', authenticate, authorize('superadmin'), validate(listLeadsSchema), listLeads);
leadRouter.patch('/:id/status', authenticate, authorize('superadmin'), validate(updateLeadStatusSchema), updateLeadStatus);
leadRouter.get('/export/csv', authenticate, authorize('superadmin'), exportLeadsCsv);
