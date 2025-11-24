import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';
import { buildMeta, buildPagination } from '../utils/pagination';

const buildColourWhere = (query: Request['query']) => {
  const where: Prisma.ColorWhereInput = {};

  if (query.search) {
    const term = String(query.search);
    where.OR = [
      { name: { contains: term } },
      { description: { contains: term } }
    ];
  }

  if (query.family) {
    where.family = { equals: String(query.family) };
  }

  if (query.theme) {
    where.themes = { array_contains: [query.theme] as any };
  }

  if (query.mood) {
    where.mood_tags = { array_contains: [query.mood] as any };
  }

  return where;
};

export const listColours = async (req: Request, res: Response) => {
  const { page, limit, skip } = buildPagination(req.query);
  const where = buildColourWhere(req.query);

  const [total, colours] = await Promise.all([
    prisma.color.count({ where }),
    prisma.color.findMany({
      where,
      skip,
      take: limit,
      orderBy: req.query.sort === 'popularity' ? { popularity: 'desc' } : { created_at: 'desc' }
    })
  ]);

  return res.json({
    success: true,
    message: 'Colours fetched',
    data: colours,
    meta: buildMeta(page, limit, total)
  });
};

export const getColourBySlug = async (req: Request, res: Response) => {
  const color = await prisma.color.findUnique({ where: { slug: req.params.slug } });
  if (!color) {
    return res.status(404).json({ success: false, message: 'Colour not found' });
  }

  const complementary = await prisma.color.findMany({
    where: { family: { not: color.family } },
    take: 3
  });

  return sendSuccess(res, { color, complementary }, 'Colour fetched');
};

export const createColour = async (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;

  const colour = await prisma.color.create({
    data: {
      name: String(body.name),
      slug: String(body.slug),
      hex: String(body.hex),
      rgb: String(body.rgb),
      family: String(body.family),
      description: (body.description as string) ?? null,
      themes: body.themes ? JSON.parse(String(body.themes)) : [],
      mood_tags: body.mood_tags ? JSON.parse(String(body.mood_tags)) : [],
      finish: (body.finish as string) ?? null,
      popularity: body.popularity ? Number(body.popularity) : 0,
      palette_id: (body.palette_id as string) ?? null,
      sample_images: body.sample_images ? JSON.parse(String(body.sample_images)) : [],
      contrast_info: body.contrast_info ? JSON.parse(String(body.contrast_info)) : {}
    }
  });

  return sendSuccess(res, colour, 'Colour created', 201);
};

export const updateColour = async (req: Request, res: Response) => {
  const body = req.body as Record<string, unknown>;
  const { id } = req.params;

  const colour = await prisma.color.update({
    where: { id },
    data: {
      name: String(body.name),
      slug: String(body.slug),
      hex: String(body.hex),
      rgb: String(body.rgb),
      family: String(body.family),
      description: (body.description as string) ?? null,
      themes: body.themes ? JSON.parse(String(body.themes)) : [],
      mood_tags: body.mood_tags ? JSON.parse(String(body.mood_tags)) : [],
      finish: (body.finish as string) ?? null,
      popularity: body.popularity ? Number(body.popularity) : 0,
      palette_id: (body.palette_id as string) ?? null,
      sample_images: body.sample_images ? JSON.parse(String(body.sample_images)) : [],
      contrast_info: body.contrast_info ? JSON.parse(String(body.contrast_info)) : {}
    }
  });

  return sendSuccess(res, colour, 'Colour updated');
};

export const deleteColour = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.color.delete({ where: { id } });
  return sendSuccess(res, null, 'Colour deleted');
};

export const listPalettes = async (_req: Request, res: Response) => {
  const palettes = await prisma.palette.findMany({ include: { colors: true } });
  return sendSuccess(res, palettes, 'Palettes fetched');
};

export const createPalette = async (req: Request, res: Response) => {
  const { name, slug, description, tags } = req.body as Record<string, unknown>;

  const palette = await prisma.palette.create({
    data: {
      name: String(name),
      slug: String(slug),
      description: description ? String(description) : null,
      tags: tags ? JSON.parse(String(tags)) : []
    }
  });

  return sendSuccess(res, palette, 'Palette created', 201);
};
