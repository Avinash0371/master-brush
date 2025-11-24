import jwt, { type SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';
import type { AuthPayload } from '../middlewares/auth';

export const issueToken = (payload: AuthPayload) => {
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn']
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
};
