import fs from 'fs';
import http from 'http';

import { createApp } from './app';
import { env } from './config/env';

const bootstrap = async () => {
  const uploadPath = env.UPLOAD_PATH;

  // env.UPLOAD_PATH is validated and resolved in env config, safe to access filesystem here.
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(uploadPath)) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Master Brush API running on ${env.APP_URL}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to bootstrap server', error);
  process.exit(1);
});
