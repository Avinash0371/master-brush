import type { MailDataRequired } from '@sendgrid/mail';
import sgMail from '@sendgrid/mail';
import Twilio from 'twilio';

import { env } from '../config/env';

import { logger } from './logger';

type NotificationPayload = {
  toEmail?: string;
  subject?: string;
  html?: string;
  text?: string;
  toPhone?: string;
};

if (env.SENDGRID_API_KEY) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);
}

const twilioClient = env.TWILIO_ACCOUNT_SID && env.TWILIO_AUTH_TOKEN
  ? Twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
  : null;

export const sendNotification = async ({ toEmail, subject, html, text, toPhone }: NotificationPayload) => {
  if (toEmail && env.SENDGRID_API_KEY && env.SENDGRID_FROM_EMAIL) {
    try {
      const message: MailDataRequired = {
        to: toEmail,
        from: env.SENDGRID_FROM_EMAIL,
        subject: subject ?? 'Master Brush update',
        text: text ?? html ?? subject ?? 'Master Brush update'
      };

      if (html) {
        message.html = html;
      }

      await sgMail.send(message);
    } catch (error) {
      logger.error(`SendGrid error: ${(error as Error).message}`);
    }
  } else if (toEmail) {
    logger.info(`Email (mock): ${toEmail} => ${subject}`);
  }

  if (toPhone && twilioClient && env.TWILIO_FROM_NUMBER) {
    try {
      await twilioClient.messages.create({
        to: toPhone,
        from: env.TWILIO_FROM_NUMBER,
        body: text ?? html ?? subject ?? 'Update from Master Brush'
      });
    } catch (error) {
      logger.error(`Twilio error: ${(error as Error).message}`);
    }
  } else if (toPhone) {
    logger.info(`SMS (mock): ${toPhone} => ${text ?? subject}`);
  }
};
