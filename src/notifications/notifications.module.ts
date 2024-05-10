import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { BullModule } from '@nestjs/bull';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { subscribersProvider } from 'src/subscribers/subscribers.provider';
import { usersProvider } from 'src/users/users.provider';
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification-queue',
    }),
  ],
  providers: [
    NotificationService,
    SubscribersService,
    ...subscribersProvider,
    ...usersProvider,
  ],
})
export class NotificationsModule {}
