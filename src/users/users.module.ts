import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';

@Module({
  controllers: [],
  providers: [UsersService, ...usersProvider],
})
export class UsersModule {}
