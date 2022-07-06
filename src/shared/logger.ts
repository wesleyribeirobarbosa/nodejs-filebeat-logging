import { createLogger, format, transports } from 'winston';

const error = createLogger({
  format: format.combine(format.errors({ stack: true }), format.json()),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({
      format: format.simple(),
    }),
  ],
});

const info = createLogger({
  format: format.combine(format.errors({ stack: true }), format.json()),
  transports: [
    new transports.File({ filename: 'info.log', level: 'info' }),
    new transports.Console({
      format: format.simple(),
    }),
  ],
});

export const errorLogger = error;
export const infoLogger = info;
