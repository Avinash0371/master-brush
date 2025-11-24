import { Router } from 'express';

import { getContent, upsertContent } from '../controllers/content.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { getContentSchema, upsertContentSchema } from '../validators/content.validator';

export const contentRouter = Router();

contentRouter.get('/:key', validate(getContentSchema), getContent);
contentRouter.post('/', authenticate, authorize('superadmin', 'content_editor'), validate(upsertContentSchema), upsertContent);
