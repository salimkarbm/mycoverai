import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { subscribersProvider } from './subscribers.provider';
import { usersProvider } from 'src/users/users.provider';

@Module({
  providers: [SubscribersService, ...subscribersProvider, ...usersProvider],
  controllers: [SubscribersController],
})
export class SubscribersModule {}
