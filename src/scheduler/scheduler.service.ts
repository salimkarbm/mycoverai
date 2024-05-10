import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationService } from '../notifications/notifications.service';
import { Post } from '../models/posts.model';
import { Op } from 'sequelize';
import { POST_REPOSITORY } from 'src/core/constants';
@Injectable()
export class AppScheduler {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const newPosts = await this.postRepository.findAll({
      where: {
        published: true,
        createdAt: {
          [Op.gte]: new Date(Date.now() - 60 * 1000), // Last minute
        },
      },
    });

    for (const post of newPosts) {
      await this.notificationService.addNotification(post);
    }
  }
}
