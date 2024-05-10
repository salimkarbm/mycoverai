import { IsEmail, IsNumber } from 'class-validator';

export class SubscriberDto {
  @IsEmail()
  email: string;

  @IsNumber()
  userId: number;
}
