import { Router } from 'express';

import { approvePainter, createPainterApplication, getPainterDashboard, listPainters } from '../controllers/painter.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { upload } from '../utils/storage';
import { listPaintersSchema, painterApplicationSchema, painterStatusSchema } from '../validators/painter.validator';

export const painterRouter = Router();

painterRouter.get('/dashboard', authenticate, authorize('superadmin'), getPainterDashboard);

painterRouter.post(
  '/apply',
  validate(painterApplicationSchema),
  createPainterApplication
);

painterRouter.get('/', authenticate, authorize('superadmin'), validate(listPaintersSchema), listPainters);

painterRouter.patch(
  '/:id/status',
  authenticate,
  authorize('superadmin'),
  validate(painterStatusSchema),
  approvePainter
);
