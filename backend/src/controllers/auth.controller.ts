import { Role } from '@prisma/client';
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';
import { hashPassword, comparePassword } from '../utils/password';
import { issueToken } from '../utils/token';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
    role?: string;
  };

  const rawRole = (req.body as { role?: string }).role;
  const allowedRoles = new Set(Object.values(Role));
  const role: Role = rawRole && allowedRoles.has(rawRole as Role) ? (rawRole as Role) : Role.support_agent;

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ success: false, message: 'Admin already exists' });
  }

  const password_hash = await hashPassword(password);
  const admin = await prisma.admin.create({
    data: { name, email, password_hash, role }
  });

  return sendSuccess(res, { id: admin.id, email: admin.email, role: admin.role }, 'Admin created', 201);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isValid = await comparePassword(password, admin.password_hash);
  if (!isValid) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = issueToken({ id: admin.id, email: admin.email, role: admin.role });
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 4
  });

  return sendSuccess(res, { token, admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } }, 'Logged in');
};
