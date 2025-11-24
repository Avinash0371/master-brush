import { Router } from 'express';

import { login, register } from '../controllers/auth.controller';
import { authenticate, authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validators/auth.validator';

export const authRouter = Router();

authRouter.post('/register', authenticate, authorize('superadmin'), validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
