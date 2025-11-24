import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';

export type AuthPayload = {
  id: string;
  email: string;
  role: string;
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.substring(7) : req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    (req as Request & { user: AuthPayload }).user = payload;
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as Request & { user?: AuthPayload }).user;
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    return next();
  };
};
