import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp: ts }) => `${ts} [${level}] ${message}`);

export const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console({
      format: combine(colorize(), timestamp(), logFormat)
    })
  ]
});
