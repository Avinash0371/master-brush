import { Router } from 'express';

import { getVisualiserProject, saveVisualiserProject } from '../controllers/visualiser.controller';
import { validate } from '../middlewares/validate';
import { saveVisualiserSchema, visualiserParamsSchema } from '../validators/visualiser.validator';

export const visualiserRouter = Router();

visualiserRouter.post('/', validate(saveVisualiserSchema), saveVisualiserProject);
visualiserRouter.get('/:id', validate(visualiserParamsSchema), getVisualiserProject);
