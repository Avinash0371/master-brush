import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

import { logger } from '../utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err instanceof Error ? err.message : 'Unknown error');

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.flatten()
    });
  }

  if (err instanceof Error) {
    const status = 'status' in err ? Number((err as { status?: number }).status) : 500;
    return res.status(status || 500).json({ success: false, message: err.message });
  }

  return res.status(500).json({ success: false, message: 'Internal Server Error' });
};
