// @ts-nocheck
import type { Request, Response } from 'express';

import { prisma } from '../lib/prisma';
import { sendSuccess } from '../utils/http';
import { sendNotification } from '../utils/notifications';

export const submitContact = async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body as {
    name: string;
    email: string;
    phone?: string;
    message: string;
  };

  await prisma.auditLog.create({
    data: {
      adminId: 'system',
      action: 'contact_submission',
      entity: 'contact',
      metadata: { name, email, phone, message },
      entityId: null
    }
  }).catch(() => undefined);

  await sendNotification({
    toEmail: email,
    subject: 'Thanks for contacting Master Brush',
    text: 'We have received your message and will get back soon.'
  });

  return sendSuccess(res, { received: true }, 'Message received');
};
