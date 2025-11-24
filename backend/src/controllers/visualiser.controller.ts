// @ts-nocheck
import type { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';

import { z } from 'zod';

const saveProjectSchema = z.object({
  user_id: z.string().optional().nullable(),
  title: z.string().min(1, 'Title is required'),
  project_json: z.record(z.unknown()),
  thumbnail_url: z.string().optional().nullable()
});

export const saveVisualiserProject = async (req: Request, res: Response, next: Function) => {
  try {
    const validatedData = saveProjectSchema.parse(req.body);

    const project = await prisma.visualiserProject.create({
      data: {
        user_id: validatedData.user_id ?? null,
        title: validatedData.title,
        project_json: validatedData.project_json as Prisma.InputJsonValue,
        thumbnail_url: validatedData.thumbnail_url ?? null
      }
    });

    return sendSuccess(res, project, 'Project saved', 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors
      });
    }
    next(error);
  }
};

export const getVisualiserProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await prisma.visualiserProject.findUnique({ where: { id } });
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }

  return sendSuccess(res, project, 'Project fetched');
};
