import { Router } from 'express';

import {
  createColour,
  deleteColour,
  getColourBySlug,
  listColours,
  updateColour,
  listPalettes,
  createPalette
} from '../controllers/color.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { colourFiltersSchema, createColourSchema, updateColourSchema } from '../validators/color.validator';

export const colorRouter = Router();

colorRouter.get('/', validate(colourFiltersSchema), listColours);
colorRouter.get('/palettes', listPalettes);
colorRouter.get('/:slug', getColourBySlug);

colorRouter.post('/', authenticate, authorize('superadmin', 'content_editor'), validate(createColourSchema), createColour);
colorRouter.put('/:id', authenticate, authorize('superadmin', 'content_editor'), validate(updateColourSchema), updateColour);
colorRouter.delete('/:id', authenticate, authorize('superadmin', 'content_editor'), deleteColour);
colorRouter.post('/palettes', authenticate, authorize('superadmin', 'content_editor'), createPalette);
