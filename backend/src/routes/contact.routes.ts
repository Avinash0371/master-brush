import { Router } from 'express';

import { submitContact } from '../controllers/contact.controller';
import { validate } from '../middlewares/validate';
import { contactSchema } from '../validators/contact.validator';

export const contactRouter = Router();

contactRouter.post('/', validate(contactSchema), submitContact);
