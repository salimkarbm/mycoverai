import { Expose, Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { REGEX, MESSAGES } from 'src/core/constants';

export class CreateUserDto {
  @IsNotEmpty({ message: 'FirstName is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'LastName is required' })
  @IsString()
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 24, { message: 'Password must be between 8 and 24 characters' })
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;
}

export class SignInDto {
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Length(8, 24, { message: 'Password must be between 8 and 24 characters' })
  @Matches(REGEX.PASSWORD_RULE, {
    message: MESSAGES.PASSWORD_RULE_MESSAGE,
  })
  password: string;
}

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  firstName: number;
  @Expose()
  lastName: number;
  @Expose()
  email: string;
  @Exclude()
  password: string;
}
