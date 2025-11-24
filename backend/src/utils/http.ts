import { Response } from 'express';

export const sendSuccess = <T>(res: Response, data: T, message = 'Success', status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

export const sendError = (res: Response, error: unknown, status = 500) => {
  return res.status(status).json({
    success: false,
    message: error instanceof Error ? error.message : 'Internal Server Error'
  });
};
