import type { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';

export const getContent = async (req: Request, res: Response) => {
  const { key } = req.params;
  const content = await prisma.siteContent.findUnique({ where: { key } });
  if (!content) {
    return res.status(404).json({ success: false, message: 'Content not found' });
  }
  return sendSuccess(res, content, 'Content fetched');
};

export const upsertContent = async (req: Request, res: Response) => {
  const { key, value, type } = req.body as { key: string; value: unknown; type: string };
  const jsonValue = value as Prisma.InputJsonValue;

  const result = await prisma.siteContent.upsert({
    where: { key },
    update: { value: jsonValue, type },
    create: { key, value: jsonValue, type }
  });

  return sendSuccess(res, result, 'Content updated');
};
