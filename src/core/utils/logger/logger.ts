import * as winston from 'winston';

const { combine, timestamp, colorize, prettyPrint } = winston.format;

interface ErrorLogFunction {
  (): winston.Logger;
}

export const devErrorLog: ErrorLogFunction = () => {
  return winston.createLogger({
    level: 'debug',
    format: combine(
      colorize(),
      timestamp({ format: 'HH:mm:ss' }),
      prettyPrint(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new winston.transports.Console(),
    ],
  });
};

export const prodErrorLog: ErrorLogFunction = () => {
  return winston.createLogger({
    level: 'info',
    format: combine(timestamp(), winston.format.json()),
    transports: [
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new winston.transports.Console(),
    ],
  });
};
