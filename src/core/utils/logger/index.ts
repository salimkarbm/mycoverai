import { config } from 'dotenv';
import * as winston from 'winston';
import { devErrorLog, prodErrorLog } from './logger';

config();

const { NODE_ENV } = process.env;

let logger: winston.Logger = winston.createLogger();

if (NODE_ENV === 'development') {
  logger = devErrorLog();
}

if (NODE_ENV === 'production') {
  logger = prodErrorLog();
}

export default logger;
