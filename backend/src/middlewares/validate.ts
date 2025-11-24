import type { Request, Response, NextFunction } from 'express';
import type { AnyZodObject, ZodEffects } from 'zod';

export const validate = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
      files: req.files
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: result.error.flatten()
      });
    }

    Object.assign(req, result.data);
    return next();
  };
};
