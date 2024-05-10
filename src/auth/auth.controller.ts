import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto, SignInDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { Serialize } from '../core/interceptor/serialize.interceptor';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body);
    if (user) {
      return user;
    }
    throw new HttpException(
      'Unable to create User. Please try again later!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('/signin')
  @HttpCode(HttpStatus.ACCEPTED)
  async signin(@Body() body: SignInDto) {
    const user = await this.authService.signin(body.email, body.password);
    console.log(user);
    if (user) {
      return user;
    }
    throw new HttpException(
      'Unable to Loggin User. Please try again later!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
