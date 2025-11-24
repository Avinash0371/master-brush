import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { apiRouter } from './routes';

const openApiDocument = YAML.load(`${__dirname}/../openapi.yaml`);

export const createApp = () => {
  const app = express();

  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true
  }));
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(compression());
  app.use(morgan(env.isTest ? 'tiny' : 'dev'));

  const limiter = rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,
    standardHeaders: 'draft-7',
    legacyHeaders: false
  });
  app.use('/api', limiter);

  app.use('/uploads', express.static(env.UPLOAD_PATH));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', apiRouter);

  app.use(errorHandler);

  return app;
};
