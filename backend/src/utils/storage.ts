import fs from 'fs';
import path from 'path';

import { S3 } from 'aws-sdk';
import type { Express, Request } from 'express';
import multer, { type FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import { nanoid } from 'nanoid';

import { env } from '../config/env';

const uploadPath = env.UPLOAD_PATH;

// uploadPath is resolved in env config to a known safe directory.
// eslint-disable-next-line security/detect-non-literal-fs-filename
if (!fs.existsSync(uploadPath)) {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.mkdirSync(uploadPath, { recursive: true });
}

const s3 = env.STORAGE_DRIVER === 's3'
  ? new S3({
      region: env.S3_REGION,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      endpoint: env.S3_ENDPOINT,
      s3ForcePathStyle: Boolean(env.S3_ENDPOINT)
    })
  : null;

const fileFilter: multer.Options['fileFilter'] = (_req, file, callback: FileFilterCallback) => {
  const allowed = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];
  if (!allowed.includes(file.mimetype)) {
    return callback(new Error('Unsupported file type'));
  }
  return callback(null, true);
};

const filename = (
  _req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) => {
  const ext = path.extname(file.originalname) || '.dat';
  callback(null, `${Date.now()}-${nanoid(8)}${ext}`);
};

export const storage = env.STORAGE_DRIVER === 's3' && s3
  ? multerS3({
      s3,
      bucket: env.S3_BUCKET as string,
      key: filename,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'private'
    })
  : multer.diskStorage({
      destination: (_req: Request, _file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) =>
        callback(null, uploadPath),
      filename
    });

export const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });
