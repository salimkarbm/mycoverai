import { Module } from '@nestjs/common';
import { NotificationService } from 'src/notifications/notifications.service';
import { BullModule } from '@nestjs/bull';
import { AppScheduler } from './scheduler.service';
import { SubscribersService } from 'src/subscribers/subscribers.service';
import { postsProvider } from 'src/posts/posts.provider';
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
    AppScheduler,
    SubscribersService,
    ...postsProvider,
    ...subscribersProvider,
    ...usersProvider,
  ],
})
export class SchedulerModule {}
