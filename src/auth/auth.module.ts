import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { usersProvider } from 'src/users/users.provider';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthService, ...usersProvider, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
