import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Post } from '../models/posts.model';
import { SubscribersService } from '../subscribers/subscribers.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectQueue('notification-queue') private notificationQueue: Queue,
    private readonly subscribersService: SubscribersService,
  ) {}

  async addNotification(post: Partial<Post>): Promise<void> {
    await this.notificationQueue.add('new-post-notification', {
      postId: post.id,
      subscribers: await this.subscribersService.getSubscribers(),
    });
  }
}
