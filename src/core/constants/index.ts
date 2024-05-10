import { config } from 'dotenv';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

config();

export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const POST_REPOSITORY = 'POST_REPOSITORY';
export const COMMENT_REPOSITORY = 'COMMENT_REPOSITORY';
export const SUBSCRIBER_REPOSITORY = 'SUBSCRIBER_REPOSITORY';

const PASSWORD_RULE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
const PASSWORD_RULE_MESSAGE =
  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const SETTING = {
  VALIDATION_PIPE,
};

export const EMAIL_CREDENTIALS = {
  EMAIL_FROM: process.env.EMAIL_FROM,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  SERVICE_NAME: process.env.SERVICE_NAME,
  MAIL_PORT: Number(process.env.MAIL_PORT),
};
